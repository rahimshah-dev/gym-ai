import { Text, View } from "react-native";

// Sign-in screen placeholder. Production version needs email/password +
// Sign in with Apple (mandatory per App Store 4.8 once any third-party
// login exists) + Google — see docs/01-product/prd/gymai-coach-prd.md §8.
export default function SignIn() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Sign in placeholder</Text>
    </View>
  );
}
