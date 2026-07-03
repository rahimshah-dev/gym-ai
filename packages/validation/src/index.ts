import { z } from "zod";

/**
 * Shared validation schemas — ports the setup-form rules from
 * apps/web-demo/index.html's setupForm submit handler (time range 5-180,
 * equipment required per mode) so apps/mobile enforces identical rules
 * without re-deriving them from scratch.
 */
export const setupFormSchema = z
  .object({
    equipmentMode: z.enum(["photo", "text"]),
    equipmentText: z.string().optional(),
    equipmentImage: z.string().nullable().optional(),
    time: z.number().int().min(5).max(180).nullable(),
    focus: z.string().nullable(),
    goal: z.string().nullable(),
    level: z.string().nullable()
  })
  .refine(
    (data) =>
      data.equipmentMode === "photo" ? !!data.equipmentImage : !!data.equipmentText?.trim(),
    { message: "Equipment photo or description is required for the selected mode" }
  );

export type SetupFormInput = z.infer<typeof setupFormSchema>;
