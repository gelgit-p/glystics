import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'node:crypto';
import { Prisma } from 'prisma/generated';
import { PrismaService } from 'prisma/prisma.service';
import * as dto from './dto/logistics-provider.dto';
import { AdminNotificationsGateway } from './admin-notifications.gateway';

type Tx = Prisma.TransactionClient;

// Only these transitions are allowed; anything else is rejected (no arbitrary status changes).
const RESERVATION_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['AWAITING_PAYMENT', 'CONFIRMED', 'REJECTED', 'CANCELLED', 'EXPIRED'],
  AWAITING_PAYMENT: ['CONFIRMED', 'CANCELLED', 'EXPIRED'],
  CONFIRMED: ['ACCEPTED', 'CANCELLED', 'IN_PROGRESS'],
  ACCEPTED: ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['COMPLETED', 'CANCELLED'],
  REJECTED: [], EXPIRED: [], CANCELLED: [], COMPLETED: [],
};
const SHIPMENT_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['PICKUP_SCHEDULED', 'CANCELLED'],
  PICKUP_SCHEDULED: ['PICKED_UP', 'FAILED', 'CANCELLED'],
  PICKED_UP: ['IN_TRANSIT', 'FAILED'],
  IN_TRANSIT: ['OUT_FOR_DELIVERY', 'FAILED'],
  OUT_FOR_DELIVERY: ['DELIVERED', 'FAILED', 'RETURNED'],
  FAILED: ['PICKUP_SCHEDULED', 'RETURNED', 'CANCELLED'],
  DELIVERED: [], RETURNED: [], CANCELLED: [],
};
// Statuses that hold capacity. Only CONFIRMED/ACCEPTED/IN_PROGRESS are paid holds;
// PENDING/AWAITING_PAYMENT are temporary holds released on reject/cancel/expire.
const HOLDING = ['PENDING', 'AWAITING_PAYMENT', 'CONFIRMED', 'ACCEPTED', 'IN_PROGRESS'];
const ref = (p: string) => `${p}-${randomUUID().slice(0, 8).toUpperCase()}`;

@Injectable()
export class LogisticsProviderService {
  constructor(private prisma: PrismaService, private config: ConfigService, private adminNotifications?: AdminNotificationsGateway) {}

  // ---------- helpers ----------
  async commissionPercent(): Promise<number> {
    const env = this.config.get<string>('LOGISTICS_PLATFORM_COMMISSION_PERCENT');
    const parsed = env !== undefined && env !== '' ? Number(env) : NaN;
    if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 100) return parsed;
    const row = await this.prisma.logisticsProviderSetting.upsert({ where: { id: 'default' }, create: { id: 'default' }, update: {} });
    return row.commissionPercent;
  }
  private split(amountKobo: number, percent: number) {
    const commissionKobo = Math.round((amountKobo * percent) / 100);
    return { commissionKobo, providerEarningKobo: amountKobo - commissionKobo };
  }
  // Notifications reuse the existing Notification table (WhatsApp-template shaped, all fields optional in practice).
  private async notify(userId: string, templateName: string, message: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { displayPhoneNumber: true } });
      await this.prisma.notification.create({ data: { userId, recipientPhone: user?.displayPhoneNumber ?? '', templateName, templateLanguage: 'en', templateMessage: message, status: 'Queued' } });
    } catch { /* notifications are best-effort; never fail the operation */ }
  }
  private withAvailable<T extends { totalCapacity: number; reservedCapacity: number }>(c: T) {
    return { ...c, availableCapacity: Math.max(0, c.totalCapacity - c.reservedCapacity) };
  }

  async requireProvider(userId: string) {
    const p = await this.prisma.logisticsProvider.findUnique({ where: { userId }, include: { documents: true } });
    if (!p) throw new NotFoundException('PROFILE_NOT_FOUND: No logistics provider profile yet for this account. Create your provider profile first — capacity, zones, reservations and earnings are empty until then.');
    return p;
  }
  private assertCanPublish(p: { verificationStatus: string }) {
    if (p.verificationStatus !== 'VERIFIED') throw new ForbiddenException('Only verified and active providers can publish bookable capacity');
  }
  private async assertZoneCoverage(pId: string, dtoLike: { region: string; city: string; destinationZones: string[] }) {
    const zones = await this.prisma.logisticsZone.findMany({ where: { providerId: pId, isActive: true } });
    if (!zones.length) return; // no zones configured yet — coverage is enforced once zones exist
    const covered = zones.some((z) => z.city.toLowerCase() === dtoLike.city.toLowerCase() || z.region.toLowerCase() === dtoLike.region.toLowerCase());
    if (!covered) throw new BadRequestException('Capacity location is outside your configured delivery zones');
    const allowed = new Set(zones.flatMap((z) => z.supportedDestinations.map((d) => d.toLowerCase())));
    const outside = dtoLike.destinationZones.filter((d) => allowed.size && !allowed.has(d.toLowerCase()));
    if (outside.length) throw new BadRequestException(`Destinations outside your configured zones: ${outside.join(', ')}`);
  }

  // ---------- profile & verification ----------
  async getProfile(userId: string) {
    const p = await this.prisma.logisticsProvider.findUnique({ where: { userId }, include: { documents: true } });
    return p; // null => frontend shows profile onboarding form
  }
  async upsertProfile(userId: string, d: dto.UpsertProviderProfileDto) {
    const { payoutAccountNumber, ...rest } = d;
    const data = { ...rest, fleetSize: d.fleetSize ?? 0, ...(payoutAccountNumber ? { payoutAccountNumber: payoutAccountNumber.replace(/\D/g, '') } : {}) };
    return this.prisma.logisticsProvider.upsert({ where: { userId }, create: { userId, ...data }, update: data, include: { documents: true } });
  }
  async addDocument(userId: string, d: dto.AddDocumentDto) {
    const p = await this.requireProvider(userId);
    const doc = await this.prisma.logisticsVerificationDocument.create({ data: { providerId: p.id, name: d.name, url: d.url } });
    if (p.verificationStatus === 'UNVERIFIED' || p.verificationStatus === 'REJECTED') {
      await this.prisma.logisticsProvider.update({ where: { id: p.id }, data: { verificationStatus: 'PENDING_VERIFICATION' } });
    }
    // Realtime bell alert for SUPER_ADMINs (websocket); also persisted in admin list.
    this.adminNotifications?.notifyVerificationPending({ type: 'verification.pending', providerId: p.id, companyName: p.companyName, documentName: d.name, submittedAt: new Date().toISOString() });
    return doc;
  }

  // ---------- zones ----------
  async listZones(userId: string) { const p = await this.requireProvider(userId); return this.prisma.logisticsZone.findMany({ where: { providerId: p.id }, orderBy: { createdAt: 'desc' } }); }
  async createZone(userId: string, d: dto.CreateZoneDto) { const p = await this.requireProvider(userId); return this.prisma.logisticsZone.create({ data: { providerId: p.id, ...d, restrictedLocations: d.restrictedLocations ?? [], distantSurchargeKobo: d.distantSurchargeKobo ?? 0, estimatedDeliveryHours: d.estimatedDeliveryHours ?? 24, minPackages: d.minPackages ?? 1, supportedSizes: d.supportedSizes ?? [] } }); }
  async updateZone(userId: string, id: string, d: dto.UpdateZoneDto) {
    const p = await this.requireProvider(userId);
    const z = await this.prisma.logisticsZone.findFirst({ where: { id, providerId: p.id } });
    if (!z) throw new NotFoundException('Zone not found');
    return this.prisma.logisticsZone.update({ where: { id }, data: { ...d } });
  }
  async deleteZone(userId: string, id: string) {
    const p = await this.requireProvider(userId);
    const z = await this.prisma.logisticsZone.findFirst({ where: { id, providerId: p.id } });
    if (!z) throw new NotFoundException('Zone not found');
    await this.prisma.logisticsZone.delete({ where: { id } });
    return { deleted: true };
  }

  // ---------- capacity ----------
  async listCapacity(userId: string) { const p = await this.requireProvider(userId); const rows = await this.prisma.logisticsCapacity.findMany({ where: { providerId: p.id }, orderBy: { deliveryDate: 'desc' } }); return rows.map((r) => this.withAvailable(r)); }
  async createCapacity(userId: string, d: dto.CreateCapacityDto) {
    const p = await this.requireProvider(userId);
    const status = d.status ?? 'DRAFT';
    if (status === 'PUBLISHED') this.assertCanPublish(p);
    await this.assertZoneCoverage(p.id, d);
    const row = await this.prisma.logisticsCapacity.create({ data: { providerId: p.id, zoneId: d.zoneId, title: d.title, region: d.region, state: d.state, city: d.city, pickupZones: d.pickupZones, destinationZones: d.destinationZones, totalCapacity: d.totalCapacity, unit: d.unit ?? 'PACKAGES', maxWeightKg: d.maxWeightKg, maxDimensions: d.maxDimensions, deliveryDate: new Date(d.deliveryDate), pickupStartTime: d.pickupStartTime, pickupEndTime: d.pickupEndTime, deliveryTimeframe: d.deliveryTimeframe, pricePerPackageKobo: d.pricePerPackageKobo, minReservationQty: d.minReservationQty ?? 1, maxReservationQty: d.maxReservationQty, reservationDeadline: d.reservationDeadline ? new Date(d.reservationDeadline) : undefined, cancellationPolicy: d.cancellationPolicy, instructions: d.instructions, isRecurring: d.isRecurring ?? false, recurrence: d.recurrence, status } });
    return this.withAvailable(row);
  }
  async updateCapacity(userId: string, id: string, d: dto.UpdateCapacityDto) {
    const p = await this.requireProvider(userId);
    const c = await this.prisma.logisticsCapacity.findFirst({ where: { id, providerId: p.id } });
    if (!c) throw new NotFoundException('Capacity not found');
    if (d.totalCapacity < c.reservedCapacity) throw new BadRequestException('Total capacity cannot be reduced below the quantity already reserved');
    if (['FULL', 'EXPIRED', 'CANCELLED'].includes(c.status)) throw new BadRequestException(`Capacity in ${c.status} status cannot be edited`);
    const row = await this.prisma.logisticsCapacity.update({ where: { id }, data: { title: d.title, region: d.region, state: d.state, city: d.city, pickupZones: d.pickupZones, destinationZones: d.destinationZones, totalCapacity: d.totalCapacity, unit: d.unit, maxWeightKg: d.maxWeightKg, maxDimensions: d.maxDimensions, deliveryDate: new Date(d.deliveryDate), pickupStartTime: d.pickupStartTime, pickupEndTime: d.pickupEndTime, deliveryTimeframe: d.deliveryTimeframe, pricePerPackageKobo: d.pricePerPackageKobo, minReservationQty: d.minReservationQty, maxReservationQty: d.maxReservationQty, reservationDeadline: d.reservationDeadline ? new Date(d.reservationDeadline) : undefined, cancellationPolicy: d.cancellationPolicy, instructions: d.instructions, isRecurring: d.isRecurring, recurrence: d.recurrence } });
    return this.withAvailable(row);
  }
  async capacityAction(userId: string, id: string, action: string) {
    const p = await this.requireProvider(userId);
    const c = await this.prisma.logisticsCapacity.findFirst({ where: { id, providerId: p.id }, include: { reservations: { where: { status: { in: HOLDING as never } }, select: { id: true } } } });
    if (!c) throw new NotFoundException('Capacity not found');
    if (action === 'PUBLISH') { this.assertCanPublish(p); if (!['DRAFT', 'PAUSED'].includes(c.status)) throw new BadRequestException(`Cannot publish capacity in ${c.status} status`); return this.withAvailable(await this.prisma.logisticsCapacity.update({ where: { id }, data: { status: 'PUBLISHED' } })); }
    if (action === 'PAUSE') { if (c.status !== 'PUBLISHED') throw new BadRequestException('Only published capacity can be paused'); return this.withAvailable(await this.prisma.logisticsCapacity.update({ where: { id }, data: { status: 'PAUSED' } })); }
    if (action === 'RESUME') { this.assertCanPublish(p); if (c.status !== 'PAUSED') throw new BadRequestException('Only paused capacity can be resumed'); return this.withAvailable(await this.prisma.logisticsCapacity.update({ where: { id }, data: { status: 'PUBLISHED' } })); }
    // CANCEL: blocked while live reservations depend on this window.
    if (c.reservations.length) throw new BadRequestException('Capacity with active reservations cannot be cancelled. Cancel or complete those reservations first.');
    return this.withAvailable(await this.prisma.logisticsCapacity.update({ where: { id }, data: { status: 'CANCELLED' } }));
  }
  async duplicateCapacity(userId: string, id: string) {
    const p = await this.requireProvider(userId);
    const c = await this.prisma.logisticsCapacity.findFirst({ where: { id, providerId: p.id } });
    if (!c) throw new NotFoundException('Capacity not found');
    const { id: _id, reservedCapacity: _r, status: _s, createdAt: _c, updatedAt: _u, ...copy } = c;
    const row = await this.prisma.logisticsCapacity.create({ data: { ...copy, title: `${c.title} (copy)`, status: 'DRAFT', reservedCapacity: 0 } });
    return this.withAvailable(row);
  }
  /** Public marketplace browse (authenticated businesses): published, not expired, with availability. */
  async browseCapacity() {
    const rows = await this.prisma.logisticsCapacity.findMany({ where: { status: 'PUBLISHED', deliveryDate: { gte: new Date() } }, include: { provider: { select: { companyName: true, verificationStatus: true } } }, orderBy: { deliveryDate: 'asc' }, take: 100 });
    return rows.filter((r) => r.totalCapacity - r.reservedCapacity > 0).map((r) => ({ ...this.withAvailable(r), providerName: r.provider.companyName }));
  }

  // ---------- reservations ----------
  private async release(tx: Tx, reservation: { capacityId: string; quantity: number; status: string }) {
    if (HOLDING.includes(reservation.status)) await tx.logisticsCapacity.update({ where: { id: reservation.capacityId }, data: { reservedCapacity: { decrement: reservation.quantity } } });
  }
  private async transition(tx: Tx, r: { id: string; status: string }, next: string, actor: string, note?: string) {
    if (!RESERVATION_TRANSITIONS[r.status]?.includes(next)) throw new BadRequestException(`Reservation cannot move from ${r.status} to ${next}`);
    const updated = await tx.logisticsReservation.update({ where: { id: r.id }, data: { status: next as never } });
    await tx.logisticsReservationEvent.create({ data: { reservationId: r.id, status: next, note, actorUserId: actor } });
    return updated;
  }
  async createReservation(businessUserId: string, d: dto.CreateProviderReservationDto) {
    if (d.idempotencyKey) { const existing = await this.prisma.logisticsReservation.findUnique({ where: { idempotencyKey: d.idempotencyKey } }); if (existing) return existing; }
    const business = await this.prisma.user.findUnique({ where: { id: businessUserId }, select: { businessName: true } });
    const snBusiness = await this.prisma.sharedNetworkBusiness.findUnique({ where: { userId: businessUserId }, select: { id: true, businessName: true } });
    const percent = await this.commissionPercent();
    const created = await this.prisma.$transaction(async (tx) => {
      const capacity = await tx.logisticsCapacity.findUnique({ where: { id: d.capacityId }, include: { provider: true } });
      if (!capacity) throw new NotFoundException('Capacity not found');
      if (capacity.provider.userId === businessUserId) throw new BadRequestException('Providers cannot reserve their own capacity');
      if (capacity.status !== 'PUBLISHED') throw new BadRequestException('Capacity is not open for reservations');
      if (capacity.reservationDeadline && capacity.reservationDeadline < new Date()) throw new BadRequestException('Reservation deadline has passed');
      if (d.quantity < capacity.minReservationQty) throw new BadRequestException(`Minimum reservation quantity is ${capacity.minReservationQty}`);
      if (capacity.maxReservationQty && d.quantity > capacity.maxReservationQty) throw new BadRequestException(`Maximum reservation quantity per business is ${capacity.maxReservationQty}`);
      if (!capacity.destinationZones.map((z) => z.toLowerCase()).includes(d.destinationZone.toLowerCase())) throw new BadRequestException('Destination is not served by this capacity window');
      // Atomic claim: only succeeds while enough unreserved capacity remains (prevents overbooking).
      const claimed = await tx.logisticsCapacity.updateMany({ where: { id: capacity.id, reservedCapacity: { lte: capacity.totalCapacity - d.quantity } }, data: { reservedCapacity: { increment: d.quantity } } });
      if (!claimed.count) throw new BadRequestException(`Only ${Math.max(0, capacity.totalCapacity - capacity.reservedCapacity)} packages remaining in this window`);
      const amountKobo = capacity.pricePerPackageKobo * d.quantity;
      const reservation = await tx.logisticsReservation.create({ data: { reference: ref('LP-RES'), providerId: capacity.providerId, capacityId: capacity.id, businessUserId, businessId: snBusiness?.id, businessName: snBusiness?.businessName ?? business?.businessName ?? 'Business', quantity: d.quantity, pickupLocation: d.pickupLocation, destinationZone: d.destinationZone, amountKobo, ...this.split(amountKobo, percent), specialInstructions: d.specialInstructions, idempotencyKey: d.idempotencyKey, status: 'PENDING' } });
      await tx.logisticsReservationEvent.create({ data: { reservationId: reservation.id, status: 'PENDING', actorUserId: businessUserId } });
      const fresh = await tx.logisticsCapacity.findUnique({ where: { id: capacity.id } });
      if (fresh && fresh.totalCapacity - fresh.reservedCapacity <= 0 && fresh.status === 'PUBLISHED') await tx.logisticsCapacity.update({ where: { id: capacity.id }, data: { status: 'FULL' } });
      else if (fresh && fresh.totalCapacity > 0 && fresh.reservedCapacity / fresh.totalCapacity >= 0.9) await this.notify(capacity.provider.userId, 'logistics_capacity_almost_full', `Your capacity "${capacity.title}" is at least 90% reserved.`);
      return reservation;
    });
    const provider = await this.prisma.logisticsProvider.findUnique({ where: { id: created.providerId }, select: { userId: true } });
    if (provider) await this.notify(provider.userId, 'logistics_reservation_created', `New reservation ${created.reference} for ${created.quantity} packages.`);
    return created;
  }
  async listProviderReservations(userId: string) { const p = await this.requireProvider(userId); return this.prisma.logisticsReservation.findMany({ where: { providerId: p.id }, include: { capacity: true }, orderBy: { createdAt: 'desc' } }); }
  async listBusinessReservations(userId: string) { return this.prisma.logisticsReservation.findMany({ where: { businessUserId: userId }, include: { capacity: true, provider: { select: { companyName: true } } }, orderBy: { createdAt: 'desc' } }); }
  async getReservation(userId: string, id: string) {
    const p = await this.requireProvider(userId);
    const r = await this.prisma.logisticsReservation.findFirst({ where: { id, providerId: p.id }, include: { capacity: true, shipments: true, events: { orderBy: { createdAt: 'asc' } } } });
    if (!r) throw new NotFoundException('Reservation not found');
    return r;
  }
  async reservationAction(userId: string, id: string, d: dto.ReservationActionDto) {
    const p = await this.requireProvider(userId);
    const result = await this.prisma.$transaction(async (tx) => {
      const r = await tx.logisticsReservation.findFirst({ where: { id, providerId: p.id } });
      if (!r) throw new NotFoundException('Reservation not found');
      if (d.action === 'ACCEPT') {
        if (r.paymentStatus !== 'PAID') throw new BadRequestException('Only paid reservations can be accepted');
        return this.transition(tx, r, 'ACCEPTED', userId, d.note);
      }
      if (d.action === 'REJECT') {
        if (!d.reason) throw new BadRequestException('A rejection reason is required');
        const u = await this.transition(tx, r, 'REJECTED', userId, d.reason);
        await tx.logisticsReservation.update({ where: { id }, data: { rejectReason: d.reason, paymentStatus: r.paymentStatus === 'PAID' ? 'REFUNDED' : r.paymentStatus } });
        await this.release(tx, r);
        return u;
      }
      if (d.action === 'START') return this.transition(tx, r, 'IN_PROGRESS', userId, d.note);
      if (d.action === 'COMPLETE') return this.transition(tx, r, 'COMPLETED', userId, d.note);
      // CANCEL
      const u = await this.transition(tx, r, 'CANCELLED', userId, d.note ?? d.reason);
      if (r.paymentStatus === 'PAID') await tx.logisticsReservation.update({ where: { id }, data: { paymentStatus: 'REFUNDED' } });
      await this.release(tx, r);
      return u;
    });
    await this.notify(result.businessUserId, `logistics_reservation_${result.status.toLowerCase()}`, `Reservation ${result.reference} is now ${result.status}.`);
    return result;
  }
  /** Business-side cancel: releases the hold and refunds (status-level) a paid reservation. */
  async cancelBusinessReservation(userId: string, id: string) {
    const result = await this.prisma.$transaction(async (tx) => {
      const r = await tx.logisticsReservation.findFirst({ where: { id, businessUserId: userId } });
      if (!r) throw new NotFoundException('Reservation not found');
      const u = await this.transition(tx, r, 'CANCELLED', userId);
      if (r.paymentStatus === 'PAID') await tx.logisticsReservation.update({ where: { id }, data: { paymentStatus: 'REFUNDED' } });
      await this.release(tx, r);
      return u;
    });
    const provider = await this.prisma.logisticsProvider.findUnique({ where: { id: result.providerId }, select: { userId: true } });
    if (provider) await this.notify(provider.userId, 'logistics_reservation_cancelled', `Reservation ${result.reference} was cancelled by the business.`);
    return result;
  }
  /** Marks a reservation paid (called by the existing payment flow / provider confirmation). */
  async markPaid(userId: string, id: string) {
    const p = await this.requireProvider(userId);
    return this.prisma.$transaction(async (tx) => {
      const r = await tx.logisticsReservation.findFirst({ where: { id, providerId: p.id } });
      if (!r) throw new NotFoundException('Reservation not found');
      const paid = await tx.logisticsReservation.update({ where: { id }, data: { paymentStatus: 'PAID' } });
      if (r.status === 'PENDING' || r.status === 'AWAITING_PAYMENT') await this.transition(tx, r, 'CONFIRMED', userId, 'Payment confirmed');
      return tx.logisticsReservation.findUnique({ where: { id } });
    }).then(async (r) => { if (r) await this.notify(userId, 'logistics_reservation_paid', `Payment confirmed for reservation ${r.reference}.`); return r; });
  }

  // ---------- shipments ----------
  async listShipments(userId: string) { const p = await this.requireProvider(userId); return this.prisma.logisticsShipment.findMany({ where: { providerId: p.id }, include: { reservation: { select: { reference: true, businessName: true } }, rider: true, attempts: { orderBy: { createdAt: 'desc' } } }, orderBy: { createdAt: 'desc' } }); }
  async createShipment(userId: string, d: dto.CreateShipmentDto) {
    const p = await this.requireProvider(userId);
    const reservation = await this.prisma.logisticsReservation.findFirst({ where: { id: d.reservationId, providerId: p.id } });
    if (!reservation) throw new NotFoundException('Reservation not found');
    if (d.riderId) { const rider = await this.prisma.logisticsRider.findFirst({ where: { id: d.riderId, providerId: p.id, isActive: true } }); if (!rider) throw new BadRequestException('Rider not found for this provider'); }
    if (d.deliveryId) {
      const delivery = await this.prisma.delivery.findUnique({ where: { id: d.deliveryId }, select: { id: true } });
      if (!delivery) throw new BadRequestException('Linked delivery not found');
      const duplicate = await this.prisma.logisticsShipment.findFirst({ where: { deliveryId: d.deliveryId } });
      if (duplicate) throw new BadRequestException('This delivery is already linked to a shipment');
    }
    const shipment = await this.prisma.logisticsShipment.create({ data: { reference: ref('LP-SHP'), reservationId: reservation.id, providerId: p.id, deliveryId: d.deliveryId, riderId: d.riderId, senderName: d.senderName, receiverName: d.receiverName, receiverPhone: d.receiverPhone, pickupAddress: d.pickupAddress, deliveryAddress: d.deliveryAddress, packageDescription: d.packageDescription, packageWeightKg: d.packageWeightKg, packageDimensions: d.packageDimensions, deliveryInstructions: d.deliveryInstructions, trackingReference: ref('TRK') } });
    if (d.riderId) await this.notify(userId, 'logistics_shipment_assigned', `Shipment ${shipment.reference} assigned to a rider.`);
    return shipment;
  }
  async updateShipment(userId: string, id: string, d: dto.UpdateShipmentDto) {
    const p = await this.requireProvider(userId);
    const s = await this.prisma.logisticsShipment.findFirst({ where: { id, providerId: p.id } });
    if (!s) throw new NotFoundException('Shipment not found');
    if (d.status && d.status !== s.status && !SHIPMENT_TRANSITIONS[s.status]?.includes(d.status)) throw new BadRequestException(`Shipment cannot move from ${s.status} to ${d.status}`);
    if (d.riderId) { const rider = await this.prisma.logisticsRider.findFirst({ where: { id: d.riderId, providerId: p.id, isActive: true, isAvailable: true } }); if (!rider) throw new BadRequestException('Rider is not available'); }
    const updated = await this.prisma.logisticsShipment.update({ where: { id }, data: { status: d.status, riderId: d.riderId, deliveryNote: d.deliveryNote, proofOfDeliveryUrl: d.proofOfDeliveryUrl, trackingReference: d.trackingReference } });
    if (d.status === 'FAILED' && d.attemptNote) await this.prisma.logisticsDeliveryAttempt.create({ data: { shipmentId: id, note: d.attemptNote } });
    if (d.status === 'DELIVERED') await this.notify(userId, 'logistics_delivery_completed', `Shipment ${s.reference} delivered.`);
    if (d.status === 'FAILED') await this.notify(userId, 'logistics_delivery_failed', `Delivery failed for shipment ${s.reference}.`);
    return updated;
  }

  // ---------- fleet ----------
  async listFleet(userId: string) { const p = await this.requireProvider(userId); const [riders, vehicles] = await Promise.all([this.prisma.logisticsRider.findMany({ where: { providerId: p.id }, include: { shipments: { select: { id: true, status: true } } }, orderBy: { createdAt: 'desc' } }), this.prisma.logisticsVehicle.findMany({ where: { providerId: p.id }, orderBy: { createdAt: 'desc' } })]); return { riders, vehicles }; }
  async createRider(userId: string, d: dto.CreateRiderDto) { const p = await this.requireProvider(userId); return this.prisma.logisticsRider.create({ data: { providerId: p.id, ...d, vehicleType: d.vehicleType ?? 'BIKE' } }); }
  async updateRider(userId: string, id: string, d: dto.UpdateRiderDto) { const p = await this.requireProvider(userId); const r = await this.prisma.logisticsRider.findFirst({ where: { id, providerId: p.id } }); if (!r) throw new NotFoundException('Rider not found'); return this.prisma.logisticsRider.update({ where: { id }, data: { ...d } }); }
  async createVehicle(userId: string, d: dto.CreateVehicleDto) { const p = await this.requireProvider(userId); return this.prisma.logisticsVehicle.create({ data: { providerId: p.id, ...d, capacityPackages: d.capacityPackages ?? 0 } }); }
  async deleteVehicle(userId: string, id: string) { const p = await this.requireProvider(userId); const v = await this.prisma.logisticsVehicle.findFirst({ where: { id, providerId: p.id } }); if (!v) throw new NotFoundException('Vehicle not found'); await this.prisma.logisticsVehicle.delete({ where: { id } }); return { deleted: true }; }

  // ---------- earnings & payouts ----------
  async earnings(userId: string) {
    const p = await this.requireProvider(userId);
    const percent = await this.commissionPercent();
    const [paid, payouts, reservations] = await Promise.all([
      this.prisma.logisticsReservation.findMany({ where: { providerId: p.id, paymentStatus: 'PAID' }, select: { amountKobo: true, commissionKobo: true, providerEarningKobo: true, status: true } }),
      this.prisma.logisticsPayout.findMany({ where: { providerId: p.id }, orderBy: { createdAt: 'desc' } }),
      this.prisma.logisticsReservation.findMany({ where: { providerId: p.id }, select: { status: true, paymentStatus: true, providerEarningKobo: true } }),
    ]);
    const gross = paid.reduce((s, r) => s + r.amountKobo, 0);
    const commission = paid.reduce((s, r) => s + r.commissionKobo, 0);
    const earned = paid.reduce((s, r) => s + r.providerEarningKobo, 0);
    const refunds = reservations.filter((r) => r.paymentStatus === 'REFUNDED').length;
    const paidOut = payouts.filter((x) => x.status === 'PAID' || x.status === 'PROCESSING').reduce((s, x) => s + x.amountKobo, 0);
    const pendingPayouts = payouts.filter((x) => x.status === 'PENDING').reduce((s, x) => s + x.amountKobo, 0);
    return { commissionPercent: percent, totalRevenueKobo: gross, platformCommissionKobo: commission, totalEarningsKobo: earned, completedDeliveryEarningsKobo: paid.filter((r) => r.status === 'COMPLETED').reduce((s, r) => s + r.providerEarningKobo, 0), pendingEarningsKobo: paid.filter((r) => r.status !== 'COMPLETED').reduce((s, r) => s + r.providerEarningKobo, 0), availableBalanceKobo: Math.max(0, earned - paidOut - pendingPayouts), pendingPayoutsKobo: pendingPayouts, refundCount: refunds, payouts, payoutBank: { bankName: p.payoutBankName, accountName: p.payoutAccountName, accountNumber: p.payoutAccountNumber } };
  }
  async requestPayout(userId: string, d: dto.RequestPayoutDto) {
    const p = await this.requireProvider(userId);
    if (!p.payoutBankName || !p.payoutAccountNumber) throw new BadRequestException('Add payout bank details in your provider profile first');
    const e = await this.earnings(userId);
    if (d.amountKobo > e.availableBalanceKobo) throw new BadRequestException('Amount exceeds available balance');
    const payout = await this.prisma.logisticsPayout.create({ data: { providerId: p.id, amountKobo: d.amountKobo, reference: ref('LP-PAY'), note: d.note } });
    await this.notify(userId, 'logistics_payout_requested', `Payout of ₦${(d.amountKobo / 100).toLocaleString()} requested (${payout.reference}).`);
    return payout;
  }

  // ---------- overview ----------
  async overview(userId: string) {
    const p = await this.requireProvider(userId);
    const [capacities, reservations, shipments, e] = await Promise.all([
      this.prisma.logisticsCapacity.findMany({ where: { providerId: p.id } }),
      this.prisma.logisticsReservation.findMany({ where: { providerId: p.id }, include: { capacity: { select: { title: true } } }, orderBy: { createdAt: 'desc' } }),
      this.prisma.logisticsShipment.findMany({ where: { providerId: p.id }, orderBy: { createdAt: 'desc' }, take: 10 }),
      this.earnings(userId),
    ]);
    const holding = reservations.filter((r) => HOLDING.includes(r.status));
    const totalPublished = capacities.filter((c) => c.status !== 'DRAFT').reduce((s, c) => s + c.totalCapacity, 0);
    const reserved = capacities.reduce((s, c) => s + c.reservedCapacity, 0);
    const byDay = new Map<string, number>();
    for (const r of reservations) { const k = r.createdAt.toISOString().slice(0, 10); byDay.set(k, (byDay.get(k) ?? 0) + 1); }
    const activeShipments = await this.prisma.logisticsShipment.count({ where: { providerId: p.id, status: { in: ['PICKUP_SCHEDULED', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY'] } } });
    const delivered = await this.prisma.logisticsShipment.count({ where: { providerId: p.id, status: 'DELIVERED' } });
    const failed = await this.prisma.logisticsShipment.count({ where: { providerId: p.id, status: 'FAILED' } });
    return {
      provider: { id: p.id, companyName: p.companyName, verificationStatus: p.verificationStatus },
      stats: {
        totalPublishedCapacity: totalPublished, availableCapacity: Math.max(0, totalPublished - reserved), reservedCapacity: reserved,
        capacityInUse: holding.filter((r) => r.status === 'IN_PROGRESS').reduce((s, r) => s + r.quantity, 0),
        totalReservations: reservations.length, pendingReservations: reservations.filter((r) => r.status === 'PENDING' || r.status === 'AWAITING_PAYMENT').length,
        confirmedReservations: reservations.filter((r) => ['CONFIRMED', 'ACCEPTED'].includes(r.status)).length,
        activeDeliveries: activeShipments, completedDeliveries: reservations.filter((r) => r.status === 'COMPLETED').length,
        cancelledReservations: reservations.filter((r) => r.status === 'CANCELLED').length,
        totalEarningsKobo: e.totalEarningsKobo, pendingPayoutsKobo: e.pendingPayoutsKobo,
      },
      capacityUtilization: capacities.map((c) => ({ title: c.title, total: c.totalCapacity, reserved: c.reservedCapacity, available: Math.max(0, c.totalCapacity - c.reservedCapacity) })),
      reservationsOverTime: [...byDay.entries()].map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date)),
      deliveryPerformance: { delivered, failed, active: activeShipments },
      recentReservations: reservations.slice(0, 8),
      recentShipments: shipments,
      upcomingWindows: capacities.filter((c) => ['PUBLISHED', 'FULL', 'PAUSED'].includes(c.status) && c.deliveryDate >= new Date()).sort((a, b) => +a.deliveryDate - +b.deliveryDate).slice(0, 6).map((c) => this.withAvailable(c)),
      alerts: [
        ...(p.verificationStatus !== 'VERIFIED' ? [{ type: 'verification', message: `Verification is ${p.verificationStatus}. Verified providers can publish bookable capacity.` }] : []),
        ...capacities.filter((c) => c.status === 'PUBLISHED' && c.totalCapacity > 0 && c.reservedCapacity / c.totalCapacity >= 0.9).map((c) => ({ type: 'capacity', message: `"${c.title}" is at least 90% reserved.` })),
        ...reservations.filter((r) => r.status === 'PENDING').slice(0, 3).map((r) => ({ type: 'reservation', message: `Reservation ${r.reference} is awaiting action.` })),
      ],
    };
  }

  // ---------- admin ----------
  async adminProviders() { return this.prisma.logisticsProvider.findMany({ include: { user: { select: { id: true, email: true, role: true } }, documents: true, _count: { select: { capacities: true, reservations: true } } }, orderBy: { createdAt: 'desc' } }); }
  async adminSetVerification(adminId: string, providerId: string, d: dto.AdminVerificationDto) {
    const p = await this.prisma.logisticsProvider.findUnique({ where: { id: providerId } });
    if (!p) throw new NotFoundException('Provider not found');
    const updated = await this.prisma.logisticsProvider.update({ where: { id: providerId }, data: { verificationStatus: d.status, verificationNote: d.note } });
    await this.notify(p.userId, 'logistics_verification_changed', `Your provider verification status is now ${d.status}.`);
    return updated;
  }
  async adminSetCommission(adminId: string, d: dto.AdminCommissionDto) {
    return this.prisma.logisticsProviderSetting.upsert({ where: { id: 'default' }, create: { id: 'default', commissionPercent: d.commissionPercent, updatedByUserId: adminId }, update: { commissionPercent: d.commissionPercent, updatedByUserId: adminId } });
  }
  async adminPayoutAction(id: string, status: 'PROCESSING' | 'PAID' | 'FAILED' | 'CANCELLED') {
    const payout = await this.prisma.logisticsPayout.findUnique({ where: { id }, include: { provider: { select: { userId: true } } } });
    if (!payout) throw new NotFoundException('Payout not found');
    const updated = await this.prisma.logisticsPayout.update({ where: { id }, data: { status } });
    await this.notify(payout.provider.userId, 'logistics_payout_processed', `Payout ${payout.reference} is now ${status}.`);
    return updated;
  }
}
