# GitHub Copilot Instructions

Read `AGENTS.md` at the repo root first — this file only adds Copilot-specific notes on top of those universal rules.

## Repo shape
Monorepo: `apps/mobile` (React Native/Expo, production), `apps/web-demo` (HTML/JS mockup, investor demo), `packages/*` (shared code). See `docs/00-overview/repo-map.md`.

## When suggesting completions
- Prefer importing from `@gymai/design-tokens` and `@gymai/ui` over hardcoding style values in `apps/mobile`.
- Prefer importing from `@gymai/domain` for entity shapes (`WorkoutPlan`, `Exercise`, etc.) over redefining local interfaces that duplicate them.
- Do not suggest `fetch()` calls outside `packages/api` — route through the existing `httpClient`/endpoint pattern there.
- Do not suggest embedding an API key (OpenAI or otherwise) in any file under `apps/mobile` or `apps/web-demo/index.html` — keys belong server-side only (`apps/web-demo/server.js` pattern).

## Full rules
See root `AGENTS.md` for the complete architecture-boundary and documentation-update rules that apply regardless of which AI tool is being used.
