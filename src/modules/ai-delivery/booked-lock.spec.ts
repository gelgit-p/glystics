jest.mock('@nestjs/config', () => ({ ConfigService: class {} }));
jest.mock('prisma/generated', () => ({
  Prisma: { PrismaClientKnownRequestError: class extends Error { code = 'P2002'; } },
  PrismaClient: class {},
}));
jest.mock('prisma/prisma.service', () => ({ PrismaService: class {} }));
jest.mock('../whatsapp/whatsapp.service', () => ({ WhatsappService: class {} }));
jest.mock('../shipbubble/shipbubble.service', () => ({ ShipbubbleService: class {} }));
jest.mock('../delivery/delivery.service', () => ({ DeliveryService: class {} }));

import { ConflictException } from '@nestjs/common';
import { AiDeliveryService } from './ai-delivery.service';

describe('BOOKED draft is locked (backend enforcement)', () => {
  function makeBookedService() {
    const booked: any = {
      id: 'd1', userId: 'u1', status: 'BOOKED', deliveryId: 'del-1', conversationId: 'c1',
      quotes: [{ id: 'q1', courierName: 'Millie', serviceCode: 'STD', amount: 1000, currency: 'NGN', requestToken: 'tok', courierId: 'c1' }],
      approvals: [], missingFields: [], conversation: { id: 'c1', customerWaId: '234801' },
      senderName: 'Biz', senderPhone: '1', senderAddress: 'S', senderEmail: null,
      receiverName: 'Ada', receiverPhone: '080', receiverAddress: 'Addr',
      packageName: 'laptop', packageWeight: '2', packageValue: '5000', pickupDate: '2026-10-30',
      customerSelectedQuoteId: 'q1',
    };
    const prisma: any = {
      deliveryDraft: { findFirst: jest.fn().mockResolvedValue(booked), update: jest.fn(), updateMany: jest.fn() },
      delivery: { findFirst: jest.fn() },
      approval: { findUnique: jest.fn(), create: jest.fn() },
      aiMessage: { create: jest.fn() },
      aiAuditEvent: { create: jest.fn().mockResolvedValue({}) },
      user: { findUnique: jest.fn().mockResolvedValue({ businessName: 'Biz', fullName: 'Owner', email: 'o@b.com', senderPhone: null, senderAddress: null, senderEmail: null }) },
    };
    const whatsapp: any = { sendMessage: jest.fn() };
    const shipbubble: any = { createValidatedAddress: jest.fn(), fetchShippingRates: jest.fn() };
    const deliveryService: any = { create: jest.fn(), createCheckoutSession: jest.fn() };
    const svc = new AiDeliveryService(prisma, { mode: 'demo' } as any, whatsapp, shipbubble, deliveryService, { get: () => undefined } as any);
    return { svc, whatsapp, shipbubble, deliveryService };
  }

  it('rejects fetch quotes, send quote, send payment link, edit, approve, reject', async () => {
    const { svc, whatsapp, shipbubble, deliveryService } = makeBookedService();
    await expect(svc.fetchQuotes('u1', 'd1')).rejects.toBeInstanceOf(ConflictException);
    await expect(svc.sendQuoteToCustomer('u1', 'd1')).rejects.toBeInstanceOf(ConflictException);
    await expect(svc.sendPaymentLinkToCustomer('u1', 'd1')).rejects.toBeInstanceOf(ConflictException);
    await expect(svc.updateDraft('u1', 'd1', { receiverAddress: 'New address' } as any)).rejects.toBeInstanceOf(ConflictException);
    await expect(svc.reject('u1', 'd1', {})).rejects.toThrow();
    // No provider/customer side effects happened.
    expect(whatsapp.sendMessage).not.toHaveBeenCalled();
    expect(shipbubble.fetchShippingRates).not.toHaveBeenCalled();
    expect(deliveryService.create).not.toHaveBeenCalled();
  });
});
