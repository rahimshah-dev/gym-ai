# Dependency Policy

- Prefer well-maintained, widely-used packages over niche ones, especially for anything touching auth, payments, or security (e.g. RevenueCat over hand-rolled App Store receipt validation).
- New dependencies that introduce a new *category* of tooling (a new state library, a new navigation library, a new HTTP client) require an ADR (`docs/03-architecture/adr/`, template in `docs/07-templates/adr-template.md`) — not just a `package.json` diff. Dependencies that are clearly additive within an existing category (another Radix-style primitive, another date-formatting util) don't need this ceremony.
- Keep `packages/eslint-config` and `packages/typescript-config` as the only place shared lint/TS config lives — don't let individual apps/packages fork their own config without a documented reason.
- Review `pnpm-lock.yaml` diffs in PRs that touch dependencies — a one-line `package.json` change that pulls in dozens of new transitive dependencies is worth a second look.
