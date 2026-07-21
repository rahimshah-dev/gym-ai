import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "GymAI Coach",
  slug: "gymai-coach",
  scheme: "gymaicoach",
  version: "0.1.0",
  orientation: "portrait",
  userInterfaceStyle: "automatic",
  icon: "./assets/icons/icon.png",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#0f0f0d",
  },
  ios: {
    bundleIdentifier: "com.gymaicoach.app",
    supportsTablet: false,
    infoPlist: {
      NSCameraUsageDescription:
        "GymAI Coach uses your camera to identify the gym equipment you have available.",
      NSPhotoLibraryUsageDescription:
        "GymAI Coach needs photo library access so you can pick an equipment photo instead of taking a new one.",
    },
  },
  android: {
    package: "com.gymaicoach.app",
    adaptiveIcon: {
      foregroundImage: "./assets/icons/adaptive-icon.png",
      backgroundColor: "#0f0f0d",
    },
  },
  plugins: ["expo-router", "expo-secure-store"],
  extra: {
    // Populated per-environment via EAS build profiles / .env — see eas.json
    apiUrl: process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8420",
  },
};

export default config;
