import { Redirect } from "expo-router";

// Entry redirect: sends to the auth stack until packages/auth reports a
// session, then to the app stack. Placeholder always redirects to (auth)
// until Phase 1 wires up real session state.
export default function Index() {
  return <Redirect href="/(auth)/sign-in" />;
}
