import { Pressable, Text } from "react-native";
import { useTheme } from "../themes/ThemeProvider";
import { minTouchTargetStyle } from "../accessibility/touchTarget";

export interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

/** Ports apps/web-demo/index.html's .chip / .chip.selected — used for focus-area and goal single-select groups. */
export function Chip({ label, selected = false, onPress }: ChipProps) {
  const { colors, radius, spacing } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[
        {
          paddingVertical: spacing[2],
          paddingHorizontal: spacing[4],
          borderRadius: radius.full,
          borderWidth: 1,
          borderColor: selected ? colors.accent : colors.borderSubtle,
          backgroundColor: selected ? colors.accentSubtle : colors.surfaceSunken
        },
        minTouchTargetStyle()
      ]}
    >
      <Text style={{ color: selected ? colors.accent : colors.textSecondary, fontWeight: "500" }}>
        {label}
      </Text>
    </Pressable>
  );
}
