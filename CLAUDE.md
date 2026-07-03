# CLAUDE.md — GymAI Coach

Claude Code-specific guidance for this repo. Read `AGENTS.md` first for the universal rules (stack, boundaries, do-not list) — this file only adds Claude-specific workflow on top.

## How to read context in this repo
1. Start with `AGENTS.md` (root) for repo-wide rules.
2. Then read the nearest package/app `AGENTS.md` to whatever you're touching (e.g. `apps/mobile/AGENTS.md`, `packages/ui/AGENTS.md`) — these override/extend the root file with local detail, not contradict it.
3. For product/behavior questions, check `docs/01-product/` before guessing — the PRD and journeys docs are the source of truth, not assumptions from the code alone.
4. For "why is it built this way" questions, check `docs/03-architecture/adr/` before proposing a different approach — if a decision was already made and recorded, changing it needs a new ADR, not a silent deviation.

## What to inspect before coding
- Run `git log --oneline -10` and `git status` to see what's already in flight.
- Check whether the file/package you're about to touch has its own `AGENTS.md` or `README.md` — don't assume root-level conventions cover a package with different rules stated locally.
- For anything touching the guided-session timer, read `docs/01-product/journeys/core-flows.md` §3 first — it documents a real regression risk (timer drift when the app is backgrounded) that isn't obvious from the code alone.

## How to propose plans
For any change spanning more than one file or package, use plan mode / present a short plan before writing code: what changes, which files, which docs need updating alongside it. Skip this for single-file, obviously-scoped fixes.

## Commit hygiene
Small, reviewable commits over one giant commit. If a change spans both a package and its consuming app (e.g. `packages/ui` + `apps/mobile`), it's fine as one commit if they're genuinely coupled — don't split just for the sake of splitting.

## Which docs to update when
See the table in `AGENTS.md` ("Documentation update rules") — it's the same table, don't duplicate it here, just follow it.

## Feature implementation template
When implementing a new feature end-to-end:
1. Confirm it's in scope per `docs/01-product/prd/gymai-coach-prd.md` (check the "out of scope for v1" list too).
2. Identify which phase it belongs to in `docs/01-product/roadmap/phases.md` — if it's not in the current phase, flag that before building it.
3. Add/extend types in `packages/domain` if it introduces a new entity or changes an existing one.
4. Add/extend the API contract in `packages/api` if it needs new endpoints.
5. Build the UI in `apps/mobile/src/features/<feature>/`, reusing `packages/ui` components — don't create one-off styled components that duplicate what already exists there.
6. Update `docs/01-product/journeys/core-flows.md` if it changes or adds a user flow.
7. Run `pnpm validate`.

Slash-command shortcuts for parts of this are in `.claude/commands/` (e.g. `/implement-feature`, `/write-adr`, `/refactor-module`, `/release-checklist`) — use them instead of re-deriving the same checklist by hand.

## ADR workflow
Use `.claude/commands/write-adr.md` (or manually follow `docs/07-templates/adr-template.md`) whenever a change makes a real architectural choice — new dependency category, a pattern change, a tradeoff with alternatives considered. Number sequentially after the last ADR in `docs/03-architecture/adr/`.

## Release notes
Use `.claude/commands/release-checklist.md` when preparing a release — it walks the checklist in `docs/06-delivery/` rather than requiring it to be reconstructed from memory each time.

## Custom subagents available in this repo
`.claude/agents/` defines project-specific subagents: `mobile-architect` (architecture/ADR-level questions), `ui-engineer` (design-system/component work), `qa-release` (release/QA checklist work), `docs-stakeholder` (plain-language doc updates for non-technical readers). Prefer these over the generic `general-purpose` agent when the task matches one of their descriptions.
