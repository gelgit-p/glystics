-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "facebook_access_token" TEXT NOT NULL,
    "facebook_long_lived_access_token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);
