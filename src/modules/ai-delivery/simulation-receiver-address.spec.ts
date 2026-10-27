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

describe('simulation Receiver Address field', () => {
  it('uses the separate field verbatim instead of the parsed message address', async () => {
    const parsedDraft = {
      id: 'd1',
      userId: 'u1',
      conversationId: 'c1',
      status: 'READY',
      senderName: 'Biz',
      senderPhone: '0909',
      senderAddress: '1 Sender Street, Lagos',
      senderEmail: null,
      receiverName: 'Ada Lovelace',
      receiverPhone: '08012345678',
      receiverAddress: '12 Allen Avenue Ikeja Lagos',
      packageName: 'laptop',
      packageWeight: '2',
      packageValue: '50000',
      pickupDate: '2026-10-30',
      missingFields: [],
      quotes: [],
    };
    let stored = { ...parsedDraft };
    const prisma: any = {
      user: {
        findUnique: jest.fn().mockResolvedValue({
          businessName: 'Biz', fullName: 'Owner', email: 'owner@biz.com',
          senderPhone: '0909', senderAddress: '1 Sender Street, Lagos', senderEmail: null,
          selectedPhoneNumberId: ['pn-1'],
        }),
        update: jest.fn().mockResolvedValue({}),
      },
      aiConversation: {
        upsert: jest.fn().mockResolvedValue({ id: 'c1', userId: 'u1' }),
        update: jest.fn().mockResolvedValue({}),
      },
      aiMessage: { create: jest.fn().mockResolvedValue({ id: 'm1' }), update: jest.fn() },
      deliveryDraft: {
        findFirst: jest.fn().mockImplementation(() => Promise.resolve({ ...stored })),
        update: jest.fn().mockImplementation(({ data }: any) => {
          stored = { ...stored, ...data };
          return Promise.resolve(stored);
        }),
      },
      aiAuditEvent: { create: jest.fn().mockResolvedValue({}) },
    };
    const svc = new AiDeliveryService(
      prisma,
      { mode: 'demo', extract: jest.fn() } as any,
      {} as any,
      {} as any,
      {} as any,
      { get: () => undefined } as any,
    );
    jest.spyOn(svc, 'processInboundMessage').mockResolvedValue(undefined);

    const result: any = await svc.simulateInbound(
      'u1',
      'Please deliver a laptop to Ada Lovelace 08012345678 at 12 Allen Avenue Ikeja Lagos, 2kg, worth 50000, pickup 2026-10-30',
      undefined,
      undefined,
      true,
      true,
      '24B Close, Green Estate, Amuwo Odofin, Lagos',
    );

    expect(prisma.deliveryDraft.update).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: 'd1' },
      data: expect.objectContaining({
        receiverAddress: '24B Close, Green Estate, Amuwo Odofin, Lagos',
        missingFields: [],
        status: 'READY',
      }),
    }));
    expect(result.draft.receiverAddress).toBe('24B Close, Green Estate, Amuwo Odofin, Lagos');
  });
});
