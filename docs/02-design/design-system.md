# Design System — Overview

The design system originates from `apps/web-demo/index.html`, which already defines a complete, working visual language: dark-mode-first, teal accent, Instrument Serif italic for display type, DM Sans for body text, a 4px spacing scale, and a defined radius/shadow/transition system. Production work is about **porting this faithfully to native components**, not redesigning it — see `docs/03-architecture/adr/0002-expo-react-native.md` for why fidelity to the mockup matters (it's already been validated as the product's visual identity).

## Source of truth
- **Tokens:** `packages/design-tokens` — color, typography, spacing, radius, motion, elevation. See `docs/02-design/foundations/` for the reasoning behind each.
- **Components:** `packages/ui` — React Native implementations of the mockup's CSS classes (`.btn`, `.chip`, `.card`, etc.). See `docs/02-design/components/`.
- **Patterns:** `docs/02-design/patterns/` — larger, multi-component compositions (the exercise card, the ring timer, the rest overlay) that combine several `packages/ui` components with specific layout/behavior.

## Principles carried over from the mockup
- **Dark mode default**, manual light/light toggle available (not just OS-driven) — see `apps/web-demo/index.html`'s theme toggle.
- **Minimum 44×44pt touch targets** everywhere — already enforced in `packages/ui/src/accessibility/touchTarget.ts`.
- **No hover-only affordances** — the mockup already designed for touch (`:active` states, not `:hover`-dependent), which maps directly to mobile.
- **WCAG AA contrast** on all text — carry this bar forward, don't relax it for native.
- **Reduced motion respected** — the mockup already disables animation under `prefers-reduced-motion`; native equivalent is checking `AccessibilityInfo.isReduceMotionEnabled()`.

## When the design evolves
Update `packages/design-tokens` first (or in lockstep with `apps/web-demo/index.html`'s CSS custom properties) — don't let the two drift into different palettes. See `docs/03-architecture/adr/0001-monorepo.md`.

## Handoff
See `docs/02-design/handoff-checklist.md` before considering a new screen/component "ready for engineering."
