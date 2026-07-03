#!/usr/bin/env -S node --loader ts-node/esm
/**
 * Local, faster version of the check in
 * .github/workflows/ai-governance.yml — scans every AGENTS.md in the repo
 * for backtick-quoted file paths and reports ones that no longer exist.
 * Run after moving/renaming files to catch stale AI-instruction references
 * before they reach CI.
 *
 * Usage: pnpm tsx scripts/update-agent-context.ts
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const PATH_PATTERN = /`([a-zA-Z0-9_./-]+\.(md|ts|tsx|js|json|sh))`/g;

function findAgentsFiles(): string[] {
  // Minimal manual walk (no extra glob dependency) — skips node_modules/.git.
  const results: string[] = [];
  function walk(dir: string) {
    for (const entry of require("node:fs").readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === "node_modules" || entry.name === ".git") continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === "AGENTS.md") results.push(full);
    }
  }
  walk(ROOT);
  return results;
}

function main() {
  const agentsFiles = findAgentsFiles();
  let staleCount = 0;

  for (const file of agentsFiles) {
    const content = readFileSync(file, "utf8");
    const fileDir = dirname(file);
    for (const match of content.matchAll(PATH_PATTERN)) {
      const ref = match[1];
      if (ref.startsWith("http")) continue;
      const resolved = existsSync(join(ROOT, ref))
        ? join(ROOT, ref)
        : existsSync(join(fileDir, ref))
          ? join(fileDir, ref)
          : null;
      if (!resolved) {
        staleCount++;
        console.warn(`${relative(ROOT, file)}: possibly stale reference "${ref}"`);
      }
    }
  }

  console.log(`\nChecked ${agentsFiles.length} AGENTS.md file(s), ${staleCount} possibly stale reference(s).`);
  process.exit(staleCount > 0 ? 1 : 0);
}

main();
