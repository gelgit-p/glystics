-- AlterTable
ALTER TABLE "tokens" ALTER COLUMN "facebook_access_token" DROP NOT NULL,
ALTER COLUMN "facebook_long_lived_access_token" DROP NOT NULL;
