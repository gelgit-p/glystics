import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated';
import { PrismaService } from 'prisma/prisma.service';

export interface WebhookLogInput {
  userId?: string | null;
  source: 'WHATSAPP' | 'SHIPBUBBLE' | 'BACHS';
  eventType: string;
  direction?: string;
  status: string;
  externalId?: string | null;
  phoneNumberId?: string | null;
  summary?: string | null;
  payload?: unknown;
  error?: string | null;
}

@Injectable()
export class WebhookLogService {
  constructor(private readonly prisma: PrismaService) {}

  /** Never let logging break webhook acknowledgement. */
  async log(input: WebhookLogInput) {
    try {
      return await this.prisma.webhookEventLog.create({
        data: {
          userId: input.userId ?? null,
          source: input.source,
          eventType: input.eventType.slice(0, 200),
          direction: input.direction ?? 'INBOUND',
          status: input.status.slice(0, 100),
          externalId: input.externalId ?? null,
          phoneNumberId: input.phoneNumberId ?? null,
          summary: input.summary?.slice(0, 1000) ?? null,
          payload: (input.payload ?? undefined) as Prisma.InputJsonValue | undefined,
          error: input.error?.slice(0, 1000) ?? null,
        },
      });
    } catch {
      return null;
    }
  }

  async listForUser(userId: string, filters: { source?: string; status?: string; limit?: number } = {}) {
    const limit = Math.min(Math.max(filters.limit ?? 100, 1), 200);
    return this.prisma.webhookEventLog.findMany({
      where: {
        userId,
        ...(filters.source ? { source: filters.source } : {}),
        ...(filters.status ? { status: filters.status } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
}
