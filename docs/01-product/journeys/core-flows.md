# GymAI Coach — User & System Flows

**Status:** Draft v1
**Companion docs:** [app-architecture.md](../../03-architecture/app-architecture.md) (system design), [phases.md](../roadmap/phases.md) (phased build plan), [gymai-coach-prd.md](../prd/gymai-coach-prd.md) (feature/data/API spec)

---

## 1. Onboarding flow

```
App first launch
   │
   ▼
Splash / value prop screens (what the app does, 2-3 slides)
   │
   ▼
Sign up: Email  |  Sign in with Apple  |  Sign in with Google
   │
   ▼
Disclaimer screen: "not medical advice, consult a doctor" (must be
acknowledged — required before generating any plan)
   │
   ▼
Permission primers (asked contextually, not all at once):
   ─ Camera            → requested when user first taps "Photo" mode
   ─ Notifications     → requested after first completed workout, not on launch
   │
   ▼
Home screen (empty state: "Generate your first workout")
```

**Why disclaimers before permissions:** App Store review checks that health/fitness AI apps carry a visible disclaimer; putting it before any AI call is used keeps it unavoidable rather than buried in settings.

**Why notification permission is deferred:** asking for push permission immediately after install has materially worse opt-in rates than asking after the user has had one successful session — the mockup's existing "completion" screen (trophy + confetti) is the natural moment to ask, since the user is in a positive-affect state right after finishing a workout.

---

## 2. Core workout generation flow (the existing mockup loop, extended)

```
Home
  │  tap "Generate Workout"
  ▼
Setup screen
  │
  ├─ Equipment: Photo (native camera/library) or Text
  ├─ Available time (manual or "AI Suggest")
  ├─ Focus area (optional, single-select)
  ├─ Fitness goal (optional, single-select)
  └─ Fitness level (optional)
  │
  │  tap "Generate My Workout"
  ▼
Client-side validation (equipment present, time in range)
  │  fail → inline field errors + error banner (unchanged from mockup)
  │  pass ▼
Loading screen (4-step animated status, unchanged from mockup)
  │
  ▼
POST /api/generate-plan  { equipmentMode, equipmentText | equipmentImage,
                            time, focus, goal, level }
  │
  ▼
API: check user's monthly quota
  │  over quota → 402/403 → client shows paywall (see §5)
  │  within quota ▼
API: build prompt (same template as apps/web-demo/server.js), call OpenAI GPT-4o
  │  OpenAI error → mapped error (see §4) → client shows toast, returns to Setup
  │  success ▼
API: parse JSON, strip markdown fences (unchanged logic), persist as
  workout_plans + exercises rows, return plan + id
  │
  ▼
Client: renderPlan() (unchanged from mockup) — exercise cards, warmup note,
  expandable instructions
  │
  │  tap "Start Guided Session"
  ▼
Guided session (see §3)
```

**What's new vs. the mockup:** the quota check and the persistence step. Everything from "tap Generate" through the plan rendering is otherwise a direct port of the existing client logic.

---

## 3. Guided session flow (timer-critical path)

```
Start Guided Session
  │
  ▼
loadExercise(idx=0, set=0)
  │
  ▼
Active-set countdown (ring timer, unchanged visual/logic from mockup)
  │
  ├─ 3 seconds left → countdown beep
  ├─ user taps Pause → timer halts, state preserved
  ├─ user taps Next Set → skip to rest immediately
  └─ timer hits 0 → low beep → enter Rest
        │
        ▼
   Rest overlay (frosted glass, countdown, "Next up: X")
        │
        ├─ user taps Skip Rest → high beep → advance immediately
        └─ timer hits 0 → high beep → advance
  │
  ▼
advanceSet(): increment set; if sets exhausted → next exercise;
  if exercises exhausted → Workout Complete
  │
  ▼
(loop back to loadExercise for next set/exercise)
```

**Backgrounding behavior (new requirement, no mockup equivalent):**
```
App backgrounded during Active-set or Rest countdown
  │
  ▼
Local notification scheduled for the exact remaining-seconds mark
(so "rest over" or "set over" fires even with the screen off)
  │
  ▼
App foregrounded again
  │
  ▼
Timer recalculated from wall-clock elapsed time (not from a paused
JS interval, which would drift/stop) — the ring and digits must
reflect the same countdown the user would have seen had the app
stayed foregrounded
```

This is the highest-risk behavioral gap between the browser mockup (where `setInterval` was "good enough" for a demo) and a real mobile app (where the OS can suspend JS execution entirely). Phase 3 in roadmap/phases.md calls this out explicitly as an exit criterion.

**Quit flow:** unchanged from mockup — confirm dialog, then `PATCH /api/sessions/:id { status: 'quit' }` instead of just discarding client state, so history reflects incomplete sessions too.

---

## 4. Error flows

| Trigger | Client behavior |
|---|---|
| Network unreachable during generation | Toast: "Could not connect. Check your connection." Return to Setup, form values preserved. |
| OpenAI 401 (server misconfigured key) | Toast: generic "AI service unavailable, try again shortly" — never surface key/auth internals to the end user (server logs the real cause). |
| OpenAI 429 (rate limited upstream) | Toast: "High demand right now, please try again in a moment." |
| AI response fails JSON parse | Toast: "AI returned an unexpected format. Please try again." — auto-offers Regenerate. |
| User over monthly quota | Paywall sheet instead of loading screen (see §5) — not a generic error. |
| App backgrounded mid-generation | Continue the request; if the app returns before it resolves, show the result normally; if the user force-quit, the plan is still persisted server-side and appears in history on next launch. |
| Timer backgrounded (see §3) | Handled via local notification + wall-clock recompute, not an error state. |

---

## 5. Monetization / paywall flow

```
User at monthly generation quota, taps "Generate My Workout"
  │
  ▼
Paywall sheet: current tier, what unlocks with upgrade, price, CTA
  │
  ├─ "Upgrade" → App Store/Play Store purchase sheet (via RevenueCat)
  │       │
  │       ├─ success → entitlement synced → retry generation automatically
  │       └─ cancel  → return to Setup, generation not attempted
  │
  └─ "Not now" → return to Setup (equipment/time selections preserved,
                  generation not attempted)
```

Paywall should also be reachable proactively from a Settings/Upgrade entry point, not only when the user hits the quota wall.

---

## 6. Notification flow (post-launch engagement)

```
Trigger candidates:
  ─ N days since last completed workout (streak-risk nudge)
  ─ User-set preferred workout time (if configured in Settings)
  │
  ▼
Expo Push → APNs / FCM → device
  │
  ▼
Tap notification → deep link straight to Setup screen (fastest path
back into the core loop, not just the home screen)
```

---

## 7. Data flow summary (system level)

```
Mobile client
  │  (equipment photo/text, preferences)
  ▼
API server  ──────────────►  Object storage (equipment photo, if any)
  │
  │  (built prompt + image ref)
  ▼
OpenAI GPT-4o (Chat Completions + Vision)
  │
  │  (JSON plan text)
  ▼
API server (parse, validate, persist)
  │
  ▼
PostgreSQL (workout_plans, exercises)
  │
  │  (plan + id)
  ▼
Mobile client (render plan, start session)
  │
  │  (set completions, session status)
  ▼
API server → PostgreSQL (workout_sessions, set_logs, streaks update)
  │
  ▼
Analytics event stream (PostHog/Amplitude) + Sentry (errors) in parallel
  at each of the above steps, not shown here for clarity
```

---

## 8. Investor / demo flow (current mockup, kept in parallel)

```
Investor/tester opens public demo URL (no install)
  │
  ▼
apps/web-demo landing → Setup → (rate-limited shared demo key) → Plan →
Guided Session → Completion
```

This flow intentionally has **no auth, no persistence, no payments** — it exists purely to demonstrate the core interaction loop quickly. It should be clearly labeled as a demo (e.g. a small banner: "This is a demo of the core experience — the full app includes accounts, history, and more") so it isn't mistaken for the production product during a pitch.
