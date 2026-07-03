import type { WorkoutPlan, Exercise } from "@gymai/domain";
import type { GeneratePlanResponseDto, ExerciseDto } from "../models/GeneratePlanDto";

function toExercise(dto: ExerciseDto, orderIndex: number): Exercise {
  return {
    id: `${orderIndex}`, // real id assigned server-side once persistence lands
    orderIndex,
    name: dto.name,
    muscleGroup: dto.muscle_group,
    sets: dto.sets,
    reps: dto.reps,
    restSeconds: dto.rest_seconds,
    setDurationSeconds: dto.set_duration_seconds,
    instructions: dto.instructions
  };
}

/** Wire DTO -> domain entity. Keep all snake_case/camelCase translation confined to this file. */
export function toWorkoutPlan(dto: GeneratePlanResponseDto, userId: string): WorkoutPlan {
  return {
    id: dto.id,
    userId,
    source: "text", // caller knows the actual source; overwrite if needed
    focus: dto.focus,
    goal: dto.goal,
    level: dto.level,
    totalMinutes: dto.total_minutes,
    warmupNote: dto.warmup_note,
    cooldownNote: dto.cooldown_note,
    promptVersion: dto.prompt_version,
    exercises: dto.exercises.map(toExercise),
    createdAt: dto.created_at
  };
}
