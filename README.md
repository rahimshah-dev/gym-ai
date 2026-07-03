# GymAI Coach

AI-powered personal gym coach: point a phone at whatever equipment is available, say how much time you have, get a complete, timed, guided workout immediately.

This repo is a monorepo covering the production mobile app, the shared packages it's built from, and the investor/marketing demo that proved the concept.

## What's here

```
apps/
  mobile/       Production iOS + Android app (React Native / Expo)
  web-demo/     The original HTML/JS mockup — kept as a live investor/marketing demo
  storybook/    Component playground for packages/ui (optional, for design-system dev)
packages/
  ui/               Shared component library
  design-tokens/    Colors, type, spacing, radius, motion — single source of truth
  api/              API client, schemas, DTOs
  domain/           Core business entities/use-cases (WorkoutPlan, Exercise, Session, ...)
  ...               see docs/00-overview/repo-map.md for the full list and why each exists
docs/
  00-overview/    Start here — repo map, product one-pager, glossary
  01-product/     Vision, PRD, user journeys, roadmap/phases
  02-design/      Design system, foundations, components, patterns
  03-architecture/ System design, module boundaries, ADRs
  04-engineering/ Local dev, coding standards, CI/CD, release process
  05-ai/          How AI coding agents should work in this repo
  06-delivery/    Environments, App Store release, QA checklists
  07-templates/   PRD/ADR/feature-spec/bug-report/release templates
```

**New here? Read [docs/00-overview/repo-map.md](docs/00-overview/repo-map.md) next**, then [docs/00-overview/repository-guide.md](docs/00-overview/repository-guide.md) for recommended reading order by role (engineer, designer, PM, stakeholder, AI agent), [docs/00-overview/stakeholder-guide.md](docs/00-overview/stakeholder-guide.md) if you're non-technical, or [docs/04-engineering/local-development.md](docs/04-engineering/local-development.md) if you're about to write code.

## Quickstart

```bash
pnpm install
pnpm bootstrap     # sanity-checks toolchain, copies .env.example -> .env where missing
pnpm dev           # runs apps/mobile (Expo) + apps/web-demo (Express) dev servers
```

Running just the investor demo (no mobile toolchain needed):
```bash
cd apps/web-demo
npm install
cp .env.example .env   # add your own OPENAI_API_KEY
npm start
```

## Product docs
- **What we're building and why:** [docs/01-product/prd/gymai-coach-prd.md](docs/01-product/prd/gymai-coach-prd.md)
- **User & system flows:** [docs/01-product/journeys/core-flows.md](docs/01-product/journeys/core-flows.md)
- **How we get there, phase by phase:** [docs/01-product/roadmap/phases.md](docs/01-product/roadmap/phases.md)
- **System architecture:** [docs/03-architecture/app-architecture.md](docs/03-architecture/app-architecture.md)

## Working with AI in this repo
This repo ships instruction files for AI coding tools at the root (`AGENTS.md`, `CLAUDE.md`) and nested per-package (e.g. `apps/mobile/AGENTS.md`, `packages/ui/AGENTS.md`) so agents get local context instead of one giant prompt. See [docs/05-ai/ai-development-playbook.md](docs/05-ai/ai-development-playbook.md).

## License
See [LICENSE](LICENSE) — currently closed-source/proprietary (placeholder, confirm real terms before external distribution).
