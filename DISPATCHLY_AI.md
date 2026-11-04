# Dispatchly AI — WhatsApp → Delivery Agent

Workflow: WhatsApp inbound → AI extraction → clarification → server validation → Shipbubble quotes → ranked recommendation → human approval → existing credit charge + Bachs checkout → payment webhook → Shipbubble booking → tracking sync → WhatsApp notifications (existing automations/templates).

## Verified integrations
- **WhatsApp Cloud API**: webhook payload per Meta docs (`entry[].changes[].value.{metadata.phone_number_id, contacts, messages[]|statuses[]}`). Inbound handled in `WebhookController.receive()`; tenant = `User` whose `selectedPhoneNumberId` contains `phone_number_id`; dedupe via `AiMessage.waMessageId @unique` (P2002 → skip); replies via existing `WhatsappService.sendMessage()` (free-form, 24h window, charges WHATSAPP credits, refunds on failure), templates via `sendUtilityMessage()`.
- **Shipbubble**: `fetch_rates` response `{status,data:{request_token,couriers[],fastest_courier,cheapest_courier}}`; courier fields verified from existing production UI types (`total`, `currency`, `delivery_eta`, `courier_id`, `service_code`). Quotes normalised/ranked in `quote-ranking.ts` (60% price / 40% ETA). Booking NEVER called from AI code — only via `DeliveryService.createCheckoutSession()` → Bachs webhook → `completePaidCheckout()` → `createShipment()`.
- **Credits/checkout**: approval calls `DeliveryService.create()` (atomic `spendWithinTransaction`, `idempotencyKey=delivery:{trackingId}`) then `createCheckoutSession()`. Approval replay protected by `Approval.idempotencyKey @unique` + `draft.deliveryId` guard — no duplicate charges/bookings.

## AI provider: Baseten (Meta Muse / DeepSeek)
Live inference goes through `src/modules/ai-agent/baseten.client.ts` (`BasetenClient`, OpenAI SDK → `https://inference.baseten.co/v1`). `MetaModelClient` is a back-compat alias delegating to it. Set `BASETEN_MODEL_ID` to your Meta Muse deployment id for Muse, or keep the DeepSeek default. Without a key (or `AI_DEMO_MODE=true` / `BASETEN_ENABLED=false`) it uses the deterministic, clearly-labelled demo extractor (`aiMode:"demo"`). Live failures fall back to demo — inbound processing never crashes. Super admins can check `GET /ai/admin/ai-health`.

## Environment variables
Existing: `DATABASE_URL`, `SHIPBUBBLE_API_KEY`, `WEBHOOK_SECRET` (WhatsApp verify token), `WHATSAPP_VERSION`, `CREDIT_COST_DELIVERY`, `CREDIT_COST_WHATSAPP`, per-user Facebook tokens in DB.
New:
```
WHATSAPP_APP_SECRET=        # enables x-hub-signature-256 verification (fail-closed when set)
AI_DEMO_MODE=false
BASETEN_API_KEY=            # server-only, never VITE_*
BASETEN_BASE_URL=https://inference.baseten.co/v1
BASETEN_MODEL_ID=deepseek-ai/DeepSeek-V4-Flash-0731  # or your Meta Muse deployment id
BASETEN_TIMEOUT_MS=30000
BASETEN_MAX_RETRIES=3
BASETEN_ENABLED=true
BASETEN_REASONING_EFFORT=high
AI_DELIVERY_DETECTION_DISABLED=false  # global kill-switch; per-tenant switch in Automations / Super Admin
```

## Super Admin
Users with `role=SUPER_ADMIN` (`UserRole` in Prisma) land on `/admin` after login (login returns `user.role`; `SuperAdminGuard` re-reads role from DB per request). `/admin` (and Automations → Super Admin panel) toggles any tenant's `aiDeliveryDetectionEnabled` and promotes/demotes roles via `PATCH /ai/admin/users/:id/ai-detection|role`. Detection OFF = inbound stored but never extracted/quoted/replied (audit `ai_detection.skipped_disabled`).

## API (JWT, tenant-scoped)
`GET /ai/overview`, `GET /ai/conversations[/:id]`, `GET /ai/drafts[/:id]`, `PATCH /ai/drafts/:id`, `POST /ai/drafts/:id/quotes`, `GET /ai/approvals`, `POST /ai/drafts/:id/approve|reject`, `GET /ai/audit`, `POST /ai/simulate-inbound` (demo), `POST /ai/process-pending` (retry sweep; call from cron).

## Setup
1. `pnpm install` (api + fe), set env vars, `npx prisma migrate deploy` (or `migrate dev`), `npx prisma generate`.
2. API: `pnpm build && pnpm start:dev` · FE: `pnpm dev` with `VITE_API_URL` pointing at the API.
3. WhatsApp: point Meta webhook to `GET/POST /whatsapp/webhook`, verify token = `WEBHOOK_SECRET`, set `WHATSAPP_APP_SECRET`, subscribe `messages` field.
4. Demo without credentials: log in, open **Dispatchly AI**, use “Simulate WhatsApp message”, complete missing fields, fetch quotes (requires `SHIPBUBBLE_API_KEY` for real quotes), approve to exercise credits+checkout.

## Tests
API: `npx jest src/modules/ai-delivery src/modules/ai-agent` (extraction validation, quote ranking, approval idempotency/dedupe). FE has no unit test runner configured (pre-existing); validated via `tsc` + production build.
