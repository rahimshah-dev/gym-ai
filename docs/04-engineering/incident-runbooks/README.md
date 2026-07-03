# Incident Runbooks

Empty until there's a production system to have incidents in (post-Phase 1). When the backend API and `apps/mobile` are live, add one runbook per failure mode that's happened at least once or is judged likely enough to prepare for — for example:
- OpenAI API outage/rate-limiting affecting plan generation.
- Database connection exhaustion.
- RevenueCat webhook delivery failure (entitlements out of sync).

Each runbook should cover: how to detect it, immediate mitigation, and root-cause follow-up — written for whoever's on call, not assuming they wrote the original code.
