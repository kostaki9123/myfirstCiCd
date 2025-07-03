import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  username: z.string().min(3).max(31),
  email : z.string().email()
});

export type User = z.infer<typeof userSchema>;

export const createUserSchema = userSchema.pick
({ id: true, 
   username: true, 
   email: true
})

export type CreateUser = z.infer<typeof createUserSchema>;