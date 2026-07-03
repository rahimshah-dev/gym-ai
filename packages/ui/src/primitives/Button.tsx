import { Pressable, Text, type PressableProps } from "react-native";
import { useTheme } from "../themes/ThemeProvider";
import { minTouchTargetStyle } from "../accessibility/touchTarget";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export interface ButtonProps extends PressableProps {
  label: string;
  variant?: ButtonVariant;
}

/**
 * Ports apps/web-demo/index.html's .btn / .btn-primary / .btn-secondary /
 * .btn-ghost / .btn-danger. Keep visual parity with the mockup's button
 * states (see docs/02-design/components/ once documented).
 */
export function Button({ label, variant = "primary", style, ...pressableProps }: ButtonProps) {
  const { colors, radius, spacing } = useTheme();

  const backgroundByVariant: Record<ButtonVariant, string> = {
    primary: colors.accent,
    secondary: colors.surfaceSunken,
    ghost: "transparent",
    danger: "transparent"
  };

  const textColorByVariant: Record<ButtonVariant, string> = {
    primary: colors.background,
    secondary: colors.textPrimary,
    ghost: colors.textSecondary,
    danger: colors.feedbackError
  };

  return (
    <Pressable
      accessibilityRole="button"
      style={(state) => [
        {
          backgroundColor: backgroundByVariant[variant],
          borderRadius: radius.full,
          paddingVertical: spacing[3],
          paddingHorizontal: spacing[6],
          alignItems: "center",
          justifyContent: "center",
          opacity: state.pressed ? 0.85 : 1,
          borderWidth: variant === "danger" ? 1 : 0,
          borderColor: colors.feedbackError
        },
        minTouchTargetStyle(),
        typeof style === "function" ? style(state) : style
      ]}
      {...pressableProps}
    >
      <Text style={{ color: textColorByVariant[variant], fontWeight: "600" }}>{label}</Text>
    </Pressable>
  );
}
