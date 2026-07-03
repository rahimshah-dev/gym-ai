# GymAI Coach — One Pager

**What it is:** Point your phone at whatever gym equipment is available, say how much time you have, and get a complete, timed, AI-generated workout — then follow it with a guided, timer-driven session.

**Who it's for:** People with inconsistent equipment access — home-gym owners, hotel/travel gym users, anyone who doesn't want to plan their own workout or pay for a trainer every session.

**Why now:** GPT-4o's vision capability makes "photo of equipment → structured plan" a one-call problem instead of a manual-tagging problem. The hard part used to be equipment recognition; that's now commoditized, so the differentiator is the guided-session experience and retention loop, not the AI call itself.

**What exists today:** A working browser demo (`apps/web-demo`) that proves the full loop — photo/text → AI plan → guided timed session with rest periods, audio cues, and completion celebration. No accounts, no persistence, no payments yet; that's intentional scope for a demo, not a gap in the demo itself.

**What's being built:** A production iOS + Android app (`apps/mobile`, React Native/Expo) with accounts, workout history, streaks, push notifications, and a freemium subscription model. See `docs/01-product/roadmap/phases.md` for the phase-by-phase path from here to there.

**Business model:** Freemium — limited free AI generations/month, unlimited via subscription (RevenueCat, App Store/Play billing). See `docs/01-product/prd/gymai-coach-prd.md` §9.

**Biggest technical risk:** The guided-session timer must stay accurate when the app is backgrounded — this didn't matter in the browser demo but is the single highest-risk regression area moving to a real mobile OS. See `docs/01-product/journeys/core-flows.md` §3.

**Non-goals for v1:** Multi-week periodized programs, nutrition tracking, social features, wearable integration, video form-checking — all explicitly deferred, see `docs/01-product/prd/gymai-coach-prd.md` §11.
