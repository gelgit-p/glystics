-- CreateTable
CREATE TABLE "Delivery" (
    "id" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "senderPhone" TEXT NOT NULL,
    "senderAddress" TEXT NOT NULL,
    "receiverName" TEXT NOT NULL,
    "receiverPhone" TEXT NOT NULL,
    "receiverAddress" TEXT NOT NULL,
    "packageName" TEXT NOT NULL,
    "packageCategory" TEXT NOT NULL,
    "packageWeight" TEXT NOT NULL,
    "packageDimensions" TEXT NOT NULL,
    "packageValue" TEXT NOT NULL,
    "pickupDate" TEXT NOT NULL,
    "deliveryType" TEXT NOT NULL,
    "deliveryInstructions" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);
