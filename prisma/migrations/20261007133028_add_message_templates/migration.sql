-- CreateTable
CREATE TABLE "message_templates" (
    "id" TEXT NOT NULL,
    "metaTemplateId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "previousCategory" TEXT,
    "parameterFormat" TEXT,
    "components" JSONB NOT NULL,
    "disableIosAutofill" BOOLEAN NOT NULL DEFAULT false,
    "isPrimaryDeviceDeliveryOnly" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "message_templates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "message_templates_userId_idx" ON "message_templates"("userId");

-- CreateIndex
CREATE INDEX "message_templates_name_idx" ON "message_templates"("name");

-- CreateIndex
CREATE UNIQUE INDEX "message_templates_userId_metaTemplateId_key" ON "message_templates"("userId", "metaTemplateId");

-- AddForeignKey
ALTER TABLE "message_templates" ADD CONSTRAINT "message_templates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
