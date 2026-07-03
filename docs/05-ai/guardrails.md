# Guardrails

- **Secrets stay server-side.** The OpenAI key lives in `apps/web-demo/server.js` via `process.env`, never in client code. This was a deliberate fix early in the project's history — any AI-assisted change that reintroduces a client-side key should be treated as a regression, not a stylistic choice.
- **Architecture boundaries are enforced by review, not (yet) by tooling.** See root `AGENTS.md` "Architecture boundaries" — until `packages/eslint-config` encodes these as lint rules (tracked as a TODO in `packages/eslint-config/index.js`), violations must be caught in code review, human or AI.
- **The guided-session timer is the product's highest-risk surface.** Any change to timer logic should be treated with more scrutiny than an equivalent change elsewhere — see `docs/01-product/journeys/core-flows.md` §3.
- **Health/fitness disclaimers are a compliance requirement, not a UX nice-to-have.** Don't remove or soften the "not medical advice" disclaimer (`docs/01-product/prd/gymai-coach-prd.md` §8) for UX polish reasons without discussing the compliance implication first.
