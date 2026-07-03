# Release Process

## apps/web-demo (investor/marketing demo)
Deploy directly (Vercel/Render or similar) whenever the demo needs updating — no versioning ceremony needed, it's not a store-distributed app. See `apps/web-demo/README.md` for deployment notes.

## apps/mobile (production app)
1. Merge to `main` triggers a staging build (`.github/workflows/mobile-preview.yml`) via EAS Build's `preview` profile (see `apps/mobile/eas.json`).
2. QA against the preview build per `docs/06-delivery/qa-checklists.md`.
3. Cut a release: bump version, tag, run `.github/workflows/release-ios.yml` / `release-android.yml` (or `scripts/release-ios.sh` / `release-android.sh` locally) using the `production` EAS profile.
4. Submit via EAS Submit (or manual App Store Connect / Play Console upload if EAS Submit isn't configured yet).
5. Follow `docs/06-delivery/app-store-release.md` for store-listing and review-guideline specifics.

## Versioning
Semantic versioning for `apps/mobile` (`app.config.ts` `version` + native build numbers managed by EAS's `appVersionSource: "remote"`, see `eas.json`). Shared packages are internal-only (`workspace:*`) and don't need independent version bumps unless the monorepo is later split — see `docs/07-templates` if that changes and Changesets need activating for real (currently scaffolded but unused, see `.changeset/README.md`).

## Rollback
Expo/EAS supports over-the-air (OTA) updates for JS-only changes without a full store resubmission — use for urgent fixes that don't touch native code. Native-code changes (new permissions, new native modules) always require a full store release and can't be rolled back via OTA.
