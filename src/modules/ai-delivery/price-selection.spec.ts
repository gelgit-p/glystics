jest.mock('@nestjs/config', () => ({ ConfigService: class {} }));
jest.mock('prisma/generated', () => ({
  Prisma: { PrismaClientKnownRequestError: class extends Error { code = 'P2002'; } },
  PrismaClient: class {},
}));
jest.mock('prisma/prisma.service', () => ({ PrismaService: class {} }));
jest.mock('../whatsapp/whatsapp.service', () => ({ WhatsappService: class {} }));
jest.mock('../shipbubble/shipbubble.service', () => ({ ShipbubbleService: class {} }));
jest.mock('../delivery/delivery.service', () => ({ DeliveryService: class {} }));

import { AiDeliveryService } from './ai-delivery.service';
import { numericString } from '../ai-agent/extraction';
import { normalizeShipbubbleRates } from './quote-ranking';

describe('price display -> selection -> paid-first booking (curl1/curl2)', () => {
  it('numericString accepts the curl example formats Shipbubble requires', () => {
    expect(numericString('0.5kg', 'w')).toBe('0.5');
    expect(numericString('99.99', 'w')).toBe('99.99');
    expect(numericString('50,000', 'w')).toBe('50000');
    expect(() => numericString('heavy', 'w')).toThrow();
  });

  it('fetchQuotes calls curl1 (fetch_rates) with numeric strings and stores ranked prices for display', async () => {
    const draft = {
      id: 'd1', userId: 'u1', status: 'READY', missingFields: [], quotes: [], approvals: [],
      senderName: null, senderPhone: null, senderAddress: '1 Lagos St', senderEmail: null,
      receiverName: 'Ada', receiverPhone: '0801', receiverAddress: '2 Abuja Rd', receiverEmail: null,
      packageName: 'Wireless Headphones', packageDescription: null, packageCategory: 'Electronics', packageCategoryId: 5,
      packageWeight: '0.5kg', packageValue: '99.99', packageQuantity: 2, length: 10, width: 8, height: 6,
      pickupDate: '2026-10-15', deliveryType: 'STANDARD', deliveryInstructions: 'Leave at the front door.',
    };
    const shipbubble: any = {
      createValidatedAddress: jest.fn()
        .mockResolvedValueOnce({ data: { address_code: 101 } })
        .mockResolvedValueOnce({ data: { address_code: 202 } }),
      fetchShippingRates: jest.fn().mockResolvedValue({ status: 'success', data: { request_token: 'req_tx_987654321', couriers: [
        { courier_id: 'dhl_express', courier_name: 'DHL', service_code: 'EXPRESS_SAVER', total: 7500, currency: 'NGN', delivery_eta: '1 day' },
        { courier_id: 'gig', courier_name: 'GIG', service_code: 'STD', total: 4000, currency: 'NGN', delivery_eta: '3 days' },
      ] } }),
      createShipment: jest.fn(),
    };
    const prisma: any = {
      deliveryDraft: { findFirst: jest.fn().mockResolvedValue(draft), update: jest.fn().mockResolvedValue({ ...draft, status: 'QUOTED' }) },
      providerQuote: { deleteMany: jest.fn(), createMany: jest.fn(), findMany: jest.fn().mockResolvedValue([{ id: 'q-cheap' }, { id: 'q-fast' }]) },
      user: { findUnique: jest.fn().mockResolvedValue({ businessName: 'Biz' }) },
      aiAuditEvent: { create: jest.fn().mockResolvedValue({}) },
    };
    const svc = new AiDeliveryService(prisma, { mode: 'demo' } as any, {} as any, shipbubble, {} as any, { get: () => undefined } as any);
    const out: any = await svc.fetchQuotes('u1', 'd1');
    expect(shipbubble.fetchShippingRates).toHaveBeenCalledWith(expect.objectContaining({
      sender_address_code: 101, reciever_address_code: 202, category_id: 5, pickup_date: '2026-10-15',
      package_items: [expect.objectContaining({ unit_weight: '0.5', unit_amount: '99.99', quantity: 2 })],
    }));
    expect(out.quotes).toHaveLength(2);
    expect(shipbubble.createShipment).not.toHaveBeenCalled();
  });

  it('approving a selected price does NOT call curl2 (/shipping/labels); it only creates delivery + checkout', async () => {
    const draft = {
      id: 'd1', userId: 'u1', status: 'QUOTED', deliveryId: null, missingFields: [],
      senderName: null, senderPhone: null, senderAddress: 'A', receiverName: 'R', receiverPhone: '1', receiverAddress: 'B',
      packageName: 'Box', packageCategory: null, packageWeight: '1', packageValue: '100', pickupDate: '2026-10-30',
      deliveryType: null, deliveryInstructions: null, length: null, width: null, height: null,
      quotes: [{ id: 'q1', amount: 4000, currency: 'NGN', requestToken: 'req_tx_987654321', courierId: 'dhl_express', serviceCode: 'EXPRESS_SAVER' }],
      approvals: [],
    };
    const shipbubble: any = { createShipment: jest.fn() };
    const deliveryService: any = {
      create: jest.fn().mockResolvedValue({ id: 'del-1', trackingId: 'SD1' }),
      createCheckoutSession: jest.fn().mockResolvedValue({ checkout_url: 'https://pay.example/x' }),
    };
    const prisma: any = {
      deliveryDraft: { findFirst: jest.fn().mockResolvedValue(draft), update: jest.fn().mockResolvedValue(draft) },
      approval: { findUnique: jest.fn().mockResolvedValue(null), create: jest.fn().mockResolvedValue({ id: 'a1' }) },
      user: { findUnique: jest.fn().mockResolvedValue({ businessName: 'Biz' }) },
      aiAuditEvent: { create: jest.fn().mockResolvedValue({}) },
    };
    const svc = new AiDeliveryService(prisma, { mode: 'demo' } as any, {} as any, shipbubble, deliveryService, { get: () => undefined } as any);
    await svc.approve('u1', 'd1', { quoteId: 'q1' });
    // Selection carries the curl1 identifiers into checkout; curl2 happens later in completePaidCheckout.
    expect(deliveryService.createCheckoutSession).toHaveBeenCalledWith('del-1', 'u1', {
      amount: '4000', currency: 'NGN', request_token: 'req_tx_987654321', courier_id: 'dhl_express', service_code: 'EXPRESS_SAVER',
    });
    expect(shipbubble.createShipment).not.toHaveBeenCalled();
  });

  it('normalizeShipbubbleRates exposes display prices sorted for selection', () => {
    const { quotes } = normalizeShipbubbleRates({ data: { request_token: 't', couriers: [
      { courier_id: 'a', courier_name: 'A', service_code: 'S', total: 9000, currency: 'NGN', delivery_eta: '1 day' },
      { courier_id: 'b', courier_name: 'B', service_code: 'S', total: 3000, currency: 'NGN', delivery_eta: '1 day' },
    ] } });
    expect(quotes.map((q) => q.courierName)).toEqual(['B', 'A']);
  });
});
