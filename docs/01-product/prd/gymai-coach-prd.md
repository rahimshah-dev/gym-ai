# GymAI Coach — Product Specification

**Status:** Draft v1
**Companion docs:** [app-architecture.md](../../03-architecture/app-architecture.md) (system design), [phases.md](../roadmap/phases.md) (phased build plan), [core-flows.md](../journeys/core-flows.md) (user & data flows)

---

## 1. Problem statement

People with access to a gym (home or commercial) often don't know how to turn the equipment in front of them into a structured, time-boxed workout. Generic workout apps assume a fixed equipment set or require manual exercise selection; personal trainers are expensive and not always available. GymAI Coach closes that gap: point a phone at whatever equipment is available, state how much time exists, and get a complete, timed, guided workout immediately.

## 2. Target users
- **Primary:** home-gym owners and hotel/travel gym users who have inconsistent equipment access and want a plan that fits *exactly* what's in front of them, right now.
- **Secondary:** gym-goers who want variety/structure without paying for a trainer or planning their own splits.
- **Not targeting (v1):** competitive bodybuilders/powerlifters needing periodized programming, physical-therapy/rehab use cases (explicitly out of scope — disclaimer required, see §8).

## 3. Goals / non-goals

**Goals (v1 launch):**
- Generate a usable, correctly-timed workout from a photo or text description of available equipment in under 15 seconds.
- Guide the user through the workout with an accurate, backgroundable timer and clear rest cues.
- Retain workout history and streaks so the app has a reason to be opened again.
- Convert a meaningful fraction of free users to a paid tier funding the AI cost.

**Non-goals (v1):**
- Long-term periodized programs (multi-week progressive overload plans) — v1 is single-session generation.
- Nutrition tracking/macros.
- Social features (feeds, following, leaderboards) — deferred to post-launch backlog.
- Form-check via video/vision — deferred (natural v2 extension, see roadmap/phases.md, Phase 10).

## 4. Feature list (mockup → production)

| Feature | In mockup? | Production requirement |
|---|---|---|
| Equipment input (photo or text) | Yes | Same UX; photo goes through native camera/picker, uploaded to object storage, not just base64'd in memory |
| Time / focus / goal / level selection | Yes | Same UX, values persisted with the generated plan |
| AI Suggest time | Yes (client-side heuristic) | Same, no change needed |
| AI plan generation | Yes (direct-to-OpenAI in early version, now proxied) | Add rate limiting, quota by subscription tier, prompt versioning, response caching |
| Plan view w/ exercise cards | Yes | Same UX; plans are now persisted, viewable later from history |
| Guided workout session w/ ring timer | Yes | Must survive app backgrounding (local notification fallback for rest-over/set-over alerts) |
| Rest overlay | Yes | Same UX |
| Audio cues | Yes (Web Audio) | Native audio session handling (must duck/resume correctly with music apps playing) |
| Completion screen + confetti | Yes | Same UX, now also writes a `workout_sessions` record |
| Accounts/auth | No | **New:** email + Sign in with Apple (mandatory per App Store guideline 4.8) + Google |
| Workout history | No | **New:** list of past plans/sessions, streak counter |
| Notifications | No | **New:** workout reminders, streak-risk nudges |
| Monetization | No | **New:** freemium with monthly generation cap, subscription via RevenueCat |
| Offline handling | No | **New:** graceful messaging when generation requires network; cached plans viewable offline |

## 5. Data model

See app-architecture.md §4.2 (../../03-architecture/app-architecture.md) for the authoritative schema (`users`, `equipment_photos`, `workout_plans`, `exercises`, `workout_sessions`, `set_logs`, `streaks`, `subscriptions`). This spec references entities by name only.

## 6. API surface (v1)

All endpoints require a valid JWT unless noted.

```
POST   /api/auth/signup            email/password
POST   /api/auth/login             email/password
POST   /api/auth/apple             Sign in with Apple token exchange
POST   /api/auth/refresh           rotate refresh token
POST   /api/generate-plan          equipment (photo|text), time, focus, goal, level → plan
GET    /api/plans                  list current user's saved plans
GET    /api/plans/:id              fetch one plan + exercises
POST   /api/sessions               start a session for a plan
PATCH  /api/sessions/:id           update status (completed/quit), log sets
GET    /api/sessions               workout history
GET    /api/streaks/me             current streak info
POST   /api/billing/webhook        RevenueCat → subscription sync   (no JWT; signed webhook)
GET    /api/me                     current user profile + subscription tier
DELETE /api/me                     account deletion (privacy compliance)
```

Each endpoint's request/response shape should be captured in an OpenAPI spec once Phase 1 begins — this table is the contract summary, not the full schema.

## 7. Non-functional requirements

- **Performance:** plan generation perceived latency < 15s (matches current loading-step animation pacing in the mockup); app cold start < 2s.
- **Reliability:** guided-session timer must not drift or reset if the app is backgrounded — this is the single most timer-sensitive interaction in the product and the biggest regression risk moving off a browser tab.
- **Accessibility:** WCAG AA contrast (already a mockup requirement), Dynamic Type / VoiceOver / TalkBack support, minimum 44×44pt touch targets, no hover-only affordances.
- **Localization:** v1 English-only; copy should be extracted to a strings file from day one so this isn't a rewrite later.
- **Privacy/compliance:** equipment photos and workout data are personal data — need a privacy policy, data export, and account/data deletion path before App Store submission. AI output must carry a "not medical advice" disclaimer (see §8).
- **Cost control:** AI generation is the dominant variable cost. Rate limiting + subscription quotas are a functional requirement, not just a nice-to-have.

## 8. Trust & safety / compliance requirements
- Onboarding must surface: "GymAI Coach provides general fitness suggestions generated by AI and is not a substitute for professional medical or training advice. Consult a doctor before starting any new exercise program."
- Equipment photos: no face/other-person detection needed, but should not be used for any purpose beyond generating the plan (state this explicitly in the privacy policy) and should not be retained longer than needed unless the user opts to keep history.
- Sign in with Apple is mandatory the moment Google or email/password login exists (App Store rule 4.8) — build this in Phase 1, not bolted on later.

## 9. Monetization
- **Free tier:** limited AI generations/month (proposed: 3), unlimited access to previously generated/saved plans and history.
- **Paid tier:** unlimited generations, priority AI response, (future) advanced focus/goal combos.
- **Billing:** RevenueCat wrapping App Store/Play Store subscriptions — avoids building payment infra directly, and normalizes entitlement state across platforms.
- Exact price point is an open decision (app-architecture.md §6, ../../03-architecture/app-architecture.md) — validate via the investor/demo deployment and early beta feedback before locking it in.

## 10. Success metrics
- **Activation:** % of signups that complete one full guided workout within 24 hours.
- **Retention:** D1 / D7 / D30 return rate; streak length distribution.
- **Core loop health:** average time from "open app" to "first set started."
- **Monetization:** free-to-paid conversion rate, cost-per-active-user (OpenAI spend) vs. revenue-per-user.
- **Quality:** AI plan regeneration rate (proxy for "the first plan wasn't good enough").

## 11. Out of scope for v1 (explicitly deferred)
- Multi-week periodized programs
- Nutrition/macro tracking
- Social feed / following / leaderboards
- Apple Health / Google Fit sync
- Wearable companion app
- Video/vision-based form checking
- Coach chat / conversational plan edits

These are captured as the Phase 10 backlog in roadmap/phases.md and should stay out of v1 scope to keep the launch timeline realistic.
