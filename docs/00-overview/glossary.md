# Glossary

**ADR (Architecture Decision Record)** — a short document capturing a significant technical decision, the alternatives considered, and why. See `docs/03-architecture/adr/`.

**Demo / `apps/web-demo`** — the original HTML/JS mockup, kept running as an investor/marketing demo. Not the production app.

**Domain entity** — a core business object (e.g. `WorkoutPlan`, `Exercise`) defined once in `packages/domain` and reused by both the mobile app and (eventually) the backend.

**DTO (Data Transfer Object)** — the raw shape of data as it comes over the wire (e.g. `GeneratePlanResponseDto` in `packages/api`), before being mapped into a domain entity.

**Exit criteria** — the specific, checkable condition that marks a roadmap phase as done (see `docs/01-product/roadmap/phases.md`).

**Guided session** — the core in-workout experience: a countdown timer per set, rest periods between sets, audio cues, and a completion screen. The most timer-sensitive, highest-regression-risk part of the product.

**Monorepo** — one repository containing multiple apps (`apps/*`) and shared packages (`packages/*`), managed with pnpm workspaces + Turborepo. See `docs/03-architecture/adr/0001-monorepo.md`.

**Prompt version** — a version tag stored alongside every AI-generated plan so that as the AI prompt template evolves over time, old plans remain traceable to the prompt that produced them.

**Quota / generation limit** — the number of AI-generated workout plans a free-tier user gets per month before hitting the paywall. See `docs/01-product/prd/gymai-coach-prd.md` §9.

**Token (design)** — a named design value (a color, a spacing unit, a radius) defined once in `packages/design-tokens` and referenced everywhere else, instead of hardcoded values scattered through the codebase. Not to be confused with an auth token (JWT).
