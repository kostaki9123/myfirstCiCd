import { z } from "zod";
import { PlaceType } from "@prisma/client";

/**
 * Prisma enum → Zod enum
 */
export const PlaceTypeEnum = z.nativeEnum(PlaceType);

/**
 * Base schema (NO effects)
 */
const placeBaseSchema = z.object({
  internalId: z.number().optional(), // primary key, optional for inserts
  id: z.string(),                    // no longer cuid(), can repeat
  pointId: z.string().cuid(),        // still cuid for points
  placeType: PlaceTypeEnum,
  name: z.string().min(1, "Name is required"),

  stayFrom: z.coerce.date().nullable().optional(),
  stayUntil: z.coerce.date().nullable().optional(),

  cost: z.coerce.number().positive().nullable().optional(),
  notes: z.string().nullable().optional(),

  visitDate: z.coerce.date().nullable().optional(),
  visitTime: z.coerce.date().nullable().optional(),
});

/**
 * Full select schema (with cross-field validation)
 */
export const selectPlaceSchema = placeBaseSchema.superRefine((data, ctx) => {
  if (data.stayFrom && data.stayUntil && data.stayFrom > data.stayUntil) {
    ctx.addIssue({
      path: ["stayUntil"],
      message: "stayUntil must be after stayFrom",
      code: z.ZodIssueCode.custom,
    });
  }
});

/**
 * Types
 */
export type Place = z.infer<typeof selectPlaceSchema>;

/**
 * Insert schema (pick BEFORE effects)
 * internalId is omitted because DB generates it
 */
export const insertCreatePlaceSchema = placeBaseSchema.pick({
  id: true,
  pointId: true,
  placeType: true,
  name: true,
  stayFrom: true,
  stayUntil: true,
  cost: true,
  notes: true,
  visitDate: true,
  visitTime: true,
});

export type PlaceInsert = z.infer<typeof insertCreatePlaceSchema>;
