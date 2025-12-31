import { z } from 'zod';

export const selectPlaceSchema = z.object({
  id: z.string(),
  tripName: z.string(),
  userId: z.string(),
  tripBudget: z.string(),
  travelingWith: z.string(),
  tripTypes: z.array(z.string()).min(1).max(3),
});
export type place = z.infer<typeof selectPlaceSchema>;

export const insertCreatePlaceSchema = selectPlaceSchema.pick({
  userId: true,
  tripName: true,
  tripBudget: true,
  travelingWith: true,
  tripTypes: true
});

export type TripInsert = z.infer<typeof insertCreatePlaceSchema>;