import { z } from "zod";
import { InputParseError } from "../../../entities/errors/common";
import { updatePlaceUseCase } from "../../../application/use-cases/place/update-place.use-case";

const inputSchema = z.object({
  id: z.string().min(1, "ID is required"),
  notes: z
    .string()
    .min(1, "Notes cannot be empty")
    .max(200, "Notes cannot exceed 200 characters")
    .refine((val) => val.trim().length > 0, "Notes cannot be just spaces")
});

export const updateNotesController =
    async (input: Partial<z.infer<typeof inputSchema>>) : Promise<ReturnType<typeof updatePlaceUseCase >> => { 
         
         
         //input validation
         const { data, error: inputParseError } = inputSchema.safeParse(input);
    
         
         if (inputParseError) {
              throw new InputParseError('Invalid data', { cause: inputParseError });
         }

         return await updatePlaceUseCase({
            id : data.id ,
            notes: data.notes ,
          })
    }
    