# ADR 0001 — Use a monorepo for mobile app, shared packages, and demo web

**Status:** Accepted
**Date:** 2026-07-03

## Context
The project started as a single HTML/CSS/JS mockup (`index.html`) plus a thin Express proxy (`server.js`). Moving to a real iOS + Android product means adding a React Native app, a proper backend, and shared logic (design tokens, API client, domain models) that both the mobile app and the demo web app need to consume without drifting out of sync.

## Decision
Adopt a monorepo with pnpm workspaces + Turborepo, structured as:
- `apps/mobile` — the production React Native (Expo) app.
- `apps/web-demo` — the existing HTML mockup, kept as an investor/marketing demo.
- `apps/storybook` — optional component playground for `packages/ui`.
- `packages/*` — shared UI, design tokens, API client, domain logic, and supporting packages (config, analytics, auth, etc.), each independently versioned/buildable via Turborepo's task graph.

## Alternatives considered
- **Separate repos per app:** rejected — the mobile app and the demo/marketing site both need the same design tokens and, eventually, the same API contracts. Separate repos would mean copy-pasting or publishing packages to a private registry for a two-person team, which is more overhead than a monorepo at this scale.
- **Single flat app repo (no packages):** rejected — `apps/web-demo` and `apps/mobile` are genuinely different runtimes (browser vs. React Native) that can't literally share UI code, but they can and should share tokens, domain types, and API contracts. A flat repo would either duplicate that logic or entangle the two apps.

## Consequences
- Added tooling complexity (workspace config, Turborepo pipeline, cross-package versioning) — acceptable given the number of apps/packages already planned.
- Requires nested `AGENTS.md`/README ownership per package so both humans and AI tools have local context instead of one giant root file — see [repo-map.md](../../00-overview/repo-map.md).
- `packages/domain` and `packages/api` become the contract boundary between backend and both frontends — changes there ripple to every consumer, so they need the most rigorous review.
