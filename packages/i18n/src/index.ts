/**
 * Localization. v1 is English-only per docs/01-product/prd/gymai-coach-prd.md
 * §7, but copy should be extracted to string keys from day one so this isn't
 * a rewrite later — import strings from here rather than inlining literals
 * in apps/mobile components.
 */
export const strings = {
  en: {
    setup: {
      title: "Set up your session",
      generateCta: "Generate My Workout"
    }
  }
} as const;
