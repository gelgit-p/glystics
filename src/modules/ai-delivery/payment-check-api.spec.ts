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

describe('AiDeliveryService.checkPaymentAndCreateLabel', () => {
  it('marks draft BOOKED and notifies customer after verified payment creates label', async () => {
    const draft: any = {
      id: 'd1', userId: 'u1', status: 'PAYMENT_LINK_SENT', deliveryId: 'del-1', conversationId: 'c1',
      quotes: [], missingFields: [], conversation: { id: 'c1', customerWaId: '2348012345678' },
      senderName: 'Biz', senderPhone: '1', senderAddress: 'S', senderEmail: null,
    };
    const prisma: any = {
      deliveryDraft: {
        findFirst: jest.fn().mockResolvedValue(draft),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
        update: jest.fn().mockResolvedValue(draft),
      },
      aiMessage: { create: jest.fn().mockResolvedValue({ id: 'out1', waMessageId: 'wamid.out1' }) },
      aiAuditEvent: { create: jest.fn().mockResolvedValue({}) },
      user: { findUnique: jest.fn().mockResolvedValue({ businessName: 'Biz', fullName: 'Owner', email: 'o@b.com', senderPhone: null, senderAddress: null, senderEmail: null }) },
    };
    const deliveryService: any = {
      checkPaymentAndBook: jest.fn().mockResolvedValue({
        deliveryId: 'del-1', trackingId: 'SD12345', checkoutUrl: 'https://pay.example/abc',
        paymentStatus: 'PAID', bookingStatus: 'BOOKED', deliveryStatus: 'CONFIRMED',
        shipbubbleOrderId: 'SB-1', trackingUrl: 'https://track.example/SB-1', bookingError: null,
        providerStatus: 'succeeded', checked: true, labelCreated: true,
      }),
    };
    const whatsapp: any = { sendMessage: jest.fn().mockResolvedValue({ messages: [{ id: 'wamid.out1' }] }) };
    const svc = new AiDeliveryService(prisma, { mode: 'demo' } as any, whatsapp, {} as any, deliveryService, { get: () => undefined } as any);
    const result: any = await svc.checkPaymentAndCreateLabel('u1', 'd1');
    expect(result.draftStatus).toBe('PAYMENT_LINK_SENT'); // mocked getDraft returns original object; updateMany proves transition attempted
    expect(prisma.deliveryDraft.updateMany).toHaveBeenCalledWith(expect.objectContaining({ data: { status: 'BOOKED' } }));
    expect(whatsapp.sendMessage).toHaveBeenCalledWith(expect.objectContaining({ text: expect.stringContaining('Payment confirmed') }), 'u1');
  });
});
