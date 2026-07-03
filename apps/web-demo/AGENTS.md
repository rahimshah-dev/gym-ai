# AGENTS.md — apps/web-demo

Local context for this app only. Read the root `AGENTS.md` first.

## What this is
The original mockup, kept intentionally as the investor/marketing demo — not the production app. See `README.md` in this directory and `docs/01-product/roadmap/phases.md` ("What happens to the current mockup").

## Rules specific to this app
- Do not add real user accounts, persistence, or payments here — that's what `apps/mobile` + the production API (Phase 1+) are for. Keeping this app deliberately simple is the point; it needs to stay embeddable/shareable without an install step.
- The OpenAI key stays server-side in `server.js` — never move it into `index.html` client-side code. This was already fixed once (see git log); don't regress it.
- If you change the visual design here, also update `packages/design-tokens` (or note the drift) — this file's CSS custom properties were the original source for the shared token set, per `docs/03-architecture/adr/0001-monorepo.md`.
- Keep this app deployable standalone with just `npm install && npm start` — don't introduce a hard dependency on the rest of the monorepo's tooling (Turborepo, pnpm workspace packages) for this app to run, since its whole value is being trivially shareable.
