jest.mock('prisma/generated', () => ({ Prisma: {}, PrismaClient: class {} }));
jest.mock('prisma/prisma.service', () => ({ PrismaService: class {} }));

import { WebhookLogService } from './webhook-log.service';

describe('WebhookLogService', () => {
  it('lists logs only for the authenticated tenant with filters', async () => {
    const prisma: any = {
      webhookEventLog: { findMany: jest.fn().mockResolvedValue([{ id: 'log-1' }]) },
    };
    const service = new WebhookLogService(prisma);
    await expect(service.listForUser('user-1', { source: 'WHATSAPP', limit: 50 })).resolves.toEqual([{ id: 'log-1' }]);
    expect(prisma.webhookEventLog.findMany).toHaveBeenCalledWith({
      where: { userId: 'user-1', source: 'WHATSAPP' },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  });

  it('never throws when persistence fails, so webhook ACK is preserved', async () => {
    const prisma: any = {
      webhookEventLog: { create: jest.fn().mockRejectedValue(new Error('db unavailable')) },
    };
    const service = new WebhookLogService(prisma);
    await expect(service.log({ source: 'WHATSAPP', eventType: 'whatsapp.message.received', status: 'RECEIVED' })).resolves.toBeNull();
  });
});
