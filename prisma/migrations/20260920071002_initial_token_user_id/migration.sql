/*
  Warnings:

  - Added the required column `userId` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "appId" TEXT,
ADD COLUMN     "appSecret" TEXT,
ADD COLUMN     "metaUserId" TEXT;

-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "dataAccessExpirationTime" TEXT,
ADD COLUMN     "expiresIn" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;
