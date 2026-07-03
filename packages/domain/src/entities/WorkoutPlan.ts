/**
 * Mirrors docs/03-architecture/app-architecture.md §4.2 `workout_plans` +
 * `exercises` tables. This is the canonical shape both apps/mobile and the
 * production API agree on — the AI response shape in
 * apps/web-demo/server.js's buildPrompt() JSON contract maps directly to
 * this, minus the persistence fields (id, userId, createdAt, promptVersion).
 */
export interface Exercise {
  id: string;
  orderIndex: number;
  name: string;
  muscleGroup: string;
  sets: number;
  reps: string; // e.g. "12" or "45 sec" — kept as a display string per the AI contract
  restSeconds: number;
  setDurationSeconds: number;
  instructions: string[];
}

export type EquipmentSource = "photo" | "text";

export interface WorkoutPlan {
  id: string;
  userId: string;
  source: EquipmentSource;
  focus: string;
  goal: string;
  level: string;
  totalMinutes: number;
  warmupNote: string;
  cooldownNote: string;
  promptVersion: string;
  exercises: Exercise[];
  createdAt: string; // ISO 8601
}
