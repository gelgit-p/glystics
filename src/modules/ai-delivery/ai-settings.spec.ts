jest.mock('@nestjs/config', () => ({ ConfigService: class {} }));
jest.mock('prisma/generated', () => ({
  Prisma: { PrismaClientKnownRequestError: class extends Error { code = 'P2002'; } },
  PrismaClient: class {},
}));
jest.mock('prisma/prisma.service', () => ({ PrismaService: class {} }));
jest.mock('../whatsapp/whatsapp.service', () => ({ WhatsappService: class {} }));
jest.mock('../shipbubble/shipbubble.service', () => ({ ShipbubbleService: class {} }));
jest.mock('../delivery/delivery.service', () => ({ DeliveryService: class {} }));

import { ForbiddenException } from '@nestjs/common';
import { AiDeliveryService } from './ai-delivery.service';
import { SuperAdminGuard } from '../../common/super-admin.guard';

const config = (env: Record<string, string> = {}) => ({ get: (k: string) => env[k] } as any);
const svc = (prisma: any, env: Record<string, string> = {}) =>
  new AiDeliveryService(prisma, { mode: 'demo', extract: jest.fn() } as any, {} as any, {} as any, {} as any, config(env));

describe('AI delivery detection toggle', () => {
  it('tenant switch off -> detection disabled', async () => {
    const prisma: any = { user: { findUnique: jest.fn().mockResolvedValue({ aiDeliveryDetectionEnabled: false }) } };
    expect(await svc(prisma).isDetectionEnabled('u1')).toBe(false);
  });
  it('global kill-switch overrides tenant switch on', async () => {
    const prisma: any = { user: { findUnique: jest.fn().mockResolvedValue({ aiDeliveryDetectionEnabled: true }) } };
    expect(await svc(prisma, { AI_DELIVERY_DETECTION_DISABLED: 'true' }).isDetectionEnabled('u1')).toBe(false);
  });
  it('processInboundMessage skips extraction when disabled but marks message processed', async () => {
    const ai: any = { mode: 'demo', extract: jest.fn() };
    const prisma: any = {
      aiMessage: {
        findUnique: jest.fn().mockResolvedValue({ id: 'm1', processingState: 'RECEIVED', body: 'deliver a box', conversation: { id: 'c1', userId: 'u1' } }),
        update: jest.fn().mockResolvedValue({}),
      },
      user: { findUnique: jest.fn().mockResolvedValue({ aiDeliveryDetectionEnabled: false }) },
      aiAuditEvent: { create: jest.fn().mockResolvedValue({}) },
    };
    const s = new AiDeliveryService(prisma, ai, {} as any, {} as any, {} as any, config());
    await s.processInboundMessage('m1');
    expect(ai.extract).not.toHaveBeenCalled();
    expect(prisma.aiMessage.update).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ processingState: 'PROCESSED' }) }));
  });
  it('updateSettings persists and returns effective state', async () => {
    const prisma: any = {
      user: {
        update: jest.fn().mockResolvedValue({ aiDeliveryDetectionEnabled: false }),
        findUnique: jest.fn().mockResolvedValue({ role: 'USER', aiDeliveryDetectionEnabled: false }),
      },
      aiAuditEvent: { create: jest.fn().mockResolvedValue({}) },
    };
    const out: any = await svc(prisma).updateSettings('u1', { aiDeliveryDetectionEnabled: false });
    expect(out.effectiveEnabled).toBe(false);
    expect(prisma.user.update).toHaveBeenCalledWith(expect.objectContaining({ data: { aiDeliveryDetectionEnabled: false } }));
  });
});

describe('SuperAdminGuard (role from DB, not JWT)', () => {
  const ctx: any = (user: any) => ({ switchToHttp: () => ({ getRequest: () => ({ user }) }) });
  it('allows SUPER_ADMIN', async () => {
    const guard = new SuperAdminGuard({ user: { findUnique: jest.fn().mockResolvedValue({ role: 'SUPER_ADMIN' }) } } as any);
    await expect(guard.canActivate(ctx({ id: 'a1' }))).resolves.toBe(true);
  });
  it('rejects USER and unauthenticated', async () => {
    const guard = new SuperAdminGuard({ user: { findUnique: jest.fn().mockResolvedValue({ role: 'USER' }) } } as any);
    await expect(guard.canActivate(ctx({ id: 'u1' }))).rejects.toBeInstanceOf(ForbiddenException);
    await expect(guard.canActivate(ctx(undefined))).rejects.toBeInstanceOf(ForbiddenException);
  });
  it('super admin cannot demote themselves', async () => {
    const prisma: any = { user: { update: jest.fn() }, aiAuditEvent: { create: jest.fn() } };
    await expect(svc(prisma).adminSetUserRole('a1', 'a1', 'USER')).rejects.toThrow('cannot demote yourself');
    expect(prisma.user.update).not.toHaveBeenCalled();
  });
});
