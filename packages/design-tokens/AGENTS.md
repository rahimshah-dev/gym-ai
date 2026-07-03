# AGENTS.md — packages/design-tokens

## What this is
The single source of truth for color, typography, spacing, radius, motion, and elevation. Ported from `apps/web-demo/index.html`'s CSS custom properties — see `docs/03-architecture/adr/0001-monorepo.md`.

## Rules
- Never add a token that duplicates an existing value under a new name — check `src/*.ts` before adding.
- If the mockup's design changes, update here first (or in lockstep) — don't let `apps/web-demo` and this package drift into two different palettes.
- `packages/ui` is the only expected direct consumer of raw tokens (via `semanticColors()`); feature code in `apps/mobile` should go through `packages/ui` components, not import raw hex values from here directly.
- This package has zero runtime dependencies on purpose — it must stay importable from both React Native and any future web/Node context without pulling in platform-specific code.
