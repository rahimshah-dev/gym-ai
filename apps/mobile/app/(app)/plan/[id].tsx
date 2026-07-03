import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

// Plan detail screen placeholder — port of apps/web-demo's Plan view:
// exercise cards, warmup note, expandable instructions, "Start Guided
// Session" CTA. Pushed from Generate/Home, not a tab. See
// docs/01-product/journeys/core-flows.md §2.
export default function PlanDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Plan {id} placeholder</Text>
    </View>
  );
}
