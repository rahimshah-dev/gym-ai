import type { HttpClient } from "../client/httpClient";
import type { GeneratePlanRequestDto, GeneratePlanResponseDto } from "../models/GeneratePlanDto";
import { toWorkoutPlan } from "../mappers/toWorkoutPlan";
import type { WorkoutPlan } from "@gymai/domain";

/**
 * Production equivalent of apps/web-demo/index.html's generatePlan() fetch
 * call, minus the client-held API key (there never was one client-side in
 * the mockup after the server-proxy fix — this just adds auth + persistence
 * + the domain mapping layer on top of the same request shape).
 */
export function createGeneratePlanEndpoint(client: HttpClient) {
  return async function generatePlan(
    request: GeneratePlanRequestDto,
    userId: string
  ): Promise<WorkoutPlan> {
    const dto = await client.request<GeneratePlanResponseDto>("/api/generate-plan", {
      method: "POST",
      body: JSON.stringify(request)
    });
    return toWorkoutPlan(dto, userId);
  };
}
