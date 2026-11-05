# Dispatchly API (Backend)

NestJS 11 + Prisma 6 + PostgreSQL backend for Dispatchly: auth, deliveries
(Shipbubble), WhatsApp (Meta Cloud API), credits/payments (Bachs), automations,
notifications, and the Dispatchly AI delivery agent (Baseten).

> This is a REST API (Swagger at `/api`). There is no GraphQL layer.

## Tech stack

- [NestJS](https://nestjs.com) 11 (REST, Passport JWT)
- [Prisma](https://www.prisma.io) 6 + PostgreSQL
- JWT access/refresh auth, bcrypt, email confirmation (Nodemailer)
- Shipbubble (shipping), Meta WhatsApp Cloud API, Bachs (credit payments)
- Baseten (OpenAI-compatible) for AI delivery detection/extraction

## Prerequisites

- Node.js 20+ (Docker image uses Node 26; any current LTS works)
- [pnpm](https://pnpm.io) (`corepack enable` or `npm i -g pnpm`)
- PostgreSQL 14+ (local, Docker, Supabase, Fly Postgres, …)

## Setup

```bash
cd api
pnpm install
cp .env.example .env   # then fill in the values — see table below
pnpm exec prisma generate
pnpm exec prisma migrate dev   # creates/applies migrations on a fresh DB
pnpm run start:dev             # http://localhost:3000
```

Verify it is up:

```bash
curl http://localhost:3000/health   # {"status":"ok", ...} (checks DB)
# Swagger UI: http://localhost:3000/api
```

`start:dev` runs `prisma generate` first. `start` / `start:prod` run
`prisma migrate deploy` before booting, so production deploys apply pending
migrations automatically.

## Environment variables

Copy [`.env.example`](.env.example) to `.env`. **Required** = the app or a core
flow (auth/DB) breaks without it. Feature vars are only needed when that
integration is used; the code fails closed / throws a clear
`… is not configured` error when a used integration is missing its config.
Never commit a real `.env`.

### Core (required)

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | PostgreSQL connection string used by Prisma at runtime, e.g. `postgresql://user:pass@localhost:5432/dispatchly?schema=public`. With Supabase pooling use the pooler URL (port 6543, `?pgbouncer=true`). |
| `JWT_SECRET` | ✅ | Secret signing access JWTs. Use a long random string. |
| `JWT_REFRESH_SECRET` | ✅ | Secret signing refresh JWTs. Must differ from `JWT_SECRET`. |
| `EMAIL_CONFIRM_SECRET` | ✅ | Secret signing email-confirmation tokens (1h expiry). |
| `FRONTEND_LINK` | ✅ | Public frontend origin, no trailing slash, e.g. `http://localhost:5173`. Used to build `…/confirm-email?token=…` links. Must match the deployed frontend for email links to work. |
| `PORT` | No (default `3000`) | HTTP port. Fly.io sets this / expects `3000`. |
| `NODE_ENV` | No (default development) | `development` / `production`. |

### Email (required for signup confirmation)

| Variable | Required | Description |
|---|---|---|
| `EMAIL_USER` | ✅ for email | SMTP username (Gmail address / app user) used by Nodemailer. |
| `EMAIL_PASS` | ✅ for email | SMTP password / Gmail App Password. |

### WhatsApp / Meta (required for WhatsApp features)

| Variable | Required | Description |
|---|---|---|
| `WHATSAPP_APP_SECRET` | For webhooks | Meta app secret. When set, inbound webhook signatures are verified (fail-closed); without it, signature checks are skipped (local dev only). |
| `WEBHOOK_SECRET` | For webhooks | Token Meta sends as `hub.verify_token` on webhook subscription verification (`/webhook`). |
| `WHATSAPP_VERIFY_TOKEN` | For WhatsApp API | Verify token used by the WhatsApp module. |
| `WHATSAPP_VERSION` | For WhatsApp API | Meta Graph API version, e.g. `v21.0`. Code throws if unset when sending. |
| `WABA_ID` | For template ops | Default WhatsApp Business Account ID. |
| `FB_APP_ID` | For FB connect | Meta app ID (Facebook Login / WhatsApp Embedded Signup). |
| `FB_APP_SECRET` | For FB connect | Meta app secret. |
| `FB_ADMIN_TOKEN` | Optional | Admin/system-user token for Meta operations. |
| `FB_SYSTEM_USER_ID` | Optional | Meta system user ID. |
| `FB_DEFAULT_SCOPES` | Optional | Comma-separated OAuth scopes for Facebook connect. |
| `WHATSAPP_PHONE_NUMBER_ID` / `WHATSAPP_BUSINESS_PHONE_NUMBER_ID` | Optional | Fallback phone-number IDs when a tenant has not connected their own number. Per-tenant numbers are stored on the `User` record. |

### Shipping, payments & credits

| Variable | Required | Description |
|---|---|---|
| `SHIPBUBBLE_API_KEY` | For shipping | Shipbubble API key (rates, labels, tracking, webhooks). |
| `BACHS_API_KEY` | For credit purchases | Bachs secret key for credit checkout/payment verification. |
| `BACHS_BASE_URL` | Optional | Bachs API base URL override. |
| `LOCAL_BACHS_WEBHOOK_SECRET` | For Bachs webhooks locally | Verifies Bachs webhook signatures. In production the code uses this same var — set it to your live webhook secret when deploying. |
| `CREDIT_ADMIN_API_KEY` | Optional | Shared key guarding admin credit-adjustment endpoints. |
| `CREDIT_COST_DELIVERY` | Optional (in `.env.example`: `1`) | Credits charged per delivery. |
| `CREDIT_COST_WHATSAPP` | Optional (in `.env.example`: `1`) | Credits charged per WhatsApp message. |
| `CREDIT_LOW_BALANCE_THRESHOLD` | Optional (default `10`) | Low-balance warning threshold; must be a non-negative integer. |

### Dispatchly AI (Baseten)

Without a key the AI runs in deterministic **demo mode** (no crash) — set the
key + `AI_DEMO_MODE=false` for live extraction.

| Variable | Required | Description |
|---|---|---|
| `BASETEN_API_KEY` | For live AI | Baseten API key. |
| `AI_DEMO_MODE` | No (default demo without key) | `false` = allow live mode when a key exists; `true` = force demo. |
| `BASETEN_ENABLED` | No (default enabled) | `false` disables Baseten entirely. |
| `BASETEN_MODEL_ID` | No (built-in default) | Model/deployment ID, e.g. `meta-models/muse-spark-open-1026`. See `.env.example` for the DeepSeek example. |
| `BASETEN_BASE_URL` | No (default `https://inference.baseten.co/v1`) | OpenAI-compatible base URL. |
| `BASETEN_TIMEOUT_MS` | No (default `30000`) | Request timeout. |
| `BASETEN_MAX_RETRIES` | No (default `3`) | Max retries. |
| `BASETEN_REASONING_EFFORT` | No | Reasoning effort passed to supporting models, e.g. `high`. |
| `AI_DELIVERY_DETECTION_DISABLED` | No (default `false`) | `true` = global kill-switch for AI delivery detection. Per-tenant toggle also exists. |

### Instagram (optional integration)

| Variable | Description |
|---|---|
| `IG_USERNAME`, `IG_PASSWORD` | Instagram bot credentials. |
| `IG_PROXY_URL` | Optional proxy for Instagram requests. |
| `IG_AUTH_DIR` | Directory for persisted Instagram auth state. |

### Database notes

- `prisma/schema.prisma` and `prisma.config.ts` read **`DATABASE_URL` only**.
  There is no `DIRECT_URL` in the current code — if your provider gives you a
  separate direct (non-pooled) URL, use it for `DATABASE_URL` when running
  `prisma migrate dev/deploy` locally, or keep the pooled URL if your pooler
  supports migrations (Supabase's session pooler does).
- Generate secrets with e.g. `openssl rand -hex 32`.

## Scripts

```bash
pnpm run start:dev    # generate client + watch mode
pnpm run start:debug  # watch + inspector
pnpm run build        # prisma generate + nest build
pnpm run start:prod   # migrate deploy + generate + node dist/src/main.js
pnpm run lint         # eslint --fix
pnpm run test         # jest unit tests (src/**/*.spec.ts)
pnpm run test:watch
pnpm run test:cov
pnpm run test:e2e     # jest --config ./test/jest-e2e.json
pnpm exec prisma migrate dev --name <change>   # new migration
pnpm exec prisma migrate deploy                # apply migrations (prod)
pnpm exec prisma studio                        # browse DB
```

## Auth flow (summary)

1. `POST /auth/...` signup → user created, confirmation email sent
   (`FRONTEND_LINK/confirm-email?token=…`, token signed with `EMAIL_CONFIRM_SECRET`)
2. Confirm email → `emailConfirmed = true`
3. Login → `accessToken` + `refreshToken` (hashed refresh token stored on user)
4. Refresh → rotated tokens; Logout → refresh token cleared

Admin endpoints under `/admin/**` additionally require the `SUPER_ADMIN` role
(server-side guard re-reads the DB role).

## Deployment

### Fly.io (current)

```bash
fly deploy -a glystics        # app name/config in fly.toml
fly secrets set DATABASE_URL=… JWT_SECRET=… … -a glystics
```

`fly.toml` sets a release command (`npx prisma migrate deploy`) and the
[Dockerfile](Dockerfile) `CMD` runs `pnpm run start` (which also runs
`migrate deploy`). Set all required env vars as Fly secrets; do not bake them
into the image.

### Docker (any host)

```bash
docker build -t dispatchly-api .
docker run --env-file .env -p 3000:3000 dispatchly-api
```

## Project layout

```
src/
  main.ts            bootstrap, CORS, Swagger at /api
  app.module.ts      module wiring
  health.controller.ts  GET /health (DB ping)
  modules/           auth, user, delivery, shipbubble, whatsapp, webhook,
                     payment, credits, admin, ai-agent, ai-delivery, …
prisma/
  schema.prisma      data model (DATABASE_URL)
  migrations/
```

## Resources

- [NestJS Docs](https://docs.nestjs.com) · [Prisma Docs](https://www.prisma.io/docs)
- Frontend setup: [`../fe/Readme.MD`](../fe/Readme.MD)

## Shared Delivery Network

Independent product (`/shared-network/*`, admin `/admin/shared-network/*`) with its own
plans, wallet, credit ledger, subscriptions, invoices, capacity and pools — fully isolated
from the existing `CreditWallet`. Payments reuse Bachs checkout with `SN-` references and
server-side verification. Configure the credit price with `SHARED_NETWORK_CREDIT_PRICE_KOBO`
(default `100` = ₦1/credit). Plans are seeded on first plan listing and editable in the
admin dashboard (`/admin/shared-network`). Capacity must be published by an admin before
businesses can reserve it. Apply the migration `20261105000000_shared_network`.
