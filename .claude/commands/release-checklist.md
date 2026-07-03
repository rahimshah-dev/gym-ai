---
description: Walk the release checklist before shipping
---

Walk the release checklist for the release described in `$ARGUMENTS` (e.g. "iOS production release" or "Android beta").

1. Confirm current status against `docs/06-delivery/qa-checklists.md` — go through every item, don't skip based on assumption.
2. For a store submission specifically, also check the "Before App Store / Play submission" section of that same checklist and `docs/06-delivery/app-store-release.md`.
3. Confirm `docs/04-engineering/release-process.md`'s steps have been followed in order (staging build → QA → version bump → production build → submit).
4. Draft release notes using `docs/07-templates/release-template.md`.
5. Report a clear pass/fail summary against the checklist — don't silently skip an item, call out anything not verified.
