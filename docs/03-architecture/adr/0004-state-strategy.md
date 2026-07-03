# ADR 0004 — State management strategy

**Status:** Accepted
**Date:** 2026-07-03

## Context
The mockup kept everything in a single mutable `state` object and re-rendered by hand (`renderPlan()`, `showView()`, etc.) — fine for a demo, not a pattern to carry into a real app with server data, auth sessions, and offline considerations.

## Decision
Split state into three kinds, each with a deliberately different tool, rather than one global store for everything:
1. **Server/remote data** (user profile, workout plans, sessions, subscription status) — fetched and cached via a query layer in `packages/api` (React Query semantics: cache, refetch, invalidate on mutation). This is the majority of the app's data.
2. **Client/UI state** (current setup-form values, active guided-session timer state, theme) — local component state or a lightweight store in `packages/state`, scoped to the feature that owns it (`src/features/*`), not global.
3. **Session/auth state** (JWT, refresh token, current user id) — `packages/auth`, backed by secure storage (`packages/storage`), exposed via a provider consumed at the root of `apps/mobile`.

## Alternatives considered
- **One global Redux-style store for everything:** rejected — conflates server cache invalidation concerns with ephemeral UI state (e.g. "is the rest overlay open"), which was exactly the kind of undifferentiated `state` object the mockup used and that doesn't scale past a demo.

## Consequences
- `packages/domain` defines the shape of core entities (WorkoutPlan, Exercise, Session) once; `packages/api` and `packages/state` both consume those types rather than each defining their own.
- The guided-session timer (the most state-sensitive part of the app) lives in feature-local state in `apps/mobile/src/features/*`, not in the shared remote-data cache — it's recomputed from wall-clock time on foreground, per [ADR 0002](0002-expo-react-native.md).
