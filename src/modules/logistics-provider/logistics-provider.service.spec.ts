import { BadRequestException, ForbiddenException } from '@nestjs/common';

jest.mock('@nestjs/config', () => ({ ConfigService: class ConfigService {} }));
jest.mock('prisma/prisma.service', () => ({ PrismaService: class PrismaService {} }));

import { LogisticsProviderService } from './logistics-provider.service';

// Minimal in-memory Prisma double covering the paths under test.
function makePrisma() {
  const state: any = {
    provider: { id: 'prov1', userId: 'user1', companyName: 'Swift', verificationStatus: 'VERIFIED', payoutBankName: 'OPAY', payoutAccountNumber: '8123450094', payoutAccountName: 'Swift Ltd' },
    capacity: { id: 'cap1', providerId: 'prov1', title: 'Lagos run', totalCapacity: 100, reservedCapacity: 20, status: 'PUBLISHED', pricePerPackageKobo: 100000, minReservationQty: 1, maxReservationQty: null, reservationDeadline: null, destinationZones: ['Ikeja'], region: 'Lagos', city: 'Lagos', provider: { id: 'prov1', userId: 'user1' } },
    notifications: [] as any[],
  };
  const prisma: any = {
    logisticsProviderSetting: { upsert: async () => ({ id: 'default', commissionPercent: 10 }) },
    user: { findUnique: async ({ where }: any) => (where.id === 'biz1' ? { id: 'biz1', businessName: 'Shop', displayPhoneNumber: null } : { id: where.id, displayPhoneNumber: null }) },
    sharedNetworkBusiness: { findUnique: async () => null },
    notification: { create: async ({ data }: any) => { state.notifications.push(data); return data; } },
    logisticsProvider: { findUnique: async () => state.provider, update: async ({ data }: any) => ({ ...state.provider, ...data }) },
    logisticsZone: { findMany: async () => [] },
    logisticsCapacity: { findUnique: async () => state.capacity, findMany: async () => [state.capacity] },
    logisticsReservation: { findUnique: async () => null, create: async ({ data }: any) => ({ id: 'res1', ...data }), findFirst: async () => state.reservation },
  };
  prisma.$transaction = async (fn: any) => fn(tx);
  const tx: any = {
    logisticsCapacity: {
      findUnique: async () => state.capacity,
      updateMany: async ({ where, data }: any) => {
        const available = state.capacity.totalCapacity - state.capacity.reservedCapacity;
        if (where.reservedCapacity?.lte !== undefined && state.capacity.reservedCapacity > state.capacity.totalCapacity - data.reservedCapacity.increment) return { count: 0 };
        if (available < data.reservedCapacity.increment) return { count: 0 };
        state.capacity.reservedCapacity += data.reservedCapacity.increment; return { count: 1 };
      },
      update: async ({ data }: any) => { Object.assign(state.capacity, data); if (data.reservedCapacity?.decrement) state.capacity.reservedCapacity -= data.reservedCapacity.decrement; return state.capacity; },
    },
    logisticsReservation: {
      create: async ({ data }: any) => { state.reservation = { id: 'res1', ...data }; return state.reservation; },
      update: async ({ data }: any) => { Object.assign(state.reservation, data); return state.reservation; },
      findFirst: async () => state.reservation,
    },
    logisticsReservationEvent: { create: async ({ data }: any) => data },
  };
  return { prisma, state, tx };
}
const config: any = { get: (k: string) => (k === 'LOGISTICS_PLATFORM_COMMISSION_PERCENT' ? '10' : undefined) };

describe('LogisticsProviderService', () => {
  it('splits commission from config, never hardcoded in the amount', async () => {
    const { prisma } = makePrisma();
    const svc = new LogisticsProviderService(prisma, config);
    await expect(svc.commissionPercent()).resolves.toBe(10);
  });

  it('reserves capacity atomically and prices amount/commission/earnings', async () => {
    const { prisma, state } = makePrisma();
    const svc = new LogisticsProviderService(prisma, config);
    const r: any = await svc.createReservation('biz1', { capacityId: 'cap1', quantity: 20, pickupLocation: 'Yaba', destinationZone: 'Ikeja' });
    expect(state.capacity.reservedCapacity).toBe(40);
    expect(r.amountKobo).toBe(2_000_000);
    expect(r.commissionKobo).toBe(200_000);
    expect(r.providerEarningKobo).toBe(1_800_000);
    expect(r.status).toBe('PENDING');
  });

  it('rejects reservations beyond remaining capacity (no overbooking)', async () => {
    const { prisma } = makePrisma();
    const svc = new LogisticsProviderService(prisma, config);
    await expect(svc.createReservation('biz1', { capacityId: 'cap1', quantity: 81, pickupLocation: 'Yaba', destinationZone: 'Ikeja' })).rejects.toBeInstanceOf(BadRequestException);
  });

  it('rejects arbitrary reservation transitions and unpaid acceptance', async () => {
    const { prisma, state } = makePrisma();
    state.reservation = { id: 'res1', providerId: 'prov1', capacityId: 'cap1', quantity: 5, status: 'COMPLETED', paymentStatus: 'PAID', businessUserId: 'biz1', reference: 'LP-RES-1' };
    const svc = new LogisticsProviderService(prisma, config);
    await expect(svc.reservationAction('user1', 'res1', { action: 'ACCEPT' })).rejects.toBeInstanceOf(BadRequestException);
    state.reservation = { ...state.reservation, status: 'PENDING', paymentStatus: 'UNPAID' };
    await expect(svc.reservationAction('user1', 'res1', { action: 'ACCEPT' })).rejects.toThrow('Only paid reservations');
  });

  it('blocks unverified providers from publishing capacity', async () => {
    const { prisma, state } = makePrisma();
    state.provider = { ...state.provider, verificationStatus: 'UNVERIFIED' };
    prisma.logisticsProvider.findUnique = async () => state.provider;
    prisma.logisticsCapacity = { create: async ({ data }: any) => ({ id: 'c2', reservedCapacity: 0, ...data }) };
    const svc = new LogisticsProviderService(prisma, config);
    await expect(svc.createCapacity('user1', { title: 'T', region: 'Lagos', state: 'Lagos', city: 'Lagos', pickupZones: [], destinationZones: [], totalCapacity: 10, deliveryDate: new Date().toISOString(), pickupStartTime: '08:00', pickupEndTime: '10:00', deliveryTimeframe: 'Same day', pricePerPackageKobo: 1000, status: 'PUBLISHED' })).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('stores the full payout account number, digits only', async () => {
    const { prisma } = makePrisma();
    let saved: any;
    prisma.logisticsProvider.upsert = async ({ create }: any) => { saved = create; return create; };
    const svc = new LogisticsProviderService(prisma, config);
    await svc.upsertProfile('user1', { companyName: 'Swift', contactName: 'A', businessEmail: 'a@b.c', phoneNumber: '080', businessAddress: 'Lagos', operatingRegions: [], servicesOffered: [], payoutAccountNumber: '8123 4500-94' } as any);
    expect(saved.payoutAccountNumber).toBe('8123450094');
    expect(saved.payoutAccountLast4).toBeUndefined();
  });
});
