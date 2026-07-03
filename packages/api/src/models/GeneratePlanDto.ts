/**
 * Raw wire shape returned by POST /api/generate-plan — matches the JSON
 * contract defined in apps/web-demo/server.js's buildPrompt() (the AI's
 * response schema), plus persistence fields the production API adds
 * (id, userId, promptVersion) once Phase 1 lands.
 */
export interface ExerciseDto {
  name: string;
  muscle_group: string;
  sets: number;
  reps: string;
  rest_seconds: number;
  set_duration_seconds: number;
  instructions: string[];
}

export interface GeneratePlanResponseDto {
  id: string;
  total_minutes: number;
  focus: string;
  goal: string;
  level: string;
  equipment_identified: string[];
  warmup_note: string;
  cooldown_note: string;
  exercises: ExerciseDto[];
  prompt_version: string;
  created_at: string;
}

export interface GeneratePlanRequestDto {
  equipmentMode: "photo" | "text";
  equipmentText?: string;
  equipmentImage?: string | null;
  time: number | null;
  focus: string | null;
  goal: string | null;
  level: string | null;
}
