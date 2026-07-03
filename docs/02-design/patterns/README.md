# Design patterns

Larger, multi-component compositions with specific layout/behavior — not a single reusable component, but a documented way several components combine for a recurring screen need. Candidates to document here as they're built (Phase 2/3):
- **Exercise card** — number badge + illustration + muscle badge + stats row + expandable instructions (`apps/web-demo/index.html` `.exercise-card`).
- **Ring timer** — SVG/native circular progress + center digits + label, teal for active/orange for rest (`apps/web-demo/index.html` `.ring-wrap`).
- **Rest overlay** — full-screen frosted-glass countdown interrupt (`apps/web-demo/index.html` `.rest-overlay`).
- **Setup form validation states** — inline field errors + summary banner (`apps/web-demo/index.html` `.error-banner` pattern).

Add a file per pattern once it's implemented in `packages/ui/src/patterns/`.
