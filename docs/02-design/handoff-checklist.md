# Design → Engineering Handoff Checklist

Before a new screen or component is considered ready for engineering to build:

- [ ] Every color, spacing, and radius value maps to an existing token in `packages/design-tokens` — or a new token has been added there (not a one-off value in the design file).
- [ ] Every interactive element has a defined pressed/disabled state, not just a default state.
- [ ] Touch targets are at least 44×44pt.
- [ ] Text contrast checked against both light and dark backgrounds (WCAG AA).
- [ ] Copy is finalized and reviewed against `docs/02-design/content-guidelines.md`.
- [ ] If the screen introduces a new reusable pattern, it's noted in `docs/02-design/patterns/README.md`.
- [ ] If the screen is a variant of something in `apps/web-demo/index.html`, differences from the mockup are called out explicitly — silent drift from the validated mockup design should be a deliberate decision, not an accident of the porting process.
