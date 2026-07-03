# Foundation — Motion

Source: `packages/design-tokens/src/motion.ts` — ported from `apps/web-demo/index.html`'s `--transition-interactive` (180ms, cubic-bezier(0.16, 1, 0.3, 1)).

- Use this curve for interactive state transitions (button press, chip selection, tab switch) via `react-native-reanimated`'s `Easing.bezier(...)` — the `motion.interactive.bezier` tuple maps directly.
- The ring timer's stroke animation is a special case: the web version uses a CSS `transition: stroke-dashoffset 1s linear` synced to the 1-second tick — replicate as a 1s linear animation per tick on native, not the 180ms interactive curve (that curve is for UI feedback, not the timer itself).
- Respect reduced-motion: check `AccessibilityInfo.isReduceMotionEnabled()` and skip/shorten non-essential animation, matching the mockup's `prefers-reduced-motion` handling.
