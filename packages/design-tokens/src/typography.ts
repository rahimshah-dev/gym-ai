/**
 * Ported from apps/web-demo/index.html. Web used fluid clamp() sizes; on
 * native there's no viewport-relative clamp, so these are fixed pt values
 * chosen at the midpoint of each clamp() range. Revisit if Dynamic
 * Type / accessibility text scaling needs finer control (see
 * docs/02-design/foundations/typography.md).
 */
export const fontFamily = {
  display: "InstrumentSerif-Italic",
  body: "DMSans-Regular",
  bodyMedium: "DMSans-Medium",
  bodyBold: "DMSans-Bold"
} as const;

export const fontSize = {
  xs: 13,
  sm: 15,
  base: 17,
  lg: 20,
  xl: 28,
  xxl: 40
} as const;

export type TypographyTokens = {
  fontFamily: typeof fontFamily;
  fontSize: typeof fontSize;
};
