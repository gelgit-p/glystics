import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from 'prisma/generated';
import { PrismaService } from 'prisma/prisma.service';
import { DeliveryService } from '../delivery/delivery.service';
import { CreditsService } from '../credits/credit.service';
import { WhatsappService } from '../whatsapp/whatsapp.service';
import { AiDeliveryService } from '../ai-delivery/ai-delivery.service';
import { AutomationService } from '../automation/automation.service';

function paging(page = 1, limit = 20) {
  const take = Math.min(Math.max(limit || 20, 1), 100);
  const p = Math.max(page || 1, 1);
  return { skip: (p - 1) * take, take, page: p, limit: take };
}

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly deliveryService: DeliveryService,
    private readonly credits: CreditsService,
    private readonly whatsapp: WhatsappService,
    private readonly ai: AiDeliveryService,
    private readonly automations: AutomationService,
    private readonly config: ConfigService,
  ) {}

  // Read role from DB — JWT carries only sub/email (AuthService.login); see SuperAdminGuard.
  async assertSuperAdmin(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    if (user?.role !== 'SUPER_ADMIN')
      throw new ForbiddenException('Super admin access required');
  }

  // ---- Overview ----
  async overview() {
    const [
      users,
      superAdmins,
      detectionOn,
      suspended,
      deliveriesByStatus,
      deliveriesTotal,
      wallets,
      transactions,
      purchases,
      aiConversations,
      aiDrafts,
      approvals,
      aiErrors,
      notifications,
      notificationsFailed,
      templates,
      templatesPending,
      automations,
      automationsActive,
      automationsRuns,
      webhookEvents,
      webhookFailed,
      waConnected,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { role: 'SUPER_ADMIN' } }),
      this.prisma.user.count({ where: { aiDeliveryDetectionEnabled: true } }),
      this.prisma.user.count({ where: { emailConfirmed: false } }),
      this.prisma.delivery.groupBy({ by: ['deliveryStatus'], _count: { _all: true } }),
      this.prisma.delivery.count(),
      this.prisma.creditWallet.aggregate({ _sum: { balance: true, points: true } }),
      this.prisma.creditTransaction.count(),
      this.prisma.creditPurchase.groupBy({ by: ['status'], _count: { _all: true }, _sum: { amountKobo: true } }),
      this.prisma.aiConversation.count(),
      this.prisma.deliveryDraft.count(),
      this.prisma.approval.count(),
      this.prisma.aiMessage.count({ where: { processingState: 'FAILED' } }),
      this.prisma.notification.count(),
      this.prisma.notification.count({ where: { status: 'failed' } }),
      this.prisma.messageTemplate.count(),
      this.prisma.messageTemplate.count({ where: { status: { notIn: ['APPROVED', 'approved'] } } }),
      this.prisma.automation.count(),
      this.prisma.automation.count({ where: { enabled: true } }),
      this.prisma.automation.aggregate({ _sum: { totalRuns: true } }),
      this.prisma.webhookEventLog.count(),
      this.prisma.webhookEventLog.count({ where: { status: 'FAILED' } }),
      this.prisma.user.count({ where: { facebookConnectStatus: true } }),
    ]);
    const byStatus: Record<string, number> = {};
    for (const d of deliveriesByStatus) byStatus[d.deliveryStatus ?? 'UNKNOWN'] = d._count._all;
    return {
      users: { total: users, superAdmins, suspended, detectionEnabled: detectionOn },
      deliveries: { total: deliveriesTotal, byStatus },
      credits: {
        deliveryBalance: wallets._sum.balance ?? 0,
        points: wallets._sum.points ?? 0,
        transactions,
        purchasesByStatus: purchases.map((p) => ({ status: p.status, count: p._count._all, amountKobo: p._sum.amountKobo ?? 0 })),
      },
      ai: {
        mode: this.ai.aiMode(),
        provider: this.ai.aiProvider().provider,
        model: this.ai.aiProvider().model,
        globalEnabled: this.ai.detectionGloballyEnabled(),
        conversations: aiConversations,
        drafts: aiDrafts,
        approvals,
        failedMessages: aiErrors,
        detectionEnabledTenants: detectionOn,
      },
      notifications: { total: notifications, failed: notificationsFailed },
      templates: { total: templates, pendingReview: templatesPending },
      automations: { total: automations, active: automationsActive, totalRuns: automationsRuns._sum.totalRuns ?? 0 },
      whatsapp: { connectedTenants: waConnected, webhookEvents, webhookFailed },
    };
  }

  // ---- Users ----
  async listUsers(search?: string, page = 1, limit = 20) {
    const { skip, take } = paging(page, limit);
    const where: Prisma.UserWhereInput = search?.trim()
      ? {
          OR: [
            { email: { contains: search.trim(), mode: 'insensitive' } },
            { businessName: { contains: search.trim(), mode: 'insensitive' } },
            { fullName: { contains: search.trim(), mode: 'insensitive' } },
          ],
        }
      : {};
    const [items, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
        select: {
          id: true,
          email: true,
          businessName: true,
          fullName: true,
          role: true,
          emailConfirmed: true,
          aiDeliveryDetectionEnabled: true,
          facebookConnectStatus: true,
          webhookStatus: true,
          displayPhoneNumber: true,
          selectedWabaId: true,
          selectedPhoneNumberId: true,
          createdAt: true,
          creditWallet: { select: { balance: true, points: true } },
          _count: { select: { aiConversations: true, deliveryDrafts: true, automations: true, messageTemplates: true } },
        },
      }),
      this.prisma.user.count({ where }),
    ]);
    return { items, total, page, limit: take };
  }

  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        businessName: true,
        fullName: true,
        role: true,
        emailConfirmed: true,
        aiDeliveryDetectionEnabled: true,
        facebookConnectStatus: true,
        webhookStatus: true,
        displayPhoneNumber: true,
        selectedWabaId: true,
        selectedFacebookBusinessName: true,
        selectedPhoneNumberId: true,
        senderPhone: true,
        senderAddress: true,
        senderEmail: true,
        createdAt: true,
        creditWallet: {
          select: {
            id: true,
            balance: true,
            points: true,
            transactions: { orderBy: { createdAt: 'desc' }, take: 20 },
            purchases: { orderBy: { createdAt: 'desc' }, take: 20, include: { package: true } },
          },
        },
        automations: { orderBy: { updatedAt: 'desc' }, take: 20 },
        messageTemplates: { orderBy: { updatedAt: 'desc' }, take: 20 },
        _count: { select: { aiConversations: true, deliveryDrafts: true } },
      },
    });
    if (!user) throw new NotFoundException('User not found');
    const [deliveries, conversations, drafts] = await Promise.all([
      this.prisma.delivery.count({ where: { userId: id } }),
      this.prisma.aiConversation.count({ where: { userId: id } }),
      this.prisma.deliveryDraft.count({ where: { userId: id } }),
    ]);
    return { ...user, deliveries, conversations, drafts };
  }

  async setRole(adminId: string, targetId: string, role: 'USER' | 'SUPER_ADMIN' | 'LOGISTICS_PROVIDER') {
    if (adminId === targetId && role !== 'SUPER_ADMIN')
      throw new BadRequestException('You cannot demote yourself');
    const user = await this.prisma.user.update({
      where: { id: targetId },
      data: { role },
      select: { id: true, email: true, role: true },
    });
    await this.ai.audit(adminId, 'ADMIN', 'admin.user_role_changed', 'User', targetId, { role });
    return user;
  }

  async setSuspended(adminId: string, targetId: string, suspended: boolean) {
    if (adminId === targetId && suspended)
      throw new BadRequestException('You cannot suspend yourself');
    const user = await this.prisma.user.update({
      where: { id: targetId },
      data: { emailConfirmed: !suspended },
      select: { id: true, email: true, emailConfirmed: true },
    });
    await this.ai.audit(adminId, 'ADMIN', suspended ? 'admin.user_suspended' : 'admin.user_reactivated', 'User', targetId, {});
    return { ...user, suspended: !user.emailConfirmed };
  }

  async setDetection(adminId: string, targetId: string, enabled: boolean) {
    const user = await this.ai.adminSetDetection(adminId, targetId, enabled);
    return user;
  }

  async deleteUser(adminId: string, targetId: string) {
    if (adminId === targetId)
      throw new BadRequestException('You cannot delete your own account');
    const target = await this.prisma.user.findUnique({ where: { id: targetId }, select: { id: true, email: true, role: true } });
    if (!target) throw new NotFoundException('User not found');
    if (target.role === 'SUPER_ADMIN')
      throw new BadRequestException('Demote the super admin before deleting');
    const [deliveries] = await Promise.all([
      this.prisma.delivery.count({ where: { userId: targetId } }),
    ]);
    if (deliveries > 0)
      throw new BadRequestException(`User owns ${deliveries} deliveries; reassign or cancel them first`);
    await this.ai.audit(adminId, 'ADMIN', 'admin.user_deleted', 'User', targetId, { email: target.email });
    await this.prisma.user.delete({ where: { id: targetId } });
    return { deleted: true, id: targetId };
  }

  // ---- Deliveries ----
  async listDeliveries(search?: string, status?: string, page = 1, limit = 20) {
    const { skip, take } = paging(page, limit);
    const where: Prisma.DeliveryWhereInput = {
      ...(status ? { deliveryStatus: status } : {}),
      ...(search?.trim()
        ? {
            OR: [
              { trackingId: { contains: search.trim(), mode: 'insensitive' } },
              { senderName: { contains: search.trim(), mode: 'insensitive' } },
              { receiverName: { contains: search.trim(), mode: 'insensitive' } },
              { receiverPhone: { contains: search.trim(), mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    const [items, total] = await Promise.all([
      this.prisma.delivery.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take }),
      this.prisma.delivery.count({ where }),
    ]);
    return { items, total, page, limit: take };
  }

  async getDelivery(id: string) {
    const d = await this.prisma.delivery.findUnique({ where: { id } });
    if (!d) throw new NotFoundException('Delivery not found');
    const owner = d.userId
      ? await this.prisma.user.findUnique({ where: { id: d.userId }, select: { id: true, email: true, businessName: true } })
      : null;
    return { ...d, owner };
  }

  async updateDelivery(adminId: string, id: string, dto: { deliveryStatus?: string; paymentStatus?: string; bookingStatus?: string }) {
    const d = await this.prisma.delivery.findUnique({ where: { id } });
    if (!d) throw new NotFoundException('Delivery not found');
    const updated = await this.prisma.delivery.update({
      where: { id },
      data: {
        ...(dto.deliveryStatus !== undefined ? { deliveryStatus: dto.deliveryStatus } : {}),
        ...(dto.paymentStatus !== undefined ? { paymentStatus: dto.paymentStatus } : {}),
        ...(dto.bookingStatus !== undefined ? { bookingStatus: dto.bookingStatus } : {}),
        updatedAt: new Date(),
      },
    });
    await this.ai.audit(adminId, 'ADMIN', 'admin.delivery_updated', 'Delivery', id, dto as Record<string, unknown>);
    return updated;
  }

  async cancelDelivery(adminId: string, id: string) {
    const updated = await this.updateDelivery(adminId, id, { deliveryStatus: 'CANCELLED', bookingStatus: 'CANCELLED' });
    await this.ai.audit(adminId, 'ADMIN', 'admin.delivery_cancelled', 'Delivery', id, {});
    return updated;
  }

  async deleteDelivery(adminId: string, id: string) {
    const d = await this.prisma.delivery.findUnique({ where: { id } });
    if (!d) throw new NotFoundException('Delivery not found');
    if (d.paymentStatus === 'PAID')
      throw new BadRequestException('Paid deliveries cannot be deleted; cancel instead');
    await this.ai.audit(adminId, 'ADMIN', 'admin.delivery_deleted', 'Delivery', id, { trackingId: d.trackingId });
    await this.prisma.delivery.delete({ where: { id } });
    return { deleted: true, id };
  }

  // ---- Billing & credits ----
  async billingOverview(search?: string, page = 1, limit = 20) {
    const { skip, take } = paging(page, limit);
    const [purchases, totalPurchases, wallets, transactions] = await Promise.all([
      this.prisma.creditPurchase.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take,
        include: { package: true, wallet: { select: { userId: true, user: { select: { email: true, businessName: true } } } } },
      }),
      this.prisma.creditPurchase.count(),
      this.prisma.creditWallet.aggregate({ _sum: { balance: true, points: true } }),
      this.prisma.creditTransaction.count(),
    ]);
    const items = search?.trim()
      ? purchases.filter((p) =>
          [p.paymentReference, p.wallet?.user?.email, p.wallet?.user?.businessName]
            .filter(Boolean)
            .some((v) => String(v).toLowerCase().includes(search.trim().toLowerCase())),
        )
      : purchases;
    return {
      totals: { balance: wallets._sum.balance ?? 0, points: wallets._sum.points ?? 0, transactions, purchases: totalPurchases },
      items,
      total: totalPurchases,
      page,
      limit: take,
    };
  }

  async walletTransactions(userId: string, limit = 50) {
    const wallet = await this.prisma.creditWallet.findUnique({ where: { userId }, select: { id: true } });
    if (!wallet) return { items: [] };
    const items = await this.prisma.creditTransaction.findMany({
      where: { walletId: wallet.id },
      orderBy: { createdAt: 'desc' },
      take: Math.min(Math.max(limit, 1), 100),
    });
    return { items };
  }

  async adjustCredits(adminId: string, userId: string, amount: number, description?: string) {
    if (!Number.isInteger(amount) || amount === 0)
      throw new BadRequestException('Amount must be a non-zero integer');
    await this.prisma.creditWallet.upsert({ where: { userId }, create: { userId }, update: {} });
    // Direct ADMIN_ADJUSTMENT transaction row (positive or negative); spend() is tenant-scoped.
    const wallet = await this.prisma.creditWallet.findUniqueOrThrow({ where: { userId } });
    const balanceAfter = wallet.balance + amount;
    if (balanceAfter < 0) throw new BadRequestException('Adjustment would make balance negative');
    const tx = await this.prisma.creditTransaction.create({
      data: {
        walletId: wallet.id,
        type: 'ADMIN_ADJUSTMENT',
        amount,
        balanceAfter,
        description: description ?? `Admin adjustment by ${adminId}`,
        reference: `ADMIN-${Date.now()}-${userId.slice(0, 8)}`,
      },
    });
    await this.prisma.creditWallet.update({ where: { userId }, data: { balance: balanceAfter } });
    await this.ai.audit(adminId, 'ADMIN', 'admin.credits_adjusted', 'CreditWallet', wallet.id, { userId, amount });
    return tx;
  }

  // ---- Notifications ----
  async listNotifications(search?: string, status?: string, page = 1, limit = 20) {
    const { skip, take } = paging(page, limit);
    const where: Prisma.NotificationWhereInput = {
      ...(status ? { status } : {}),
      ...(search?.trim()
        ? {
            OR: [
              { recipientPhone: { contains: search.trim(), mode: 'insensitive' } },
              { templateName: { contains: search.trim(), mode: 'insensitive' } },
              { deliveryTrackingId: { contains: search.trim(), mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    const [items, total] = await Promise.all([
      this.prisma.notification.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take }),
      this.prisma.notification.count({ where }),
    ]);
    return { items, total, page, limit: take };
  }

  // ---- Templates ----
  async listTemplates(search?: string, status?: string, page = 1, limit = 20) {
    const { skip, take } = paging(page, limit);
    const where: Prisma.MessageTemplateWhereInput = {
      ...(status ? { status } : {}),
      ...(search?.trim()
        ? {
            OR: [
              { name: { contains: search.trim(), mode: 'insensitive' } },
              { category: { contains: search.trim(), mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    const [items, total] = await Promise.all([
      this.prisma.messageTemplate.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip,
        take,
        include: { user: { select: { id: true, email: true, businessName: true, selectedWabaId: true } } },
      }),
      this.prisma.messageTemplate.count({ where }),
    ]);
    return { items, total, page, limit: take };
  }

  async deleteTemplate(adminId: string, id: string) {
    const t = await this.prisma.messageTemplate.findUnique({ where: { id } });
    if (!t) throw new NotFoundException('Template not found');
    await this.ai.audit(adminId, 'ADMIN', 'admin.template_deleted', 'MessageTemplate', id, { name: t.name });
    await this.prisma.messageTemplate.delete({ where: { id } });
    return { deleted: true, id };
  }

  // ---- Automations ----
  async listAutomations(search?: string, enabled?: boolean, page = 1, limit = 20) {
    const { skip, take } = paging(page, limit);
    const where: Prisma.AutomationWhereInput = {
      ...(enabled !== undefined ? { enabled } : {}),
      ...(search?.trim()
        ? {
            OR: [
              { name: { contains: search.trim(), mode: 'insensitive' } },
              { trigger: { contains: search.trim(), mode: 'insensitive' } },
              { action: { contains: search.trim(), mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    const [items, total] = await Promise.all([
      this.prisma.automation.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip,
        take,
        include: { user: { select: { id: true, email: true, businessName: true } } },
      }),
      this.prisma.automation.count({ where }),
    ]);
    return { items, total, page, limit: take };
  }

  async toggleAutomation(adminId: string, id: string, enabled: boolean) {
    const a = await this.prisma.automation.findUnique({ where: { id } });
    if (!a) throw new NotFoundException('Automation not found');
    const updated = await this.prisma.automation.update({ where: { id }, data: { enabled } });
    await this.ai.audit(adminId, 'ADMIN', enabled ? 'admin.automation_enabled' : 'admin.automation_disabled', 'Automation', id, {});
    return updated;
  }

  async deleteAutomation(adminId: string, id: string) {
    const a = await this.prisma.automation.findUnique({ where: { id } });
    if (!a) throw new NotFoundException('Automation not found');
    await this.ai.audit(adminId, 'ADMIN', 'admin.automation_deleted', 'Automation', id, { name: a.name });
    await this.prisma.automation.delete({ where: { id } });
    return { deleted: true, id };
  }

  // ---- WhatsApp ----
  async listWhatsappConnections(search?: string, page = 1, limit = 20) {
    const { skip, take } = paging(page, limit);
    const where: Prisma.UserWhereInput = {
      OR: [
        { facebookConnectStatus: true },
        { selectedWabaId: { not: null } },
        { NOT: { selectedPhoneNumberId: { equals: [] } } },
      ],
      ...(search?.trim()
        ? {
            AND: {
              OR: [
                { email: { contains: search.trim(), mode: 'insensitive' } },
                { businessName: { contains: search.trim(), mode: 'insensitive' } },
                { selectedWabaId: { contains: search.trim(), mode: 'insensitive' } },
              ],
            },
          }
        : {}),
    };
    const [items, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
        select: {
          id: true,
          email: true,
          businessName: true,
          facebookConnectStatus: true,
          webhookStatus: true,
          selectedWabaId: true,
          selectedFacebookBusinessName: true,
          displayPhoneNumber: true,
          selectedPhoneNumberId: true,
          selectedPhoneNumberQualityRating: true,
        },
      }),
      this.prisma.user.count({ where }),
    ]);
    return { items, total, page, limit: take };
  }

  async whatsappActivity(userId?: string, limit = 50) {
    return this.whatsapp.getWebhookLogs(
      userId ?? (await this.firstUserId()),
      undefined,
      undefined,
      Math.min(Math.max(limit, 1), 100),
    );
  }

  private async firstUserId() {
    const u = await this.prisma.user.findFirst({ select: { id: true } });
    if (!u) throw new NotFoundException('No users yet');
    return u.id;
  }

  async disconnectWhatsapp(adminId: string, userId: string) {
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { facebookConnectStatus: false, webhookStatus: false },
      select: { id: true, email: true, facebookConnectStatus: true, webhookStatus: true },
    });
    await this.ai.audit(adminId, 'ADMIN', 'admin.whatsapp_disconnected', 'User', userId, {});
    return updated;
  }

  // ---- AI agents ----
  async aiAgents(search?: string, page = 1, limit = 20) {
    const { skip, take } = paging(page, limit);
    const where: Prisma.AiConversationWhereInput = search?.trim()
      ? {
          OR: [
            { customerWaId: { contains: search.trim(), mode: 'insensitive' } },
            { user: { email: { contains: search.trim(), mode: 'insensitive' } } },
          ],
        }
      : {};
    const [conversations, total, drafts, errors, intents] = await Promise.all([
      this.prisma.aiConversation.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip,
        take,
        include: {
          user: { select: { id: true, email: true, businessName: true, aiDeliveryDetectionEnabled: true } },
          messages: { orderBy: { createdAt: 'desc' }, take: 1 },
          drafts: { select: { id: true, status: true, confidence: true, updatedAt: true } },
        },
      }),
      this.prisma.aiConversation.count({ where }),
      this.prisma.deliveryDraft.groupBy({ by: ['status'], _count: { _all: true } }),
      this.prisma.aiMessage.findMany({
        where: { processingState: 'FAILED' },
        orderBy: { createdAt: 'desc' },
        take: 50,
        include: { conversation: { select: { userId: true, customerWaId: true } } },
      }),
      this.prisma.aiAuditEvent.findMany({
        where: { action: { startsWith: 'ai.extraction' } },
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
    ]);
    return {
      provider: { provider: this.ai.aiProvider().provider, model: this.ai.aiProvider().model, mode: this.ai.aiMode(), globalEnabled: this.ai.detectionGloballyEnabled() },
      conversations: { items: conversations, total, page, limit: take },
      draftsByStatus: Object.fromEntries(drafts.map((d) => [d.status, d._count._all])),
      errors,
      extractionActivity: intents,
    };
  }

  async aiConversationDetail(id: string) {
    const c = await this.prisma.aiConversation.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, email: true, businessName: true, aiDeliveryDetectionEnabled: true } },
        messages: { orderBy: { createdAt: 'asc' } },
        drafts: { orderBy: { createdAt: 'desc' }, include: { quotes: true, approvals: true } },
      },
    });
    if (!c) throw new NotFoundException('Conversation not found');
    return c;
  }
}
