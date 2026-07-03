import { z } from "zod";

/**
 * Env parsing and feature flags — validate once at app startup rather than
 * reading process.env / expo Constants ad hoc throughout the codebase.
 * Mirrors the pattern already used in apps/web-demo/server.js (fail fast if
 * OPENAI_API_KEY is missing) but generalized and typed.
 */
const envSchema = z.object({
  apiUrl: z.string().url()
});

export type AppEnv = z.infer<typeof envSchema>;

export function parseEnv(raw: unknown): AppEnv {
  return envSchema.parse(raw);
}
