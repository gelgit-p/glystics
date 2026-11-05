import { BadRequestException } from '@nestjs/common';
import { SharedNetworkService } from './shared-network.service';
jest.mock('@nestjs/config', () => ({ ConfigService: class ConfigService {} }));

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
    sharedNetworkCreditTransaction: { create: jest.fn(async ({ data }: any) => { state.txns.push(data); return data; }) },
    sharedNetworkReservation: { create: jest.fn(async ({ data }: any) => { const r = { id: 'r1', ...data, capacity: { ...state.capacity } }; state.reservations.push(r); return r; }), findUnique: jest.fn(async () => null) },
    sharedNetworkUsageRecord: { create: jest.fn(async ({ data }: any) => { state.usage.push(data); return data; }) },
  };
  const prisma: any = {
    $transaction: jest.fn(async (fn: any) => fn(tx)),
    sharedNetworkBusiness: { findUnique: jest.fn(async () => ({ id: 'b1', userId: 'u1', status: 'ACTIVE', operatingRegions: ['Lagos'] })) },
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
    const svc = new SharedNetworkService(prisma, bachs, config);
    await expect(svc.createReservation('u1', { capacityId: 'c1', quantity: 3, pickupLocation: 'Yaba' })).rejects.toBeInstanceOf(BadRequestException);
    const ok = await svc.createReservation('u1', { capacityId: 'c1', quantity: 2, pickupLocation: 'Yaba' });
    expect(ok.quantity).toBe(2); expect(state.capacity.reservedCapacity).toBe(10); expect(state.wallet.balance).toBe(96);
  });
  it('rejects when credits are insufficient and does not hold capacity in the same tx rollback semantics', async () => {
    const { prisma } = makePrisma({ id: 'c1', totalCapacity: 10, reservedCapacity: 0, pricePerSlotCredits: 50, pricePerSlotKobo: 0, region: 'Lagos', window: 'MORNING', cutoffAt: null }, 10);
    const svc = new SharedNetworkService(prisma, bachs, config);
    await expect(svc.createReservation('u1', { capacityId: 'c1', quantity: 1, pickupLocation: 'Yaba' })).rejects.toThrow(/Insufficient Shared Network credits/);
  });
  it('pool view never exposes another business delivery details', async () => {
    const { prisma } = makePrisma({ id: 'c1', totalCapacity: 1, reservedCapacity: 0, pricePerSlotCredits: 0, pricePerSlotKobo: 0 });
    const svc = new SharedNetworkService(prisma, bachs, config);
    const view = (svc as any).poolView({ id: 'p1', name: 'P', region: 'Lagos', date: new Date(), window: 'MORNING', status: 'OPEN', maxDeliveries: 10, totalDeliveries: 5, estimatedSavingsKobo: 0, deliveries: [{ businessId: 'other', pickupAddress: 'SECRET', deliveryId: 'd9' }, { businessId: 'b1', pickupAddress: 'Mine', deliveryId: 'd1' }] }, 'b1');
    expect(view.myDeliveries).toHaveLength(1); expect(JSON.stringify(view)).not.toContain('SECRET'); expect(view.businessCount).toBe(2);
  });
});
