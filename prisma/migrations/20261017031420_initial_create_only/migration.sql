/*
  Warnings:

  - The `deliveryStatus` column on the `Delivery` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "deliveryStatus",
ADD COLUMN     "deliveryStatus" TEXT,
ALTER COLUMN "paymentStatus" DROP DEFAULT,
ALTER COLUMN "bookingStatus" DROP DEFAULT;

-- DropEnum
DROP TYPE "DeliveryStatus";
