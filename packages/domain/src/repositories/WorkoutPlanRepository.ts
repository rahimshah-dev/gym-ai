import type { WorkoutPlan } from "../entities/WorkoutPlan";

/**
 * Port (interface) for plan persistence — implemented by @gymai/api against
 * the production HTTP API. Kept here, not in @gymai/api, so use-cases in
 * this package can depend on the interface without depending on the
 * transport-layer implementation (dependency inversion, per root AGENTS.md
 * "Architecture boundaries").
 */
export interface WorkoutPlanRepository {
  save(plan: WorkoutPlan): Promise<WorkoutPlan>;
  findById(id: string): Promise<WorkoutPlan | null>;
  listForUser(userId: string): Promise<WorkoutPlan[]>;
}
