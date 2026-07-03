import { z } from "zod";

/**
 * Runtime validation for the AI-derived plan response — the AI's output is
 * the one place in the system where "the shape is wrong" is a realistic
 * failure mode (see apps/web-demo/server.js's JSON.parse try/catch for the
 * same concern server-side). Validate before mapping to the domain type.
 */
export const exerciseSchema = z.object({
  name: z.string(),
  muscle_group: z.string(),
  sets: z.number().int().positive(),
  reps: z.string(),
  rest_seconds: z.number().int().nonnegative(),
  set_duration_seconds: z.number().int().positive(),
  instructions: z.array(z.string()).min(1)
});

export const generatePlanResponseSchema = z.object({
  id: z.string(),
  total_minutes: z.number().int().positive(),
  focus: z.string(),
  goal: z.string(),
  level: z.string(),
  equipment_identified: z.array(z.string()),
  warmup_note: z.string(),
  cooldown_note: z.string(),
  exercises: z.array(exerciseSchema).min(4).max(8),
  prompt_version: z.string(),
  created_at: z.string()
});
