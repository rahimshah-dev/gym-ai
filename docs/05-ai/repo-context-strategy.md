# Repo Context Strategy

How an AI agent should build context in this repo, in order:

1. Root `AGENTS.md` — universal rules, always read first.
2. The nearest package/app `AGENTS.md` to the file being touched.
3. `docs/00-overview/repo-map.md` if unsure where something belongs.
4. `docs/01-product/` for "what should this do" questions.
5. `docs/03-architecture/adr/` for "why is it built this way" questions, before proposing a different approach.
6. `apps/web-demo/index.html` as the reference implementation for any visual/behavioral parity question — it's a complete, working spec of the intended UX, not just an early prototype to disregard.

Avoid re-deriving context that's already written down — if a question is answered in `docs/`, cite it rather than reasoning from the code alone, since the code (especially in `apps/mobile`'s current placeholder state) doesn't yet reflect the intended final behavior on its own.
