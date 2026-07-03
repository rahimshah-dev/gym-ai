/**
 * Value object for the free/paid generation limit described in
 * docs/01-product/prd/gymai-coach-prd.md §9 (Monetization). Kept as a pure
 * value object (no I/O) so quota math is unit-testable without a database.
 */
export interface GenerationQuota {
  tier: "free" | "pro";
  limitPerMonth: number | null; // null = unlimited (pro)
  usedThisMonth: number;
}

export function hasQuotaRemaining(quota: GenerationQuota): boolean {
  if (quota.limitPerMonth === null) return true;
  return quota.usedThisMonth < quota.limitPerMonth;
}
