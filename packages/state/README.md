# @gymai/state

Shared client/UI state patterns and selectors (not server-data caching — that's `@gymai/api` — and not auth/session state — that's `@gymai/auth`). See `docs/03-architecture/adr/0004-state-strategy.md` for the three-way split this package is one leg of.

Empty scaffold — populate once a piece of UI state needs to be shared across more than one feature (most feature-local state should just live in `apps/mobile/src/features/*` instead).
