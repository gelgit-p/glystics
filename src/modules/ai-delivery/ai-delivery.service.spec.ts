jest.mock('@nestjs/config', () => ({ ConfigService: class {} }));
jest.mock('prisma/generated', () => ({
  Prisma: {
    PrismaClientKnownRequestError: class extends Error {
      code = 'P2002';
    },
  },
  PrismaClient: class {},
}));
jest.mock('prisma/prisma.service', () => ({ PrismaService: class {} }));
jest.mock('../whatsapp/whatsapp.service', () => ({
  WhatsappService: class {},
}));
jest.mock('../shipbubble/shipbubble.service', () => ({
  ShipbubbleService: class {},
}));
jest.mock('../delivery/delivery.service', () => ({
  DeliveryService: class {},
}));
import { AiDeliveryService } from './ai-delivery.service';

describe('AiDeliveryService approval idempotency', () => {
  it('does not create a second delivery/charge when approval is replayed', async () => {
    const draft = {
      id: 'd1',
      userId: 'u1',
      status: 'QUOTED',
      deliveryId: null,
      missingFields: [],
      senderAddress: 'A',
      receiverName: 'R',
      receiverPhone: '1',
      receiverAddress: 'B',
      packageName: 'Box',
      packageWeight: '1',
      packageValue: '100',
      pickupDate: '2026-10-30',
      quotes: [
        {
          id: 'q1',
          amount: 3000,
          currency: 'NGN',
          requestToken: 'tok',
          courierId: 'c1',
          serviceCode: 'STD',
        },
      ],
    };
    const prisma: any = {
      deliveryDraft: {
        findFirst: jest.fn().mockResolvedValue(draft),
        update: jest.fn(),
      },
      approval: {
        findUnique: jest
          .fn()
          .mockResolvedValue({ id: 'a1', deliveryId: 'del-1' }),
        create: jest.fn(),
      },
      user: {
        findUnique: jest.fn().mockResolvedValue({ businessName: 'Biz' }),
      },
      aiAuditEvent: { create: jest.fn().mockResolvedValue({}) },
    };
    const deliveryService: any = {
      create: jest.fn(),
      createCheckoutSession: jest.fn(),
    };
    const svc = new AiDeliveryService(
      prisma,
      { mode: 'demo' } as any,
      {} as any,
      {} as any,
      deliveryService,
      { get: () => undefined } as any,
    );
    const out: any = await svc.approve('u1', 'd1', { quoteId: 'q1' });
    expect(out.alreadyProcessed).toBe(true);
    expect(deliveryService.create).not.toHaveBeenCalled();
  });

  it('routes approval through DeliveryService.create + createCheckoutSession (existing credit/checkout/booking rules)', async () => {
    const draft = {
      id: 'd1',
      userId: 'u1',
      status: 'QUOTED',
      deliveryId: null,
      missingFields: [],
      senderName: null,
      senderPhone: null,
      senderAddress: 'A',
      receiverName: 'R',
      receiverPhone: '1',
      receiverAddress: 'B',
      packageName: 'Box',
      packageCategory: null,
      packageWeight: '1',
      packageValue: '100',
      pickupDate: '2026-10-30',
      deliveryType: null,
      deliveryInstructions: null,
      length: null,
      width: null,
      height: null,
      quotes: [
        {
          id: 'q1',
          amount: 3000,
          currency: 'NGN',
          requestToken: 'tok',
          courierId: 'c1',
          serviceCode: 'STD',
        },
      ],
    };
    const prisma: any = {
      deliveryDraft: {
        findFirst: jest.fn().mockResolvedValue(draft),
        update: jest.fn().mockResolvedValue(draft),
      },
      approval: {
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({ id: 'a1' }),
      },
      user: {
        findUnique: jest
          .fn()
          .mockResolvedValue({ businessName: 'Biz', fullName: 'Owner' }),
      },
      aiAuditEvent: { create: jest.fn().mockResolvedValue({}) },
    };
    const deliveryService: any = {
      create: jest
        .fn()
        .mockResolvedValue({ id: 'del-1', trackingId: 'SD12345' }),
      createCheckoutSession: jest
        .fn()
        .mockResolvedValue({ checkout_url: 'https://pay.example/x' }),
    };
    const svc = new AiDeliveryService(
      prisma,
      { mode: 'demo' } as any,
      {} as any,
      {} as any,
      deliveryService,
      { get: () => undefined } as any,
    );
    const out: any = await svc.approve('u1', 'd1', { quoteId: 'q1' });
    expect(deliveryService.create).toHaveBeenCalledTimes(1);
    expect(deliveryService.createCheckoutSession).toHaveBeenCalledWith(
      'del-1',
      'u1',
      expect.objectContaining({ request_token: 'tok', courier_id: 'c1' }),
    );
    expect(out.deliveryId).toBe('del-1');
  });

  it('deduplicates inbound WhatsApp messages by waMessageId (P2002 -> null)', async () => {
    const { Prisma } = jest.requireMock('prisma/generated');
    const prisma: any = {
      aiMessage: {
        create: jest
          .fn()
          .mockRejectedValue(new Prisma.PrismaClientKnownRequestError()),
      },
    };
    const svc = new AiDeliveryService(
      prisma,
      { mode: 'demo' } as any,
      {} as any,
      {} as any,
      {} as any,
      { get: () => undefined } as any,
    );
    await expect(
      svc.recordInbound('c1', 'wamid.1', 'hi', {}),
    ).resolves.toBeNull();
  });
});
