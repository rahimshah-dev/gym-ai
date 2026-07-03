/**
 * Minimum touch target size, per apps/web-demo/index.html's own accessibility
 * requirement (44x44) and WCAG AA / Apple HIG guidance. Use on any pressable
 * primitive's hitSlop or minWidth/minHeight.
 */
export const MIN_TOUCH_TARGET = 44;

export function minTouchTargetStyle() {
  return { minWidth: MIN_TOUCH_TARGET, minHeight: MIN_TOUCH_TARGET };
}
