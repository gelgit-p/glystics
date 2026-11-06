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
import { buildWhatsAppQuoteMessage, parseQuoteSelection } from './quote-message';

const quotes = [
  { id: 'q1', courierName: 'GIG Logistics', serviceCode: 'STD', amount: 4500, currency: 'NGN', deliveryEta: '2 days', scoreReasons: ['Cheapest'] },
  { id: 'q2', courierName: 'DHL Express', serviceCode: 'EXP', amount: 9200, currency: 'NGN', deliveryEta: '1 day', scoreReasons: ['Fastest delivery'] },
];

describe('WhatsApp quote message + customer numeric selection', () => {
  it('builds user-facing numbered delivery quote message', () => {
    const msg = buildWhatsAppQuoteMessage({ packageName: 'laptop', receiverName: 'Ada Lovelace', receiverAddress: '12 Allen Avenue', pickupDate: '2026-10-30' }, quotes as any);
    expect(msg).toContain('Delivery quote options');
    expect(msg).toContain('1. *GIG Logistics* — NGN 4,500');
    expect(msg).toContain('2. *DHL Express* — NGN 9,200');
    expect(msg).toContain('Reply with the *number*');
  });

  it.each([['1', 1], ['option 2', 2], ['I choose 1', 1], ['#2', 2], [' 2. ', 2]])('parses selection %s', (text, expected) => {
    expect(parseQuoteSelection(text, 2)).toBe(expected);
  });
  it.each(['0', '3', 'yes', 'laptop', '08012345678'])('rejects non-selection %s', (text) => {
    expect(parseQuoteSelection(text, 2)).toBeNull();
  });

  it('sendQuoteToCustomer sends and moves draft to AWAITING_CUSTOMER_SELECTION', async () => {
    const draft: any = {
      id: 'd1', userId: 'u1', status: 'QUOTED', conversationId: 'c1',
      packageName: 'laptop', receiverName: 'Ada', receiverAddress: '12 Allen Avenue', pickupDate: '2026-10-30',
      senderName: 'Biz', senderPhone: '1', senderAddress: 'Sender', senderEmail: null,
      missingFields: [], quotes,
      conversation: { id: 'c1', customerWaId: '2348012345678' },
    };
    const prisma: any = {
      deliveryDraft: {
        findFirst: jest.fn().mockResolvedValue(draft),
        update: jest.fn().mockImplementation(({ data }: any) => Promise.resolve({ ...draft, ...data })),
      },
      aiMessage: { create: jest.fn().mockResolvedValue({ id: 'out1', waMessageId: 'wamid.out1' }) },
      aiAuditEvent: { create: jest.fn().mockResolvedValue({}) },
      user: { findUnique: jest.fn().mockResolvedValue({ businessName: 'Biz', fullName: 'Owner', email: 'o@b.com', senderPhone: null, senderAddress: null, senderEmail: null }) },
    };
    const whatsapp: any = { sendMessage: jest.fn().mockResolvedValue({ messages: [{ id: 'wamid.out1' }] }) };
    const svc = new AiDeliveryService(prisma, { mode: 'demo' } as any, whatsapp, {} as any, {} as any, { get: () => undefined } as any);
    const result: any = await svc.sendQuoteToCustomer('u1', 'd1');
    expect(whatsapp.sendMessage).toHaveBeenCalledWith(expect.objectContaining({ to: '2348012345678', text: expect.stringContaining('Reply with the *number*') }), 'u1');
    expect(result.draft.status).toBe('AWAITING_CUSTOMER_SELECTION');
  });

  it('inbound bare number selects quote and confirms to customer', async () => {
    const awaiting: any = {
      id: 'd1', userId: 'u1', conversationId: 'c1', status: 'AWAITING_CUSTOMER_SELECTION', quotes,
    };
    const prisma: any = {
      deliveryDraft: {
        findFirst: jest.fn().mockResolvedValue(awaiting),
        update: jest.fn().mockResolvedValue({}),
      },
      aiMessage: { create: jest.fn().mockResolvedValue({ id: 'out2', waMessageId: 'wamid.out2' }) },
      aiAuditEvent: { create: jest.fn().mockResolvedValue({}) },
    };
    const whatsapp: any = { sendMessage: jest.fn().mockResolvedValue({ messages: [{ id: 'wamid.out2' }] }) };
    const svc = new AiDeliveryService(prisma, { mode: 'demo', extract: jest.fn() } as any, whatsapp, {} as any, {} as any, { get: () => undefined } as any);
    const handled = await (svc as any).tryHandleCustomerQuoteSelection({ id: 'c1', userId: 'u1', customerWaId: '2348012345678' }, '2');
    expect(handled).toEqual({ handled: true });
    expect(prisma.deliveryDraft.update).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ status: 'CUSTOMER_SELECTED', customerSelectedQuoteId: 'q2' }) }));
    expect(whatsapp.sendMessage).toHaveBeenCalledWith(expect.objectContaining({ text: expect.stringContaining('You selected option 2: DHL Express') }), 'u1');
  });
});
