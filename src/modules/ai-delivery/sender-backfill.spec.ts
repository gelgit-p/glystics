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
import { cleanReceiverAddress } from '../ai-agent/extraction';

describe('sender backfill (screenshot regression)', () => {
  it('cleans legacy dirty receiverAddress', () => {
    expect(cleanReceiverAddress('Ada Lovelace 08028520094 at 12 Allen Avenue Ikeja Lagos', 'Ada Lovelace', '08028520094'))
      .toBe('12 Allen Avenue Ikeja Lagos');
    expect(cleanReceiverAddress('12 Allen Avenue Ikeja Lagos', 'Ada', '080')).toBe('12 Allen Avenue Ikeja Lagos');
  });

  it('getDraft backfills senderAddress/senderPhone from profile, cleans address, flips COLLECTING -> READY', async () => {
    const staleDraft = {
      id: 'd1', userId: 'u1', status: 'COLLECTING',
      senderName: null, senderPhone: null, senderAddress: null, senderEmail: null,
      receiverName: 'Ada Lovelace', receiverPhone: '08028520094',
      receiverAddress: 'Ada Lovelace 08028520094 at 12 Allen Avenue Ikeja Lagos',
      packageName: 'laptop', packageWeight: '2', packageValue: '50000', pickupDate: '2026-10-30',
      missingFields: ['senderAddress'],
      quotes: [], approvals: [], conversation: null,
    };
    const prisma: any = {
      deliveryDraft: {
        findFirst: jest.fn().mockResolvedValue(staleDraft),
        update: jest.fn().mockImplementation(({ data }: any) => Promise.resolve({ ...staleDraft, ...data })),
      },
      user: {
        findUnique: jest.fn().mockResolvedValue({
          businessName: 'Dispatchly Biz', fullName: 'Owner', email: 'owner@biz.com',
          senderPhone: '09099998888', senderAddress: '12 Allen Avenue, Ikeja, Lagos', senderEmail: null,
        }),
      },
      aiAuditEvent: { create: jest.fn().mockResolvedValue({}) },
    };
    const svc = new AiDeliveryService(prisma, { mode: 'demo' } as any, {} as any, {} as any, {} as any, { get: () => undefined } as any);
    const out: any = await svc.getDraft('u1', 'd1');
    expect(prisma.deliveryDraft.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        senderAddress: '12 Allen Avenue, Ikeja, Lagos',
        senderPhone: '09099998888',
        receiverAddress: '12 Allen Avenue Ikeja Lagos',
        missingFields: [],
        status: 'READY',
      }),
    }));
    expect(out.missingFields).toEqual([]);
    expect(out.status).toBe('READY');
  });

  it('does not touch terminal drafts', async () => {
    const booked = { id: 'd2', userId: 'u1', status: 'APPROVED', senderName: null, senderPhone: null, senderAddress: null, senderEmail: null, receiverName: 'A', receiverPhone: '1', receiverAddress: '12 Allen Avenue', missingFields: [], quotes: [], approvals: [], conversation: null };
    const prisma: any = {
      deliveryDraft: { findFirst: jest.fn().mockResolvedValue(booked), update: jest.fn() },
      user: { findUnique: jest.fn() },
      aiAuditEvent: { create: jest.fn() },
    };
    const svc = new AiDeliveryService(prisma, { mode: 'demo' } as any, {} as any, {} as any, {} as any, { get: () => undefined } as any);
    await svc.getDraft('u1', 'd2');
    expect(prisma.deliveryDraft.update).not.toHaveBeenCalled();
  });
});
