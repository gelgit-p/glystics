import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from 'prisma/generated';
import { PrismaService } from 'prisma/prisma.service';
import { MetaModelClient } from '../ai-agent/meta-model.client';
import {
  buildClarificationQuestion,
  cleanReceiverAddress,
  computeMissingFields,
  DRAFT_FIELDS,
  ExtractedDeliveryFields,
  numericString,
} from '../ai-agent/extraction';
import { WhatsappService } from '../whatsapp/whatsapp.service';
import { ShipbubbleService } from '../shipbubble/shipbubble.service';
import { DeliveryService } from '../delivery/delivery.service';
import { normalizeShipbubbleRates } from './quote-ranking';
import {
  ApproveDraftDto,
  RejectDraftDto,
  SenderProfileDto,
  UpdateDraftDto,
} from './dto/ai-delivery.dto';

const rec = (v: unknown): Record<string, any> =>
  v && typeof v === 'object' && !Array.isArray(v)
    ? (v as Record<string, any>)
    : {};

@Injectable()
export class AiDeliveryService {
  private readonly logger = new Logger(AiDeliveryService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly ai: MetaModelClient,
    private readonly whatsapp: WhatsappService,
    private readonly shipbubble: ShipbubbleService,
    private readonly deliveryService: DeliveryService,
    private readonly config: ConfigService,
  ) {}

  aiMode() {
    return this.ai.mode;
  }

  async audit(
    userId: string | null,
    actorType: string,
    action: string,
    entityType: string,
    entityId?: string,
    metadata?: Record<string, unknown>,
  ) {
    await this.prisma.aiAuditEvent
      .create({
        data: {
          userId,
          actorType,
          action,
          entityType,
          entityId,
          metadata: metadata as Prisma.InputJsonObject,
        },
      })
      .catch(() => undefined);
  }

  /** Global kill-switch (AI_DELIVERY_DETECTION_DISABLED=true) AND per-tenant switch must both allow detection. */
  detectionGloballyEnabled() {
    return this.config.get<string>('AI_DELIVERY_DETECTION_DISABLED') !== 'true';
  }

  async isDetectionEnabled(userId: string): Promise<boolean> {
    if (!this.detectionGloballyEnabled()) return false;
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { aiDeliveryDetectionEnabled: true },
    });
    return user?.aiDeliveryDetectionEnabled !== false;
  }

  async getSettings(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true, aiDeliveryDetectionEnabled: true },
    });
    return {
      aiDeliveryDetectionEnabled: user?.aiDeliveryDetectionEnabled ?? true,
      globalEnabled: this.detectionGloballyEnabled(),
      effectiveEnabled:
        this.detectionGloballyEnabled() &&
        (user?.aiDeliveryDetectionEnabled ?? true),
      role: user?.role ?? 'USER',
      aiMode: this.aiMode(),
    };
  }

  async updateSettings(
    userId: string,
    dto: { aiDeliveryDetectionEnabled: boolean },
  ) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { aiDeliveryDetectionEnabled: dto.aiDeliveryDetectionEnabled },
      select: { aiDeliveryDetectionEnabled: true },
    });
    await this.audit(
      userId,
      'USER',
      dto.aiDeliveryDetectionEnabled
        ? 'ai_detection.enabled'
        : 'ai_detection.disabled',
      'User',
      userId,
      {},
    );
    return this.getSettings(userId);
  }

  // ---- Super admin ----
  async adminOverview() {
    const [users, superAdmins, detectionEnabled, conversations, drafts, approvals] =
      await Promise.all([
        this.prisma.user.count(),
        this.prisma.user.count({ where: { role: 'SUPER_ADMIN' } }),
        this.prisma.user.count({ where: { aiDeliveryDetectionEnabled: true } }),
        this.prisma.aiConversation.count(),
        this.prisma.deliveryDraft.count(),
        this.prisma.approval.count(),
      ]);
    return {
      globalEnabled: this.detectionGloballyEnabled(),
      aiMode: this.aiMode(),
      users,
      superAdmins,
      tenantsWithDetectionEnabled: detectionEnabled,
      conversations,
      drafts,
      approvals,
    };
  }

  async adminListUsers() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 200,
      select: {
        id: true,
        email: true,
        businessName: true,
        role: true,
        aiDeliveryDetectionEnabled: true,
        createdAt: true,
        _count: { select: { aiConversations: true, deliveryDrafts: true } },
      },
    });
  }

  async adminSetUserRole(adminId: string, targetUserId: string, role: 'USER' | 'SUPER_ADMIN') {
    if (adminId === targetUserId && role !== 'SUPER_ADMIN')
      throw new BadRequestException('You cannot demote yourself');
    const user = await this.prisma.user.update({
      where: { id: targetUserId },
      data: { role },
      select: { id: true, email: true, role: true },
    });
    await this.audit(adminId, 'USER', 'admin.user_role_changed', 'User', targetUserId, { role });
    return user;
  }

  async adminSetDetection(adminId: string, targetUserId: string, enabled: boolean) {
    const user = await this.prisma.user.update({
      where: { id: targetUserId },
      data: { aiDeliveryDetectionEnabled: enabled },
      select: { id: true, email: true, aiDeliveryDetectionEnabled: true },
    });
    await this.audit(adminId, 'USER', enabled ? 'admin.ai_detection.enabled' : 'admin.ai_detection.disabled', 'User', targetUserId, {});
    return user;
  }

  /** Resolve tenant from the WhatsApp phone_number_id in webhook metadata. */
  async resolveTenant(phoneNumberId: string) {
    return this.prisma.user.findFirst({
      where: { selectedPhoneNumberId: { has: phoneNumberId } },
      select: {
        id: true,
        businessName: true,
        fullName: true,
        aiDeliveryDetectionEnabled: true,
      },
    });
  }

  async getOrCreateConversation(
    userId: string,
    phoneNumberId: string,
    customerWaId: string,
  ) {
    return this.prisma.aiConversation.upsert({
      where: {
        userId_phoneNumberId_customerWaId: {
          userId,
          phoneNumberId,
          customerWaId,
        },
      },
      create: { userId, phoneNumberId, customerWaId },
      update: { status: 'OPEN' },
    });
  }

  /** Idempotent inbound insert: duplicate waMessageId returns null. */
  async recordInbound(
    conversationId: string,
    waMessageId: string,
    body: string | undefined,
    raw: unknown,
  ) {
    try {
      return await this.prisma.aiMessage.create({
        data: {
          conversationId,
          waMessageId,
          direction: 'INBOUND',
          body,
          rawPayload: raw as Prisma.InputJsonObject,
          processingState: 'RECEIVED',
        },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      )
        return null;
      throw e;
    }
  }

  async processInboundMessage(messageId: string): Promise<void> {
    const msg = await this.prisma.aiMessage.findUnique({
      where: { id: messageId },
      include: { conversation: true },
    });
    if (!msg || msg.processingState === 'PROCESSED') return;
    const conv = msg.conversation;
    // AI delivery detection disabled (tenant switch or global kill-switch):
    // keep the message for the inbox record, but never extract/clarify/quote.
    if (!(await this.isDetectionEnabled(conv.userId))) {
      await this.prisma.aiMessage.update({
        where: { id: msg.id },
        data: { processingState: 'PROCESSED', processingError: null },
      });
      await this.audit(conv.userId, 'SYSTEM', 'ai_detection.skipped_disabled', 'AiMessage', msg.id, {});
      return;
    }
    await this.prisma.aiMessage.update({
      where: { id: msg.id },
      data: { processingState: 'PROCESSING', attempts: { increment: 1 } },
    });
    try {
      const text = msg.body ?? '';
      const [history, draft] = await Promise.all([
        this.prisma.aiMessage.findMany({
          where: { conversationId: conv.id },
          orderBy: { createdAt: 'desc' },
          take: 10,
        }),
        this.prisma.deliveryDraft.findFirst({
          where: {
            conversationId: conv.id,
            status: { in: ['COLLECTING', 'READY', 'QUOTED'] },
          },
          orderBy: { createdAt: 'desc' },
        }),
      ]);
      const profileSender = await this.getSenderProfile(conv.userId);
      // Sender (pickup) identity comes from the business profile, not the customer chat.
      const currentFields = draft
        ? this.draftToFields(draft)
        : {
            senderName: profileSender.senderName ?? undefined,
            senderPhone: profileSender.senderPhone ?? undefined,
            senderAddress: profileSender.senderAddress ?? undefined,
            senderEmail: profileSender.senderEmail ?? undefined,
          };
      const result = await this.ai.extract({
        message: text,
        history: history.reverse().map((h) => ({
          role:
            h.direction === 'INBOUND'
              ? ('user' as const)
              : ('assistant' as const),
          content: h.body ?? '',
        })),
        currentFields: currentFields as Record<string, unknown>,
      });
      await this.audit(
        conv.userId,
        'AI',
        'ai.extraction',
        'AiMessage',
        msg.id,
        {
          intent: result.intent,
          confidence: result.confidence,
          aiMode: result.aiMode,
        },
      );

      let activeDraft = draft;
      if (
        result.intent === 'DELIVERY_REQUEST' ||
        result.intent === 'DELIVERY_UPDATE' ||
        Object.keys(result.fields).length
      ) {
        // Profile sender always wins over anything extracted from the customer message.
        const merged: ExtractedDeliveryFields = {
          ...currentFields,
          ...result.fields,
          senderName: currentFields.senderName ?? result.fields.senderName,
          senderPhone: currentFields.senderPhone ?? result.fields.senderPhone,
          senderAddress:
            currentFields.senderAddress ?? result.fields.senderAddress,
          senderEmail: currentFields.senderEmail ?? result.fields.senderEmail,
        };
        const missing = computeMissingFields(merged);
        const data = {
          ...this.fieldsToData(merged),
          missingFields: missing,
          confidence: result.confidence,
          extracted: result as unknown as Prisma.InputJsonObject,
          status: missing.length ? 'COLLECTING' : 'READY',
        };
        activeDraft = draft
          ? await this.prisma.deliveryDraft.update({
              where: { id: draft.id },
              data,
            })
          : await this.prisma.deliveryDraft.create({
              data: {
                userId: conv.userId,
                conversationId: conv.id,
                deliveryType: 'STANDARD',
                ...data,
              },
            });
        await this.audit(
          conv.userId,
          'AI',
          missing.length ? 'draft.collecting' : 'draft.ready',
          'DeliveryDraft',
          activeDraft.id,
          { missingFields: missing },
        );
        // curl1 (fetch_rates) on READY so prices are ready to display/select in the dashboard.
        // Failure is non-fatal: staff can retry via POST /ai/drafts/:id/quotes.
        if (!missing.length) {
          try {
            await this.fetchQuotes(conv.userId, activeDraft.id);
            activeDraft = await this.prisma.deliveryDraft.findUniqueOrThrow({ where: { id: activeDraft.id } });
          } catch (quoteError) {
            this.logger.warn(`Auto fetchQuotes failed for draft ${activeDraft.id}: ${quoteError instanceof Error ? quoteError.message : quoteError}`);
          }
        }
      }

      let reply: string | null = null;
      if (activeDraft && activeDraft.status === 'COLLECTING')
        reply = buildClarificationQuestion(activeDraft.missingFields);
      else if (activeDraft && activeDraft.status === 'READY')
        reply =
          'Thanks! I have everything needed. Our team will review courier quotes and confirm your delivery shortly.';
      else if (activeDraft && activeDraft.status === 'QUOTED')
        reply =
          'Thanks! Courier prices are ready — our team will share the options and confirm your preferred delivery shortly.';
      else if (result.intent === 'TRACKING_QUERY')
        reply =
          'To track a delivery, please share your tracking ID and our team will check its status.';
      if (reply)
        await this.sendReply(conv.userId, conv.customerWaId, reply, conv.id);

      await this.prisma.aiMessage.update({
        where: { id: msg.id },
        data: { processingState: 'PROCESSED', processingError: null },
      });
      await this.prisma.aiConversation.update({
        where: { id: conv.id },
        data: { lastMessageAt: new Date() },
      });
    } catch (e) {
      const attempts = msg.attempts + 1;
      await this.prisma.aiMessage.update({
        where: { id: msg.id },
        data: {
          processingState: attempts >= 5 ? 'FAILED' : 'RECEIVED',
          nextRetryAt:
            attempts >= 5
              ? null
              : new Date(Date.now() + Math.min(2 ** attempts, 32) * 30_000),
          processingError:
            e instanceof Error ? e.message.slice(0, 500) : 'Processing failed',
        },
      });
      await this.audit(
        conv.userId,
        'SYSTEM',
        'message.processing_failed',
        'AiMessage',
        msg.id,
        { attempts },
      );
    }
  }

  /** Retry sweep for RECEIVED messages whose backoff elapsed (DB-backed async, no Redis). */
  async processPending(limit = 20) {
    const pending = await this.prisma.aiMessage.findMany({
      where: {
        processingState: 'RECEIVED',
        OR: [{ nextRetryAt: null }, { nextRetryAt: { lte: new Date() } }],
      },
      orderBy: { createdAt: 'asc' },
      take: limit,
    });
    for (const m of pending) await this.processInboundMessage(m.id);
    return pending.length;
  }

  private async sendReply(
    userId: string,
    to: string,
    text: string,
    conversationId: string,
  ) {
    try {
      const res = await this.whatsapp.sendMessage({ to, text }, userId);
      const waId = rec(res)?.messages?.[0]?.id;
      await this.prisma.aiMessage.create({
        data: {
          conversationId,
          waMessageId:
            typeof waId === 'string'
              ? waId
              : `out-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          direction: 'OUTBOUND',
          body: text,
          processingState: 'PROCESSED',
        },
      });
      await this.audit(
        userId,
        'AI',
        'whatsapp.reply_sent',
        'AiConversation',
        conversationId,
        {},
      );
    } catch (e) {
      // No 24h-window / credit / credential failures should crash processing; staff can reply from inbox.
      this.logger.warn(
        `WhatsApp reply failed for ${userId}: ${e instanceof Error ? e.message : e}`,
      );
      await this.audit(
        userId,
        'SYSTEM',
        'whatsapp.reply_failed',
        'AiConversation',
        conversationId,
        { error: 'send failed (check window/credits/credentials)' },
      );
    }
  }

  draftToFields(d: Record<string, any>): ExtractedDeliveryFields {
    const out: Record<string, unknown> = {};
    for (const f of DRAFT_FIELDS)
      if (d[f] !== null && d[f] !== undefined && d[f] !== '') out[f] = d[f];
    return out;
  }
  private fieldsToData(f: ExtractedDeliveryFields) {
    const out: Record<string, unknown> = {};
    for (const k of DRAFT_FIELDS) if (f[k] !== undefined) out[k] = f[k];
    return out;
  }

  // ---- Dashboard queries (all tenant-scoped) ----
  async overview(userId: string) {
    const [drafts, conversations, pendingApprovals, auditCount] =
      await Promise.all([
        this.prisma.deliveryDraft.groupBy({
          by: ['status'],
          where: { userId },
          _count: { _all: true },
        }),
        this.prisma.aiConversation.count({ where: { userId } }),
        this.prisma.deliveryDraft.count({
          where: {
            userId,
            status: { in: ['READY', 'QUOTED', 'AWAITING_APPROVAL'] },
          },
        }),
        this.prisma.aiAuditEvent.count({ where: { userId } }),
      ]);
    const byStatus = Object.fromEntries(
      drafts.map((d) => [d.status, d._count._all]),
    );
    return {
      aiMode: this.aiMode(),
      demoLabel:
        this.aiMode() === 'demo'
          ? 'DEMO MODE — simulated AI extraction, no real Meta Muse Spark call'
          : undefined,
      conversations,
      pendingApprovals,
      auditEvents: auditCount,
      draftsByStatus: byStatus,
      totalDrafts: drafts.reduce((s, d) => s + d._count._all, 0),
    };
  }
  listConversations(userId: string) {
    return this.prisma.aiConversation.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      take: 100,
      include: {
        messages: { orderBy: { createdAt: 'desc' }, take: 1 },
        drafts: { select: { id: true, status: true } },
      },
    });
  }
  async getConversation(userId: string, id: string) {
    const c = await this.prisma.aiConversation.findFirst({
      where: { id, userId },
      include: {
        messages: { orderBy: { createdAt: 'asc' } },
        drafts: { orderBy: { createdAt: 'desc' }, include: { quotes: true } },
      },
    });
    if (!c) throw new NotFoundException('Conversation not found');
    return c;
  }
  async listDrafts(userId: string, status?: string) {
    const drafts = await this.prisma.deliveryDraft.findMany({
      where: { userId, ...(status ? { status } : {}) },
      orderBy: { updatedAt: 'desc' },
      take: 100,
      include: {
        quotes: { orderBy: { score: 'asc' } },
        conversation: { select: { customerWaId: true } },
      },
    });
    // Backfill sequentially — repairs are persisted so subsequent loads are no-ops.
    const repaired: any[] = [];
    for (const d of drafts) repaired.push(await this.backfillSenderFromProfile(d));
    return repaired;
  }
  /**
   * Repair stale drafts: backfill missing sender fields from the CURRENT profile
   * (drafts created before sender profile existed, or profile updated later),
   * recompute missingFields/status, and persist. No-op on terminal drafts.
   */
  private async backfillSenderFromProfile(draft: any): Promise<any> {
    if (['APPROVED', 'BOOKED', 'REJECTED'].includes(draft.status)) return draft;
    const patch: Record<string, string> = {};
    if (!draft.senderAddress || !draft.senderPhone || !draft.senderName) {
      const profile = await this.getSenderProfile(draft.userId);
      if (!draft.senderName && profile.senderName) patch.senderName = profile.senderName;
      if (!draft.senderPhone && profile.senderPhone) patch.senderPhone = profile.senderPhone;
      if (!draft.senderAddress && profile.senderAddress) patch.senderAddress = profile.senderAddress;
      if (!draft.senderEmail && profile.senderEmail) patch.senderEmail = profile.senderEmail;
    }
    const cleaned = cleanReceiverAddress(draft.receiverAddress, draft.receiverName, draft.receiverPhone);
    if (cleaned && cleaned !== draft.receiverAddress) patch.receiverAddress = cleaned;
    if (!Object.keys(patch).length) return draft;
    const merged = { ...this.draftToFields(draft as Record<string, any>), ...patch };
    const missing = computeMissingFields(merged);
    const status = draft.status === 'QUOTED' ? 'QUOTED' : missing.length ? 'COLLECTING' : 'READY';
    const updated = await this.prisma.deliveryDraft.update({
      where: { id: draft.id },
      data: { ...patch, missingFields: missing, status },
    });
    await this.audit(draft.userId, 'SYSTEM', 'draft.sender_backfilled', 'DeliveryDraft', draft.id, { fields: Object.keys(patch) });
    return { ...draft, ...updated };
  }

  async getDraft(userId: string, id: string) {
    const d = await this.prisma.deliveryDraft.findFirst({
      where: { id, userId },
      include: {
        quotes: { orderBy: { score: 'asc' } },
        approvals: { orderBy: { createdAt: 'desc' } },
        conversation: true,
      },
    });
    if (!d) throw new NotFoundException('Delivery draft not found');
    return this.backfillSenderFromProfile(d);
  }
  async updateDraft(userId: string, id: string, dto: UpdateDraftDto) {
    const draft = await this.getDraft(userId, id);
    if (['APPROVED', 'BOOKED', 'REJECTED'].includes(draft.status))
      throw new ConflictException(
        `Draft is ${draft.status} and cannot be edited`,
      );
    const merged = {
      ...this.draftToFields(draft),
      ...dto,
    } as ExtractedDeliveryFields;
    const missing = computeMissingFields(merged);
    const updated = await this.prisma.deliveryDraft.update({
      where: { id },
      data: {
        ...dto,
        missingFields: missing,
        status:
          draft.status === 'QUOTED' && !missing.length
            ? 'QUOTED'
            : missing.length
              ? 'COLLECTING'
              : 'READY',
      },
    });
    await this.audit(userId, 'USER', 'draft.updated', 'DeliveryDraft', id, {
      missingFields: missing,
    });
    return updated;
  }
  listApprovals(userId: string) {
    return this.prisma.deliveryDraft.findMany({
      where: {
        userId,
        status: { in: ['READY', 'QUOTED', 'AWAITING_APPROVAL'] },
      },
      orderBy: { updatedAt: 'asc' },
      include: {
        quotes: { orderBy: { score: 'asc' } },
        conversation: { select: { customerWaId: true } },
      },
    });
  }
  listAudit(userId: string) {
    return this.prisma.aiAuditEvent.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
  }

  // ---- Sender profile (seeded into AI drafts; editable in Profile settings / simulation) ----
  async getSenderProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        businessName: true,
        fullName: true,
        email: true,
        senderPhone: true,
        senderAddress: true,
        senderEmail: true,
      },
    });
    return {
      senderName: user?.businessName ?? user?.fullName ?? null,
      senderPhone: user?.senderPhone ?? null,
      senderAddress: user?.senderAddress ?? null,
      senderEmail: user?.senderEmail ?? user?.email ?? null,
    };
  }

  async updateSenderProfile(userId: string, dto: SenderProfileDto) {
    const data: Record<string, string> = {};
    if (dto.senderPhone !== undefined) data.senderPhone = dto.senderPhone;
    if (dto.senderAddress !== undefined) data.senderAddress = dto.senderAddress;
    if (dto.senderEmail !== undefined) data.senderEmail = dto.senderEmail;
    if (Object.keys(data).length) {
      await this.prisma.user.update({ where: { id: userId }, data });
    }
    // senderName is the profile business/full name — update it there too.
    if (dto.senderName) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { businessName: dto.senderName },
      });
    }
    await this.audit(userId, 'USER', 'sender_profile.updated', 'User', userId, {});
    return this.getSenderProfile(userId);
  }

  // ---- Quotes via existing Shipbubble flow (validate address -> fetch_rates) ----
  async fetchQuotes(userId: string, draftId: string) {
    const draft = await this.getDraft(userId, draftId);
    if (draft.missingFields.length)
      throw new BadRequestException(
        `Draft is missing: ${draft.missingFields.join(', ')}`,
      );
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { businessName: true, fullName: true },
    });
    const senderName =
      draft.senderName ?? user?.businessName ?? user?.fullName ?? 'Sender';
    const addr = async (
      name: string,
      phone: string,
      address: string,
      email?: string | null,
    ) => {
      const res = rec(
        await this.shipbubble.createValidatedAddress({
          name,
          email: email ?? 'no-reply@dispatchly.local',
          phone,
          address,
        }),
      );
      const data = rec(res.data ?? res);
      const code = Number(data.address_code);
      if (!Number.isFinite(code))
        throw new BadRequestException(
          `Shipbubble could not validate address: ${address}`,
        );
      return code;
    };
    const [senderCode, receiverCode] = await Promise.all([
      addr(
        senderName,
        draft.senderPhone ?? '08000000000',
        draft.senderAddress!,
      ),
      addr(
        draft.receiverName!,
        draft.receiverPhone!,
        draft.receiverAddress!,
        draft.receiverEmail,
      ),
    ]);
    let categoryId = draft.packageCategoryId ?? undefined;
    if (!categoryId) {
      const cats = rec(await this.shipbubble.getPackageCategories());
      const list = Array.isArray(cats.data) ? cats.data : [];
      const match =
        list.find((c: any) =>
          String(c.name ?? '')
            .toLowerCase()
            .includes(String(draft.packageCategory ?? '').toLowerCase()),
        ) ?? list[0];
      categoryId = Number(match?.category_id ?? match?.id ?? 0);
      if (!categoryId)
        throw new BadRequestException(
          'No Shipbubble package category available; set packageCategoryId on the draft',
        );
    }
    const rates = await this.shipbubble.fetchShippingRates({
      sender_address_code: senderCode,
      reciever_address_code: receiverCode,
      pickup_date: draft.pickupDate!,
      category_id: categoryId,
      package_items: [
        {
          name: draft.packageName!,
          description: draft.packageDescription ?? draft.packageName!,
          // Shipbubble requires numeric strings ("0.5kg" would 400 in toNumber).
          unit_weight: numericString(draft.packageWeight ?? undefined, 'packageWeight'),
          unit_amount: numericString(draft.packageValue ?? undefined, 'packageValue'),
          quantity: draft.packageQuantity ?? 1,
        },
      ],
      package_dimension: {
        length: draft.length ?? 10,
        width: draft.width ?? 10,
        height: draft.height ?? 10,
      },
      delivery_instructions: draft.deliveryInstructions ?? undefined,
    });
    const { requestToken, quotes } = normalizeShipbubbleRates(rates);
    if (!requestToken || !quotes.length)
      throw new BadRequestException(
        'Shipbubble returned no courier quotes for this draft',
      );
    await this.prisma.providerQuote.deleteMany({ where: { draftId } });
    await this.prisma.providerQuote.createMany({
      data: quotes.map((q) => ({
        draftId,
        courierId: q.courierId,
        courierName: q.courierName,
        serviceCode: q.serviceCode,
        amount: q.amount,
        currency: q.currency,
        deliveryEta: q.deliveryEta,
        pickupEta: q.pickupEta,
        score: q.score,
        scoreReasons: q.scoreReasons,
        requestToken,
        raw: q.raw as Prisma.InputJsonObject,
      })),
    });
    const updated = await this.prisma.deliveryDraft.update({
      where: { id: draftId },
      data: { status: 'QUOTED', packageCategoryId: categoryId },
    });
    await this.audit(
      userId,
      'USER',
      'quotes.fetched',
      'DeliveryDraft',
      draftId,
      { count: quotes.length, provider: 'SHIPBUBBLE' },
    );
    return {
      draft: updated,
      quotes: await this.prisma.providerQuote.findMany({
        where: { draftId },
        orderBy: { score: 'asc' },
      }),
      requestToken,
    };
  }

  // ---- Approval: the ONLY path from AI draft to a real delivery. Reuses credits+checkout+booking. ----
  async approve(userId: string, draftId: string, dto: ApproveDraftDto) {
    const draft = await this.getDraft(userId, draftId);
    const idempotencyKey =
      dto.idempotencyKey ?? `approve:${draftId}:${dto.quoteId}`;
    const existing = await this.prisma.approval.findUnique({
      where: { idempotencyKey },
    });
    if (existing?.deliveryId)
      return {
        approval: existing,
        deliveryId: existing.deliveryId,
        alreadyProcessed: true,
      };
    if (draft.status === 'REJECTED')
      throw new ConflictException('Draft was rejected');
    if (draft.deliveryId)
      return { deliveryId: draft.deliveryId, alreadyProcessed: true };
    const quote = draft.quotes.find((q) => q.id === dto.quoteId);
    if (!quote)
      throw new BadRequestException(
        'Selected quote does not belong to this draft',
      );
    if (draft.missingFields.length)
      throw new BadRequestException(
        `Draft is missing: ${draft.missingFields.join(', ')}`,
      );
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { businessName: true, fullName: true },
    });

    // DeliveryService.create() atomically charges DELIVERY credits (idempotencyKey delivery:{trackingId}).
    const delivery: any = await this.deliveryService.create({
      userId,
      senderName:
        draft.senderName ?? user?.businessName ?? user?.fullName ?? 'Sender',
      senderPhone: draft.senderPhone ?? '08000000000',
      senderAddress: draft.senderAddress!,
      receiverName: draft.receiverName!,
      receiverPhone: draft.receiverPhone!,
      receiverAddress: draft.receiverAddress!,
      packageName: draft.packageName!,
      packageCategory: draft.packageCategory ?? 'General',
      packageWeight: draft.packageWeight!,
      packageDimensions: `${draft.length ?? 10}x${draft.width ?? 10}x${draft.height ?? 10}`,
      packageValue: draft.packageValue!,
      pickupDate: draft.pickupDate!,
      deliveryType: draft.deliveryType ?? 'STANDARD',
      deliveryInstructions: draft.deliveryInstructions ?? undefined,
    });
    // PAID-FIRST (curl2): /shipping/labels (createShipment) is called ONLY by
    // DeliveryService.completePaidCheckout after the Bachs payment webhook.
    // Selecting/approving a price here must never book or charge Shipbubble.
    const checkout = await this.deliveryService.createCheckoutSession(
      delivery.id,
      userId,
      {
        amount: String(quote.amount),
        currency: quote.currency,
        request_token: quote.requestToken,
        courier_id: quote.courierId,
        service_code: quote.serviceCode,
      },
    );
    const approval = await this.prisma.approval.create({
      data: {
        draftId,
        userId,
        decision: 'APPROVED',
        selectedQuoteId: quote.id,
        note: dto.note,
        idempotencyKey,
        deliveryId: delivery.id,
      },
    });
    await this.prisma.deliveryDraft.update({
      where: { id: draftId },
      data: { status: 'APPROVED', deliveryId: delivery.id },
    });
    await this.audit(
      userId,
      'USER',
      'draft.approved',
      'DeliveryDraft',
      draftId,
      { quoteId: quote.id, deliveryId: delivery.id },
    );
    return {
      approval,
      deliveryId: delivery.id,
      trackingId: delivery.trackingId,
      checkout,
      note: 'Delivery created and credits charged via existing flow. Booking occurs only after checkout payment completes (Bachs webhook -> Shipbubble).',
    };
  }

  async reject(userId: string, draftId: string, dto: RejectDraftDto) {
    const draft = await this.getDraft(userId, draftId);
    if (draft.deliveryId)
      throw new ConflictException('Draft already produced a delivery');
    const approval = await this.prisma.approval.create({
      data: {
        draftId,
        userId,
        decision: 'REJECTED',
        note: dto.note,
        idempotencyKey: `reject:${draftId}:${Date.now()}`,
      },
    });
    await this.prisma.deliveryDraft.update({
      where: { id: draftId },
      data: { status: 'REJECTED' },
    });
    await this.audit(
      userId,
      'USER',
      'draft.rejected',
      'DeliveryDraft',
      draftId,
      {},
    );
    return approval;
  }

  /** DEMO ONLY endpoint helper: simulates an inbound WhatsApp message for the authenticated tenant. */
  async simulateInbound(
    userId: string,
    text: string,
    customerWaId = '2348000000000',
    senderOverride?: SenderProfileDto,
    saveSenderToProfile = true,
  ) {
    // Per-simulation sender details optionally persist to the profile so the
    // next simulation / real draft reuses them.
    if (senderOverride && saveSenderToProfile) {
      await this.updateSenderProfile(userId, senderOverride);
    }
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { selectedPhoneNumberId: true },
    });
    const phoneNumberId =
      user?.selectedPhoneNumberId[0] ?? 'demo-phone-number-id';
    const conv = await this.getOrCreateConversation(
      userId,
      phoneNumberId,
      customerWaId,
    );
    const msg = await this.recordInbound(
      conv.id,
      `demo-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      text,
      { simulated: true, text, senderOverride: senderOverride ?? null },
    );
    if (msg) await this.processInboundMessage(msg.id);
    // One-off override (not saved): stamp it onto the resulting draft.
    if (senderOverride && !saveSenderToProfile) {
      const latest = await this.prisma.deliveryDraft.findFirst({
        where: { conversationId: conv.id },
        orderBy: { createdAt: 'desc' },
      });
      if (latest) {
        await this.prisma.deliveryDraft.update({
          where: { id: latest.id },
          data: {
            ...(senderOverride.senderName ? { senderName: senderOverride.senderName } : {}),
            ...(senderOverride.senderPhone ? { senderPhone: senderOverride.senderPhone } : {}),
            ...(senderOverride.senderAddress ? { senderAddress: senderOverride.senderAddress } : {}),
            ...(senderOverride.senderEmail ? { senderEmail: senderOverride.senderEmail } : {}),
          },
        });
      }
    }
    const draft = await this.prisma.deliveryDraft.findFirst({
      where: { conversationId: conv.id },
      orderBy: { createdAt: 'desc' },
      include: { quotes: { orderBy: { score: 'asc' } } },
    });
    return {
      simulated: true,
      aiMode: this.aiMode(),
      conversationId: conv.id,
      senderProfile: await this.getSenderProfile(userId),
      draft,
    };
  }
}
