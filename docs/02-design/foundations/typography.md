# Foundation — Typography

Source: `packages/design-tokens/src/typography.ts`, ported from `apps/web-demo/index.html`.

- **Display font:** Instrument Serif, italic — used for headings, the guided-session countdown digits, and the completion screen title. This italic-serif-for-display-only pairing against a sans-serif body is the product's single strongest visual signature; preserve it exactly.
- **Body font:** DM Sans, weights 300–700.
- The web mockup used fluid `clamp()` sizing (viewport-relative); native has no equivalent, so `packages/design-tokens` fixes each size at the midpoint of its web clamp() range. If this reads too large/small on actual devices during Phase 2, adjust the fixed values in `typography.ts` rather than reintroducing viewport-relative logic (React Native doesn't have a native concept of viewport units the way CSS does).
- **Dynamic Type / accessibility text scaling** (iOS) and font scale (Android) should still be respected on top of these base sizes — don't disable OS-level text scaling to preserve pixel-perfect layouts; that's an accessibility regression, not a bug fix.
