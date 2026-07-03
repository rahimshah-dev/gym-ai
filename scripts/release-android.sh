#!/usr/bin/env bash
# Local equivalent of .github/workflows/release-android.yml.
# Requires `eas login` to have been run once.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR/apps/mobile"

command -v eas >/dev/null || { echo "eas-cli not found. Run: npm install -g eas-cli"; exit 1; }

echo "== Building production Android via EAS =="
eas build --platform android --profile production

echo "== Submitting to Play Store =="
eas submit --platform android --latest

echo "== Done. Follow docs/06-delivery/app-store-release.md for post-submission steps. =="
