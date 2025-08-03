import { z } from 'zod';


import { InputParseError } from '../../../entities/errors/common';
import { signInUseCase } from '../../../application/use-cases/auth/sign-in.use-case';


const inputSchema = z.object({
    userId: z.string(),
    username: z.string().min(3).max(31),
    email: z.string().email()
});

export type ISignInController = typeof signInController;

export const signInController =
  async (input: Partial<z.infer<typeof inputSchema>>) : Promise<ReturnType<typeof signInUseCase >> => {  
         
        const { data, error: inputParseError } = inputSchema.safeParse(input);
         
        if (inputParseError) {
          throw new InputParseError('Invalid data', { cause: inputParseError });
        }

        return await signInUseCase(data);
      
      }