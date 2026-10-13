/*
  Warnings:

  - The `userId` column on the `Delivery` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER;
