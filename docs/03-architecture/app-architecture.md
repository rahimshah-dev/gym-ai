# GymAI Coach — App Architecture

**Status:** Draft v1
**Scope:** System design for turning the mockup (now `apps/web-demo`) into a production iOS + Android product.
**See also:** [ADR 0001 — Monorepo](adr/0001-monorepo.md), [ADR 0002 — Expo/React Native](adr/0002-expo-react-native.md), [phased delivery plan](../01-product/roadmap/phases.md), [repo-map.md](../00-overview/repo-map.md).

---

## 1. Where we are today

The repo is a monorepo (`apps/*`, `packages/*`) anchored by one working artifact: `apps/web-demo`, a single-page HTML/CSS/JS mockup with a thin Express proxy:

- **Client:** `apps/web-demo/index.html` — vanilla JS, no framework, no persistence (in-memory state only), Three.js hero background, Web Audio beeps, canvas confetti.
- **Server:** `apps/web-demo/server.js` — one route, `/api/generate-plan`, which holds the OpenAI key server-side and forwards a built prompt to GPT-4o.
- **No accounts, no database, no history, no payments, no push notifications, no native mobile shell yet** — that's what `apps/mobile` and `packages/*` exist to build out.

The demo is correctly scoped as a **clickable demo** — it proves the core interaction loop (equipment → AI plan → guided session) and is good enough to demo to investors or early users on desktop/mobile web. It is not the product.

---

## 2. Mobile strategy — decided

**Decision: React Native via Expo (EAS Build).** See [ADR 0002](adr/0002-expo-react-native.md) for the full comparison against a Capacitor wrap and a full-native rewrite, and the reasoning for this choice. It gets both app stores from one codebase (`apps/mobile`), has first-party plugins for everything this product needs (camera, notifications, StoreKit/Play Billing via RevenueCat, background tasks), and doesn't lock the team out of dropping to native modules later if something needs it.

The mockup's design tokens (colors, type scale, spacing, radii — see `apps/web-demo/index.html` `:root`) are the source input for `packages/design-tokens`, so the visual identity doesn't get re-invented.

---

## 3. Target system architecture

```
┌─────────────────────────────┐        ┌──────────────────────────────┐
│   apps/mobile (Expo/RN)     │        │   apps/web-demo (marketing/   │
│  iOS + Android, Expo/EAS    │        │   investor demo, evolved)     │
└───────────┬──────────────────┘        └───────────────┬───────────────┘
            │ HTTPS (JWT)                                 │ HTTPS (public)
            ▼                                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        API Layer (Node/Express, TS)                  │
│  ─ Auth (JWT + refresh, Sign in with Apple/Google, email)            │
│  ─ Users, Workout Plans, Sessions, Streaks                           │
│  ─ AI Orchestration (prompt building, caching, cost guardrails)      │
│  ─ Media (equipment photo upload → object storage)                  │
│  ─ Billing webhooks (RevenueCat → App Store / Play)                 │
│  ─ Push dispatch (Expo Push → APNs / FCM)                            │
└───────┬───────────────┬───────────────┬───────────────┬─────────────┘
        │               │               │               │
        ▼               ▼               ▼               ▼
   PostgreSQL      Object storage    OpenAI API      Analytics/Errors
 (Users, Plans,   (S3 / Cloudflare  (GPT-4o via     (PostHog/Amplitude +
  Sessions, Subs)      R2)          server key)         Sentry)
```

**Why this shape:**
- Everything sensitive (OpenAI key, DB credentials, billing secrets) stays server-side, same principle already applied when we moved the OpenAI key out of the browser in the mockup.
- The API layer is the one thing that has to exist regardless of mobile framework choice — build it first, mobile and web demo both consume it.
- Object storage for photos (not the DB) — equipment photos are write-once, read-rarely, and shouldn't bloat Postgres.

---

## 4. Backend design

### 4.1 Services (can start as one deployable, split later if needed)
- **Auth service** — JWT access tokens (short-lived) + refresh tokens (rotated, stored hashed). Sign in with Apple is **mandatory** if any other third-party login exists (App Store rule 4.8) — so ship Apple + email/password minimum for iOS.
- **AI orchestration** — wraps today's `/api/generate-plan`:
  - Add per-user rate limiting (e.g., 5 generations/hour) to control OpenAI cost and abuse.
  - Add a prompt version field on every stored plan (so plans stay reproducible/debuggable as prompts evolve).
  - Add response caching keyed on (equipment hash + time + focus + goal + level) for identical repeat requests within a short window.
  - Add a hard per-user monthly quota tied to subscription tier (see §6).
- **Workout data service** — CRUD for plans, sessions, set logs, streaks.
- **Billing service** — RevenueCat webhook receiver, entitlement sync to `users.subscription_tier`.
- **Notification service** — schedule/send reminders via Expo Push.

### 4.2 Data model (v1)

```
users            (id, email, apple_sub, created_at, subscription_tier, timezone)
equipment_photos (id, user_id, storage_url, created_at)
workout_plans    (id, user_id, source [photo|text], focus, goal, level,
                  total_minutes, warmup_note, cooldown_note, prompt_version,
                  raw_ai_response, created_at)
exercises        (id, plan_id, order_idx, name, muscle_group, sets, reps,
                  rest_seconds, set_duration_seconds, instructions[])
workout_sessions (id, plan_id, user_id, started_at, completed_at, status)
set_logs         (id, session_id, exercise_id, set_number, completed_at)
streaks          (user_id, current_streak, longest_streak, last_workout_date)
subscriptions    (user_id, tier, status, renews_at, revenuecat_id)
```

### 4.3 Infra
- **Hosting:** Fly.io or Render for the API (simple, cheap, fast to iterate) — move to AWS/GCP only if scale demands it.
- **Database:** managed Postgres (Neon/Supabase/RDS).
- **CI/CD:** GitHub Actions — lint + typecheck + test on PR, deploy on merge to `main` (staging), manual promote to prod.
- **Environments:** `local` → `staging` → `production`, each with its own OpenAI key, DB, and RevenueCat project.
- **Secrets:** environment variables via the hosting provider's secret manager, never committed (already the pattern with `.env`/`.env.example`).

### 4.4 Security & compliance carried over from the mockup fix
- OpenAI key stays server-side only (already done).
- Add: rate limiting, request size limits, input validation (equipment text length, image size/type) on every endpoint that takes user input.
- Health/fitness data is sensitive personal data even if not clinical PHI — encrypt at rest (managed Postgres handles this), TLS everywhere, clear privacy policy, data export/delete endpoints (App Store + GDPR/CCPA expectation).
- App Store review: fitness apps must not present AI output as medical advice — add a disclaimer surface in onboarding and near plan generation.

### 4.5 Observability
- **Errors:** Sentry (mobile + backend).
- **Analytics:** PostHog or Amplitude — track activation, plan generation, session completion, paywall views/conversions.
- **Cost monitoring:** dashboard/alert on OpenAI spend per day and per user, since generation cost is the main variable cost driver.

---

## 5. Phased delivery plan

Moved to [docs/01-product/roadmap/phases.md](../01-product/roadmap/phases.md) — that's the living, product-facing view of Phase 0 through Phase 10 and what "done" means for each. This document stays focused on system design; the roadmap doc stays focused on sequencing and exit criteria.

---

## 6. Open decisions to confirm before Phase 1 starts
1. Hosting provider for API + DB (Fly.io/Render/Supabase vs AWS).
2. Analytics provider (PostHog vs Amplitude).
3. Subscription price point and free-tier generation limit.
4. Whether Android launches simultaneously with iOS or follows a few weeks later.
