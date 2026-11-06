-- Webhook event logs surfaced in Settings > Webhooks
CREATE TABLE "WebhookEventLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "source" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "direction" TEXT NOT NULL DEFAULT 'INBOUND',
    "status" TEXT NOT NULL,
    "externalId" TEXT,
    "phoneNumberId" TEXT,
    "summary" TEXT,
    "payload" JSONB,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WebhookEventLog_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "WebhookEventLog_userId_createdAt_idx" ON "WebhookEventLog"("userId", "createdAt");
CREATE INDEX "WebhookEventLog_source_createdAt_idx" ON "WebhookEventLog"("source", "createdAt");
CREATE INDEX "WebhookEventLog_externalId_idx" ON "WebhookEventLog"("externalId");
