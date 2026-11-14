-- Store the full payout account number (was: last 4 digits only).
-- Existing rows hold 4 digits; providers will re-enter the full number on next profile save.
ALTER TABLE "LogisticsProvider" RENAME COLUMN "payoutAccountLast4" TO "payoutAccountNumber";
