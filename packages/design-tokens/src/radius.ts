/** Ported from apps/web-demo/index.html --radius-sm..2xl and --radius-full. */
export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999
} as const;

export type RadiusTokens = typeof radius;
