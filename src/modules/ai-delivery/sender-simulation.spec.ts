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
import { MetaModelClient } from '../ai-agent/meta-model.client';

const SAMPLE = 'Please deliver a laptop to Ada Lovelace 08012345678 at 12 Allen Avenue Ikeja Lagos, 2kg, worth 50000, pickup 2026-10-30';

describe('simulation with sender from profile (exact user sample)', () => {
  it('demo extractor parses receiver/package; profile sender seeds a quote-ready draft', async () => {
    const ai = new MetaModelClient({ get: () => undefined } as any);
    const extraction = await ai.extract({ message: SAMPLE, history: [], currentFields: {} });
    expect(extraction.fields).toMatchObject({
      receiverName: 'Ada Lovelace',
      receiverPhone: '08012345678',
      packageName: 'laptop',
      packageWeight: '2',
      packageValue: '50000',
      pickupDate: '2026-10-30',
    });

    let createdDraft: any;
    const prisma: any = {
      user: {
        findUnique: jest.fn().mockResolvedValue({
          businessName: 'Dispatchly Biz', fullName: 'Owner', email: 'owner@biz.com',
          senderPhone: '09099998888', senderAddress: '12 Allen Avenue, Ikeja, Lagos', senderEmail: null,
          selectedPhoneNumberId: ['pn-1'],
        }),
        update: jest.fn().mockResolvedValue({}),
      },
      aiConversation: { upsert: jest.fn().mockResolvedValue({ id: 'c1', userId: 'u1', customerWaId: '2348000000000' }), update: jest.fn().mockResolvedValue({}) },
      aiMessage: {
        create: jest.fn().mockResolvedValue({ id: 'm1' }),
        findUnique: jest.fn().mockResolvedValue({ id: 'm1', body: SAMPLE, processingState: 'RECEIVED', attempts: 0, conversation: { id: 'c1', userId: 'u1', customerWaId: '2348000000000' } }),
        findMany: jest.fn().mockResolvedValue([]),
        update: jest.fn().mockResolvedValue({}),
      },
      deliveryDraft: {
        findFirst: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockImplementation(({ data }: any) => { createdDraft = { id: 'd1', ...data }; return Promise.resolve(createdDraft); }),
        findUniqueOrThrow: jest.fn().mockImplementation(() => Promise.resolve(createdDraft)),
        update: jest.fn().mockResolvedValue({}),
      },
      aiAuditEvent: { create: jest.fn().mockResolvedValue({}) },
    };
    const whatsapp: any = { sendMessage: jest.fn().mockRejectedValue(new Error('no credits/window in test')) };
    const svc = new AiDeliveryService(prisma, ai, whatsapp, { createValidatedAddress: jest.fn().mockRejectedValue(new Error('shipbubble offline in test')) } as any, {} as any, { get: () => undefined } as any);

    const out: any = await svc.simulateInbound('u1', SAMPLE, undefined, { senderAddress: '12 Allen Avenue, Ikeja, Lagos', senderPhone: '09099998888' }, true);

    expect(prisma.user.update).toHaveBeenCalled(); // sender saved to profile
    expect(createdDraft).toMatchObject({
      senderName: 'Dispatchly Biz',
      senderPhone: '09099998888',
      senderAddress: '12 Allen Avenue, Ikeja, Lagos',
      receiverName: 'Ada Lovelace',
      receiverAddress: '12 Allen Avenue Ikeja Lagos',
      packageName: 'laptop',
      status: 'READY',
    });
    // Every required field present (sender from profile, rest from message) -> quote-ready.
    expect(createdDraft.missingFields).toEqual([]);
    expect(out.senderProfile.senderAddress).toBe('12 Allen Avenue, Ikeja, Lagos');
  });

  it('getSenderProfile falls back to business/full name and account email', async () => {
    const prisma: any = { user: { findUnique: jest.fn().mockResolvedValue({ businessName: null, fullName: 'Jane Owner', email: 'jane@biz.com', senderPhone: null, senderAddress: null, senderEmail: null }) } };
    const svc = new AiDeliveryService(prisma, { mode: 'demo' } as any, {} as any, {} as any, {} as any, { get: () => undefined } as any);
    await expect(svc.getSenderProfile('u1')).resolves.toEqual({ senderName: 'Jane Owner', senderPhone: null, senderAddress: null, senderEmail: 'jane@biz.com' });
  });
});
