# Coding Standards

## Language & style
- TypeScript everywhere, `strict: true` (see `tsconfig.base.json`). No `any` without a comment explaining why it's unavoidable.
- Linting via `@gymai/eslint-config` — run `pnpm lint` before opening a PR (or let CI catch it, but faster locally).
- Formatting via the shared Prettier config in `config/prettier` — don't hand-format against it.

## Architecture boundaries
See root `AGENTS.md` "Architecture boundaries" — this is the most important standard in the repo and the one most likely to be violated by accident under time pressure:
- `packages/domain` has zero UI/HTTP/React Native dependencies.
- `packages/ui` depends on `packages/design-tokens` only, never on `packages/api`.
- `packages/api` is the only package that calls `fetch()` against the production API.

## Documentation-as-code
If a change affects product behavior, architecture, or the design system, update the matching doc in `docs/` in the **same PR** — see the table in root `AGENTS.md`. A PR that changes behavior without a doc update should be treated as incomplete, not just under-documented.

## Naming
- Domain entities: PascalCase, singular (`WorkoutPlan`, not `WorkoutPlans`).
- API DTOs: suffixed `Dto` (`GeneratePlanResponseDto`) to make wire-shape vs. domain-shape unambiguous at a glance.
- Packages: `@gymai/<name>`, kebab-case.

## Testing
See `docs/04-engineering/testing-strategy.md`.
