#!/usr/bin/env bash
# Diagnoses common local-dev environment issues. Run when something that
# should work isn't (see docs/04-engineering/local-development.md "Common
# issues" for the problems this checks for).
set -uo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

ok=0
fail=0

check() {
  local desc="$1"
  local cmd="$2"
  if eval "$cmd" >/dev/null 2>&1; then
    echo "[OK]   $desc"
    ok=$((ok + 1))
  else
    echo "[FAIL] $desc"
    fail=$((fail + 1))
  fi
}

check "Node >= 20 installed" '[ "$(node -v | sed "s/v//" | cut -d. -f1)" -ge 20 ]'
check "pnpm installed" "command -v pnpm"
check "Root node_modules installed" "[ -d node_modules ]"
check "apps/mobile node_modules installed" "[ -d apps/mobile/node_modules ]"
check "apps/web-demo node_modules installed" "[ -d apps/web-demo/node_modules ]"
check "pnpm-workspace.yaml present" "[ -f pnpm-workspace.yaml ]"
check "turbo.json present" "[ -f turbo.json ]"

echo ""
echo "$ok checks passed, $fail failed."
[ "$fail" -eq 0 ]
