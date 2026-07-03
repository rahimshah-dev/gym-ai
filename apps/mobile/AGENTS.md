# AGENTS.md — apps/mobile

Local context for this app only. Read the root `AGENTS.md` first — this file adds mobile-specific detail, it doesn't repeat the repo-wide rules.

## What this is
The production iOS + Android client, React Native via Expo, Expo Router for navigation. Currently a hand-authored skeleton (routes + empty feature folders) — no real screens implemented yet. See `docs/01-product/roadmap/phases.md` Phase 2/3 for what "implemented" means.

## Structure

- `app/` — Expo Router routes only. Keep route files thin: import a screen component from `src/features/*`, don't write screen logic directly in `app/`. `(auth)/` is the unauthenticated stack, `(app)/` assumes a valid session, `modal.tsx` handles modal-presented routes (paywall, permission primers).

`src/` subfolders, and what belongs in each:

| Folder | Purpose | Put here | Don't put here |
|---|---|---|---|
| `bootstrap/` | App startup | Font loading, feature-flag bootstrap, error boundary init, splash orchestration | Anything that runs after first interactive frame |
| `features/<name>/` | Feature-first product code | Screens, hooks, view-models, feature-local components, feature analytics events, `__tests__/`. Prefer adding here before creating a new global folder | Cross-feature orchestration (→ `flows/`) |
| `flows/` | Multi-step experiences spanning features | e.g. the generate → plan → session flow, onboarding, subscription purchase | Single-screen logic that belongs in one feature |
| `screens/` | Legacy/unowned screen wrappers | App-level screens that don't cleanly belong to one feature | New code by default — prefer feature-owned screens; keep this folder small |
| `navigation/` | Navigation config beyond route files | Typed route helpers, shared screen options, deep-link mapping | Route definitions themselves (→ `app/`) |
| `hooks/` | App-wide reusable hooks | Hooks used across several features but still app-specific (not generic enough for a shared package) | Feature-local hooks (→ `features/<name>/hooks`) |
| `providers/` | React provider/context assembly | Theme provider glue, query client provider, auth session provider, analytics provider | Business logic (providers wire things together, they don't implement them) |
| `services/` | App-local service integrations | Device APIs, app-specific adapters not appropriate for a shared package | Anything reusable enough to belong in `packages/*` instead |
| `store/` | App-level state assembly | Store configuration, root selectors, cross-feature state not better owned by one feature | Feature-local state (→ `features/<name>/state`) |
| `analytics/` | App event wiring | Event dispatchers, screen-tracking bindings, wiring feature events to `packages/analytics` | Defining event schemas (→ `packages/analytics`) |
| `notifications/` | Push/local notification handling | Registration flow, permission prompts, tap-routing — wraps `packages/notifications` | Calling `expo-notifications` directly from feature code |
| `permissions/` | User permission handling | Camera/location/photo-library/microphone helpers | Ad hoc `Permissions.request*` calls scattered in features |
| `utils/` | Low-level app-specific helpers | Small utility functions with no better home | Anything that could become a junk drawer — keep this deliberately small |
| `config/` | App runtime configuration | Env parsing, feature-flag values, app constants derived from env (wraps `packages/config`) | Hardcoded values that should be env-derived |
| `constants/` | Stable, non-env constants | Enum-like maps, fixed keys, screen IDs | Anything environment-derived (→ `config/`) |
| `types/` | App-specific TS types | App-local interfaces/type helpers | Shared domain/API types — those belong in `packages/domain` or `packages/api` |
| `test/` | App-level test support | Shared test wrappers, global mocks, integration test helpers | Feature-specific test fixtures (→ `features/<name>/__tests__`) |

Empty folders currently hold a `.gitkeep` placeholder — populate as each phase needs them (see `docs/01-product/roadmap/phases.md`), don't pre-fill with speculative code.

## Non-negotiables specific to this app
- **Timer correctness.** The guided-session screen (`app/(app)/session.tsx`) is the single highest-risk piece of this app. It must survive the app being backgrounded — use wall-clock-based recomputation on foreground plus a locally-scheduled notification (`expo-notifications` + `expo-task-manager`) for the "rest over"/"set over" alert, not a bare `setInterval`. See `docs/01-product/journeys/core-flows.md` §3 for the exact expected behavior, and `docs/03-architecture/adr/0002-expo-react-native.md` for why this was flagged as the reason Capacitor was rejected.
- **Design tokens only.** Import colors/spacing/type from `@gymai/design-tokens` via `@gymai/ui` components. Don't hardcode hex values or magic numbers that already exist as tokens.
- **Sign in with Apple is mandatory** the moment any other third-party login (Google) exists, per App Store guideline 4.8 — both must ship together, not Apple added "later."
- **Disclaimer before AI use.** The "not medical advice" disclaimer (`docs/01-product/prd/gymai-coach-prd.md` §8) must be shown and acknowledged before the first plan generation, not buried in settings.

## Running this app
See root `README.md` Quickstart, or `docs/04-engineering/local-development.md` for full iOS/Android simulator setup. Short version: `pnpm dev` from the repo root, or `pnpm --filter @gymai/mobile dev` to run just this app.

## Current status
This is a routing + folder skeleton, not a working app yet — `pnpm install` has not been run against it, and dependency versions in `package.json` are illustrative pending `npx expo install` to resolve real compatible versions. Do not assume any screen beyond routing placeholders exists until Phase 2/3 work lands.
