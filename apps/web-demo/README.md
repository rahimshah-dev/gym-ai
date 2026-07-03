# @gymai/web-demo

The original single-file HTML/CSS/JS mockup, kept alive on purpose as the **investor and marketing demo** — it proves the core interaction loop (equipment photo/text → AI-generated plan → guided timed session) without requiring anyone to install a mobile app.

## What this is not
This is **not** the production app. It has no accounts, no persistence beyond the current browser tab, and no payments. See [docs/01-product/roadmap/phases.md](../../docs/01-product/roadmap/phases.md) "What happens to the current mockup" for how it's meant to evolve (public demo now → marketing site later).

## Running it
```bash
cd apps/web-demo
npm install
cp .env.example .env   # add your own GEMINI_API_KEY (get one at aistudio.google.com/apikey)
npm start
```
Serves on `http://localhost:8420` by default (see `PORT` in `.env.example`).

## Why it has its own server
`server.js` holds the Gemini API key server-side and proxies `/api/generate-plan` — this was a deliberate fix (see git history) after an earlier version took a user-supplied key directly in the browser, which is insecure for anything public-facing. Don't reintroduce a client-side key here.

## AI provider
Uses Google's Gemini API (`gemini-2.0-flash` by default, configurable via `GEMINI_MODEL` in `.env`) for both text and vision (equipment photo) requests. Originally built against OpenAI's GPT-4o — swapped to Gemini in `server.js`; the client-facing `/api/generate-plan` contract didn't change, so `index.html` needed no updates.

## If you're deploying this publicly (investor link, etc.)
- Use a dedicated, rate-limited Gemini key for this deployment — it's meant to be shared broadly, so budget for that.
- Consider adding the "this is a demo" banner mentioned in [docs/01-product/journeys/core-flows.md](../../docs/01-product/journeys/core-flows.md) §8 so it isn't mistaken for the finished product during a pitch.
