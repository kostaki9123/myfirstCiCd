import { z } from "zod";
import { InputParseError } from "../../../entities/errors/common";
import { updatePlaceUseCase } from "../../../application/use-cases/place/update-place.use-case";

/* -------------------------------------------------------
   PLACE SCHEMA
------------------------------------------------------- */
export const inputSchema = z.object({
  /* -------- Identifiers -------- */
  id: z.string().min(1),
  pointId: z.string().min(1),

  /* -------- Core -------- */
  /* -------- Stay (Accommodation) -------- */
  stayFrom: z.date().nullable().optional(),
  stayUntil: z.date().nullable().optional(),

  /* -------- Visit (Attraction) -------- */
  visitDate: z.date().nullable().optional(),
  visitTime: z.date().nullable().optional(),

  /* -------- Extras -------- */
  cost: z.number().nullable().optional(),
  notes: z.string().nullable().optional(),
});


export const updatePlaceController =
    async (input: Partial<z.infer<typeof inputSchema>>) : Promise<ReturnType<typeof updatePlaceUseCase >> => { 
         
         
         //input validation
         const { data, error: inputParseError } = inputSchema.safeParse(input);
    
         
         if (inputParseError) {
              throw new InputParseError('Invalid data', { cause: inputParseError });
         }

         console.log('data in controller', input)
           return await updatePlaceUseCase({
                id: data.id,
                pointId: data.pointId,
            
                stayFrom: data.stayFrom ?? null,
                stayUntil: data.stayUntil ?? null,
            
                visitDate: data.visitDate ?? null,
                visitTime: data.visitTime ?? null,
            
                cost: data.cost ?? null,
                notes: data.notes ?? null,
              })
                      
    }
    