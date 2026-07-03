#!/usr/bin/env -S node --loader ts-node/esm
/**
 * Drift check between apps/web-demo/index.html's CSS custom properties and
 * packages/design-tokens/src/color.ts's darkColors object — the two are
 * meant to stay in sync per docs/03-architecture/adr/0001-monorepo.md.
 * This does NOT auto-write changes (token values should be a deliberate
 * decision, not a silent overwrite) — it reports mismatches so a human
 * decides which side is correct.
 *
 * Usage: pnpm tsx scripts/sync-tokens.ts
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const CSS_TO_TOKEN_KEY: Record<string, string> = {
  "--color-bg": "bg",
  "--color-surface": "surface",
  "--color-surface-2": "surface2",
  "--color-surface-offset": "surfaceOffset",
  "--color-border": "border",
  "--color-text": "text",
  "--color-text-muted": "textMuted",
  "--color-text-faint": "textFaint",
  "--color-primary": "primary",
  "--color-primary-hover": "primaryHover",
  "--color-primary-highlight": "primaryHighlight",
  "--color-success": "success",
  "--color-error": "error",
  "--color-warning": "warning"
};

function extractRootBlock(css: string): string {
  const match = css.match(/:root\s*{([^}]*)}/);
  if (!match) throw new Error("Could not find :root block in apps/web-demo/index.html");
  return match[1];
}

function parseCssVars(block: string): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const line of block.split(";")) {
    const m = line.match(/\s*(--[a-z0-9-]+)\s*:\s*(.+)/i);
    if (m) vars[m[1].trim()] = m[2].trim();
  }
  return vars;
}

function parseTsColorObject(ts: string): Record<string, string> {
  const values: Record<string, string> = {};
  const objectMatch = ts.match(/darkColors\s*=\s*{([^}]*)}/);
  if (!objectMatch) throw new Error("Could not find darkColors object in color.ts");
  for (const line of objectMatch[1].split(",")) {
    const m = line.match(/\s*(\w+)\s*:\s*"([^"]+)"/);
    if (m) values[m[1]] = m[2];
  }
  return values;
}

function main() {
  const htmlPath = join(ROOT, "apps/web-demo/index.html");
  const tokensPath = join(ROOT, "packages/design-tokens/src/color.ts");

  const cssVars = parseCssVars(extractRootBlock(readFileSync(htmlPath, "utf8")));
  const tsValues = parseTsColorObject(readFileSync(tokensPath, "utf8"));

  let mismatches = 0;
  for (const [cssVar, tokenKey] of Object.entries(CSS_TO_TOKEN_KEY)) {
    const cssValue = cssVars[cssVar];
    const tsValue = tsValues[tokenKey];
    if (!cssValue || !tsValue) {
      console.warn(`SKIP  ${cssVar} / ${tokenKey} — missing on one side`);
      continue;
    }
    if (cssValue.toLowerCase() !== tsValue.toLowerCase()) {
      mismatches++;
      console.error(`DRIFT ${cssVar}=${cssValue}  vs  ${tokenKey}=${tsValue} in color.ts`);
    }
  }

  if (mismatches > 0) {
    console.error(`\n${mismatches} token(s) drifted between the mockup and packages/design-tokens.`);
    process.exit(1);
  }
  console.log("Design tokens match apps/web-demo/index.html's :root block.");
}

main();
