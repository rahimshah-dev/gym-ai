---
description: Implement a feature end-to-end following this repo's conventions
---

Implement the feature described in `$ARGUMENTS` following the template in `CLAUDE.md` ("Feature implementation template"):

1. Confirm it's in scope per `docs/01-product/prd/gymai-coach-prd.md` (check §11 "out of scope for v1" too) — flag and stop if it isn't.
2. Identify which phase it belongs to in `docs/01-product/roadmap/phases.md` — flag if it's out of sequence.
3. Add/extend types in `packages/domain` if it introduces or changes an entity.
4. Add/extend the API contract in `packages/api` if new endpoints are needed.
5. Build the UI in `apps/mobile/src/features/<feature>/`, reusing `packages/ui` components — check `apps/web-demo/index.html` for the reference implementation of the interaction/visuals first.
6. Update `docs/01-product/journeys/core-flows.md` if this changes or adds a user flow.
7. Run `pnpm validate` and report the result.

Respect the architecture boundaries in root `AGENTS.md` throughout — flag any boundary violation you'd otherwise be tempted to make instead of silently working around it.
