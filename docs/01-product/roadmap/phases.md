# Delivery Roadmap — Phase by Phase

**Status:** Draft v1
**Source of truth for:** what gets built when, and what "done" means for each phase.
**See also:** [app-architecture.md](../../03-architecture/app-architecture.md) for the system design each phase implements, [gymai-coach-prd.md](../prd/gymai-coach-prd.md) for the feature/requirements detail.

Each phase lists goal, key deliverables, and exit criteria. Estimates assume a small team (1–2 engineers + 1 designer, part-time PM).

## Phase 0 — Foundation (1–2 weeks)
**Goal:** Lock decisions, stand up the monorepo skeleton.
- Confirm mobile strategy — **decided: React Native (Expo)**, see [ADR 0002](../../03-architecture/adr/0002-expo-react-native.md).
- Extract design tokens from `apps/web-demo/index.html` into `packages/design-tokens`.
- Monorepo skeleton stood up: `apps/mobile`, `apps/web-demo`, `apps/storybook`, `packages/*` — see [ADR 0001](../../03-architecture/adr/0001-monorepo.md).
- Define data model v1 (`app-architecture.md` §4.2), stand up staging Postgres.
- CI skeleton: lint, typecheck, empty test suite passing on push.
- **Exit criteria:** empty RN app boots on iOS simulator and Android emulator; API deploys to staging; `packages/domain` and `packages/api` importable from both `apps/mobile` and a future API service.

## Phase 1 — Core backend & auth (2–3 weeks)
- Implement `users`, auth (email + Apple + Google), JWT/refresh flow.
- Port `apps/web-demo/server.js`'s `/api/generate-plan` into the production API with rate limiting, quota, and prompt versioning.
- Implement `workout_plans` + `exercises` CRUD (save what the AI returns instead of discarding it).
- **Exit criteria:** a Postman/Thunder Client collection can sign up, log in, generate a plan, and fetch it back by id.

## Phase 2 — Mobile app shell & design system (2–3 weeks)
- Flesh out `apps/mobile` navigation (onboarding → home → generate → plan → session → history → profile) using Expo Router.
- Build `packages/ui` component library matching the mockup: buttons, chips, cards, toasts, tab switcher, dropzone/photo picker, form fields with the same validation states.
- Wire auth screens to Phase 1 API via `packages/api`.
- **Exit criteria:** a logged-in user can navigate every screen shell (no AI yet) with production-matching visuals.

## Phase 3 — Core feature parity (3–4 weeks)
- Setup form: native camera/photo library picker, equipment text mode, time/focus/goal/level exactly as in the mockup.
- AI loading state, plan view (exercise cards, expand/collapse instructions).
- Guided session: native-safe timer (must keep counting accurately if the app is backgrounded — use `expo-task-manager`/local notifications to fire the "rest over" alert even if the screen is off), rest overlay, native audio cues, pause/resume/quit.
- Completion screen with stats + confetti.
- **Exit criteria:** full golden path (photo → plan → guided workout → completion) works end-to-end on a physical iOS device and an Android device; backgrounding the app mid-timer doesn't desync the countdown.

## Phase 4 — Persistence & history (2 weeks)
- Save every generated plan and every completed session.
- History tab: past workouts, streak counter, "repeat this workout" (reuses saved plan, no new AI call/cost).
- **Exit criteria:** closing and reopening the app preserves workout history and streak.

## Phase 5 — Notifications & engagement (1–2 weeks)
- Push permission prompt (post-onboarding, not on first launch — better opt-in rates).
- Workout reminders, streak-at-risk nudges via `packages/notifications`.
- **Exit criteria:** a scheduled reminder fires on a real device.

## Phase 6 — Monetization (2 weeks)
- RevenueCat integration, App Store/Play Store product setup.
- Free tier: e.g. 3 AI-generated plans/month; paywall on 4th.
- Restore purchases, manage subscription flow.
- **Exit criteria:** a test purchase completes in sandbox on both platforms and unlocks unlimited generation.

## Phase 7 — Polish, accessibility, compliance (2 weeks)
- VoiceOver/TalkBack pass, Dynamic Type support, contrast audit (the mockup already targets WCAG AA — carry that bar forward).
- Privacy policy, Terms of Service, in-app disclaimer near AI-generated content ("not medical advice, consult a professional").
- Crash-free rate check via Sentry, performance profiling (cold start, timer jank).
- **Exit criteria:** passes an internal accessibility + App Store guideline checklist (see [qa-checklists.md](../../06-delivery/qa-checklists.md)).

## Phase 8 — Beta & QA (2 weeks)
- TestFlight + Play Internal Testing rollout to ~20–50 users.
- Bug bash, load-test the AI endpoint, confirm cost dashboard alerts fire correctly.
- **Exit criteria:** no P0/P1 bugs open, cost-per-active-user is within target.

## Phase 9 — Launch (1 week)
- App Store + Play Store submission, store listing assets (can reuse/extend the mockup's visual language for screenshots).
- Launch checklist: analytics live, support inbox live, on-call for launch week. See [app-store-release.md](../../06-delivery/app-store-release.md).

## Phase 10 — Post-launch iteration (ongoing)
Backlog, roughly in priority order once real usage data exists:
- Apple Health / Google Fit sync (calories, active minutes).
- Social/share of completed workouts.
- Wearable integration (Apple Watch companion for the timer).
- Vision-based form-check (photo/video during a set → AI feedback) — natural extension of the existing Vision API usage.
- Coach chat (conversational plan adjustments).

## What happens to the current mockup
Keep it — repurpose rather than discard, now living at `apps/web-demo`:
- **Investor/demo artifact:** deploy `apps/web-demo` as-is (already works) to a public URL behind a rate-limited demo key, so investors and early testers can click through the core loop without installing anything.
- **Marketing site foundation:** the landing view (hero, "how it works") becomes the public marketing page once the real app ships, linking out to the App Store/Play Store instead of "Start My Workout" opening the in-browser demo.
- **Design source of truth:** its CSS custom properties seeded `packages/design-tokens` — keep both in sync if the design evolves, rather than letting two token systems drift apart.

## Open decisions still to confirm before Phase 1 starts
1. Hosting provider for API + DB (Fly.io/Render/Supabase vs AWS).
2. Analytics provider (PostHog vs Amplitude).
3. Subscription price point and free-tier generation limit.
4. Whether Android launches simultaneously with iOS or follows a few weeks later.
