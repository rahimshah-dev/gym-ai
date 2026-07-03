#!/usr/bin/env -S node --loader ts-node/esm
/**
 * Generates apps/mobile's required icon sizes (app icon, adaptive icon,
 * splash) from a single source image. Not yet implemented — needs a source
 * artwork file (apps/mobile/assets/icons/source.png or similar) that
 * doesn't exist yet, since the product's app icon hasn't been designed.
 *
 * Intended behavior once a source image exists:
 *  1. Read a single high-res source PNG (1024x1024 recommended).
 *  2. Use `sharp` (or `expo-optimize`) to generate each required size for
 *     apps/mobile/app.config.ts's icon/adaptiveIcon/splash fields.
 *  3. Write outputs into apps/mobile/assets/icons/ and assets/images/.
 *
 * Usage (once implemented): pnpm tsx scripts/generate-icons.ts <source.png>
 */
console.log(
  "generate-icons.ts is not yet implemented — no source app icon artwork exists yet. " +
    "See the file header for intended behavior once design work produces one."
);
process.exit(1);
