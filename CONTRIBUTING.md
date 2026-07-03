# Contributing

## Prerequisites
- Node.js >= 20
- pnpm 9 (`corepack enable` will pick up the pinned version from `package.json#packageManager`)
- Xcode + iOS Simulator (for `apps/mobile` iOS development)
- Android Studio + an emulator image (for `apps/mobile` Android development)

## Getting started
```bash
pnpm install
pnpm bootstrap   # scripts/bootstrap.sh — sanity-checks toolchain, copies .env.example files
pnpm dev         # runs every app's dev task in parallel via Turborepo
```

See [docs/04-engineering/local-development.md](docs/04-engineering/local-development.md) for per-app setup detail.

## Before opening a PR
1. `pnpm validate` (runs lint + typecheck + test across the workspace — same as CI).
2. If the change affects architecture, product behavior, or the design system, update the relevant doc in `docs/` in the same PR — see [docs/04-engineering/coding-standards.md](docs/04-engineering/coding-standards.md) for which doc maps to which kind of change.
3. If the change is a significant technical decision (new dependency category, state strategy, navigation pattern, etc.), add an ADR under `docs/03-architecture/adr/` using [docs/07-templates/adr-template.md](docs/07-templates/adr-template.md).

## Commit style
Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`) — enforced by commitlint (`config/commitlint`).

## Code ownership
See [CODEOWNERS](CODEOWNERS) — PRs touching a given package/app should be reviewed by its listed owner(s).

## Working with AI coding assistants in this repo
This repo maintains AI-agent instruction files at the root (`AGENTS.md`, `CLAUDE.md`) and per-package (`apps/mobile/AGENTS.md`, `packages/ui/AGENTS.md`, etc.). If you're using Claude Code, Cursor, or Copilot, read [docs/05-ai/ai-development-playbook.md](docs/05-ai/ai-development-playbook.md) first.
