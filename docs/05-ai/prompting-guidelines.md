# Prompting Guidelines

- **Name the package/app, not just the feature.** "Add a Chip component to packages/ui matching apps/web-demo/index.html's .chip class" gets a far better result than "add a chip component" — the repo has enough structure that vague prompts force the agent to guess at boundaries it should instead be told about explicitly.
- **Point at the mockup for visual/behavioral parity questions.** `apps/web-demo/index.html` is a complete, working reference implementation of the intended UX — "port X from the mockup" is a stronger prompt than describing the desired behavior from scratch.
- **Reference the phase.** If a request is out of order relative to `docs/01-product/roadmap/phases.md` (e.g. asking for payments before auth exists), say so in the prompt so the agent can flag the sequencing issue rather than building it in isolation.
- **For architecture-level requests, ask for a plan first.** "Propose an approach" before "implement it" — especially for anything touching more than one package, per `CLAUDE.md`'s "how to propose plans."
