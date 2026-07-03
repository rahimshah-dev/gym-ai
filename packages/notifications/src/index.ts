/**
 * Push (Expo Push -> APNs/FCM) and local-notification abstractions.
 * Two distinct uses in this product, per docs/01-product/journeys/core-flows.md:
 *  1. Local notifications for the guided-session timer's "rest over"/"set
 *     over" alerts when the app is backgrounded (§3) — the highest-stakes
 *     use of this package.
 *  2. Remote push for engagement (workout reminders, streak-risk nudges, §6).
 * apps/mobile's src/notifications/ wraps calls to this package rather than
 * calling expo-notifications directly, per apps/mobile/AGENTS.md.
 */
export {};
