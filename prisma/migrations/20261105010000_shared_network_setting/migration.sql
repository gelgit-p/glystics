-- CreateTable
CREATE TABLE "SharedNetworkSetting" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "networkEnabled" BOOLEAN NOT NULL DEFAULT true,
    "disabledMessage" TEXT,
    "updatedByUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SharedNetworkSetting_pkey" PRIMARY KEY ("id")
);

