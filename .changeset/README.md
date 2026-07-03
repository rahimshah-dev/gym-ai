# Changesets

Not currently active — see `docs/04-engineering/release-process.md` "Versioning." Scaffolded now so it's a one-command activation (`pnpm changeset`) if/when a `packages/*` package is extracted for independent publishing rather than staying an internal `workspace:*` dependency. Apps (`apps/mobile`, `apps/web-demo`, `apps/storybook`) are excluded via `ignore` in `config.json` since they're never independently published.
