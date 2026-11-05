-- DropForeignKey
ALTER TABLE "SharedNetworkWallet" DROP CONSTRAINT "SharedNetworkWallet_businessId_fkey";

-- DropForeignKey
ALTER TABLE "SharedNetworkCreditTransaction" DROP CONSTRAINT "SharedNetworkCreditTransaction_walletId_fkey";

-- DropForeignKey
ALTER TABLE "SharedNetworkCreditPurchase" DROP CONSTRAINT "SharedNetworkCreditPurchase_walletId_fkey";

-- DropTable
DROP TABLE "SharedNetworkWallet";

-- DropTable
DROP TABLE "SharedNetworkCreditTransaction";

-- DropTable
DROP TABLE "SharedNetworkCreditPurchase";

-- DropEnum
DROP TYPE "SharedNetworkCreditTxType";

