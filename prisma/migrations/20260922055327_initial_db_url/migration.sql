/*
  Warnings:

  - You are about to drop the column `SelectedFacebookBusinessId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumberId` on the `User` table. All the data in the column will be lost.
  - The `selectedPhoneNumberId` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "SelectedFacebookBusinessId",
DROP COLUMN "phoneNumberId",
DROP COLUMN "selectedPhoneNumberId",
ADD COLUMN     "selectedPhoneNumberId" TEXT[];
