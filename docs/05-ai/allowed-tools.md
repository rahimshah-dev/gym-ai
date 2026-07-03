# Allowed Tools / Autonomy Boundaries

General guidance for what an AI agent should do autonomously vs. flag for human confirmation in this repo:

**Fine to do autonomously:**
- Local file edits, running lint/typecheck/test, creating branches, local commits.
- Adding new files within an existing package/app following its established patterns.

**Confirm before doing:**
- Pushing to `main` or opening a PR (unless explicitly asked to in the request).
- Adding a new dependency category (new state library, new nav library) without an ADR.
- Any change to `.github/workflows/` (CI/CD affects every future PR).
- Any change to billing/subscription logic once it exists (real money, real entitlements).
- Deleting or significantly restructuring anything in `docs/03-architecture/adr/` — ADRs are meant to be append-only with superseding records, not edited/deleted (see `docs/07-templates/adr-template.md`).

**Never do without explicit, specific instruction:**
- Put an API key or secret in client-side code (`apps/mobile` or `apps/web-demo/index.html`).
- Force-push, rewrite git history on `main`, or delete a branch.
