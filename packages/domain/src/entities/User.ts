/** Mirrors docs/03-architecture/app-architecture.md §4.2 `users`, `streaks`, `subscriptions`. */
export type SubscriptionTier = "free" | "pro";

export interface Streak {
  currentStreak: number;
  longestStreak: number;
  lastWorkoutDate: string | null; // ISO date
}

export interface User {
  id: string;
  email: string;
  appleSub: string | null;
  timezone: string;
  subscriptionTier: SubscriptionTier;
  streak: Streak;
  createdAt: string; // ISO 8601
}
