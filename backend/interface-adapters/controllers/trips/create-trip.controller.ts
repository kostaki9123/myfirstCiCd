import { z } from "zod";
import { InputParseError } from "../../../entities/errors/common";
import { createTripUseCase } from "../../../application/use-cases/auth/create-trip.use-case";

const inputSchema = z.object({
    userId: z.string(),
    tripName: z.string().min(3).max(31),
    tripBudget: z.string(),
    travelingWith: z.string(),
    tripTypes: z.array(z.string()).min(1).max(3), //
});

export const createTripController =
    async (input: Partial<z.infer<typeof inputSchema>>) : Promise<ReturnType<typeof createTripUseCase >> => { 
         
         //input validation
         const { data, error: inputParseError } = inputSchema.safeParse(input);

         if (inputParseError) {
              throw new InputParseError('Invalid data', { cause: inputParseError });
         }

        

          return await createTripUseCase(data);

    }
      