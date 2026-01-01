import { z } from "zod";
import { InputParseError } from "../../../entities/errors/common";
import { createPlaceUseCase, IplaceType } from "../../../application/use-cases/place/create-place.use-case";

export const PlaceTypeEnum = z.enum([
  'ACCOMMODATION',
  'PLACE_TO_VISIT',
]);

export const inputSchema = z.object({

  id : z.string(),

  pointId: z.string(),

  placeType: PlaceTypeEnum,

  name: z.string().min(1, 'Name is required'),

  stayFrom: z.coerce.date().optional(),
  stayUntil: z.coerce.date().optional(),

  cost: z.coerce.number().positive().optional(),

  notes: z.string().optional(),

  visitDate: z.coerce.date().optional(),
  visitTime: z.coerce.date().optional(),
});

export const createPlaceController =
    async (input: Partial<z.infer<typeof inputSchema>>) : Promise<ReturnType<typeof createPlaceUseCase >> => { 
                  
         //input validation
         const { data, error: inputParseError } = inputSchema.safeParse(input);
    
         
         if (inputParseError) {
              throw new InputParseError('Invalid data', { cause: inputParseError });
         }

         return await createPlaceUseCase({
            id : data.id ,
            pointId: data.pointId ,
            placeType: data.placeType as any ,
            placeName: data.name,
          })
    }
    