/**
 * Analytics event names/schemas and a track() wrapper — provider (PostHog
 * vs. Amplitude) is an open decision, see
 * docs/03-architecture/app-architecture.md §4.5 and
 * docs/01-product/roadmap/phases.md "Open decisions". Keep event names and
 * call sites decoupled from the provider so switching later is a one-file
 * change here, not a codebase-wide find/replace.
 */
export type AnalyticsEvent =
  | { name: "plan_generated"; properties: { focus: string; goal: string } }
  | { name: "session_completed"; properties: { exerciseCount: number; totalSets: number } }
  | { name: "paywall_viewed"; properties: { trigger: "quota_exceeded" | "settings" } };

export function track(_event: AnalyticsEvent): void {
  // TODO(Phase 5/6): wire to the chosen provider once decided.
}
