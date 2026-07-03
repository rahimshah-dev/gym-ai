# Stakeholder Guide (non-technical readers)

You don't need to read code to understand what's happening in this project. Here's where to look depending on your question.

**"What is this product?"** → `docs/00-overview/product-one-pager.md` — one page, no jargon.

**"What's the current state of the build?"** → `docs/01-product/roadmap/phases.md` — Phase 0 through Phase 10, each with a plain-English goal and an "exit criteria" line that says what "done" means. If you want to know "are we on track," this is the doc to check against.

**"Can I try it?"** → Yes — `apps/web-demo` is a working demo of the core experience (equipment photo → AI workout plan → guided session). It's intentionally simple (no login, no saved history) — it exists to prove the idea, not to be the finished product. Ask an engineer for the current demo URL, or see `apps/web-demo/README.md` for how to run it locally.

**"What will the real app do that the demo doesn't?"** → Accounts, saved workout history and streaks, push reminders, and a paid subscription tier. See the feature comparison table in `docs/01-product/prd/gymai-coach-prd.md` §4.

**"How much does this cost to run?"** → The main variable cost is the AI (OpenAI) call per generated workout. `docs/03-architecture/app-architecture.md` §4.5 covers cost monitoring; the free-tier limit (how many free plans a user gets per month) is one of the open decisions listed in `docs/01-product/roadmap/phases.md`.

**"What decisions have already been made, and why?"** → `docs/03-architecture/adr/` — each file is a short "Architecture Decision Record": what was decided, what else was considered, and why. Written to be readable without an engineering background.

**"What's explicitly NOT being built right now?"** → `docs/01-product/prd/gymai-coach-prd.md` §11 — nutrition tracking, social features, wearables, and a few others are deliberately out of scope for the first release so the timeline stays realistic.
