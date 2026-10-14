-- AlterEnum
ALTER TYPE "DeliveryStatus" ADD VALUE 'PENDING';

-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "courier_email" TEXT,
ADD COLUMN     "courier_name" TEXT,
ADD COLUMN     "courier_phone" TEXT,
ADD COLUMN     "package_amount" TEXT,
ADD COLUMN     "package_weight" TEXT,
ADD COLUMN     "receiverLatitude" TEXT,
ADD COLUMN     "receiverLongitude" TEXT,
ADD COLUMN     "senderLatitude" TEXT,
ADD COLUMN     "senderLongitude" TEXT,
ADD COLUMN     "shipbubbleOrderId" TEXT,
ADD COLUMN     "shipping_fee" TEXT,
ADD COLUMN     "shipping_payment_status" TEXT,
ADD COLUMN     "shipping_payment_type" TEXT,
ADD COLUMN     "tracking_url" TEXT;
