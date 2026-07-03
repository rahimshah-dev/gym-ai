# @gymai/mobile

Production iOS + Android app — React Native via Expo, Expo Router for navigation.

## Status
This is currently a **routing and folder skeleton**, not a working build. `pnpm install` hasn't been run against it yet, and the dependency versions in `package.json` are illustrative placeholders. Before first real use:

```bash
cd apps/mobile
npx expo install   # resolves and pins actual compatible Expo SDK versions
```

Then from the repo root: `pnpm dev` (runs this app's `expo start` alongside other workspace dev tasks), or scoped to just this app: `pnpm --filter @gymai/mobile dev`.

## Structure
See `AGENTS.md` in this directory for the full breakdown. Short version: `app/` holds Expo Router routes only (thin, no logic); `src/features/*` holds feature-first implementation; shared cross-app code lives in `packages/*` at the repo root, not duplicated here.

## Where to look first
- [docs/01-product/roadmap/phases.md](../../docs/01-product/roadmap/phases.md) — Phase 2 (app shell) and Phase 3 (feature parity) describe what this app needs to become.
- [docs/01-product/journeys/core-flows.md](../../docs/01-product/journeys/core-flows.md) — the exact flows this app implements, ported from `apps/web-demo`.
- [docs/03-architecture/adr/](../../docs/03-architecture/adr/) — why Expo/React Native, why Expo Router, why this state strategy.
