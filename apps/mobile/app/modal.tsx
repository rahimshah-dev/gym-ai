import { Text, View } from "react-native";

// Generic modal route — used for the paywall, permission primers, and
// disclaimers (docs/01-product/journeys/core-flows.md §1, §5).
export default function Modal() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Modal placeholder</Text>
    </View>
  );
}
