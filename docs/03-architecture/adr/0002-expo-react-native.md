# ADR 0002 — React Native (Expo) for the mobile app

**Status:** Accepted
**Date:** 2026-07-03

## Context
The mockup proved the core interaction loop (equipment photo/text → AI plan → guided timed session) in a browser. Shipping to the App Store and Play Store requires a real mobile client. Three paths were on the table: wrap the existing web app (Capacitor), rebuild in React Native, or go fully native (Swift/SwiftUI + Kotlin/Compose).

## Decision
Build `apps/mobile` in React Native using Expo (managed workflow, EAS Build for store binaries).

## Alternatives considered
| Option | Why not chosen |
|---|---|
| **Capacitor wrap** | Fastest to a store listing, but inherits web-perf ceilings — most critically, the guided-session timer relies on `setInterval`, which is not reliable once the OS can suspend a backgrounded webview. That's the single most important interaction in the product; a wrapped-website feel and timer drift risk was judged not worth the time saved. |
| **Full native (Swift/SwiftUI + Kotlin/Compose)** | Best performance and platform integration, but doubles the team/time (two codebases in parallel) — only justified once product-market fit is proven and platform-specific polish becomes the bottleneck, not before. |
| **React Native (Expo)** — chosen | One codebase for iOS + Android, first-party plugins for everything this product needs (camera, local notifications for background-safe timers, StoreKit/Play Billing via RevenueCat), and an escape hatch to native modules/prebuild if something needs it later. |

## Consequences
- `apps/mobile` uses Expo Router (file-based routing) and the managed workflow by default; `ios/`/`android/` native project folders only appear if/when `expo prebuild` is run for a native customization that Expo doesn't cover.
- The guided-session timer (see [core-flows.md §3](../../01-product/journeys/core-flows.md)) must be implemented with wall-clock recomputation + local notifications, not a naive `setInterval` port — this is called out as an explicit Phase 3 exit criterion in [phases.md](../../01-product/roadmap/phases.md).
- Design tokens extracted from `apps/web-demo/index.html` into `packages/design-tokens` are the shared source of truth consumed by `packages/ui`'s React Native components.
