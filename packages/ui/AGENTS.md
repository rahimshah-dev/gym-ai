# AGENTS.md — packages/ui

## What this is
Shared React Native component library — the design-system boundary. Ports the visual language of `apps/web-demo/index.html` into native components. Consumed only by `apps/mobile` (and optionally `apps/storybook`).

## Structure
- `src/themes/` — `ThemeProvider`/`useTheme`, wraps `@gymai/design-tokens` in a React context with light/dark mode switching.
- `src/primitives/` — lowest-level building blocks (`Button`, and future `Text`, `Input`, etc.) — one visual concern each, no business logic.
- `src/components/` — composed, reusable app components (`Chip`, `Card`, and future `Toast`, `TabSwitcher`, `Dropzone`, form fields with validation states — see `apps/web-demo/index.html` for the full inventory to port).
- `src/patterns/` — larger multi-component patterns reused across screens (e.g. the exercise card, the ring timer) — empty until Phase 2/3 needs them.
- `src/icons/` — icon component wrappers (the mockup uses Lucide via CDN; native likely uses `lucide-react-native` or a bundled icon font — decide and record as an ADR if it's a nontrivial choice).
- `src/accessibility/` — shared a11y helpers (e.g. `touchTarget.ts` — 44×44 minimum, ported from the mockup's own stated requirement).

## Rules (see also root AGENTS.md "Architecture boundaries")
- **May depend on `@gymai/design-tokens`. Must NOT depend on `@gymai/api` or `@gymai/domain`.** Components take data via props; they don't fetch it or know about API shapes. If a component needs a specific data shape, define a narrow prop type locally rather than importing a domain/API type directly — keeps this package usable in `apps/storybook` with mock data.
- Every new component should have a visual reference in `apps/web-demo/index.html` (or an explicit note that it's new, native-only) — the goal is parity, not a fresh redesign, unless the design system is deliberately evolving (see `docs/02-design/`).
- Respect `MIN_TOUCH_TARGET` (44pt) on every pressable — matches the mockup's own accessibility requirement and Apple HIG / WCAG AA.
- No hardcoded colors/spacing — always through `useTheme()` or direct `@gymai/design-tokens` imports.
