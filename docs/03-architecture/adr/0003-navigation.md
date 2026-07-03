# ADR 0003 — Expo Router for navigation

**Status:** Accepted
**Date:** 2026-07-03

## Context
`apps/mobile` needs navigation covering: an auth stack (sign in/sign up), an onboarding flow, and a main app stack (home, generate, plan, guided session, history, profile), plus modals (paywall, permission primers).

## Decision
Use Expo Router — file-based routing on top of React Navigation, with route groups: `app/(auth)/` for the unauthenticated stack and `app/(app)/` for the authenticated stack, plus top-level modals (e.g. `app/modal.tsx`).

## Alternatives considered
- **Bare React Navigation (config-based):** more manual wiring, no built-in deep-linking conventions. Rejected in favor of Expo Router's file-based routes, which also gives typed routes and simpler deep links (needed for the notification → Setup screen deep link in [core-flows.md §6](../../01-product/journeys/core-flows.md)).

## Consequences
- Route groups double as the auth boundary: anything under `app/(app)/` assumes a valid session; a root layout guard redirects to `(auth)` if not authenticated.
- Deep links (from push notifications, from the marketing site) map directly to route paths, no separate linking config to maintain.
