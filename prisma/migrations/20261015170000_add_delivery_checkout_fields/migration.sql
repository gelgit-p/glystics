ALTER TABLE "Delivery"
ADD COLUMN "checkoutSessionId" TEXT,
ADD COLUMN "checkoutUrl" TEXT,
ADD COLUMN "paymentAmount" TEXT,
ADD COLUMN "paymentCurrency" TEXT,
ADD COLUMN "paymentStatus" TEXT NOT NULL DEFAULT 'NOT_STARTED',
ADD COLUMN "bookingDetails" JSONB,
ADD COLUMN "bookingError" TEXT;

CREATE UNIQUE INDEX "Delivery_checkoutSessionId_key"
ON "Delivery"("checkoutSessionId");
