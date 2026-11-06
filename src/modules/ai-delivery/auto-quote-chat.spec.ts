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

const MESSAGE = 'Please deliver a laptop to FitzGerald Adan 08028520094 at 55, Herbert Macaulay Way, Yaba, Lagos, Nigeria, 2kg, worth 50000, pickup 2026-10-30';

function makeSvc(shipbubble: any, whatsapp: any) {
  let draft: any = null;
  const prisma: any = {
    user: {
      findUnique: jest.fn().mockResolvedValue({
        businessName: 'Biz', fullName: 'Owner', email: 'o@b.com',
        senderPhone: '0909', senderAddress: '1 Sender Street, Lagos', senderEmail: null,
        aiDeliveryDetectionEnabled: true,
      }),
    },
    aiMessage: {
      findUnique: jest.fn().mockResolvedValue({ id: 'm1', body: MESSAGE, processingState: 'RECEIVED', attempts: 0, conversation: { id: 'c1', userId: 'u1', customerWaId: '2348028520094' } }),
      findMany: jest.fn().mockResolvedValue([]),
      update: jest.fn().mockResolvedValue({}),
      create: jest.fn().mockImplementation(({ data }: any) => Promise.resolve({ id: 'out1', waMessageId: 'wamid.out1', ...data })),
    },
    aiConversation: { update: jest.fn().mockResolvedValue({}) },
    deliveryDraft: {
      // null for active-draft lookup; getDraft lookups return the in-memory draft.
      findFirst: jest.fn().mockImplementation((args: any) => Promise.resolve(args?.where?.id ? draft : null)),
      create: jest.fn().mockImplementation(({ data }: any) => { draft = { id: 'd1', quotes: [], conversationId: 'c1', conversation: { id: 'c1', customerWaId: '2348028520094' }, ...data }; return Promise.resolve(draft); }),
      findUniqueOrThrow: jest.fn().mockImplementation(() => Promise.resolve(draft)),
      update: jest.fn().mockImplementation(({ data }: any) => { draft = { ...draft, ...data, quotes: draft.quotes, conversation: draft.conversation }; return Promise.resolve(draft); }),
    },
    providerQuote: {
      deleteMany: jest.fn().mockResolvedValue({}),
      createMany: jest.fn().mockImplementation(({ data }: any) => {
        draft.quotes = data.map((q: any, i: number) => ({ id: `q${i + 1}`, ...q }));
        return Promise.resolve({ count: data.length });
      }),
      findMany: jest.fn().mockImplementation(() => Promise.resolve(draft.quotes)),
    },
    aiAuditEvent: { create: jest.fn().mockResolvedValue({}) },
  };
  const ai: any = {
    mode: 'demo',
    extract: jest.fn().mockResolvedValue({
      intent: 'DELIVERY_REQUEST', confidence: 0.8, aiMode: 'demo',
      fields: {
        receiverName: 'FitzGerald Adan', receiverPhone: '08028520094', receiverAddress: '55, Herbert Macaulay Way, Yaba, Lagos, Nigeria',
        packageName: 'laptop', packageWeight: '2', packageValue: '50000', pickupDate: '2026-10-30',
      },
    }),
  };
  return { svc: new AiDeliveryService(prisma, ai, whatsapp, shipbubble, {} as any, { get: () => undefined } as any), prisma };
}

// Fresh mocks per test: sender + receiver address validation consume the Once queue.
const makeRatesOk = () => ({
  createValidatedAddress: jest.fn()
    .mockResolvedValueOnce({ data: { address_code: 101 } })
    .mockResolvedValueOnce({ data: { address_code: 202 } }),
  getPackageCategories: jest.fn().mockResolvedValue({ data: [{ category_id: 5, name: 'Electronics' }] }),
  fetchShippingRates: jest.fn().mockResolvedValue({
    status: 'success',
    data: {
      request_token: 'tok-1',
      couriers: [
        { courier_id: 'millie', courier_name: 'Millie Express', service_code: 'STD', total: 1453.4, currency: 'NGN', delivery_eta: '2 days' },
        { courier_id: 'dhl', courier_name: 'DHL Express', service_code: 'EXP', total: 3900, currency: 'NGN', delivery_eta: '1 day' },
      ],
    },
  }),
});

describe('auto quote in chat (Thanks only on error)', () => {
  it('on successful generation sends numbered quotes in chat and does NOT send the Thanks message', async () => {
    const whatsapp: any = { sendMessage: jest.fn().mockResolvedValue({ messages: [{ id: 'wamid.quote1' }] }) };
    const { svc } = makeSvc(makeRatesOk(), whatsapp);
    await svc.processInboundMessage('m1');
    const texts = whatsapp.sendMessage.mock.calls.map((c: any[]) => c[0].text as string);
    expect(texts.some((x: string) => x.includes('Delivery quote options'))).toBe(true);
    expect(texts.some((x: string) => x.includes('1. *Millie Express*'))).toBe(true);
    expect(texts.some((x: string) => x.includes('Reply with the *number*'))).toBe(true);
    expect(texts.some((x: string) => x.includes('Thanks! Courier prices are ready'))).toBe(false);
  });

  it('on quote generation failure sends ONLY the Thanks fallback (no quote options)', async () => {
    const failing = { ...makeRatesOk(), fetchShippingRates: jest.fn().mockRejectedValue(new Error('Shipbubble unavailable')) };
    const whatsapp: any = { sendMessage: jest.fn().mockResolvedValue({ messages: [{ id: 'wamid.fallback' }] }) };
    const { svc } = makeSvc(failing, whatsapp);
    await svc.processInboundMessage('m1');
    const texts = whatsapp.sendMessage.mock.calls.map((c: any[]) => c[0].text as string);
    expect(texts).toEqual(['Thanks! Courier prices are ready — our team will share the options and confirm your preferred delivery shortly.']);
  });
});
