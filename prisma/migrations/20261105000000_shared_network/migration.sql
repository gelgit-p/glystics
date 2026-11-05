-- CreateEnum
CREATE TYPE "SharedNetworkBusinessStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'PENDING');

-- CreateEnum
CREATE TYPE "SharedNetworkSubscriptionStatus" AS ENUM ('PENDING_PAYMENT', 'ACTIVE', 'PAST_DUE', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "SharedNetworkBillingCycle" AS ENUM ('MONTHLY', 'ANNUAL');

-- CreateEnum
CREATE TYPE "SharedNetworkCreditTxType" AS ENUM ('PURCHASE', 'USAGE', 'REFUND', 'ADMIN_ADJUSTMENT', 'EXPIRY');

-- CreateEnum
CREATE TYPE "SharedNetworkReservationStatus" AS ENUM ('CONFIRMED', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "SharedNetworkSlotStatus" AS ENUM ('DRAFT', 'BOOKED', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "SharedNetworkPoolStatus" AS ENUM ('OPEN', 'LOCKED', 'DISPATCHED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "SharedNetworkBillingTxType" AS ENUM ('SUBSCRIPTION', 'CAPACITY', 'CREDIT_PURCHASE', 'DELIVERY', 'REFUND');

-- CreateEnum
CREATE TYPE "SharedNetworkBillingTxStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "SharedNetworkInvoiceStatus" AS ENUM ('OPEN', 'PAID', 'VOID', 'OVERDUE');

-- CreateTable
CREATE TABLE "SharedNetworkPlan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "monthlyPriceKobo" INTEGER NOT NULL DEFAULT 0,
    "annualPriceKobo" INTEGER NOT NULL DEFAULT 0,
    "monthlyDeliveryVolume" INTEGER NOT NULL DEFAULT 0,
    "reservedCapacityAllowance" INTEGER NOT NULL DEFAULT 0,
    "maxActiveSlots" INTEGER NOT NULL DEFAULT 0,
    "poolingEligible" BOOLEAN NOT NULL DEFAULT true,
    "discountPercent" INTEGER NOT NULL DEFAULT 0,
    "analyticsAccess" BOOLEAN NOT NULL DEFAULT false,
    "aiDispatchAccess" BOOLEAN NOT NULL DEFAULT false,
    "priorityAllocation" BOOLEAN NOT NULL DEFAULT false,
    "maxLocations" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SharedNetworkPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedNetworkBusiness" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "businessEmail" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "pickupLocations" TEXT[],
    "operatingRegions" TEXT[],
    "expectedDailyVolume" INTEGER NOT NULL DEFAULT 0,
    "expectedWeeklyVolume" INTEGER NOT NULL DEFAULT 0,
    "preferredWindows" TEXT[],
    "status" "SharedNetworkBusinessStatus" NOT NULL DEFAULT 'ACTIVE',
    "aiAutoDispatchEnabled" BOOLEAN NOT NULL DEFAULT false,
    "aiAutoReserveEnabled" BOOLEAN NOT NULL DEFAULT false,
    "aiSpendLimitCredits" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SharedNetworkBusiness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedNetworkWallet" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "lifetimePurchased" INTEGER NOT NULL DEFAULT 0,
    "lifetimeSpent" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SharedNetworkWallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedNetworkCreditTransaction" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "type" "SharedNetworkCreditTxType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "balanceAfter" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "reference" TEXT,
    "idempotencyKey" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SharedNetworkCreditTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedNetworkCreditPurchase" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "amountKobo" INTEGER NOT NULL,
    "paymentReference" TEXT NOT NULL,
    "checkoutSessionId" TEXT,
    "checkoutUrl" TEXT,
    "status" "CreditPurchaseStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SharedNetworkCreditPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedNetworkSubscription" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "status" "SharedNetworkSubscriptionStatus" NOT NULL DEFAULT 'PENDING_PAYMENT',
    "billingCycle" "SharedNetworkBillingCycle" NOT NULL DEFAULT 'MONTHLY',
    "currentPeriodStart" TIMESTAMP(3),
    "currentPeriodEnd" TIMESTAMP(3),
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "paymentReference" TEXT,
    "checkoutSessionId" TEXT,
    "checkoutUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SharedNetworkSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedNetworkCapacity" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "region" TEXT NOT NULL,
    "window" TEXT NOT NULL,
    "vehicleType" TEXT NOT NULL DEFAULT 'BIKE',
    "totalCapacity" INTEGER NOT NULL,
    "reservedCapacity" INTEGER NOT NULL DEFAULT 0,
    "pricePerSlotCredits" INTEGER NOT NULL DEFAULT 1,
    "pricePerSlotKobo" INTEGER NOT NULL DEFAULT 0,
    "cutoffAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SharedNetworkCapacity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedNetworkReservation" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "capacityId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "pickupLocation" TEXT NOT NULL,
    "deliveryType" TEXT NOT NULL DEFAULT 'STANDARD',
    "status" "SharedNetworkReservationStatus" NOT NULL DEFAULT 'CONFIRMED',
    "costCredits" INTEGER NOT NULL DEFAULT 0,
    "costKobo" INTEGER NOT NULL DEFAULT 0,
    "idempotencyKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SharedNetworkReservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedNetworkSlot" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "window" TEXT NOT NULL,
    "startTime" TEXT,
    "endTime" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "pickupLocation" TEXT NOT NULL,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "recurrence" TEXT,
    "status" "SharedNetworkSlotStatus" NOT NULL DEFAULT 'DRAFT',
    "reservationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SharedNetworkSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedNetworkPool" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "window" TEXT NOT NULL,
    "status" "SharedNetworkPoolStatus" NOT NULL DEFAULT 'OPEN',
    "courierName" TEXT,
    "vehicleType" TEXT NOT NULL DEFAULT 'BIKE',
    "maxDeliveries" INTEGER NOT NULL DEFAULT 50,
    "totalDeliveries" INTEGER NOT NULL DEFAULT 0,
    "estimatedSavingsKobo" INTEGER NOT NULL DEFAULT 0,
    "cutoffAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SharedNetworkPool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedNetworkPoolDelivery" (
    "id" TEXT NOT NULL,
    "poolId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "deliveryId" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "pickupAddress" TEXT NOT NULL,
    "destinationRegion" TEXT NOT NULL,
    "packageWeightKg" DOUBLE PRECISION,
    "status" TEXT NOT NULL DEFAULT 'JOINED',
    "estimatedCostKobo" INTEGER NOT NULL DEFAULT 0,
    "estimatedSavingsKobo" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SharedNetworkPoolDelivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedNetworkBillingTransaction" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "type" "SharedNetworkBillingTxType" NOT NULL,
    "amountKobo" INTEGER NOT NULL,
    "status" "SharedNetworkBillingTxStatus" NOT NULL DEFAULT 'PENDING',
    "description" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "idempotencyKey" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SharedNetworkBillingTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedNetworkInvoice" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "subscriptionId" TEXT,
    "number" TEXT NOT NULL,
    "amountKobo" INTEGER NOT NULL,
    "status" "SharedNetworkInvoiceStatus" NOT NULL DEFAULT 'OPEN',
    "items" JSONB,
    "dueAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SharedNetworkInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedNetworkPricingRule" (
    "id" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "window" TEXT NOT NULL,
    "basePriceKobo" INTEGER NOT NULL DEFAULT 0,
    "pricePerSlotCredits" INTEGER NOT NULL DEFAULT 1,
    "poolingDiscountPercent" INTEGER NOT NULL DEFAULT 10,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SharedNetworkPricingRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedNetworkUsageRecord" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "costCredits" INTEGER NOT NULL DEFAULT 0,
    "costKobo" INTEGER NOT NULL DEFAULT 0,
    "reference" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SharedNetworkUsageRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedNetworkAuditLog" (
    "id" TEXT NOT NULL,
    "actorUserId" TEXT NOT NULL,
    "businessId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SharedNetworkAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SharedNetworkPlan_name_key" ON "SharedNetworkPlan"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SharedNetworkPlan_slug_key" ON "SharedNetworkPlan"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SharedNetworkBusiness_userId_key" ON "SharedNetworkBusiness"("userId");

-- CreateIndex
CREATE INDEX "SharedNetworkBusiness_status_idx" ON "SharedNetworkBusiness"("status");

-- CreateIndex
CREATE UNIQUE INDEX "SharedNetworkWallet_businessId_key" ON "SharedNetworkWallet"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "SharedNetworkCreditTransaction_reference_key" ON "SharedNetworkCreditTransaction"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "SharedNetworkCreditTransaction_idempotencyKey_key" ON "SharedNetworkCreditTransaction"("idempotencyKey");

-- CreateIndex
CREATE INDEX "SharedNetworkCreditTransaction_walletId_createdAt_idx" ON "SharedNetworkCreditTransaction"("walletId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "SharedNetworkCreditPurchase_paymentReference_key" ON "SharedNetworkCreditPurchase"("paymentReference");

-- CreateIndex
CREATE UNIQUE INDEX "SharedNetworkCreditPurchase_checkoutSessionId_key" ON "SharedNetworkCreditPurchase"("checkoutSessionId");

-- CreateIndex
CREATE INDEX "SharedNetworkCreditPurchase_walletId_status_idx" ON "SharedNetworkCreditPurchase"("walletId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "SharedNetworkSubscription_paymentReference_key" ON "SharedNetworkSubscription"("paymentReference");

-- CreateIndex
CREATE UNIQUE INDEX "SharedNetworkSubscription_checkoutSessionId_key" ON "SharedNetworkSubscription"("checkoutSessionId");

-- CreateIndex
CREATE INDEX "SharedNetworkSubscription_businessId_status_idx" ON "SharedNetworkSubscription"("businessId", "status");

-- CreateIndex
CREATE INDEX "SharedNetworkCapacity_region_window_date_idx" ON "SharedNetworkCapacity"("region", "window", "date");

-- CreateIndex
CREATE UNIQUE INDEX "SharedNetworkCapacity_date_region_window_vehicleType_key" ON "SharedNetworkCapacity"("date", "region", "window", "vehicleType");

-- CreateIndex
CREATE UNIQUE INDEX "SharedNetworkReservation_idempotencyKey_key" ON "SharedNetworkReservation"("idempotencyKey");

-- CreateIndex
CREATE INDEX "SharedNetworkReservation_businessId_createdAt_idx" ON "SharedNetworkReservation"("businessId", "createdAt");

-- CreateIndex
CREATE INDEX "SharedNetworkReservation_capacityId_status_idx" ON "SharedNetworkReservation"("capacityId", "status");

-- CreateIndex
CREATE INDEX "SharedNetworkSlot_businessId_date_idx" ON "SharedNetworkSlot"("businessId", "date");

-- CreateIndex
CREATE INDEX "SharedNetworkPool_region_window_date_status_idx" ON "SharedNetworkPool"("region", "window", "date", "status");

-- CreateIndex
CREATE INDEX "SharedNetworkPoolDelivery_poolId_idx" ON "SharedNetworkPoolDelivery"("poolId");

-- CreateIndex
CREATE INDEX "SharedNetworkPoolDelivery_businessId_idx" ON "SharedNetworkPoolDelivery"("businessId");

-- CreateIndex
CREATE INDEX "SharedNetworkPoolDelivery_deliveryId_idx" ON "SharedNetworkPoolDelivery"("deliveryId");

-- CreateIndex
CREATE UNIQUE INDEX "SharedNetworkBillingTransaction_reference_key" ON "SharedNetworkBillingTransaction"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "SharedNetworkBillingTransaction_idempotencyKey_key" ON "SharedNetworkBillingTransaction"("idempotencyKey");

-- CreateIndex
CREATE INDEX "SharedNetworkBillingTransaction_businessId_createdAt_idx" ON "SharedNetworkBillingTransaction"("businessId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "SharedNetworkInvoice_number_key" ON "SharedNetworkInvoice"("number");

-- CreateIndex
CREATE INDEX "SharedNetworkInvoice_businessId_status_idx" ON "SharedNetworkInvoice"("businessId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "SharedNetworkPricingRule_region_window_key" ON "SharedNetworkPricingRule"("region", "window");

-- CreateIndex
CREATE INDEX "SharedNetworkUsageRecord_businessId_createdAt_idx" ON "SharedNetworkUsageRecord"("businessId", "createdAt");

-- CreateIndex
CREATE INDEX "SharedNetworkAuditLog_businessId_createdAt_idx" ON "SharedNetworkAuditLog"("businessId", "createdAt");

-- CreateIndex
CREATE INDEX "SharedNetworkAuditLog_actorUserId_createdAt_idx" ON "SharedNetworkAuditLog"("actorUserId", "createdAt");

-- AddForeignKey
ALTER TABLE "SharedNetworkBusiness" ADD CONSTRAINT "SharedNetworkBusiness_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedNetworkWallet" ADD CONSTRAINT "SharedNetworkWallet_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "SharedNetworkBusiness"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedNetworkCreditTransaction" ADD CONSTRAINT "SharedNetworkCreditTransaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "SharedNetworkWallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedNetworkCreditPurchase" ADD CONSTRAINT "SharedNetworkCreditPurchase_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "SharedNetworkWallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedNetworkSubscription" ADD CONSTRAINT "SharedNetworkSubscription_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "SharedNetworkBusiness"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedNetworkSubscription" ADD CONSTRAINT "SharedNetworkSubscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "SharedNetworkPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedNetworkReservation" ADD CONSTRAINT "SharedNetworkReservation_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "SharedNetworkBusiness"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedNetworkReservation" ADD CONSTRAINT "SharedNetworkReservation_capacityId_fkey" FOREIGN KEY ("capacityId") REFERENCES "SharedNetworkCapacity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedNetworkSlot" ADD CONSTRAINT "SharedNetworkSlot_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "SharedNetworkBusiness"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedNetworkSlot" ADD CONSTRAINT "SharedNetworkSlot_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "SharedNetworkReservation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedNetworkPoolDelivery" ADD CONSTRAINT "SharedNetworkPoolDelivery_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "SharedNetworkPool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedNetworkPoolDelivery" ADD CONSTRAINT "SharedNetworkPoolDelivery_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "SharedNetworkBusiness"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedNetworkBillingTransaction" ADD CONSTRAINT "SharedNetworkBillingTransaction_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "SharedNetworkBusiness"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedNetworkInvoice" ADD CONSTRAINT "SharedNetworkInvoice_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "SharedNetworkBusiness"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedNetworkInvoice" ADD CONSTRAINT "SharedNetworkInvoice_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "SharedNetworkSubscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedNetworkUsageRecord" ADD CONSTRAINT "SharedNetworkUsageRecord_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "SharedNetworkBusiness"("id") ON DELETE CASCADE ON UPDATE CASCADE;

