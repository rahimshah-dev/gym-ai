# Foundation — Color

Source: `packages/design-tokens/src/color.ts`, ported from `apps/web-demo/index.html` `:root` and `html[data-theme="light"]`.

- **Dark is the default** mode, not a secondary option — `--color-bg: #0f0f0d` and friends. Light mode is available via the theme toggle, not just OS `prefers-color-scheme`.
- **Accent (`primary`)** is teal (`#3fc4cc` dark / `#0a7a82` light) — used for CTAs, selected states (chips, tabs), and the active-set ring timer stroke.
- **Semantic feedback colors** (`success`, `error`, `warning`) are used consistently: warning/orange for rest periods specifically (the ring timer switches from teal to orange during rest — see `docs/01-product/journeys/core-flows.md` §3), error/red for validation and destructive actions (Quit button), success/green reserved for confirmation states.
- All text/background pairings must meet WCAG AA contrast — this was already a stated requirement of the mockup; don't relax it when porting to native.

Use `semanticColors(mode)` from `packages/design-tokens` rather than reaching for `darkColors`/`lightColors` directly in component code — the semantic layer is what makes components theme-agnostic.
