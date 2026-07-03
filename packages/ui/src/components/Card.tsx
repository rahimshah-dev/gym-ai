import { View, type ViewProps } from "react-native";
import { useTheme } from "../themes/ThemeProvider";

/** Ports apps/web-demo/index.html's .form-card / .exercise-card surface pattern. */
export function Card({ style, ...viewProps }: ViewProps) {
  const { colors, radius, spacing } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.surfaceRaised,
          borderWidth: 1,
          borderColor: colors.borderSubtle,
          borderRadius: radius.xl,
          padding: spacing[5]
        },
        style
      ]}
      {...viewProps}
    />
  );
}
