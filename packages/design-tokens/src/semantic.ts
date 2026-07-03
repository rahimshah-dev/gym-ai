import { darkColors, lightColors } from "./color";

/**
 * Semantic aliases so components reference intent ("surfaceRaised",
 * "borderSubtle") rather than raw palette names — keeps packages/ui
 * components theme-agnostic between light/dark.
 */
export function semanticColors(mode: "dark" | "light") {
  const c = mode === "dark" ? darkColors : lightColors;
  return {
    background: c.bg,
    surfaceRaised: c.surface,
    surfaceSunken: c.surface2,
    borderSubtle: c.border,
    textPrimary: c.text,
    textSecondary: c.textMuted,
    textDisabled: c.textFaint,
    accent: c.primary,
    accentPressed: c.primaryHover,
    accentSubtle: c.primaryHighlight,
    feedbackSuccess: c.success,
    feedbackError: c.error,
    feedbackWarning: c.warning
  } as const;
}

export type SemanticColorTokens = ReturnType<typeof semanticColors>;
