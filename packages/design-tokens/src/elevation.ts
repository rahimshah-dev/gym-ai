/**
 * Ported from apps/web-demo/index.html --shadow-sm..lg and --shadow-glow.
 * React Native has no box-shadow; these map to elevation (Android) and
 * shadowColor/shadowOpacity/shadowRadius (iOS) in packages/ui's primitives.
 */
export const elevation = {
  sm: { android: 1, ios: { opacity: 0.3, radius: 2 } },
  md: { android: 4, ios: { opacity: 0.4, radius: 16 } },
  lg: { android: 12, ios: { opacity: 0.5, radius: 40 } },
  glow: { android: 0, ios: { opacity: 0.25, radius: 32 } }
} as const;

export type ElevationTokens = typeof elevation;
