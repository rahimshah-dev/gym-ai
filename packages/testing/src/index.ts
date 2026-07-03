import type { WorkoutPlan } from "@gymai/domain";

/**
 * Test utilities, mocks, and fixtures shared across the workspace's test
 * suites — e.g. a canonical fake WorkoutPlan so every package's tests agree
 * on what "a plan" looks like instead of each hand-rolling its own fixture.
 */
export function makeFakeWorkoutPlan(overrides: Partial<WorkoutPlan> = {}): WorkoutPlan {
  return {
    id: "plan_test_1",
    userId: "user_test_1",
    source: "text",
    focus: "Full Body",
    goal: "General Fitness",
    level: "Intermediate",
    totalMinutes: 30,
    warmupNote: "Warm up for 5 minutes.",
    cooldownNote: "Stretch for 5 minutes.",
    promptVersion: "v1",
    createdAt: new Date().toISOString(),
    exercises: [
      {
        id: "ex_1",
        orderIndex: 0,
        name: "Push-ups",
        muscleGroup: "Chest",
        sets: 3,
        reps: "12",
        restSeconds: 30,
        setDurationSeconds: 45,
        instructions: ["Get in plank", "Lower chest", "Push up"]
      }
    ],
    ...overrides
  };
}
