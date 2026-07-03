# Foundation — Spacing

Source: `packages/design-tokens/src/spacing.ts` — a 4px base scale (`spacing[1]` = 4px through `spacing[20]` = 80px), ported directly from `apps/web-demo/index.html`'s `--space-*` custom properties.

Always reference `spacing[n]` from tokens rather than a raw pixel number — this is what lets a future global density change (e.g. tighter spacing for a tablet layout) be a one-file edit instead of a codebase-wide search.
