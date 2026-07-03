# Code Review with AI

AI-assisted review is a supplement to human review, not a replacement — especially for the architecture-boundary rules in root `AGENTS.md`, which are exactly the kind of cross-file consistency issue that's easy for a human reviewer to miss under time pressure and worth explicitly asking an AI reviewer to check.

## What to ask an AI reviewer to check specifically
- Does this PR violate a dependency-direction rule (e.g. `packages/domain` importing something React Native-specific)?
- Does this PR touch product behavior, architecture, or the design system without updating the corresponding doc (see the table in root `AGENTS.md`)?
- Does this PR introduce a second API client, HTTP wrapper, or duplicate of something already in `packages/api`?
- For anything touching the guided-session timer: does this PR account for app backgrounding, or does it assume the JS timer keeps running uninterrupted (a regression back to the mockup's browser-only assumption)?

## What not to over-rely on AI review for
- Product/UX judgment calls that require the actual PRD/roadmap context — an AI reviewer without that context will happily approve something out of scope for the current phase.
- Anything requiring a live device test (the backgrounding timer behavior specifically needs manual verification on a real device or simulator, not just a code read).
