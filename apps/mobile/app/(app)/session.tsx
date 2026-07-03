import { Text, View } from "react-native";

// Guided session screen placeholder — the highest-risk screen in the app.
// Must implement the ring timer + rest overlay from apps/web-demo/index.html
// with wall-clock recomputation and local-notification fallback for
// backgrounding, per docs/01-product/journeys/core-flows.md §3 and
// docs/03-architecture/adr/0002-expo-react-native.md.
export default function Session() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Guided session placeholder</Text>
    </View>
  );
}
