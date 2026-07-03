# Branching & Versioning

## Branching
- `main` is always deployable (staging builds trigger automatically on merge — see `docs/04-engineering/ci-cd.md`).
- Feature branches off `main`, short-lived, one PR each. Avoid long-running feature branches that drift far from `main` — the smaller the diff, the easier the review.

## Commit style
Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`) — enforced by commitlint (`config/commitlint`).

## Versioning
- `apps/mobile` uses semantic versioning with EAS-managed remote build numbers (see `docs/04-engineering/release-process.md`).
- Internal `packages/*` are `workspace:*` and don't need independent semver while everything lives in one repo and ships as part of `apps/mobile`. If a package is ever extracted/published independently, activate Changesets (already scaffolded at `.changeset/`, currently unused).
