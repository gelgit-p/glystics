-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "deliveryCurrency" TEXT,
ADD COLUMN     "deliveryInsurer" TEXT,
ADD COLUMN     "insuranceAmount" INTEGER,
ADD COLUMN     "insuranceCode" TEXT,
ADD COLUMN     "insurance_cost" INTEGER,
ADD COLUMN     "insurance_policy_condition" TEXT,
ADD COLUMN     "insure_percentage" INTEGER,
ADD COLUMN     "insurerName" TEXT;
