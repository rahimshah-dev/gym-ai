/**
 * Ported from apps/web-demo/index.html `:root` and `html[data-theme="light"]`
 * CSS custom properties. This is the single source of truth — do not
 * hardcode any of these values elsewhere.
 */
export const darkColors = {
  bg: "#0f0f0d",
  surface: "#161614",
  surface2: "#1c1b19",
  surfaceOffset: "#232220",
  border: "#3a3936",
  text: "#e8e6e3",
  textMuted: "#888785",
  textFaint: "#555452",
  primary: "#3fc4cc",
  primaryHover: "#55d0d8",
  primaryHighlight: "#1e3335",
  success: "#6daa45",
  error: "#e06b6b",
  warning: "#f0a060"
} as const;

export const lightColors = {
  bg: "#f5f4f0",
  surface: "#fafaf8",
  surface2: "#f0efeb",
  surfaceOffset: "#e8e6e1",
  border: "#ddd9d1",
  text: "#201f1c",
  textMuted: "#6b6864",
  textFaint: "#a19d97",
  primary: "#0a7a82",
  primaryHover: "#0c8f98",
  primaryHighlight: "#d6ecec",
  success: "#4a7a2a",
  error: "#b83e3e",
  warning: "#b8702a"
} as const;

export type ColorTokens = typeof darkColors;
