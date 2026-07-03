#!/usr/bin/env bash
# Local equivalent of .github/workflows/release-ios.yml, for releasing
# without waiting on a CI run. Requires `eas login` to have been run once.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR/apps/mobile"

command -v eas >/dev/null || { echo "eas-cli not found. Run: npm install -g eas-cli"; exit 1; }

echo "== Building production iOS via EAS =="
eas build --platform ios --profile production

echo "== Submitting to App Store =="
eas submit --platform ios --latest

echo "== Done. Follow docs/06-delivery/app-store-release.md for post-submission steps. =="
