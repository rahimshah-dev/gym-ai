# AGENTS.md — packages/domain

## What this is
Core business entities, value objects, and use-cases — the product's rules, independent of any UI or transport concern. Mirrors the data model in `docs/03-architecture/app-architecture.md` §4.2.

## Rules (see also root AGENTS.md "Architecture boundaries")
- **Must NOT depend on `@gymai/ui`, `@gymai/api`, `apps/mobile`, or any React Native import.** This package should be importable and testable in plain Node with zero platform assumptions. If you find yourself wanting to import `react-native` here, the code belongs in `apps/mobile/src` or `@gymai/ui` instead.
- Repositories here are **interfaces only** (ports) — `@gymai/api` provides the implementation (adapter) that talks to the real HTTP API. This keeps use-cases testable with an in-memory fake repository, no network mocking required.
- Use-cases should be pure functions wherever possible (see `checkGenerationAllowed.ts`) — push I/O (fetching the quota, saving a plan) to the caller, keep the decision logic itself trivially unit-testable.
- Every entity here should trace back to a table in `docs/03-architecture/app-architecture.md` §4.2 — if you add a field that doesn't exist there, update that doc in the same change (see root `AGENTS.md` documentation update rules).
