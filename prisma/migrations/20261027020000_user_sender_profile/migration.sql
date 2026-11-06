-- Default sender (pickup) profile used to seed AI delivery drafts
ALTER TABLE "User" ADD COLUMN "senderPhone" TEXT;
ALTER TABLE "User" ADD COLUMN "senderAddress" TEXT;
ALTER TABLE "User" ADD COLUMN "senderEmail" TEXT;
