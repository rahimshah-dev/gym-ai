# AGENTS.md — packages/api

## What this is
The only place in the workspace allowed to call `fetch()` against the production API. Handles transport, DTO validation (`src/schemas`), and mapping wire shapes to `@gymai/domain` entities (`src/mappers`).

## Structure
- `src/client/httpClient.ts` — the single shared fetch wrapper (auth header injection, error normalization into `ApiError`). Every endpoint module uses this — do not call `fetch()` directly anywhere else in the workspace.
- `src/endpoints/` — one file per API operation (e.g. `generatePlan.ts`), each a thin function composing the client + mapper.
- `src/models/` — raw wire DTOs (snake_case, matching what the server actually sends — currently mirrors `apps/web-demo/server.js`'s JSON contract).
- `src/mappers/` — DTO → `@gymai/domain` entity translation. All snake_case/camelCase and shape translation is confined here.
- `src/schemas/` — Zod runtime validation for responses, especially AI-derived ones where "the shape is wrong" is a real failure mode (see `apps/web-demo/server.js`'s own JSON.parse try/catch for the same underlying concern, server-side).

## Rules (see also root AGENTS.md "Architecture boundaries")
- **Must NOT own navigation or presentation logic.** If you're tempted to trigger a screen transition or show a toast from inside this package, that belongs in `apps/mobile` calling this package's functions, not the other way around.
- **May depend on `@gymai/domain` and `@gymai/config`.** Should not depend on `@gymai/ui`.
- When the production API's actual response shape is finalized (Phase 1), update `src/models/*Dto.ts` to match exactly — don't let this package's assumed contract drift from the real backend.
- Every new endpoint should have a corresponding entry in `docs/01-product/prd/gymai-coach-prd.md` §6 (API surface table) — update both together.
