/**
 * Ported from apps/web-demo/index.html --transition-interactive.
 * Native equivalents use react-native-reanimated Easing curves rather than
 * CSS cubic-bezier strings — bezierFn is the same curve, durationMs matches.
 */
export const motion = {
  interactive: {
    durationMs: 180,
    bezier: [0.16, 1, 0.3, 1] as [number, number, number, number]
  }
} as const;

export type MotionTokens = typeof motion;
