import { BadRequestException, Logger, ConflictException, ForbiddenException, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'node:crypto';
import { Prisma } from 'prisma/generated';
import { PrismaService } from 'prisma/prisma.service';
import { BachsService } from '../payment/payment.service';
import { CreditsService } from '../credits/credit.service';
import * as dto from './dto/shared-network.dto';

type Tx = Prisma.TransactionClient;
const DAY = 86400000;

@Injectable()
export class SharedNetworkService {
  private readonly logger = new Logger(SharedNetworkService.name);
  constructor(private prisma: PrismaService, private bachs: BachsService, private config: ConfigService, private credits: CreditsService) { }

  async getNetworkSetting() {
    return this.prisma.sharedNetworkSetting.upsert({ where: { id: 'default' }, create: { id: 'default', networkEnabled: true }, update: {} });
  }
  async assertNetworkEnabled() {
    const s = await this.getNetworkSetting();
    if (!s.networkEnabled) throw new ServiceUnavailableException(s.disabledMessage || 'The Shared Delivery Network is currently unavailable. Please try again later.');
    return s;
  }
  async adminSetNetworkEnabled(actor: string, enabled: boolean, disabledMessage?: string) {
    const s = await this.prisma.sharedNetworkSetting.upsert({ where: { id: 'default' }, create: { id: 'default', networkEnabled: enabled, disabledMessage: disabledMessage ?? null, updatedByUserId: actor }, update: { networkEnabled: enabled, disabledMessage: disabledMessage ?? null, updatedByUserId: actor } });
    await this.prisma.sharedNetworkAuditLog.create({ data: { actorUserId: actor, action: enabled ? 'NETWORK_ENABLED' : 'NETWORK_DISABLED', entityType: 'SharedNetworkSetting', entityId: s.id, metadata: { disabledMessage: disabledMessage ?? null } as never } });
    return s;
  }

  // ---------- plans (configurable, seeded from env/defaults, admin-editable) ----------
  async ensurePlans() {
    const defaults = [
      { name: 'Network Growth', slug: 'network-growth', description: 'For growing businesses', monthlyPriceKobo: 1500000, annualPriceKobo: 15000000, monthlyDeliveryVolume: 5, reservedCapacityAllowance: 150, maxActiveSlots: 20, discountPercent: 5, analyticsAccess: true, aiDispatchAccess: true, priorityAllocation: false, maxLocations: 3, sortOrder: 2 },
      { name: 'Network Business', slug: 'network-business', description: 'For established retailers', monthlyPriceKobo: 5000000, annualPriceKobo: 50000000, monthlyDeliveryVolume: 15, reservedCapacityAllowance: 600, maxActiveSlots: 100, discountPercent: 10, analyticsAccess: true, aiDispatchAccess: true, priorityAllocation: true, maxLocations: 10, sortOrder: 3 },
    ];
    for (const p of defaults) await this.prisma.sharedNetworkPlan.upsert({ where: { slug: p.slug }, create: p, update: {} });
    return this.prisma.sharedNetworkPlan.findMany({ where: { isActive: true, monthlyPriceKobo: { gt: 0 }, annualPriceKobo: { gt: 0 } }, orderBy: { sortOrder: 'asc' } });
  }
  async listPlans() { return this.ensurePlans(); }

  // ---------- business ----------
  async requireBusiness(userId: string) {
    await this.assertNetworkEnabled();
    const b = await this.prisma.sharedNetworkBusiness.findUnique({ where: { userId }, include: { user: { select: { id: true, email: true, businessName: true, creditWallet: { select: { balance: true, id: true } } } }, subscriptions: { include: { plan: true }, orderBy: { createdAt: 'desc' }, take: 1 } } });
    if (!b) throw new NotFoundException('Shared Network business not found. Complete onboarding first.');
    if (b.status === 'SUSPENDED') throw new ForbiddenException('Shared Network account is suspended');
    if (!b.accessEnabled) throw new ForbiddenException('Your Shared Delivery Network access has been deactivated by an administrator. Please contact Dispatchly support.');
    return b;
  }
  async getBusiness(userId: string) {
    const b = await this.prisma.sharedNetworkBusiness.findUnique({ where: { userId }, include: { subscriptions: { include: { plan: true }, orderBy: { createdAt: 'desc' } } } });
    if (!b) return null; // null => frontend shows onboarding CTA (not an error)
    const billingRow = await this.prisma.creditWallet.upsert({ where: { userId }, create: { userId }, update: {} });
    return { ...b, wallet: { id: billingRow.id, balance: billingRow.balance, points: billingRow.points }, billingBalance: billingRow.balance };
  }
  async createBusiness(userId: string, d: dto.CreateNetworkBusinessDto) {
    await this.assertNetworkEnabled();
    await this.ensurePlans();
    const existing = await this.prisma.sharedNetworkBusiness.findUnique({ where: { userId } });
    if (existing) throw new ConflictException('Shared Network already activated for this account');
    const business = await this.prisma.$transaction(async (tx) => {
      const b = await tx.sharedNetworkBusiness.create({ data: { userId, businessName: d.businessName, businessEmail: d.businessEmail, contactPhone: d.contactPhone, category: d.category, pickupLocations: d.pickupLocations, operatingRegions: d.operatingRegions, expectedDailyVolume: d.expectedDailyVolume ?? 0, expectedWeeklyVolume: d.expectedWeeklyVolume ?? 0, preferredWindows: d.preferredWindows ?? [] } });
      return b;
    });
    if (!d.planId) throw new BadRequestException('A paid subscription plan is required to join the Shared Delivery Network');
    const subscription = await this.createSubscription(userId, { planId: d.planId, billingCycle: d.billingCycle === 'ANNUAL' ? 'ANNUAL' : 'MONTHLY' });
    return { business: await this.getBusiness(userId), subscription };
  }
  async updateBusiness(userId: string, d: dto.UpdateNetworkBusinessDto) {
    const b = await this.requireBusiness(userId);
    return this.prisma.sharedNetworkBusiness.update({ where: { id: b.id }, data: { ...d } });
  }

  // ---------- subscriptions (separate billing; Bachs checkout, SN- refs) ----------
  async createSubscription(userId: string, d: dto.CreateSubscriptionDto) {
    const b = await this.requireBusiness(userId);
    const plan = await this.prisma.sharedNetworkPlan.findFirst({ where: { id: d.planId, isActive: true } });
    if (!plan) throw new NotFoundException('Plan not found');
    const cycle = d.billingCycle ?? 'MONTHLY';
    const amountKobo = cycle === 'ANNUAL' ? plan.annualPriceKobo : plan.monthlyPriceKobo;
    if (amountKobo <= 0) throw new BadRequestException('This plan is not available for paid subscription');
    const reference = `SN-SUB-${randomUUID()}`;
    const sub = await this.prisma.sharedNetworkSubscription.create({ data: { businessId: b.id, planId: plan.id, status: 'PENDING_PAYMENT', billingCycle: cycle, paymentReference: reference } });
    try {
      const checkout = await this.bachs.createCheckoutSession({ expires_in_minutes: 60, customer_creation: 'if_required', save_payment_method: false, pricing: { currency: 'NGN', amount: this.naira(amountKobo), price_type: 'fixed' }, billing_currency: 'NGN', reference } as any);
      const data = this.record(this.record(checkout)?.data) ?? this.record(checkout);
      const sid = typeof data?.checkout_id === 'string' ? data.checkout_id : typeof data?.id === 'string' ? data.id : undefined;
      const url = typeof data?.checkout_url === 'string' ? data.checkout_url : typeof data?.url === 'string' ? data.url : undefined;
      if (!sid || !url) throw new ServiceUnavailableException('Bachs did not return a checkout session');
      const saved = await this.prisma.sharedNetworkSubscription.update({ where: { id: sub.id }, data: { checkoutSessionId: sid, checkoutUrl: url } });
      return { subscription: saved, checkoutUrl: url, checkoutSessionId: sid };
    } catch (e) { await this.prisma.sharedNetworkSubscription.update({ where: { id: sub.id }, data: { status: 'CANCELLED' } }); throw e; }
  }
  async verifySubscription(userId: string, reference: string) {
    const b = await this.requireBusiness(userId);
    const sub = await this.prisma.sharedNetworkSubscription.findFirst({ where: { paymentReference: reference, businessId: b.id }, include: { plan: true } });
    if (!sub) throw new NotFoundException('Subscription not found');
    if (sub.status === 'ACTIVE') return { subscription: sub, status: 'ACTIVE' };
    if (!sub.checkoutSessionId) throw new ConflictException('Subscription has no checkout session');
    const session = await this.bachs.getCheckoutSessionById(sub.checkoutSessionId);
    const status = this.checkoutStatus(session);
    if (['failed', 'cancelled', 'canceled', 'expired', 'declined'].includes(status)) { const s = await this.prisma.sharedNetworkSubscription.update({ where: { id: sub.id }, data: { status: 'CANCELLED' } }); return { subscription: s, status: s.status }; }
    if (!['paid', 'succeeded', 'success', 'completed'].includes(status)) return { subscription: sub, status: 'PENDING' };
    const amount = sub.billingCycle === 'ANNUAL' ? sub.plan.annualPriceKobo : sub.plan.monthlyPriceKobo;
    this.assertPaid(session, reference, amount, sub.checkoutSessionId);
    return this.prisma.$transaction(async (tx) => {
      const claimed = await tx.sharedNetworkSubscription.updateMany({ where: { id: sub.id, status: 'PENDING_PAYMENT' }, data: { status: 'ACTIVE', currentPeriodStart: new Date(), currentPeriodEnd: new Date(Date.now() + (sub.billingCycle === 'ANNUAL' ? 365 : 30) * DAY) } });
      if (!claimed.count) return { subscription: await tx.sharedNetworkSubscription.findUniqueOrThrow({ where: { id: sub.id } }), status: 'ACTIVE' };
      await tx.sharedNetworkSubscription.updateMany({ where: { businessId: b.id, status: 'ACTIVE', id: { not: sub.id } }, data: { status: 'CANCELLED' } });
      await tx.sharedNetworkBillingTransaction.create({ data: { businessId: b.id, type: 'SUBSCRIPTION', amountKobo: amount, status: 'PAID', description: `${sub.plan.name} (${sub.billingCycle})`, reference, idempotencyKey: `sub:${reference}`, metadata: { subscriptionId: sub.id } as any } });
      await tx.sharedNetworkInvoice.create({ data: { businessId: b.id, subscriptionId: sub.id, number: `SN-INV-${randomUUID().slice(0, 8).toUpperCase()}`, amountKobo: amount, status: 'PAID', paidAt: new Date(), items: { plan: sub.plan.name, cycle: sub.billingCycle } as any } });
      return { subscription: await tx.sharedNetworkSubscription.findUniqueOrThrow({ where: { id: sub.id }, include: { plan: true } }), status: 'ACTIVE' };
    });
  }
  async currentSubscription(userId: string) { const b = await this.requireBusiness(userId); return this.prisma.sharedNetworkSubscription.findFirst({ where: { businessId: b.id, status: { in: ['ACTIVE', 'PENDING_PAYMENT', 'PAST_DUE'] } }, include: { plan: true }, orderBy: { createdAt: 'desc' } }); }
  async cancelSubscription(userId: string) { const b = await this.requireBusiness(userId); const s = await this.currentSubscription(userId); if (!s) throw new NotFoundException('No active subscription'); return this.prisma.sharedNetworkSubscription.update({ where: { id: s.id }, data: { cancelAtPeriodEnd: true } }); }

  // ---------- capacity + reservations (concurrency-safe) ----------
  async availableCapacity(q: dto.AvailableCapacityQueryDto) {
    const date = q.date ? new Date(q.date) : undefined;
    const rows = await this.prisma.sharedNetworkCapacity.findMany({ where: { region: q.region, ...(q.window ? { window: q.window } : {}), ...(q.vehicleType ? { vehicleType: q.vehicleType } : {}), ...(date ? { date } : { date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } }) }, orderBy: [{ date: 'asc' }, { window: 'asc' }], take: 100 });
    return rows.map((r) => ({ ...r, available: Math.max(0, r.totalCapacity - r.reservedCapacity) }));
  }
  private async activePlan(businessId: string) { const s = await this.prisma.sharedNetworkSubscription.findFirst({ where: { businessId, status: 'ACTIVE' }, include: { plan: true } }); return s?.plan ?? null; }

  async createReservation(userId: string, d: dto.CreateReservationDto) {
    const b = await this.requireBusiness(userId);
    if (d.idempotencyKey) { const dup = await this.prisma.sharedNetworkReservation.findUnique({ where: { idempotencyKey: d.idempotencyKey } }); if (dup) { if (dup.businessId !== b.id) throw new ConflictException('Idempotency key already used'); return dup; } }
    let capacity = d.capacityId ? await this.prisma.sharedNetworkCapacity.findUnique({ where: { id: d.capacityId } }) : null;
    if (!capacity) {
      if (!d.date || !d.region || !d.window) throw new BadRequestException('capacityId or date+region+window is required');
      capacity = await this.prisma.sharedNetworkCapacity.findFirst({ where: { date: new Date(d.date), region: d.region, window: d.window, ...(d.vehicleType ? { vehicleType: d.vehicleType } : {}) } });
    }
    if (!capacity) throw new NotFoundException('No capacity configured for that date/region/window. Ask admin to add capacity.');
    if (capacity.cutoffAt && capacity.cutoffAt < new Date()) throw new BadRequestException('Booking cut-off has passed for this capacity');
    const plan = await this.activePlan(b.id);
    const monthStart = new Date(); monthStart.setDate(1); monthStart.setHours(0, 0, 0, 0);
    const usedThisMonth = await this.prisma.sharedNetworkReservation.aggregate({ where: { businessId: b.id, status: 'CONFIRMED', createdAt: { gte: monthStart } }, _sum: { quantity: true } });
    if (plan && (usedThisMonth._sum.quantity ?? 0) + d.quantity > plan.reservedCapacityAllowance + plan.monthlyDeliveryVolume) throw new BadRequestException('Reservation exceeds your plan allowance');
    const costCredits = capacity.pricePerSlotCredits * d.quantity;
    try {
      return await this.prisma.$transaction(async (tx) => {
        // Atomic conditional increment = reservation locking / overbooking protection
        const claimed = await tx.sharedNetworkCapacity.updateMany({ where: { id: capacity!.id, reservedCapacity: { lte: capacity!.totalCapacity - d.quantity } }, data: { reservedCapacity: { increment: d.quantity } } });
        if (!claimed.count) {
          // re-check with fresh numbers for a precise error
          const fresh = await tx.sharedNetworkCapacity.findUniqueOrThrow({ where: { id: capacity!.id } });
          if (fresh.totalCapacity - fresh.reservedCapacity < d.quantity) throw new BadRequestException(`Only ${Math.max(0, fresh.totalCapacity - fresh.reservedCapacity)} slots available`);
          throw new ConflictException('Capacity changed, please retry');
        }
        if (costCredits > 0) await this.debitWallet(tx, b, costCredits, `Capacity reservation ${capacity!.region} ${capacity!.window} x${d.quantity}`, d.idempotencyKey ? `reserve:${d.idempotencyKey}` : `reserve:${randomUUID()}`);
        const reservation = await tx.sharedNetworkReservation.create({ data: { businessId: b.id, capacityId: capacity!.id, quantity: d.quantity, pickupLocation: d.pickupLocation, deliveryType: d.deliveryType ?? 'STANDARD', costCredits, costKobo: capacity!.pricePerSlotKobo * d.quantity, idempotencyKey: d.idempotencyKey ?? null }, include: { capacity: true } });
        await tx.sharedNetworkUsageRecord.create({ data: { businessId: b.id, type: 'RESERVATION', quantity: d.quantity, costCredits, costKobo: reservation.costKobo, reference: reservation.id } });
        return reservation;
      });
    } catch (e) { if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002' && d.idempotencyKey) { const dup = await this.prisma.sharedNetworkReservation.findUnique({ where: { idempotencyKey: d.idempotencyKey } }); if (dup) return dup; } throw e; }
  }
  async listReservations(userId: string) { const b = await this.requireBusiness(userId); return this.prisma.sharedNetworkReservation.findMany({ where: { businessId: b.id }, include: { capacity: true }, orderBy: { createdAt: 'desc' }, take: 100 }); }
  async updateReservation(userId: string, id: string, d: dto.UpdateReservationDto) {
    const b = await this.requireBusiness(userId);
    const r = await this.prisma.sharedNetworkReservation.findFirst({ where: { id, businessId: b.id }, include: { capacity: true } });
    if (!r || r.status !== 'CONFIRMED') throw new NotFoundException('Active reservation not found');
    if (!d.quantity || d.quantity === r.quantity) return r;
    const delta = d.quantity - r.quantity;
    return this.prisma.$transaction(async (tx) => {
      if (delta > 0) {
        const claimed = await tx.sharedNetworkCapacity.updateMany({ where: { id: r.capacityId, reservedCapacity: { lte: r.capacity.totalCapacity - delta } }, data: { reservedCapacity: { increment: delta } } });
        if (!claimed.count) throw new BadRequestException('Not enough remaining capacity');
        const cost = r.capacity.pricePerSlotCredits * delta; if (cost) await this.debitWallet(tx, b, cost, `Reservation increase x${delta}`, `reserve-inc:${id}:${d.quantity}`);
      } else {
        await tx.sharedNetworkCapacity.update({ where: { id: r.capacityId }, data: { reservedCapacity: { decrement: -delta } } });
        const refund = r.capacity.pricePerSlotCredits * -delta; if (refund) await this.refundWithinTx(tx, userId, refund, `Shared Network reservation reduction refund x${-delta}`, `reserve-dec:${id}:${d.quantity}`);
      }
      return tx.sharedNetworkReservation.update({ where: { id }, data: { quantity: d.quantity, costCredits: Math.max(0, r.costCredits + r.capacity.pricePerSlotCredits * delta) }, include: { capacity: true } });
    });
  }
  async cancelReservation(userId: string, id: string) {
    const b = await this.requireBusiness(userId);
    const r = await this.prisma.sharedNetworkReservation.findFirst({ where: { id, businessId: b.id } });
    if (!r || r.status !== 'CONFIRMED') throw new NotFoundException('Active reservation not found');
    return this.prisma.$transaction(async (tx) => {
      const claimed = await tx.sharedNetworkReservation.updateMany({ where: { id, status: 'CONFIRMED' }, data: { status: 'CANCELLED' } });
      if (!claimed.count) throw new ConflictException('Reservation already cancelled');
      await tx.sharedNetworkCapacity.update({ where: { id: r.capacityId }, data: { reservedCapacity: { decrement: r.quantity } } });
      if (r.costCredits) await this.refundWithinTx(tx, userId, r.costCredits, 'Shared Network reservation cancellation refund', `reserve-cancel:${id}`);
      await tx.sharedNetworkSlot.updateMany({ where: { reservationId: id, status: 'BOOKED' }, data: { status: 'CANCELLED' } });
      return tx.sharedNetworkReservation.findUniqueOrThrow({ where: { id } });
    });
  }

  // ---------- slots ----------
  async listSlots(userId: string) { const b = await this.requireBusiness(userId); return this.prisma.sharedNetworkSlot.findMany({ where: { businessId: b.id }, orderBy: { date: 'asc' }, take: 200 }); }
  async createSlot(userId: string, d: dto.CreateSlotDto) {
    const b = await this.requireBusiness(userId);
    const plan = await this.activePlan(b.id);
    if (plan) { const active = await this.prisma.sharedNetworkSlot.count({ where: { businessId: b.id, status: { in: ['DRAFT', 'BOOKED'] } } }); if (active >= plan.maxActiveSlots) throw new BadRequestException('Active slot limit reached for your plan'); }
    if (d.reservationId) { const r = await this.prisma.sharedNetworkReservation.findFirst({ where: { id: d.reservationId, businessId: b.id } }); if (!r) throw new NotFoundException('Reservation not found'); }
    return this.prisma.sharedNetworkSlot.create({ data: { businessId: b.id, title: d.title, date: new Date(d.date), window: d.window, startTime: d.startTime, endTime: d.endTime, quantity: d.quantity ?? 1, pickupLocation: d.pickupLocation, isRecurring: d.isRecurring ?? false, recurrence: d.recurrence, reservationId: d.reservationId ?? null } });
  }
  async bookSlot(userId: string, id: string, d: dto.BookSlotDto) {
    const b = await this.requireBusiness(userId);
    const slot = await this.prisma.sharedNetworkSlot.findFirst({ where: { id, businessId: b.id } });
    if (!slot) throw new NotFoundException('Slot not found');
    if (slot.status === 'BOOKED') return slot;
    let reservationId = d.reservationId ?? slot.reservationId;
    if (!reservationId) {
      const created = await this.createReservation(userId, { date: slot.date.toISOString(), region: d.region ?? b.operatingRegions[0] ?? 'Lagos', window: slot.window, quantity: d.quantity ?? slot.quantity, pickupLocation: slot.pickupLocation, idempotencyKey: d.idempotencyKey ?? `slot-book:${slot.id}` });
      reservationId = created.id;
    }
    return this.prisma.sharedNetworkSlot.update({ where: { id }, data: { status: 'BOOKED', reservationId } });
  }
  async unbookSlot(userId: string, id: string) {
    const b = await this.requireBusiness(userId);
    const slot = await this.prisma.sharedNetworkSlot.findFirst({ where: { id, businessId: b.id } });
    if (!slot) throw new NotFoundException('Slot not found');
    if (slot.reservationId) await this.cancelReservation(userId, slot.reservationId).catch(() => undefined);
    return this.prisma.sharedNetworkSlot.update({ where: { id }, data: { status: 'CANCELLED', reservationId: null } });
  }
  async deleteSlot(userId: string, id: string) { const b = await this.requireBusiness(userId); const s = await this.prisma.sharedNetworkSlot.findFirst({ where: { id, businessId: b.id } }); if (!s) throw new NotFoundException('Slot not found'); await this.prisma.sharedNetworkSlot.delete({ where: { id } }); return { deleted: true }; }

  // ---------- pools (privacy: other businesses see only aggregates) ----------
  private poolView(p: any, myBusinessId?: string) {
    const mine = myBusinessId ? (p.deliveries ?? []).filter((x: any) => x.businessId === myBusinessId) : [];
    return { id: p.id, name: p.name, region: p.region, date: p.date, window: p.window, status: p.status, courierName: p.courierName, vehicleType: p.vehicleType, maxDeliveries: p.maxDeliveries, totalDeliveries: p.totalDeliveries, estimatedSavingsKobo: p.estimatedSavingsKobo, cutoffAt: p.cutoffAt, businessCount: new Set((p.deliveries ?? []).map((x: any) => x.businessId)).size, myDeliveries: mine, remaining: Math.max(0, p.maxDeliveries - p.totalDeliveries) };
  }
  async listPools(userId: string, q: { region?: string; window?: string; date?: string }) {
    const b = await this.requireBusiness(userId);
    const pools = await this.prisma.sharedNetworkPool.findMany({ where: { ...(q.region ? { region: q.region } : {}), ...(q.window ? { window: q.window } : {}), ...(q.date ? { date: new Date(q.date) } : { date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } }) }, include: { deliveries: true }, orderBy: { date: 'asc' }, take: 100 });
    return pools.map((p) => this.poolView(p, b.id));
  }
  async getPool(userId: string, id: string) { const b = await this.requireBusiness(userId); const p = await this.prisma.sharedNetworkPool.findUnique({ where: { id }, include: { deliveries: true } }); if (!p) throw new NotFoundException('Pool not found'); return this.poolView(p, b.id); }
  async createPool(userId: string, d: dto.CreatePoolDto) {
    await this.requireBusiness(userId);
    const p = await this.prisma.sharedNetworkPool.create({ data: { name: d.name ?? `${d.region} ${d.window} pool`, region: d.region, date: new Date(d.date), window: d.window, vehicleType: d.vehicleType ?? 'BIKE', maxDeliveries: d.maxDeliveries ?? 50 } });
    return this.poolView(p);
  }
  async joinPool(userId: string, id: string, d: dto.JoinPoolDto) {
    const b = await this.requireBusiness(userId);
    const plan = await this.activePlan(b.id); if (plan && !plan.poolingEligible) throw new ForbiddenException('Your plan is not eligible for pooling');
    if (d.deliveryId) { const del = await this.prisma.delivery.findFirst({ where: { id: d.deliveryId, userId } }); if (!del) throw new NotFoundException('Delivery not found or not yours'); }
    const qty = d.quantity ?? 1;
    return this.prisma.$transaction(async (tx) => {
      const pool = await tx.sharedNetworkPool.findUniqueOrThrow({ where: { id } });
      if (pool.status !== 'OPEN') throw new BadRequestException('Pool is not open');
      if (pool.cutoffAt && pool.cutoffAt < new Date()) throw new BadRequestException('Pool cut-off has passed');
      if (pool.region !== d.destinationRegion && pool.region !== b.operatingRegions[0]) { /* region compatibility is advisory: require same destination region */ if (pool.region !== d.destinationRegion) throw new BadRequestException('Delivery destination region is not compatible with this pool'); }
      const claimed = await tx.sharedNetworkPool.updateMany({ where: { id, status: 'OPEN', totalDeliveries: { lte: pool.maxDeliveries - qty } }, data: { totalDeliveries: { increment: qty } } });
      if (!claimed.count) throw new BadRequestException('Pool is full');
      const rule = await tx.sharedNetworkPricingRule.findFirst({ where: { region: pool.region, window: pool.window, isActive: true } });
      const base = 150000; const discount = rule?.poolingDiscountPercent ?? plan?.discountPercent ?? 10;
      const est = Math.round(base * qty * (1 - discount / 100)); const savings = base * qty - est;
      const mine = await tx.sharedNetworkPoolDelivery.create({ data: { poolId: id, businessId: b.id, deliveryId: d.deliveryId ?? null, quantity: qty, pickupAddress: d.pickupAddress, destinationRegion: d.destinationRegion, packageWeightKg: d.packageWeightKg, estimatedCostKobo: est, estimatedSavingsKobo: savings } });
      await tx.sharedNetworkPool.update({ where: { id }, data: { estimatedSavingsKobo: { increment: savings } } });
      await tx.sharedNetworkUsageRecord.create({ data: { businessId: b.id, type: 'POOL_JOIN', quantity: qty, costKobo: est, reference: mine.id } });
      const fresh = await tx.sharedNetworkPool.findUniqueOrThrow({ where: { id }, include: { deliveries: true } });
      return { ...this.poolView(fresh, b.id), joined: mine };
    });
  }
  async leavePool(userId: string, id: string) {
    const b = await this.requireBusiness(userId);
    return this.prisma.$transaction(async (tx) => {
      const pool = await tx.sharedNetworkPool.findUniqueOrThrow({ where: { id } });
      if (pool.cutoffAt && pool.cutoffAt < new Date()) throw new BadRequestException('Cannot leave after cut-off');
      if (!['OPEN', 'LOCKED'].includes(pool.status)) throw new BadRequestException('Cannot leave this pool now');
      const mine = await tx.sharedNetworkPoolDelivery.findMany({ where: { poolId: id, businessId: b.id, status: 'JOINED' } });
      const qty = mine.reduce((s, x) => s + x.quantity, 0);
      if (qty) await tx.sharedNetworkPool.update({ where: { id }, data: { totalDeliveries: { decrement: qty } } });
      await tx.sharedNetworkPoolDelivery.updateMany({ where: { poolId: id, businessId: b.id, status: 'JOINED' }, data: { status: 'LEFT' } });
      return { left: qty };
    });
  }
  /** Suggest pools for a delivery/draft without exposing other businesses' data. */
  async recommend(userId: string, d: dto.AiRecommendDto) {
    const b = await this.requireBusiness(userId);
    const region = d.destinationRegion ?? d.region ?? b.operatingRegions[0] ?? 'Lagos';
    const pools = await this.prisma.sharedNetworkPool.findMany({ where: { region, status: 'OPEN', date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) }, ...(d.window ? { window: d.window } : {}) }, include: { deliveries: true }, take: 20 });
    const caps = await this.availableCapacity({ region, window: d.window, date: d.date });
    const scored = pools.map((p) => { const v = this.poolView(p, b.id); const fill = p.maxDeliveries ? p.totalDeliveries / p.maxDeliveries : 0; return { ...v, score: Math.round((0.6 * fill + 0.4 * (p.window === d.window ? 1 : 0.5)) * 100), reason: fill > 0.5 ? 'Well-filled pool: higher route savings' : 'Open pool in your region/window' }; }).sort((a, b2) => b2.score - a.score);
    return { requiresApproval: true, note: 'AI recommends only. No capacity is reserved and no credits are spent without your approval (or an enabled auto-dispatch rule with a spend limit).', region, recommendedPools: scored.slice(0, 5), availableCapacity: caps.slice(0, 10), estimatedSavingsPercent: scored[0] ? 10 : 0 };
  }

  // ---------- wallet / credits (separate ledger, idempotent Bachs purchase) ----------
  // Charges/refunds go to the user's existing Billing credits wallet (CreditWallet),
  // inside the caller's transaction so capacity + credit move atomically.
  private ownerId(business: { userId: string }) { return business.userId; }
  private async debitWallet(tx: Tx, business: { userId: string }, amount: number, description: string, idempotencyKey: string) {
    return this.credits.spendWithinTransaction(tx as never, { userId: this.ownerId(business), credits: amount, description, idempotencyKey: `sn:${idempotencyKey}`, metadata: { source: 'SHARED_NETWORK' } });
  }
  private async refundBillingCredits(userId: string, usageTransactionId: string, description: string) {
    return this.credits.refundUsage(userId, usageTransactionId, description);
  }
  // In-transaction refund mirroring CreditsService.refundUsage (idempotent by usage tx id).
  private async refundWithinTx(tx: Tx, userId: string, amount: number, description: string, idempotencyKey: string) {
    const key = `sn:${idempotencyKey}`;
    const prev = await tx.creditTransaction.findUnique({ where: { idempotencyKey: key } });
    if (prev) return prev;
    const wallet = await tx.creditWallet.upsert({ where: { userId }, create: { userId }, update: {} });
    const fresh = await tx.creditWallet.update({ where: { id: wallet.id }, data: { balance: { increment: amount } } });
    return tx.creditTransaction.create({ data: { walletId: wallet.id, type: 'REFUND', amount, balanceAfter: fresh.balance, description, idempotencyKey: key, metadata: { source: 'SHARED_NETWORK' } as never } });
  }
  async getCredits(userId: string) {
    const b = await this.requireBusiness(userId);
    // Canonical Billing balance: read the row directly so the Shared Network UI can never
    // drift from /credits/wallet (CreditsService.getWallet upserts the same row).
    const billingRow = await this.prisma.creditWallet.upsert({ where: { userId }, create: { userId }, update: {} });
    const wallet = await this.credits.getWallet(userId);
    if (wallet.balance !== billingRow.balance) this.logger.warn(`Billing balance mismatch for ${userId}: getWallet=${wallet.balance} row=${billingRow.balance}`);
    const transactions = await this.prisma.creditTransaction.findMany({ where: { wallet: { userId }, metadata: { path: ['source'], equals: 'SHARED_NETWORK' } }, orderBy: { createdAt: 'desc' }, take: 100 }).catch(() => []);
    const billingTransactions = transactions.length ? transactions : await this.prisma.creditTransaction.findMany({ where: { wallet: { userId }, description: { contains: 'Capacity reservation' } }, orderBy: { createdAt: 'desc' }, take: 100 }).catch(() => []);
    return { balance: billingRow.balance, wallet: { id: billingRow.id, walletId: billingRow.id, balance: billingRow.balance, points: billingRow.points, userId }, billingWallet: { ...wallet, balance: billingRow.balance, walletId: billingRow.id }, transactions: billingTransactions, purchaseUrl: '/billing' };
  }
  // ---------- billing / analytics / deliveries ----------
  async billingOverview(userId: string) {
    const b = await this.requireBusiness(userId);
    const billingRow = await this.prisma.creditWallet.upsert({ where: { userId }, create: { userId }, update: {} });
    const [wallet, sub, txns, invoices, monthUsage] = await Promise.all([
      this.credits.getWallet(userId),
      this.currentSubscription(userId),
      this.prisma.sharedNetworkBillingTransaction.findMany({ where: { businessId: b.id }, orderBy: { createdAt: 'desc' }, take: 50 }),
      this.prisma.sharedNetworkInvoice.findMany({ where: { businessId: b.id }, orderBy: { createdAt: 'desc' }, take: 50 }),
      this.prisma.sharedNetworkUsageRecord.aggregate({ where: { businessId: b.id, createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } }, _sum: { costKobo: true, costCredits: true, quantity: true } }),
    ]);
    return { balance: billingRow.balance, wallet: { id: billingRow.id, walletId: billingRow.id, balance: billingRow.balance, points: billingRow.points }, billingWallet: { ...wallet, balance: billingRow.balance, walletId: billingRow.id }, subscription: sub, transactions: txns, invoices, monthlyExpenditureKobo: monthUsage._sum.costKobo ?? 0, monthlyCreditsSpent: monthUsage._sum.costCredits ?? 0 };
  }
  async listTransactions(userId: string) { const b = await this.requireBusiness(userId); return this.prisma.sharedNetworkBillingTransaction.findMany({ where: { businessId: b.id }, orderBy: { createdAt: 'desc' }, take: 100 }); }
  async listInvoices(userId: string) { const b = await this.requireBusiness(userId); return this.prisma.sharedNetworkInvoice.findMany({ where: { businessId: b.id }, orderBy: { createdAt: 'desc' }, take: 100 }); }
  async analytics(userId: string) {
    const b = await this.requireBusiness(userId);
    const [reservations, pools, usage, deliveriesCount] = await Promise.all([
      this.prisma.sharedNetworkReservation.findMany({ where: { businessId: b.id }, include: { capacity: true } }),
      this.prisma.sharedNetworkPoolDelivery.findMany({ where: { businessId: b.id, status: 'JOINED' }, include: { pool: true } }),
      this.prisma.sharedNetworkUsageRecord.findMany({ where: { businessId: b.id }, orderBy: { createdAt: 'desc' }, take: 200 }),
      this.prisma.delivery.count({ where: { userId } }),
    ]);
    const reserved = reservations.filter((r) => r.status === 'CONFIRMED').reduce((s, r) => s + r.quantity, 0);
    const savings = pools.reduce((s, p) => s + p.estimatedSavingsKobo, 0);
    const spend = usage.reduce((s, u) => s + u.costKobo, 0);
    const byType: Record<string, number> = {}; usage.forEach((u) => { byType[u.type] = (byType[u.type] ?? 0) + u.quantity; });
    return { reservedCapacity: reserved, usedCapacity: reservations.filter((r) => r.status === 'COMPLETED').reduce((s, r) => s + r.quantity, 0), activePools: pools.length, pooledDeliveries: pools.reduce((s, p) => s + p.quantity, 0), estimatedSavingsKobo: savings, totalDeliveries: deliveriesCount, monthlyExpenditureKobo: spend, usageByType: byType, recentUsage: usage.slice(0, 20) };
  }
  async myDeliveries(userId: string) {
    await this.requireBusiness(userId);
    const [deliveries, pools] = await Promise.all([
      this.prisma.delivery.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 100 }),
      this.prisma.sharedNetworkPoolDelivery.findMany({ where: { businessId: (await this.requireBusiness(userId)).id }, include: { pool: true } }),
    ]);
    const poolByDelivery = new Map(pools.filter((p) => p.deliveryId).map((p) => [p.deliveryId!, p]));
    return deliveries.map((d) => ({ ...d, pool: poolByDelivery.get(d.id) ? { id: poolByDelivery.get(d.id)!.pool.id, name: poolByDelivery.get(d.id)!.pool.name, status: poolByDelivery.get(d.id)!.pool.status } : null }));
  }

  // ---------- admin ----------
  async adminOverview() {
    const [businesses, subs, pools, revenue, reservations] = await Promise.all([
      this.prisma.sharedNetworkBusiness.count(), this.prisma.sharedNetworkSubscription.count({ where: { status: 'ACTIVE' } }),
      this.prisma.sharedNetworkPool.count({ where: { status: { in: ['OPEN', 'LOCKED', 'DISPATCHED'] } } }),
      this.prisma.sharedNetworkBillingTransaction.aggregate({ where: { status: 'PAID' }, _sum: { amountKobo: true } }),
      this.prisma.sharedNetworkReservation.aggregate({ where: { status: 'CONFIRMED' }, _sum: { quantity: true } }),
    ]);
    return { businesses, activeSubscriptions: subs, activePools: pools, revenueKobo: revenue._sum.amountKobo ?? 0, reservedCapacity: reservations._sum.quantity ?? 0 };
  }
  async adminBusinesses() { return this.prisma.sharedNetworkBusiness.findMany({ include: { subscriptions: { include: { plan: true }, orderBy: { createdAt: 'desc' }, take: 1 }, user: { select: { id: true, email: true, businessName: true, creditWallet: { select: { balance: true, id: true } } } } }, orderBy: { createdAt: 'desc' }, take: 200 }); }
  async adminSetBusinessAccess(actor: string, id: string, enabled: boolean) {
    const b = await this.prisma.sharedNetworkBusiness.update({ where: { id }, data: { accessEnabled: enabled } });
    await this.prisma.sharedNetworkAuditLog.create({ data: { actorUserId: actor, businessId: id, action: enabled ? 'BUSINESS_ACCESS_ACTIVATED' : 'BUSINESS_ACCESS_DEACTIVATED', entityType: 'SharedNetworkBusiness', entityId: id } });
    return b;
  }
  async adminSetBusinessStatus(actor: string, id: string, status: 'ACTIVE' | 'SUSPENDED') { const b = await this.prisma.sharedNetworkBusiness.update({ where: { id }, data: { status } }); await this.prisma.sharedNetworkAuditLog.create({ data: { actorUserId: actor, businessId: id, action: `BUSINESS_${status}`, entityType: 'SharedNetworkBusiness', entityId: id } }); return b; }
  async adminAdjustCredits(actor: string, d: dto.AdminAdjustCreditsDto) {
    if (!d.amount) throw new BadRequestException('amount required');
    const business = await this.prisma.sharedNetworkBusiness.findUniqueOrThrow({ where: { id: d.businessId }, select: { userId: true } });
    return this.prisma.$transaction(async (tx) => {
      const wallet = await tx.creditWallet.upsert({ where: { userId: business.userId }, create: { userId: business.userId }, update: {} });
      if (d.amount < 0 && wallet.balance + d.amount < 0) throw new BadRequestException('Adjustment would make the Billing credits balance negative');
      const fresh = await tx.creditWallet.update({ where: { id: wallet.id }, data: { balance: { increment: d.amount } } });
      await tx.creditTransaction.create({ data: { walletId: wallet.id, type: 'ADMIN_ADJUSTMENT', amount: d.amount, balanceAfter: fresh.balance, description: d.reason, idempotencyKey: `sn:admin-adjust:${randomUUID()}`, metadata: { source: 'SHARED_NETWORK', actorUserId: actor } as never } });
      await tx.sharedNetworkAuditLog.create({ data: { actorUserId: actor, businessId: d.businessId, action: 'BILLING_CREDIT_ADJUSTMENT', entityType: 'CreditWallet', entityId: wallet.id, metadata: { amount: d.amount, reason: d.reason } as never } });
      return fresh;
    });
  }
  async adminUpsertPlan(actor: string, id: string | null, d: dto.AdminUpsertPlanDto) {
    const slug = d.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const plan = id ? await this.prisma.sharedNetworkPlan.update({ where: { id }, data: { ...d } }) : await this.prisma.sharedNetworkPlan.upsert({ where: { slug }, create: { ...d, slug }, update: { ...d } });
    await this.prisma.sharedNetworkAuditLog.create({ data: { actorUserId: actor, action: 'PLAN_UPSERT', entityType: 'SharedNetworkPlan', entityId: plan.id, metadata: { name: d.name } as any } });
    return plan;
  }
  async adminUpsertCapacity(actor: string, d: dto.AdminCapacityDto) {
    const date = new Date(d.date);
    const c = await this.prisma.sharedNetworkCapacity.upsert({ where: { date_region_window_vehicleType: { date, region: d.region, window: d.window, vehicleType: d.vehicleType ?? 'BIKE' } }, create: { date, region: d.region, window: d.window, vehicleType: d.vehicleType ?? 'BIKE', totalCapacity: d.totalCapacity, pricePerSlotCredits: d.pricePerSlotCredits ?? 1, pricePerSlotKobo: d.pricePerSlotKobo ?? 0 }, update: { totalCapacity: d.totalCapacity, pricePerSlotCredits: d.pricePerSlotCredits ?? 1, pricePerSlotKobo: d.pricePerSlotKobo ?? 0 } });
    if (c.reservedCapacity > c.totalCapacity) throw new BadRequestException('Total capacity cannot be below already-reserved capacity');
    await this.prisma.sharedNetworkAuditLog.create({ data: { actorUserId: actor, action: 'CAPACITY_UPSERT', entityType: 'SharedNetworkCapacity', entityId: c.id, metadata: { ...d } as any } });
    return c;
  }
  async adminPools() { const pools = await this.prisma.sharedNetworkPool.findMany({ include: { deliveries: true }, orderBy: { createdAt: 'desc' }, take: 100 }); return pools.map((p) => ({ ...this.poolView(p), deliveries: undefined, businessCount: new Set(p.deliveries.map((x) => x.businessId)).size })); }
  async adminTransactions() { return this.prisma.sharedNetworkBillingTransaction.findMany({ include: { business: { select: { businessName: true } } }, orderBy: { createdAt: 'desc' }, take: 200 }); }
  async adminAudit() { return this.prisma.sharedNetworkAuditLog.findMany({ orderBy: { createdAt: 'desc' }, take: 200 }); }
  async adminRefundReservation(actor: string, reservationId: string) {
    const r = await this.prisma.sharedNetworkReservation.findUnique({ where: { id: reservationId } });
    if (!r) throw new NotFoundException('Reservation not found');
    const businessOwner = await this.prisma.sharedNetworkBusiness.findUniqueOrThrow({ where: { id: r.businessId } });
    const cancelled = await this.cancelReservation(businessOwner.userId, reservationId);
    await this.prisma.sharedNetworkAuditLog.create({ data: { actorUserId: actor, businessId: r.businessId, action: 'RESERVATION_REFUND_CANCEL', entityType: 'SharedNetworkReservation', entityId: reservationId } });
    return cancelled;
  }

  // helpers mirroring CreditsService Bachs verification
  private naira(kobo: number) { return `${Math.floor(kobo / 100)}.${String(kobo % 100).padStart(2, '0')}`; }
  private record(v: unknown): Record<string, any> | undefined { return typeof v === 'object' && v !== null && !Array.isArray(v) ? (v as any) : undefined; }
  private checkoutStatus(r: unknown) { const n = this.record(this.record(r)?.data) ?? this.record(r); const p = this.record(n?.object) ?? n; return typeof p?.status === 'string' ? p.status.trim().toLowerCase() : ''; }
  private assertPaid(r: unknown, reference: string, amountKobo: number, checkoutId: string) {
    const n = this.record(this.record(r)?.data) ?? this.record(r); const p = this.record(n?.object) ?? n;
    if (!['paid', 'succeeded', 'success', 'completed'].includes(typeof p?.status === 'string' ? p.status.toLowerCase() : '')) throw new BadRequestException('Bachs has not confirmed payment');
    if (p?.reference !== reference) throw new BadRequestException('Bachs payment reference mismatch');
    const pricing = this.record(p?.pricing); const currency = p?.billing_currency ?? p?.currency ?? pricing?.currency;
    if (typeof currency !== 'string' || currency.toUpperCase() !== 'NGN') throw new BadRequestException('Bachs currency mismatch');
    const raw = p?.amount ?? p?.total_amount ?? pricing?.amount;
    if (typeof raw !== 'string' && typeof raw !== 'number') throw new BadRequestException('Bachs amount missing');
    const s = String(raw).trim(); if (!/^\d+(?:\.\d{1,2})?$/.test(s)) throw new BadRequestException('Bachs amount invalid');
    const [nairaPart, koboPart = ''] = s.split('.'); if (Number(nairaPart) * 100 + Number(koboPart.padEnd(2, '0')) !== amountKobo) throw new BadRequestException('Bachs paid amount mismatch');
    const cid = typeof p?.checkout_id === 'string' ? p.checkout_id : typeof p?.id === 'string' ? p.id : undefined;
    if (cid && cid !== checkoutId) throw new BadRequestException('Bachs checkout ID mismatch');
  }
}
