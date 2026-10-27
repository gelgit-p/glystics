-- WhatsApp customer quote offer + numeric selection state on AI drafts
ALTER TABLE "DeliveryDraft" ADD COLUMN "customerSelectedQuoteId" TEXT;
ALTER TABLE "DeliveryDraft" ADD COLUMN "quoteOfferSentAt" TIMESTAMP(3);
ALTER TABLE "DeliveryDraft" ADD COLUMN "quoteOfferMessageId" TEXT;
ALTER TABLE "DeliveryDraft" ADD COLUMN "customerSelectionAt" TIMESTAMP(3);
