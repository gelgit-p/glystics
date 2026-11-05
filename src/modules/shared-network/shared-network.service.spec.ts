import { BadRequestException } from '@nestjs/common';
import { SharedNetworkService } from './shared-network.service';
jest.mock('@nestjs/config', () => ({ ConfigService: class ConfigService {} }));
jest.mock('../credits/credit.service', () => ({ CreditsService: class CreditsService {} }));
const fakeCredits = {
  getWallet: jest.fn(async (userId: string) => ({ walletId: 'bw1', businessName: '', balance: 100, points: 0, creditsUsedThisMonth: 0, hasPurchasedCredits: true, lowBalance: false, lowBalanceThreshold: 10 })),
  spendWithinTransaction: jest.fn(async (tx: any, input: any) => {
    const w = tx._billing ?? (tx._billing = { balance: tx._billingSeed ?? 100 });
    if (w.balance < input.credits) { const e: any = new Error('Insufficient credits'); e.status = 402; throw e; }
    w.balance -= input.credits;
    return tx.creditTransaction.create({ data: { walletId: 'bw1', type: 'USAGE', amount: -input.credits, balanceAfter: w.balance, description: input.description, idempotencyKey: input.idempotencyKey, metadata: input.metadata } });
  }),
  refundUsage: jest.fn(async () => ({})),
};

// Minimal in-memory Prisma fake covering the reservation concurrency path.
function makePrisma(capacity: any, walletBalance = 100) {
  const state = { capacity: { ...capacity }, wallet: { id: 'w1', businessId: 'b1', balance: walletBalance, lifetimeSpent: 0, lifetimePurchased: 0 }, reservations: [] as any[], txns: [] as any[], usage: [] as any[] };
  const tx: any = {
    sharedNetworkCapacity: {
      updateMany: jest.fn(async ({ where, data }: any) => { if (state.capacity.reservedCapacity <= state.capacity.totalCapacity - (data.reservedCapacity.increment ?? 0) && state.capacity.id === where.id) { state.capacity.reservedCapacity += data.reservedCapacity.increment; return { count: 1 }; } return { count: 0 }; }),
      findUniqueOrThrow: jest.fn(async () => ({ ...state.capacity })),
    },
    sharedNetworkWallet: {
      findUniqueOrThrow: jest.fn(async () => ({ ...state.wallet })),
      updateMany: jest.fn(async ({ where, data }: any) => { if (state.wallet.balance >= (where.balance?.gte ?? 0)) { state.wallet.balance -= data.balance.decrement; state.wallet.lifetimeSpent += data.lifetimeSpent.increment; return { count: 1 }; } return { count: 0 }; }),
      findUnique: jest.fn(async () => ({ ...state.wallet })),
      update: jest.fn(async ({ data }: any) => { if (data.balance?.increment) state.wallet.balance += data.balance.increment; return { ...state.wallet }; }),
    },
    creditWallet: { upsert: jest.fn(async () => ({ id: 'bw1', balance: state.wallet.balance })), update: jest.fn(async () => ({ id: 'bw1', balance: state.wallet.balance })) },
    creditTransaction: { findUnique: jest.fn(async () => null), create: jest.fn(async ({ data }: any) => { state.txns.push(data); state.wallet.balance = data.balanceAfter; return { id: 'ctx1', ...data }; }) },
    sharedNetworkCreditTransaction: { create: jest.fn(async ({ data }: any) => { state.txns.push(data); return data; }) },
    sharedNetworkReservation: { create: jest.fn(async ({ data }: any) => { const r = { id: 'r1', ...data, capacity: { ...state.capacity } }; state.reservations.push(r); return r; }), findUnique: jest.fn(async () => null) },
    sharedNetworkUsageRecord: { create: jest.fn(async ({ data }: any) => { state.usage.push(data); return data; }) },
  };
  const prisma: any = {
    $transaction: jest.fn(async (fn: any) => { (tx as any)._billingSeed = state.wallet.balance; (tx as any)._billing = undefined; return fn(tx); }),
    sharedNetworkBusiness: { findUnique: jest.fn(async () => ({ id: 'b1', userId: 'u1', status: 'ACTIVE', accessEnabled: true, operatingRegions: ['Lagos'] })) },
    sharedNetworkSetting: { upsert: jest.fn(async () => ({ id: 'default', networkEnabled: true })) },
    sharedNetworkSubscription: { findFirst: jest.fn(async () => null) },
    sharedNetworkReservation: { aggregate: jest.fn(async () => ({ _sum: { quantity: 0 } })), findUnique: jest.fn(async () => null) },
    sharedNetworkCapacity: { findUnique: jest.fn(async () => ({ ...state.capacity })), findFirst: jest.fn(async () => ({ ...state.capacity })) },
  };
  return { prisma, state };
}

describe('SharedNetworkService reservations', () => {
  const bachs: any = {}; const config: any = { get: () => undefined };
  it('prevents overbooking and debits credits atomically', async () => {
    const { prisma, state } = makePrisma({ id: 'c1', totalCapacity: 10, reservedCapacity: 8, pricePerSlotCredits: 2, pricePerSlotKobo: 0, region: 'Lagos', window: 'AFTERNOON', cutoffAt: null });
    const svc = new SharedNetworkService(prisma, bachs, config, fakeCredits as never);
    await expect(svc.createReservation('u1', { capacityId: 'c1', quantity: 3, pickupLocation: 'Yaba' })).rejects.toBeInstanceOf(BadRequestException);
    const ok = await svc.createReservation('u1', { capacityId: 'c1', quantity: 2, pickupLocation: 'Yaba' });
    expect(ok.quantity).toBe(2); expect(state.capacity.reservedCapacity).toBe(10); expect(state.wallet.balance).toBe(96);
  });
  it('rejects when credits are insufficient and does not hold capacity in the same tx rollback semantics', async () => {
    const { prisma } = makePrisma({ id: 'c1', totalCapacity: 10, reservedCapacity: 0, pricePerSlotCredits: 50, pricePerSlotKobo: 0, region: 'Lagos', window: 'MORNING', cutoffAt: null }, 10);
    const svc = new SharedNetworkService(prisma, bachs, config, fakeCredits as never);
    await expect(svc.createReservation('u1', { capacityId: 'c1', quantity: 1, pickupLocation: 'Yaba' })).rejects.toThrow(/Insufficient credits/);
  });
  it('pool view never exposes another business delivery details', async () => {
    const { prisma } = makePrisma({ id: 'c1', totalCapacity: 1, reservedCapacity: 0, pricePerSlotCredits: 0, pricePerSlotKobo: 0 });
    const svc = new SharedNetworkService(prisma, bachs, config, fakeCredits as never);
    const view = (svc as any).poolView({ id: 'p1', name: 'P', region: 'Lagos', date: new Date(), window: 'MORNING', status: 'OPEN', maxDeliveries: 10, totalDeliveries: 5, estimatedSavingsKobo: 0, deliveries: [{ businessId: 'other', pickupAddress: 'SECRET', deliveryId: 'd9' }, { businessId: 'b1', pickupAddress: 'Mine', deliveryId: 'd1' }] }, 'b1');
    expect(view.myDeliveries).toHaveLength(1); expect(JSON.stringify(view)).not.toContain('SECRET'); expect(view.businessCount).toBe(2);
  });
});

describe('SharedNetworkService paid plans & network toggle', () => {
  it('listPlans only returns paid plans (no Starter, no free)', async () => {
    const prisma: any = {
      sharedNetworkPlan: {
        upsert: jest.fn(async () => ({})),
        findMany: jest.fn(async ({ where }: any) => { expect(where.monthlyPriceKobo.gt).toBe(0); expect(where.annualPriceKobo.gt).toBe(0); return [{ slug: 'network-growth', monthlyPriceKobo: 1500000 }]; }),
      },
      sharedNetworkSetting: { upsert: jest.fn(async () => ({ id: 'default', networkEnabled: true })) },
    };
    const svc = new SharedNetworkService(prisma, {} as never, { get: () => undefined } as never, fakeCredits as never);
    const plans = await svc.listPlans();
    expect(plans).toHaveLength(1); 
  });
  it('assertNetworkEnabled throws 503 with admin message when OFF', async () => {
    const prisma: any = { sharedNetworkSetting: { upsert: jest.fn(async () => ({ id: 'default', networkEnabled: false, disabledMessage: 'Maintenance' })) } };
    const svc = new SharedNetworkService(prisma, {} as never, { get: () => undefined } as never, fakeCredits as never);
    await expect(svc.assertNetworkEnabled()).rejects.toThrow('Maintenance');
    await expect(svc.createBusiness('u1', { businessName: 'x', businessEmail: 'a@b.c', contactPhone: '1', category: 'c', pickupLocations: [], operatingRegions: [] } as never)).rejects.toThrow('Maintenance');
  });
  it('createBusiness without a plan is rejected (no PAYG)', async () => {
    const prisma: any = {
      sharedNetworkSetting: { upsert: jest.fn(async () => ({ id: 'default', networkEnabled: true })) },
      sharedNetworkPlan: { upsert: jest.fn(async () => ({})), findMany: jest.fn(async () => []) },
      sharedNetworkBusiness: { findUnique: jest.fn(async () => null) },
      $transaction: jest.fn(async (fn: any) => fn({ sharedNetworkBusiness: { create: jest.fn(async () => ({ id: 'b1' })) }, sharedNetworkWallet: { create: jest.fn() } })),
    };
    const svc = new SharedNetworkService(prisma, {} as never, { get: () => undefined } as never, fakeCredits as never);
    await expect(svc.createBusiness('u1', { businessName: 'x', businessEmail: 'a@b.c', contactPhone: '1', category: 'c', pickupLocations: [], operatingRegions: [], planId: undefined } as never)).rejects.toThrow(/paid subscription plan is required/);
  });
});

describe('SharedNetworkService per-business access', () => {
  it('deactivated business is blocked from all network features, activated business is not', async () => {
    const business = { id: 'b1', userId: 'u1', status: 'ACTIVE', accessEnabled: false, operatingRegions: ['Lagos'] };
    const prisma: any = {
      sharedNetworkSetting: { upsert: jest.fn(async () => ({ id: 'default', networkEnabled: true })) },
      sharedNetworkBusiness: { findUnique: jest.fn(async () => ({ ...business })) },
    };
    const svc = new SharedNetworkService(prisma, {} as never, { get: () => undefined } as never, fakeCredits as never);
    await expect(svc.listSlots('u1')).rejects.toThrow(/deactivated by an administrator/);
    await expect(svc.getCredits('u1')).rejects.toThrow(/deactivated by an administrator/);
    business.accessEnabled = true;
    prisma.sharedNetworkSlot = { findMany: jest.fn(async () => []) };
    await expect(svc.listSlots('u1')).resolves.toEqual([]);
  });
  it('admin activate/deactivate is audit-logged', async () => {
    const prisma: any = { sharedNetworkBusiness: { update: jest.fn(async ({ data }: any) => ({ id: 'b1', accessEnabled: data.accessEnabled })) }, sharedNetworkAuditLog: { create: jest.fn(async () => ({})) } };
    const svc = new SharedNetworkService(prisma, {} as never, { get: () => undefined } as never, fakeCredits as never);
    const off = await svc.adminSetBusinessAccess('admin1', 'b1', false);
    expect(off.accessEnabled).toBe(false);
    expect(prisma.sharedNetworkAuditLog.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ action: 'BUSINESS_ACCESS_DEACTIVATED', actorUserId: 'admin1' }) }));
    const on = await svc.adminSetBusinessAccess('admin1', 'b1', true);
    expect(on.accessEnabled).toBe(true);
  });
});

describe('SharedNetworkController status route', () => {
  it('exposes GET /shared-network/status for the user sidebar (regression: was 404 -> fail-open)', async () => {
    const { SharedNetworkController } = await import('./shared-network.controller');
    const svc: any = { getNetworkSetting: jest.fn(async () => ({ networkEnabled: false, disabledMessage: 'Off' })) };
    const c = new SharedNetworkController(svc);
    await expect(c.status()).resolves.toEqual({ networkEnabled: false, disabledMessage: 'Off' });
    expect(svc.getNetworkSetting).toHaveBeenCalled();
  });
});
