CREATE TYPE "CreditTransactionType" AS ENUM (
    'PURCHASE',
    'BONUS',
    'USAGE',
    'REFUND',
    'ADMIN_ADJUSTMENT'
);

CREATE TYPE "CreditPurchaseStatus" AS ENUM (
    'PENDING',
    'PAID',
    'FAILED',
    'CANCELLED'
);

CREATE TABLE "CreditWallet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreditWallet_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CreditTransaction" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "type" "CreditTransactionType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "balanceAfter" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "reference" TEXT,
    "idempotencyKey" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditTransaction_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CreditPackage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "priceKobo" INTEGER NOT NULL,
    "credits" INTEGER NOT NULL,
    "bonusCredits" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreditPackage_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CreditPurchase" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "amountKobo" INTEGER NOT NULL,
    "credits" INTEGER NOT NULL,
    "bonusCredits" INTEGER NOT NULL DEFAULT 0,
    "paymentReference" TEXT NOT NULL,
    "checkoutSessionId" TEXT,
    "checkoutUrl" TEXT,
    "status" "CreditPurchaseStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreditPurchase_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "CreditWallet_userId_key" ON "CreditWallet"("userId");
CREATE INDEX "CreditTransaction_walletId_createdAt_idx" ON "CreditTransaction"("walletId", "createdAt");
CREATE UNIQUE INDEX "CreditTransaction_reference_key" ON "CreditTransaction"("reference");
CREATE UNIQUE INDEX "CreditTransaction_idempotencyKey_key" ON "CreditTransaction"("idempotencyKey");
CREATE UNIQUE INDEX "CreditPackage_name_key" ON "CreditPackage"("name");
CREATE UNIQUE INDEX "CreditPurchase_paymentReference_key" ON "CreditPurchase"("paymentReference");
CREATE UNIQUE INDEX "CreditPurchase_checkoutSessionId_key" ON "CreditPurchase"("checkoutSessionId");
CREATE INDEX "CreditPurchase_walletId_status_idx" ON "CreditPurchase"("walletId", "status");

ALTER TABLE "CreditWallet"
    ADD CONSTRAINT "CreditWallet_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "CreditTransaction"
    ADD CONSTRAINT "CreditTransaction_walletId_fkey"
    FOREIGN KEY ("walletId") REFERENCES "CreditWallet"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "CreditPurchase"
    ADD CONSTRAINT "CreditPurchase_walletId_fkey"
    FOREIGN KEY ("walletId") REFERENCES "CreditWallet"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "CreditPurchase"
    ADD CONSTRAINT "CreditPurchase_packageId_fkey"
    FOREIGN KEY ("packageId") REFERENCES "CreditPackage"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;
