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

const quotes = [
  { id: 'q1', courierName: 'Millie Express', serviceCode: 'STD', amount: 1453.4, currency: 'NGN', deliveryEta: '2 days', scoreReasons: ['Cheapest'], requestToken: 'tok', courierId: 'millie' },
];

describe('payment link sent to customer in WhatsApp chat', () => {
  it('customer replying "1" creates checkout and texts the payment link (no owner redirect)', async () => {
    const awaiting: any = { id: 'd1', userId: 'u1', conversationId: 'c1', status: 'AWAITING_CUSTOMER_SELECTION', quotes };
    const selected: any = {
      ...awaiting, status: 'CUSTOMER_SELECTED', customerSelectedQuoteId: 'q1', customerSelectionAt: new Date(),
      packageName: 'laptop', receiverName: 'Ada', receiverPhone: '080', receiverAddress: 'Addr', senderName: 'Biz', senderPhone: '1', senderAddress: 'S', senderEmail: null,
      packageWeight: '2', packageValue: '50000', pickupDate: '2026-10-30', missingFields: [], deliveryId: null,
      conversation: { id: 'c1', customerWaId: '2348012345678' },
    };
    const prisma: any = {
      deliveryDraft: {
        findFirst: jest.fn()
          .mockResolvedValueOnce(awaiting) // tryHandle lookup
          .mockResolvedValue(selected), // getDraft inside sendPaymentLink/approve
        findUniqueOrThrow: jest.fn().mockResolvedValue(selected),
        update: jest.fn().mockImplementation(({ data }: any) => Promise.resolve({ ...selected, ...data })),
      },
      delivery: { findFirst: jest.fn().mockResolvedValue(null), create: jest.fn(), update: jest.fn() },
      approval: { findUnique: jest.fn().mockResolvedValue(null), create: jest.fn().mockResolvedValue({ id: 'a1', selectedQuoteId: 'q1' }) },
      aiMessage: { create: jest.fn().mockResolvedValue({ id: 'out1', waMessageId: 'wamid.out1' }) },
      aiAuditEvent: { create: jest.fn().mockResolvedValue({}) },
      user: { findUnique: jest.fn().mockResolvedValue({ businessName: 'Biz', fullName: 'Owner', email: 'o@b.com', senderPhone: null, senderAddress: null, senderEmail: null }) },
    };
    const whatsapp: any = { sendMessage: jest.fn().mockResolvedValue({ messages: [{ id: 'wamid.out1' }] }) };
    const deliveryService: any = {
      create: jest.fn().mockResolvedValue({ id: 'del-1', trackingId: 'SD12345' }),
      createCheckoutSession: jest.fn().mockResolvedValue({ checkout_url: 'https://pay.example/checkout/abc', checkout_id: 'co_1' }),
    };
    const svc = new AiDeliveryService(prisma, { mode: 'demo', extract: jest.fn() } as any, whatsapp, {} as any, deliveryService, { get: () => undefined } as any);

    const handled = await (svc as any).tryHandleCustomerQuoteSelection({ id: 'c1', userId: 'u1', customerWaId: '2348012345678' }, '1');
    expect(handled).toEqual({ handled: true });
    expect(deliveryService.createCheckoutSession).toHaveBeenCalled();
    const sentTexts = whatsapp.sendMessage.mock.calls.map((c: any[]) => c[0].text as string);
    expect(sentTexts.some((x: string) => x.includes('You selected option 1: Millie Express'))).toBe(true);
    expect(sentTexts.some((x: string) => x.includes('https://pay.example/checkout/abc'))).toBe(true);
    expect(sentTexts.some((x: string) => x.includes('Tracking ID: SD12345'))).toBe(true);
  });

  it('resends existing pending checkout URL without creating a duplicate delivery', async () => {
    const draft: any = {
      id: 'd1', userId: 'u1', status: 'PAYMENT_LINK_SENT', conversationId: 'c1', customerSelectedQuoteId: 'q1', deliveryId: 'del-1',
      quotes, missingFields: [], conversation: { id: 'c1', customerWaId: '2348012345678' },
      senderName: 'Biz', senderPhone: '1', senderAddress: 'S', senderEmail: null,
    };
    const prisma: any = {
      deliveryDraft: {
        findFirst: jest.fn().mockResolvedValue(draft),
        update: jest.fn().mockResolvedValue(draft),
      },
      delivery: { findFirst: jest.fn().mockResolvedValue({ id: 'del-1', checkoutUrl: 'https://pay.example/checkout/abc', paymentStatus: 'PENDING', trackingId: 'SD12345', paymentCurrency: 'NGN', paymentAmount: '1453.4', courier_name: 'Millie Express' }) },
      aiMessage: { create: jest.fn().mockResolvedValue({ id: 'out2', waMessageId: 'wamid.out2' }) },
      aiAuditEvent: { create: jest.fn().mockResolvedValue({}) },
      user: { findUnique: jest.fn().mockResolvedValue({ businessName: 'Biz', fullName: 'Owner', email: 'o@b.com', senderPhone: null, senderAddress: null, senderEmail: null }) },
    };
    const whatsapp: any = { sendMessage: jest.fn().mockResolvedValue({ messages: [{ id: 'wamid.out2' }] }) };
    const deliveryService: any = { create: jest.fn(), createCheckoutSession: jest.fn() };
    const svc = new AiDeliveryService(prisma, { mode: 'demo' } as any, whatsapp, {} as any, deliveryService, { get: () => undefined } as any);
    const result: any = await svc.sendPaymentLinkToCustomer('u1', 'd1');
    expect(result.reusedCheckout).toBe(true);
    expect(deliveryService.create).not.toHaveBeenCalled();
    expect(whatsapp.sendMessage).toHaveBeenCalledWith(expect.objectContaining({ text: expect.stringContaining('https://pay.example/checkout/abc') }), 'u1');
  });
});
