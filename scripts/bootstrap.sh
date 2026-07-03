#!/usr/bin/env bash
# Sanity-checks the toolchain and copies .env.example -> .env wherever
# missing, across the whole workspace. Run once when setting up the repo,
# or after pulling changes that add a new .env.example.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== Checking toolchain =="
command -v node >/dev/null || { echo "Node.js not found. Install Node >= 20."; exit 1; }
command -v pnpm >/dev/null || { echo "pnpm not found. Run: corepack enable"; exit 1; }

node_version=$(node -v | sed 's/v//')
node_major=${node_version%%.*}
if [ "$node_major" -lt 20 ]; then
  echo "Node >= 20 required, found $node_version"
  exit 1
fi
echo "Node $node_version OK, pnpm $(pnpm -v) OK"

echo "== Copying .env.example -> .env where missing =="
find . -name ".env.example" -not -path "*/node_modules/*" | while read -r example; do
  target="$(dirname "$example")/.env"
  if [ ! -f "$target" ]; then
    cp "$example" "$target"
    echo "Created $target — fill in real values before running that app."
  else
    echo "$target already exists, skipping."
  fi
done

echo "== Done. Next: pnpm install && pnpm dev =="
