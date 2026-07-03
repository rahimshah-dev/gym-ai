# Environments

| Environment | API | Database | OpenAI key | RevenueCat project | Used by |
|---|---|---|---|---|---|
| `local` | `localhost` | local/dev Postgres | dev key, low quota | sandbox | Individual development |
| `staging` | staging API host | staging Postgres | dedicated staging key | sandbox | Internal testing, EAS `preview` builds |
| `production` | production API host | production Postgres | production key | production | Real users, App Store/Play builds |

`apps/mobile`'s `eas.json` build profiles (`development`, `preview`, `production`) map to these environments via `EXPO_PUBLIC_API_URL`. `apps/web-demo` runs independently with its own `.env` — see `apps/web-demo/README.md` — and should use its own dedicated, rate-limited OpenAI key if deployed publicly, separate from the mobile app's keys.

**Hosting provider for API + DB is an open decision** — see `docs/01-product/roadmap/phases.md` "Open decisions."
