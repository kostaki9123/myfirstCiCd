import { z } from 'zod';

export const selectTripSchema = z.object({
  id: z.number(),
  tripName: z.string(),
  userId: z.string(),
});
export type Trip = z.infer<typeof selectTripSchema>;

export const insertTodoSchema = selectTripSchema.pick({
  id: true,
  userId: true,
});

export type TripInsert = z.infer<typeof insertTodoSchema>;