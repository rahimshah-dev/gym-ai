# @gymai/analytics

Event names/schemas and a `track()` wrapper, decoupled from the actual analytics provider (PostHog vs. Amplitude — open decision, see `docs/01-product/roadmap/phases.md`). Add new events to the `AnalyticsEvent` union as features ship; wire the real provider once chosen.
