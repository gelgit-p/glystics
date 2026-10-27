-- Dispatchly AI: WhatsApp -> delivery agent tables
CREATE TABLE "AiConversation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "customerWaId" TEXT NOT NULL,
    "phoneNumberId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "lastMessageAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "AiConversation_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "AiMessage" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "waMessageId" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "body" TEXT,
    "rawPayload" JSONB,
    "processingState" TEXT NOT NULL DEFAULT 'RECEIVED',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "nextRetryAt" TIMESTAMP(3),
    "processingError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AiMessage_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "DeliveryDraft" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "conversationId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'COLLECTING',
    "senderName" TEXT,
    "senderPhone" TEXT,
    "senderAddress" TEXT,
    "senderEmail" TEXT,
    "receiverName" TEXT,
    "receiverPhone" TEXT,
    "receiverAddress" TEXT,
    "receiverEmail" TEXT,
    "packageName" TEXT,
    "packageDescription" TEXT,
    "packageCategory" TEXT,
    "packageCategoryId" INTEGER,
    "packageWeight" TEXT,
    "packageValue" TEXT,
    "packageQuantity" INTEGER,
    "length" DOUBLE PRECISION,
    "width" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "pickupDate" TEXT,
    "deliveryType" TEXT,
    "deliveryInstructions" TEXT,
    "extracted" JSONB,
    "missingFields" TEXT[],
    "confidence" DOUBLE PRECISION,
    "deliveryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "DeliveryDraft_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "ProviderQuote" (
    "id" TEXT NOT NULL,
    "draftId" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'SHIPBUBBLE',
    "courierId" TEXT NOT NULL,
    "courierName" TEXT NOT NULL,
    "serviceCode" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "deliveryEta" TEXT,
    "pickupEta" TEXT,
    "score" DOUBLE PRECISION NOT NULL,
    "scoreReasons" TEXT[],
    "requestToken" TEXT NOT NULL,
    "raw" JSONB,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProviderQuote_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Approval" (
    "id" TEXT NOT NULL,
    "draftId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "decision" TEXT NOT NULL,
    "selectedQuoteId" TEXT,
    "note" TEXT,
    "idempotencyKey" TEXT NOT NULL,
    "deliveryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Approval_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "AiAuditEvent" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "actorType" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AiAuditEvent_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "AiConversation_userId_phoneNumberId_customerWaId_key" ON "AiConversation"("userId", "phoneNumberId", "customerWaId");
CREATE INDEX "AiConversation_userId_status_idx" ON "AiConversation"("userId", "status");
CREATE UNIQUE INDEX "AiMessage_waMessageId_key" ON "AiMessage"("waMessageId");
CREATE INDEX "AiMessage_conversationId_createdAt_idx" ON "AiMessage"("conversationId", "createdAt");
CREATE INDEX "AiMessage_processingState_nextRetryAt_idx" ON "AiMessage"("processingState", "nextRetryAt");
CREATE INDEX "DeliveryDraft_userId_status_idx" ON "DeliveryDraft"("userId", "status");
CREATE INDEX "DeliveryDraft_conversationId_idx" ON "DeliveryDraft"("conversationId");
CREATE INDEX "ProviderQuote_draftId_idx" ON "ProviderQuote"("draftId");
CREATE INDEX "Approval_draftId_idx" ON "Approval"("draftId");
CREATE INDEX "Approval_userId_decision_idx" ON "Approval"("userId", "decision");
CREATE UNIQUE INDEX "Approval_idempotencyKey_key" ON "Approval"("idempotencyKey");
CREATE INDEX "AiAuditEvent_userId_createdAt_idx" ON "AiAuditEvent"("userId", "createdAt");
CREATE INDEX "AiAuditEvent_entityType_entityId_idx" ON "AiAuditEvent"("entityType", "entityId");
ALTER TABLE "AiConversation" ADD CONSTRAINT "AiConversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AiMessage" ADD CONSTRAINT "AiMessage_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "AiConversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DeliveryDraft" ADD CONSTRAINT "DeliveryDraft_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DeliveryDraft" ADD CONSTRAINT "DeliveryDraft_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "AiConversation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ProviderQuote" ADD CONSTRAINT "ProviderQuote_draftId_fkey" FOREIGN KEY ("draftId") REFERENCES "DeliveryDraft"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Approval" ADD CONSTRAINT "Approval_draftId_fkey" FOREIGN KEY ("draftId") REFERENCES "DeliveryDraft"("id") ON DELETE CASCADE ON UPDATE CASCADE;
