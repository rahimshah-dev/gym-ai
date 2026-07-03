import { hasQuotaRemaining, type GenerationQuota } from "../value-objects/GenerationQuota";

export interface GenerationDecision {
  allowed: boolean;
  reason: "ok" | "quota_exceeded";
}

/**
 * Pure use-case: given a user's current quota, decide whether a new
 * generation request should proceed or trigger the paywall (see
 * docs/01-product/journeys/core-flows.md §5). No I/O — the API layer
 * fetches the quota and calls this, keeping the actual policy testable
 * without a database or HTTP mocks.
 */
export function checkGenerationAllowed(quota: GenerationQuota): GenerationDecision {
  return hasQuotaRemaining(quota)
    ? { allowed: true, reason: "ok" }
    : { allowed: false, reason: "quota_exceeded" };
}
