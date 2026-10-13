/*
  Warnings:

  - Added the required column `trackingId` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "DeliveryStatus" ADD VALUE 'PICKED_UP';
ALTER TYPE "DeliveryStatus" ADD VALUE 'OUT_FOR_DELIVERY';
ALTER TYPE "DeliveryStatus" ADD VALUE 'CREATED';

-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "trackingId" TEXT NOT NULL;
