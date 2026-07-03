# Foundation — Accessibility

Carried forward from `apps/web-demo/index.html`'s existing requirements (see its quality-requirements section) — the bar does not get lowered moving to native, if anything native gives better tools to meet it.

- **Minimum 44×44pt touch targets** — enforced via `packages/ui/src/accessibility/touchTarget.ts`, applied to every pressable primitive.
- **WCAG AA contrast** on all text against its background, in both light and dark mode.
- **No hover-only interaction** — the mockup already avoided this (touch-first design); carries over trivially to native, which has no hover concept for touch anyway.
- **VoiceOver (iOS) / TalkBack (Android)** — every interactive element needs an `accessibilityLabel` and correct `accessibilityRole`; every image needs an equivalent to `alt` text (`accessibilityLabel` on `Image`).
- **Dynamic Type / font scaling** — respect OS text-scaling settings (see `docs/02-design/foundations/typography.md`).
- **Reduced motion** — respect `AccessibilityInfo.isReduceMotionEnabled()` (see `docs/02-design/foundations/motion.md`).

This is a Phase 7 exit criterion (`docs/01-product/roadmap/phases.md`), but should be built in from Phase 2 onward rather than retrofitted — retrofitting accessibility into an already-built component library is far more expensive than building it in from the start.
