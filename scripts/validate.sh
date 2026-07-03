#!/usr/bin/env bash
# Same checks as CI (.github/workflows/ci.yml) — run before opening a PR.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== Lint =="
pnpm lint

echo "== Typecheck =="
pnpm typecheck

echo "== Test =="
pnpm test

echo "== All checks passed =="
