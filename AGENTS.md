# AGENTS.md — GymAI Coach

Universal operating manual for AI coding agents (Claude Code, Cursor, Copilot, or any other tool that reads this file). Tool-specific extras live in `CLAUDE.md`, `.cursor/rules/*.mdc`, and `.github/copilot-instructions.md` — read this file first regardless of which tool you are.

## Mission
Turn the `apps/web-demo` mockup into a production iOS + Android fitness app (`apps/mobile`) without losing the design/interaction quality the mockup already proved out. See `docs/01-product/prd/gymai-coach-prd.md` for the full product spec.

## Repo map
See `docs/00-overview/repo-map.md` for the authoritative, explained version. Short form:
- `apps/mobile` — production React Native (Expo) app.
- `apps/web-demo` — the original mockup, kept as investor/marketing demo. Do not add production user data flows here.
- `apps/storybook` — component playground for `packages/ui`.
- `packages/*` — shared code. `ui` and `design-tokens` are the design-system boundary; `api` and `domain` are the data/business-logic boundary.
- `docs/*` — numbered by concern (00 overview → 07 templates). If your change affects product behavior, architecture, or the design system, update the matching doc in the same change — don't let docs drift from code.

## Approved stack (non-negotiables)
- Package manager: **pnpm** (workspace), task runner: **Turborepo**. Do not introduce npm/yarn commands into scripts or CI.
- Mobile: **React Native via Expo**, **Expo Router** for navigation, **TypeScript** everywhere (`strict: true`, see `tsconfig.base.json`). See `docs/03-architecture/adr/0002-expo-react-native.md` and `0003-navigation.md` for why.
- State: server/remote data via a query/cache layer in `packages/api`; client/UI state local to the owning feature; auth/session state in `packages/auth` + `packages/storage`. See `docs/03-architecture/adr/0004-state-strategy.md`. Do not introduce a second global state library without an ADR.
- Backend AI calls: the OpenAI key is **server-side only**, never in client code. This was a deliberate fix early in the project (see `apps/web-demo/server.js` and git history) — do not regress it.

## How to run things
```bash
pnpm install
pnpm bootstrap      # scripts/bootstrap.sh
pnpm dev            # turbo run dev --parallel
pnpm lint           # turbo run lint
pnpm typecheck      # turbo run typecheck
pnpm test           # turbo run test
pnpm validate       # scripts/validate.sh — lint + typecheck + test, same as CI
```
Per-app/package specifics live in each one's own `README.md`/`AGENTS.md` — check there before assuming a command.

## Architecture boundaries (dependency direction)
- `apps/mobile` may depend on `packages/ui`, `domain`, `api`, `config`, `analytics`, `state`, `auth`, `notifications`, `storage`, `i18n`, `validation`.
- `packages/ui` may depend on `packages/design-tokens`. It must **not** depend on `packages/api` — components take data as props, they don't fetch it.
- `packages/domain` must **not** depend on any app or on `packages/ui` — it's pure business logic, kept testable in isolation.
- `packages/api` handles transport/schemas/DTO mapping only — it must not own navigation or presentation logic.
Violating these boundaries is a review-blocking issue, not a style nit.

## Design-system rules
- `packages/design-tokens` is the single source of truth for color, typography, spacing, radius, elevation, motion. Never hardcode a color/spacing value in `apps/mobile` or `packages/ui` — import the token.
- The tokens originated from `apps/web-demo/index.html`'s CSS custom properties. If the visual design evolves, update both, or update tokens first and treat the web demo as downstream.
- New reusable components go in `packages/ui`, not duplicated inside `apps/mobile/src/features/*`.

## Documentation update rules
| If your change touches... | Update... |
|---|---|
| A product decision, scope, or requirement | `docs/01-product/prd/gymai-coach-prd.md` |
| A user-facing flow (onboarding, generation, session, paywall) | `docs/01-product/journeys/core-flows.md` |
| Delivery sequencing / what phase something belongs in | `docs/01-product/roadmap/phases.md` |
| System design, data model, infra | `docs/03-architecture/app-architecture.md` |
| A significant technical decision (new dependency category, pattern change) | new file in `docs/03-architecture/adr/` (see `docs/07-templates/adr-template.md`) |
| Design tokens or component API | `docs/02-design/` |

## File ownership
See `CODEOWNERS`. Changes to `packages/ui`, `packages/design-tokens`, `packages/api`, `packages/domain`, or anything under `docs/03-architecture/adr/` affect every consumer — flag these explicitly in the PR description even if CODEOWNERS doesn't force a specific reviewer yet.

## Do NOT
- Do not create a second API client, HTTP wrapper, or fetch helper outside `packages/api`.
- Do not hardcode design values that already exist as tokens in `packages/design-tokens`.
- Do not put the OpenAI (or any provider) API key in client-side code, ever.
- Do not bypass the `apps/mobile` guided-session timer's wall-clock recomputation with a naive `setInterval`-only port from the mockup — see `docs/01-product/journeys/core-flows.md` §3 for why this matters.
- Do not add a new global state library without recording the decision in an ADR first.

## Required validation after code changes
Run `pnpm validate` (lint + typecheck + test) before considering a change done. For anything touching `apps/mobile`'s guided-session timer specifically, manually verify backgrounding behavior on a real device or simulator — this is the single highest-risk regression area in the product (see `docs/01-product/journeys/core-flows.md` §3).
