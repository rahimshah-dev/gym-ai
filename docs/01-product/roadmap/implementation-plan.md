# Implementation Plan — Path to Delivery

**Last updated:** 2026-07-04
**Purpose:** the concrete, current-state-aware companion to [phases.md](phases.md). That file says what each phase *is*; this file says where we actually stand today and exactly what to do next, split by who has to do it.

**Read this first** at the start of any new session on this project — before assuming something is built, check §1.

---

## 1. Current state (verified, not aspirational)

| Area | Status |
|---|---|
| `apps/web-demo` | **Working.** Full mockup, now running on Gemini (`gemini-2.5-flash`), verified end-to-end: setup → AI plan → guided timed session → completion. This is the only fully functional artifact in the repo today. |
| `apps/mobile` | **Skeleton only, but now installable.** Expo Router routes exist, but every screen is a placeholder (`<Text>Home placeholder</Text>` etc). `pnpm install`, lint, and typecheck all pass (fixed 2026-07-21 alongside the CI lockfile fix — see commit `cbcbd6c`). Still not yet run with `npx expo install` (real Expo SDK version resolution) or booted on a simulator/device — that's still the actual first step, install just no longer fails outright. |
| `apps/storybook` | Not started. Deferred by design until `packages/ui` has enough components to need it. |
| `packages/design-tokens`, `packages/domain` | Real content — tokens ported from the mockup's CSS, entities matching the PRD's data model. |
| `packages/ui`, `packages/api` | Minimal working examples (`Button`/`Chip`/`Card`, `generatePlan` endpoint wrapper) — not a full component library or API client yet. |
| Other 12 `packages/*` | Empty-export stubs with a README describing intent. No real code. |
| Backend / database / auth | **Does not exist.** `apps/web-demo/server.js` is a demo proxy, not the production API described in `app-architecture.md`. |
| CI (`.github/workflows/`) | Written, not yet proven — no successful run yet since `apps/mobile` was never installed and the CI pnpm-version bug was only just fixed. |
| Accounts (Apple Developer, Google Play Console, hosting, RevenueCat, analytics) | None connected yet. |
| Docs | Ahead of the code, deliberately — the spec exists so building has something to follow, not because building happened first. |

**One known inconsistency to be aware of:** ~9 doc files (PRD, architecture, a few others) still say "OpenAI/GPT-4o" even though the actual working code now runs on Gemini. Not fixed yet — see §5.

---

## 2. Decisions that need YOU, not the agent

The agent can write code for any of these once decided, but can't make the call or create the accounts.

| Decision | Blocks | If you don't decide, agent's default |
|---|---|---|
| Confirm Gemini as the permanent AI provider (vs. going back to OpenAI once it has credits, or supporting both) | Phase 1 backend design | Assume Gemini is permanent, since it's what's proven working |
| Hosting provider for API + DB (Fly.io / Render / Supabase / AWS) | Phase 1 start | Fly.io or Render — cheapest, fastest to stand up for a small team |
| Apple Developer Program enrollment ($99/yr) | Phase 8 (TestFlight) — start now, approval can take days | Can't default this — needs your Apple ID/payment |
| Google Play Console account ($25 one-time) | Phase 8 (Play Internal Testing) | Can't default this — needs your Google account/payment |
| Analytics provider (PostHog vs Amplitude) | Phase 5+ event instrumentation | PostHog — generous free tier, easy self-host option later |
| Subscription price point + free-tier generation limit | Phase 6 | 3 free plans/month, then paywall — matches what's already drafted in the PRD |
| Android simultaneous launch vs. staggered after iOS | Phase 9 | Staggered — iOS first, Android 2-3 weeks later, common pattern for a small team |

Nothing above blocks starting *today's* immediate next steps in §3 — they only block specific later phases. But Apple/Google account creation should start now regardless, since approval isn't instant.

---

## 3. Immediate next steps, in order

Tagged **[Agent]** (can be done autonomously in a session), **[You]** (needs your account/payment/identity), or **[Both]**.

1. ~~**[Agent]** Run `pnpm install` at the repo root~~ — **done** (2026-07-21): `pnpm install`, `pnpm lint`, `pnpm typecheck` all pass now (fixed alongside the CI lockfile issue). What's left: run `npx expo install` inside `apps/mobile` (real Expo SDK version resolution — current versions are still hand-picked) and actually boot it in a simulator or Expo Go for the first time.
2. **[Agent]** Fix whatever breaks in step 1's remaining part (Expo SDK version resolution, Metro/simulator issues) — the install-level friction is resolved, but nothing has been booted on a device yet.
3. **[You]** Start Apple Developer + Google Play Console enrollment now, in parallel with everything else — this is pure lead time, doesn't block other work.
4. **[Agent]** Decide on a concrete backend project layout (likely a new `apps/api` — not yet created) and scaffold it: Express/Fastify, the chosen DB client, and port `apps/web-demo/server.js`'s Gemini `generate-plan` logic into it with real persistence (`workout_plans`, `exercises` tables per `app-architecture.md` §4.2).
5. **[You]** Provision the actual hosting account + database once a provider is chosen (§2) — the agent can write the config/Terraform, but creating billed cloud resources needs your account.
6. **[Agent]** Build auth (email + Sign in with Apple + Google) against the provisioned backend — this is what unlocks real Phase 1 exit criteria (sign up → log in → generate → fetch plan by id).
7. **[Both]** Phase 2: mobile app shell + design system. Agent builds `packages/ui` components and wires navigation; you review against `apps/web-demo/index.html` for visual fidelity — this is a judgment call a screenshot diff can't fully automate.
8. **[Agent]** Phase 3: port each mockup screen's real behavior into `apps/mobile` (not placeholders) — setup form, plan view, guided session. The guided-session timer's backgrounding behavior (`core-flows.md` §3) is the highest-risk piece; budget real device testing time for it, not just simulator testing.

Steps 4 onward assume §2's hosting decision is made — if it isn't, the agent should stop and ask rather than guess and build against the wrong provider's SDK.

---

## 4. Fast follow (not blocking, but worth doing soon)

- Update the ~9 docs still referencing OpenAI/GPT-4o to reflect Gemini as the real provider (§1). Low risk, just hasn't been asked for yet.
- Once `apps/mobile` actually boots (step 1 above), update its `AGENTS.md` "Current status" section — it currently says "not yet installed," which will be stale the moment step 1 completes.
- Confirm whether `docs/03-architecture/app-architecture.md`'s data model needs any adjustment now that Gemini (not OpenAI) is the real AI call — the JSON contract is provider-agnostic already (it's our own prompt's output schema), so likely no change needed, but worth a deliberate check rather than an assumption.

---

## 5. Full phase-by-phase detail

See [phases.md](phases.md) for what "done" means for Phase 0 through Phase 10, with exit criteria per phase. This document exists to make the *next* move obvious; that one exists to make the *whole path* legible.

## 6. Risk watchlist (carried forward, don't let these get lost)

- **Timer backgrounding** — the single highest-risk regression area moving from browser to native. See `docs/01-product/journeys/core-flows.md` §3 and `docs/03-architecture/adr/0002-expo-react-native.md`.
- **AI cost control** — no rate limiting or quota exists yet outside the demo's implicit "one shared key" ceiling. Must land in Phase 1, not bolted on after real users arrive.
- **App Store Sign in with Apple requirement** — must ship alongside Google/email login, not after (guideline 4.8).
- **`apps/mobile/package.json` versions are illustrative** — expect the first real install to surface incompatibilities; this is expected, not a sign something else is wrong.
