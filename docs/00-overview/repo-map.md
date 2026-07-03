# Repo Map

Start here if you're new to this repo. This explains where things live and, more importantly, *why* — not just a directory listing. For recommended reading order by role (engineer, designer, PM, stakeholder, AI agent) and field-by-field guidance for PRDs/ADRs/component docs, see [repository-guide.md](repository-guide.md).

## Top-level shape

```
apps/           One folder per deployable app.
packages/       Shared code, consumed by one or more apps.
docs/           Numbered by concern — 00 overview through 07 templates.
.github/        CI workflows, issue/PR templates, Copilot instructions.
.cursor/        Cursor-specific AI rules.
.claude/        Claude Code-specific commands and subagents.
scripts/        Repo-level automation (bootstrap, release, token sync).
config/         Shared tool configs (eslint, prettier, commitlint, etc.).
```

## apps/

| App | Purpose | Status |
|---|---|---|
| `apps/mobile` | Production iOS + Android app (React Native / Expo Router) | Routing + folder skeleton only — see `apps/mobile/README.md` |
| `apps/web-demo` | The original HTML/JS mockup — kept alive as the investor/marketing demo | Working, deployed-able as-is |
| `apps/storybook` | Component playground for `packages/ui` | Not yet wired up, deferred |

## packages/

**Design-system boundary** (may depend on each other in this order, not the reverse):
- `design-tokens` — raw color/type/spacing/radius/motion/elevation values, ported from `apps/web-demo/index.html`.
- `ui` — React Native components built from `design-tokens`. Must not depend on `api` or `domain`.

**Data/business-logic boundary**:
- `domain` — entities, value objects, use-cases. No UI, no HTTP, no React Native. The most platform-agnostic package in the repo.
- `api` — HTTP client, DTOs, Zod schemas, mappers to `domain` entities. The only package allowed to call `fetch()` against the production API.

**Supporting packages** (thin, mostly scaffolded pending real use):
`auth`, `state`, `config`, `analytics`, `notifications`, `storage`, `i18n`, `validation` — each has a one-paragraph README explaining its scope; most are empty exports pending the phase that needs them (see `docs/01-product/roadmap/phases.md`).

**Tooling packages**:
`eslint-config`, `typescript-config`, `testing`, `tooling` — shared dev-tooling config and test fixtures, not shipped in any app bundle.

## docs/

| Folder | For | Start with |
|---|---|---|
| `00-overview` | Everyone, especially newcomers | This file, then `stakeholder-guide.md` if non-technical |
| `01-product` | What we're building and why | `prd/gymai-coach-prd.md` |
| `02-design` | Visual/UX system | `design-system.md` |
| `03-architecture` | System design and technical decisions | `app-architecture.md`, then `adr/` |
| `04-engineering` | Day-to-day engineering workflow | `local-development.md` |
| `05-ai` | How AI coding agents should work here | `ai-development-playbook.md` |
| `06-delivery` | Environments and release process | `environments.md` |
| `07-templates` | Copy-paste templates for new docs | pick the template matching what you're writing |

## Why this shape
See `docs/03-architecture/adr/0001-monorepo.md` for the full reasoning — short version: `apps/mobile` and `apps/web-demo` are different runtimes that can't share UI code directly, but do share design tokens, domain types, and (eventually) an API contract. The `packages/*` split exists to make that sharing explicit instead of accidental copy-paste.
