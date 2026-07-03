---
description: Write a new Architecture Decision Record
---

Write a new ADR for the decision described in `$ARGUMENTS`, following `docs/07-templates/adr-template.md`.

1. Check `docs/03-architecture/adr/` for the highest existing number and use the next sequential number.
2. Fill in Context, Decision, Alternatives considered, and Consequences — be concrete about tradeoffs, not just the chosen option.
3. If this supersedes an existing ADR, add a note to both: the old one gets "**Status:** Superseded by ADR NNNN" and a link forward; the new one links back. Do not delete or rewrite the old ADR's content.
4. Save as `docs/03-architecture/adr/NNNN-short-title.md`.
5. If the decision affects other docs (e.g. `app-architecture.md`, `phases.md`), update those in the same change and say so in your summary.
