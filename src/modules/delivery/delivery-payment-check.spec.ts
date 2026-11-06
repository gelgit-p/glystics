jest.mock('@nestjs/config', () => ({ ConfigService: class {} }));
jest.mock('prisma/generated', () => ({
  Prisma: { PrismaClientKnownRequestError: class extends Error { code = 'P2002'; } },
  PrismaClient: class {},
}));
jest.mock('prisma/prisma.service', () => ({ PrismaService: class {} }));
jest.mock('../payment/payment.service', () => ({ BachsService: class {} }));
jest.mock('../shipbubble/shipbubble.service', () => ({ ShipbubbleService: class {} }));
jest.mock('../credits/credit.service', () => ({ CreditsService: class {} }));

import { DeliveryService } from './delivery.service';

describe('DeliveryService.checkPaymentAndBook (poll -> verify -> label)', () => {
  const pendingDelivery = {
    id: 'del-1', userId: 'u1', trackingId: 'SD12345', checkoutSessionId: 'co_1', checkoutUrl: 'https://pay.example/abc',
    paymentStatus: 'PENDING', bookingStatus: 'NOT_STARTED', deliveryStatus: 'PAYMENT_PENDING',
    shipbubbleOrderId: null, tracking_url: null, bookingError: null,
    bookingDetails: { request_token: 'tok-1', courier_id: 'millie', service_code: 'STD', checkoutReference: 'SD12345' },
  };

  it('does not create a label while Bachs still reports pending', async () => {
    const prisma: any = { delivery: { findFirst: jest.fn().mockResolvedValue(pendingDelivery), findUniqueOrThrow: jest.fn(), update: jest.fn(), updateMany: jest.fn() } };
    const bachs: any = { getCheckoutSessionById: jest.fn().mockResolvedValue({ data: { id: 'co_1', status: 'open' } }) };
    const shipbubble: any = { createShipment: jest.fn() };
    const svc = new DeliveryService(prisma, bachs, shipbubble, {} as any);
    const result: any = await svc.checkPaymentAndBook('del-1', 'u1');
    expect(result.paymentStatus).toBe('PENDING');
    expect(result.labelCreated).toBe(false);
    expect(shipbubble.createShipment).not.toHaveBeenCalled();
  });

  it('on verified PAID, claims once and calls Shipbubble createShipment (labels) with stored courier selection', async () => {
    let current: any = { ...pendingDelivery };
    const prisma: any = {
      delivery: {
        findFirst: jest.fn().mockImplementation(() => Promise.resolve(current)),
        findUnique: jest.fn().mockResolvedValue(current),
        findUniqueOrThrow: jest.fn().mockImplementation(() => Promise.resolve(current)),
        updateMany: jest.fn().mockImplementation(({ data }: any) => { current = { ...current, ...data }; return Promise.resolve({ count: 1 }); }),
        update: jest.fn().mockImplementation(({ data }: any) => { current = { ...current, ...data }; return Promise.resolve(current); }),
      },
    };
    const bachs: any = { getCheckoutSessionById: jest.fn().mockResolvedValue({ data: { id: 'co_1', status: 'succeeded' } }) };
    const shipbubble: any = {
      createShipment: jest.fn().mockResolvedValue({ status: 'success', data: { order_id: 'SB-ORDER-1', status: 'confirmed', tracking_url: 'https://track.example/SB-ORDER-1', courier: { name: 'Millie Express' }, payment: { shipping_fee: 1453.4, type: 'prepaid' } } }),
    };
    const svc = new DeliveryService(prisma, bachs, shipbubble, {} as any);
    const result: any = await svc.checkPaymentAndBook('del-1', 'u1');
    expect(shipbubble.createShipment).toHaveBeenCalledWith({ request_token: 'tok-1', courier_id: 'millie', service_code: 'STD', is_cod_label: false, duties_paid: false });
    expect(result).toMatchObject({ paymentStatus: 'PAID', bookingStatus: 'BOOKED', shipbubbleOrderId: 'SB-ORDER-1', labelCreated: true });

    // Second poll must not create a second label.
    const again: any = await svc.checkPaymentAndBook('del-1', 'u1');
    expect(again.alreadyBooked).toBe(true);
    expect(shipbubble.createShipment).toHaveBeenCalledTimes(1);
  });
});
