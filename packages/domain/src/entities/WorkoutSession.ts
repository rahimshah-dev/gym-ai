/** Mirrors docs/03-architecture/app-architecture.md §4.2 `workout_sessions` + `set_logs`. */
export type SessionStatus = "in_progress" | "completed" | "quit";

export interface SetLog {
  id: string;
  exerciseId: string;
  setNumber: number;
  completedAt: string; // ISO 8601
}

export interface WorkoutSession {
  id: string;
  planId: string;
  userId: string;
  status: SessionStatus;
  startedAt: string; // ISO 8601
  completedAt: string | null;
  setLogs: SetLog[];
}
