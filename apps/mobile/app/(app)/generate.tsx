import { Text, View } from "react-native";

// Setup screen placeholder — port of apps/web-demo's Setup view: photo/text
// equipment input, time/focus/goal/level. See
// docs/01-product/journeys/core-flows.md §2 and
// docs/01-product/roadmap/phases.md Phase 3.
export default function Generate() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Generate (setup form) placeholder</Text>
    </View>
  );
}
