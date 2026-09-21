-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accessTokenExpiresIn" TEXT,
ADD COLUMN     "facebookAcceessToken" TEXT,
ADD COLUMN     "facebookConnectStatus" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "grantedScopes" TEXT;
