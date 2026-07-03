---
description: Refactor a module while preserving architecture boundaries
---

Refactor the module described in `$ARGUMENTS`.

1. Read the nearest `AGENTS.md` (root, then the specific app/package) before changing anything, to confirm the boundary rules that apply.
2. Identify the blast radius: what else imports this module (check within its own package first, then any consuming app/package per root `AGENTS.md`'s dependency-direction table).
3. Make the change without altering the module's dependency direction (e.g. don't have `packages/domain` start importing something from `packages/ui` as a side effect of a refactor).
4. Run `pnpm typecheck` and `pnpm test` scoped to the affected package(s) at minimum, or the whole workspace if the change is cross-cutting.
5. If the refactor changes a documented architecture decision, write a new ADR (`/write-adr`) rather than silently deviating from an existing one.
