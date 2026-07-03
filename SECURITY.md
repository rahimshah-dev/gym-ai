# Security Policy

## Reporting a vulnerability
Do not open a public GitHub issue for security vulnerabilities. Instead, email the maintainers directly (add a dedicated security contact address here once one exists) with:
- A description of the issue and potential impact.
- Steps to reproduce.
- Any relevant logs or proof-of-concept code.

We aim to acknowledge reports within 3 business days.

## Scope
- `apps/mobile` — the production iOS/Android client.
- `apps/web-demo` — the public investor/marketing demo. Note this app calls a rate-limited demo API key server-side (see `apps/web-demo/server.js`) — it is intentionally low-privilege and holds no user data.
- The production API (once built per [docs/03-architecture/app-architecture.md](docs/03-architecture/app-architecture.md)).

## Handling of secrets
- API keys (OpenAI, RevenueCat, database credentials) must never be committed. `.env` files are gitignored repo-wide; only `.env.example` files (with placeholder values) are tracked.
- The OpenAI key is server-side only — this was a deliberate fix early in the project's history (see git log) after the original mockup briefly took a user-supplied key in the browser. Do not reintroduce client-side API keys.
- Report any accidental secret commit immediately so the key can be rotated, even if the commit is later removed from history.

## Data handled by this product
Workout/equipment data is personal fitness data. See [docs/01-product/prd/gymai-coach-prd.md](docs/01-product/prd/gymai-coach-prd.md) §8 for the trust & safety / compliance requirements (disclaimers, data retention, account deletion) that any change touching user data must respect.
