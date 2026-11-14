-- Logistics Provider marketplace: providers publish capacity, businesses reserve it.
CREATE TYPE "LogisticsVerificationStatus" AS ENUM ('UNVERIFIED', 'PENDING_VERIFICATION', 'VERIFIED', 'REJECTED', 'SUSPENDED');
CREATE TYPE "LogisticsCapacityStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'FULL', 'PAUSED', 'EXPIRED', 'CANCELLED');
CREATE TYPE "LogisticsReservationStatus" AS ENUM ('PENDING', 'AWAITING_PAYMENT', 'CONFIRMED', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'CANCELLED', 'IN_PROGRESS', 'COMPLETED');
CREATE TYPE "LogisticsPaymentStatus" AS ENUM ('UNPAID', 'PENDING', 'PAID', 'REFUNDED', 'FAILED');
CREATE TYPE "LogisticsShipmentStatus" AS ENUM ('PENDING', 'PICKUP_SCHEDULED', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'FAILED', 'RETURNED', 'CANCELLED');
CREATE TYPE "LogisticsPayoutStatus" AS ENUM ('PENDING', 'PROCESSING', 'PAID', 'FAILED', 'CANCELLED');

CREATE TABLE "LogisticsProviderSetting" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "commissionPercent" DOUBLE PRECISION NOT NULL DEFAULT 10,
    "updatedByUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "LogisticsProviderSetting_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "LogisticsProvider" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "registrationNumber" TEXT,
    "contactName" TEXT NOT NULL,
    "businessEmail" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "businessAddress" TEXT NOT NULL,
    "operatingRegions" TEXT[],
    "servicesOffered" TEXT[],
    "fleetSize" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "verificationStatus" "LogisticsVerificationStatus" NOT NULL DEFAULT 'UNVERIFIED',
    "verificationNote" TEXT,
    "payoutBankName" TEXT,
    "payoutAccountName" TEXT,
    "payoutAccountLast4" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "LogisticsProvider_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "LogisticsProvider_userId_key" ON "LogisticsProvider"("userId");
CREATE INDEX "LogisticsProvider_verificationStatus_idx" ON "LogisticsProvider"("verificationStatus");
ALTER TABLE "LogisticsProvider" ADD CONSTRAINT "LogisticsProvider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "LogisticsVerificationDocument" (
    "id" TEXT NOT NULL, "providerId" TEXT NOT NULL, "name" TEXT NOT NULL, "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LogisticsVerificationDocument_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "LogisticsVerificationDocument_providerId_idx" ON "LogisticsVerificationDocument"("providerId");
ALTER TABLE "LogisticsVerificationDocument" ADD CONSTRAINT "LogisticsVerificationDocument_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "LogisticsProvider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "LogisticsZone" (
    "id" TEXT NOT NULL, "providerId" TEXT NOT NULL, "name" TEXT NOT NULL, "region" TEXT NOT NULL,
    "state" TEXT NOT NULL, "city" TEXT NOT NULL, "pickupLocation" TEXT NOT NULL,
    "supportedDestinations" TEXT[], "restrictedLocations" TEXT[],
    "deliveryPriceKobo" INTEGER NOT NULL DEFAULT 0, "distantSurchargeKobo" INTEGER NOT NULL DEFAULT 0,
    "estimatedDeliveryHours" INTEGER NOT NULL DEFAULT 24, "minPackages" INTEGER NOT NULL DEFAULT 1,
    "maxPackages" INTEGER, "maxWeightKg" DOUBLE PRECISION, "supportedSizes" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "LogisticsZone_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "LogisticsZone_providerId_isActive_idx" ON "LogisticsZone"("providerId", "isActive");
ALTER TABLE "LogisticsZone" ADD CONSTRAINT "LogisticsZone_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "LogisticsProvider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "LogisticsCapacity" (
    "id" TEXT NOT NULL, "providerId" TEXT NOT NULL, "zoneId" TEXT, "title" TEXT NOT NULL,
    "region" TEXT NOT NULL, "state" TEXT NOT NULL, "city" TEXT NOT NULL,
    "pickupZones" TEXT[], "destinationZones" TEXT[],
    "totalCapacity" INTEGER NOT NULL, "reservedCapacity" INTEGER NOT NULL DEFAULT 0,
    "unit" TEXT NOT NULL DEFAULT 'PACKAGES', "maxWeightKg" DOUBLE PRECISION, "maxDimensions" TEXT,
    "deliveryDate" TIMESTAMP(3) NOT NULL, "pickupStartTime" TEXT NOT NULL, "pickupEndTime" TEXT NOT NULL,
    "deliveryTimeframe" TEXT NOT NULL, "pricePerPackageKobo" INTEGER NOT NULL,
    "minReservationQty" INTEGER NOT NULL DEFAULT 1, "maxReservationQty" INTEGER,
    "reservationDeadline" TIMESTAMP(3), "cancellationPolicy" TEXT, "instructions" TEXT,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false, "recurrence" TEXT,
    "status" "LogisticsCapacityStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "LogisticsCapacity_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "LogisticsCapacity_providerId_status_idx" ON "LogisticsCapacity"("providerId", "status");
CREATE INDEX "LogisticsCapacity_status_deliveryDate_idx" ON "LogisticsCapacity"("status", "deliveryDate");
ALTER TABLE "LogisticsCapacity" ADD CONSTRAINT "LogisticsCapacity_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "LogisticsProvider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "LogisticsReservation" (
    "id" TEXT NOT NULL, "reference" TEXT NOT NULL, "providerId" TEXT NOT NULL, "capacityId" TEXT NOT NULL,
    "businessUserId" TEXT NOT NULL, "businessId" TEXT, "businessName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL, "pickupLocation" TEXT NOT NULL, "destinationZone" TEXT NOT NULL,
    "amountKobo" INTEGER NOT NULL, "commissionKobo" INTEGER NOT NULL DEFAULT 0, "providerEarningKobo" INTEGER NOT NULL DEFAULT 0,
    "paymentStatus" "LogisticsPaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "status" "LogisticsReservationStatus" NOT NULL DEFAULT 'PENDING',
    "specialInstructions" TEXT, "rejectReason" TEXT, "idempotencyKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "LogisticsReservation_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "LogisticsReservation_reference_key" ON "LogisticsReservation"("reference");
CREATE UNIQUE INDEX "LogisticsReservation_idempotencyKey_key" ON "LogisticsReservation"("idempotencyKey");
CREATE INDEX "LogisticsReservation_providerId_status_idx" ON "LogisticsReservation"("providerId", "status");
CREATE INDEX "LogisticsReservation_businessUserId_createdAt_idx" ON "LogisticsReservation"("businessUserId", "createdAt");
CREATE INDEX "LogisticsReservation_capacityId_status_idx" ON "LogisticsReservation"("capacityId", "status");
ALTER TABLE "LogisticsReservation" ADD CONSTRAINT "LogisticsReservation_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "LogisticsProvider"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LogisticsReservation" ADD CONSTRAINT "LogisticsReservation_capacityId_fkey" FOREIGN KEY ("capacityId") REFERENCES "LogisticsCapacity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "LogisticsReservationEvent" (
    "id" TEXT NOT NULL, "reservationId" TEXT NOT NULL, "status" TEXT NOT NULL, "note" TEXT, "actorUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LogisticsReservationEvent_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "LogisticsReservationEvent_reservationId_createdAt_idx" ON "LogisticsReservationEvent"("reservationId", "createdAt");
ALTER TABLE "LogisticsReservationEvent" ADD CONSTRAINT "LogisticsReservationEvent_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "LogisticsReservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "LogisticsRider" (
    "id" TEXT NOT NULL, "providerId" TEXT NOT NULL, "name" TEXT NOT NULL, "phoneNumber" TEXT NOT NULL,
    "vehicleType" TEXT NOT NULL DEFAULT 'BIKE', "vehicleRegistration" TEXT,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true, "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "LogisticsRider_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "LogisticsRider_providerId_isAvailable_idx" ON "LogisticsRider"("providerId", "isAvailable");
ALTER TABLE "LogisticsRider" ADD CONSTRAINT "LogisticsRider_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "LogisticsProvider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "LogisticsVehicle" (
    "id" TEXT NOT NULL, "providerId" TEXT NOT NULL, "type" TEXT NOT NULL, "registration" TEXT NOT NULL,
    "capacityPackages" INTEGER NOT NULL DEFAULT 0, "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "LogisticsVehicle_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "LogisticsVehicle_providerId_idx" ON "LogisticsVehicle"("providerId");
ALTER TABLE "LogisticsVehicle" ADD CONSTRAINT "LogisticsVehicle_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "LogisticsProvider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "LogisticsShipment" (
    "id" TEXT NOT NULL, "reference" TEXT NOT NULL, "reservationId" TEXT NOT NULL, "providerId" TEXT NOT NULL,
    "deliveryId" TEXT, "riderId" TEXT, "senderName" TEXT NOT NULL, "receiverName" TEXT NOT NULL,
    "receiverPhone" TEXT NOT NULL, "pickupAddress" TEXT NOT NULL, "deliveryAddress" TEXT NOT NULL,
    "packageDescription" TEXT, "packageWeightKg" DOUBLE PRECISION, "packageDimensions" TEXT,
    "deliveryInstructions" TEXT, "trackingReference" TEXT, "proofOfDeliveryUrl" TEXT, "deliveryNote" TEXT,
    "status" "LogisticsShipmentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "LogisticsShipment_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "LogisticsShipment_reference_key" ON "LogisticsShipment"("reference");
CREATE INDEX "LogisticsShipment_providerId_status_idx" ON "LogisticsShipment"("providerId", "status");
CREATE INDEX "LogisticsShipment_reservationId_idx" ON "LogisticsShipment"("reservationId");
ALTER TABLE "LogisticsShipment" ADD CONSTRAINT "LogisticsShipment_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "LogisticsReservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LogisticsShipment" ADD CONSTRAINT "LogisticsShipment_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "LogisticsRider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE "LogisticsDeliveryAttempt" (
    "id" TEXT NOT NULL, "shipmentId" TEXT NOT NULL, "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LogisticsDeliveryAttempt_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "LogisticsDeliveryAttempt_shipmentId_createdAt_idx" ON "LogisticsDeliveryAttempt"("shipmentId", "createdAt");
ALTER TABLE "LogisticsDeliveryAttempt" ADD CONSTRAINT "LogisticsDeliveryAttempt_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "LogisticsShipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "LogisticsPayout" (
    "id" TEXT NOT NULL, "providerId" TEXT NOT NULL, "amountKobo" INTEGER NOT NULL,
    "status" "LogisticsPayoutStatus" NOT NULL DEFAULT 'PENDING', "reference" TEXT NOT NULL, "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "LogisticsPayout_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "LogisticsPayout_reference_key" ON "LogisticsPayout"("reference");
CREATE INDEX "LogisticsPayout_providerId_status_idx" ON "LogisticsPayout"("providerId", "status");
ALTER TABLE "LogisticsPayout" ADD CONSTRAINT "LogisticsPayout_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "LogisticsProvider"("id") ON DELETE CASCADE ON UPDATE CASCADE;
