/*
  Warnings:

  - Added the required column `deliveryStatus` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('DELIVERED', 'IN_TRANSIT', 'FAILED');

-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "deliveryStatus" "DeliveryStatus" NOT NULL;
