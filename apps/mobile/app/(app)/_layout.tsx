import { Tabs } from "expo-router";

// Authenticated tab stack: home, generate, history, profile.
// Guided session and plan detail are pushed on top as stack screens from
// home/generate rather than being tabs themselves.
export default function AppLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="generate" options={{ title: "Generate" }} />
      <Tabs.Screen name="history" options={{ title: "History" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
