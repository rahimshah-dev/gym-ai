# CI/CD

## Workflows (`.github/workflows/`)
| Workflow | Trigger | What it does |
|---|---|---|
| `ci.yml` | Every PR | Install, typecheck, lint, unit test across the whole workspace (`pnpm validate`). |
| `mobile-preview.yml` | Push to `main` | Builds an EAS `preview` profile build of `apps/mobile` for internal testing. |
| `release-ios.yml` | Manual / release tag | Signed production iOS build + submission via EAS. |
| `release-android.yml` | Manual / release tag | Signed production Android build + submission via EAS. |
| `docs-check.yml` | Every PR touching `docs/**` | Broken internal links, markdown lint. |
| `ai-governance.yml` | Every PR | Verifies required AI instruction files (`AGENTS.md`, `CLAUDE.md`, per-package `AGENTS.md`) exist and reference real paths — catches doc/repo drift early. |

## Principles
- CI mirrors what you can run locally (`pnpm validate`) — no CI-only checks that can't be reproduced on a laptop.
- Mobile builds use EAS Build, not a self-hosted Mac runner — avoids maintaining macOS CI infrastructure for a small team.
- Docs are checked, not just written — `docs-check.yml` exists because stale cross-references (a doc linking to a file that got moved) are exactly the kind of drift that erodes trust in documentation over time.
