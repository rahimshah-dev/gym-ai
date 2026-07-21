import { Stack } from "expo-router";

// Root layout: wraps the whole app in shared providers (theme, auth session,
// query client) once packages/auth and packages/api are implemented (Phase 1).
// Route groups below are the auth boundary: (auth) is unauthenticated,
// (app) assumes a valid session — see docs/03-architecture/adr/0003-navigation.md.
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(app)" />
      <Stack.Screen
        name="modal"
        options={{ presentation: "modal", headerShown: true }}
      />
    </Stack>
  );
}
