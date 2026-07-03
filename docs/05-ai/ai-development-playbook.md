# AI Development Playbook

How AI coding agents (Claude Code, Cursor, Copilot, or others) should work in this repo. This is the human-readable companion to the machine-read instruction files (`AGENTS.md`, `CLAUDE.md`, `.cursor/rules/*.mdc`, `.github/copilot-instructions.md`) — read this if you're a person trying to understand *why* those files say what they say.

## The two-track documentation model
This repo maintains docs for humans (`docs/00` through `docs/07`) and docs for AI agents (`AGENTS.md`, `CLAUDE.md`, nested per-package `AGENTS.md`) as separate but overlapping tracks. The AI-facing files are deliberately terse and instruction-shaped ("do this, don't do that"); the human-facing docs carry the *why* and the product context. Don't duplicate content between them — the AI files should link to or reference the human docs rather than restate them.

## Why nested AGENTS.md files
A single giant root `AGENTS.md` covering every package's internals would either be too vague to be useful or too long for an agent to hold in context alongside the actual task. Nested `AGENTS.md` files (in `apps/mobile`, `packages/ui`, `packages/api`, `packages/domain`) give local, specific context exactly where it's needed — an agent working in `packages/domain` doesn't need to know `apps/mobile`'s navigation structure, and vice versa.

## Keeping agent instructions from going stale
Stale or contradictory instructions produce worse output than no instructions — an agent following an outdated `AGENTS.md` that references a moved file or a superseded decision will confidently do the wrong thing. `.github/workflows/ai-governance.yml` checks that referenced paths in AI instruction files still exist. Beyond that automated check: whenever a PR moves a file, renames a package, or supersedes an ADR, grep the AI instruction files for references to what changed, in the same PR.

## See also
- `docs/05-ai/prompting-guidelines.md` — how to write effective prompts against this specific repo.
- `docs/05-ai/code-review-with-ai.md` — using AI for review, not just generation.
- `docs/05-ai/repo-context-strategy.md` — how agents should navigate this repo's docs.
- `docs/05-ai/allowed-tools.md` / `guardrails.md` — what agents should and shouldn't do autonomously.
