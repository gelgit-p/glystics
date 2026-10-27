# Dispatchly AI — WhatsApp → Delivery Agent

Workflow: WhatsApp inbound → AI extraction → clarification → server validation → Shipbubble quotes → ranked recommendation → human approval → existing credit charge + Bachs checkout → payment webhook → Shipbubble booking → tracking sync → WhatsApp notifications (existing automations/templates).

## Verified integrations
- **WhatsApp Cloud API**: webhook payload per Meta docs (`entry[].changes[].value.{metadata.phone_number_id, contacts, messages[]|statuses[]}`). Inbound handled in `WebhookController.receive()`; tenant = `User` whose `selectedPhoneNumberId` contains `phone_number_id`; dedupe via `AiMessage.waMessageId @unique` (P2002 → skip); replies via existing `WhatsappService.sendMessage()` (free-form, 24h window, charges WHATSAPP credits, refunds on failure), templates via `sendUtilityMessage()`.
- **Shipbubble**: `fetch_rates` response `{status,data:{request_token,couriers[],fastest_courier,cheapest_courier}}`; courier fields verified from existing production UI types (`total`, `currency`, `delivery_eta`, `courier_id`, `service_code`). Quotes normalised/ranked in `quote-ranking.ts` (60% price / 40% ETA). Booking NEVER called from AI code — only via `DeliveryService.createCheckoutSession()` → Bachs webhook → `completePaidCheckout()` → `createShipment()`.
- **Credits/checkout**: approval calls `DeliveryService.create()` (atomic `spendWithinTransaction`, `idempotencyKey=delivery:{trackingId}`) then `createCheckoutSession()`. Approval replay protected by `Approval.idempotencyKey @unique` + `draft.deliveryId` guard — no duplicate charges/bookings.

## ⚠️ Blocker: Meta Muse Spark / Meta Model API
No publicly verifiable stable Model API contract (endpoint, auth, structured-output schema) was available without partner credentials. Integration is isolated in `src/modules/ai-agent/meta-model.client.ts` behind env config. **Default is DEMO MODE**: a deterministic, clearly-labelled simulated extractor (`aiMode:"demo"` in API + banner in UI). Do not present demo extractions as real Muse Spark output. To go live: verify the official contract, set the env vars below, set `AI_DEMO_MODE=false`, and replace `adaptRequest/adaptResponse` assumptions (currently OpenAI-style `/chat/completions`) if Meta's contract differs.

## Environment variables
Existing: `DATABASE_URL`, `SHIPBUBBLE_API_KEY`, `WEBHOOK_SECRET` (WhatsApp verify token), `WHATSAPP_VERSION`, `CREDIT_COST_DELIVERY`, `CREDIT_COST_WHATSAPP`, per-user Facebook tokens in DB.
New:
```
WHATSAPP_APP_SECRET=        # enables x-hub-signature-256 verification (fail-closed when set)
AI_DEMO_MODE=true           # keep true until Muse Spark contract is verified
META_MODEL_API_KEY=
META_MODEL_ID=muse-spark    # verify
META_MODEL_BASE_URL=        # verify; placeholder default in client
META_MODEL_TIMEOUT_MS=20000
```

## API (JWT, tenant-scoped)
`GET /ai/overview`, `GET /ai/conversations[/:id]`, `GET /ai/drafts[/:id]`, `PATCH /ai/drafts/:id`, `POST /ai/drafts/:id/quotes`, `GET /ai/approvals`, `POST /ai/drafts/:id/approve|reject`, `GET /ai/audit`, `POST /ai/simulate-inbound` (demo), `POST /ai/process-pending` (retry sweep; call from cron).

## Setup
1. `pnpm install` (api + fe), set env vars, `npx prisma migrate deploy` (or `migrate dev`), `npx prisma generate`.
2. API: `pnpm build && pnpm start:dev` · FE: `pnpm dev` with `VITE_API_URL` pointing at the API.
3. WhatsApp: point Meta webhook to `GET/POST /whatsapp/webhook`, verify token = `WEBHOOK_SECRET`, set `WHATSAPP_APP_SECRET`, subscribe `messages` field.
4. Demo without credentials: log in, open **Dispatchly AI**, use “Simulate WhatsApp message”, complete missing fields, fetch quotes (requires `SHIPBUBBLE_API_KEY` for real quotes), approve to exercise credits+checkout.

## Tests
API: `npx jest src/modules/ai-delivery src/modules/ai-agent` (extraction validation, quote ranking, approval idempotency/dedupe). FE has no unit test runner configured (pre-existing); validated via `tsc` + production build.
