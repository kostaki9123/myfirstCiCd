import { z } from "zod";
import { InputParseError } from "../../../entities/errors/common";
import { updatePointUseCase } from "../../../application/use-cases/points/update.point.use-case";

const inputSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  index: z.number(),
  role: z.enum(["POINT", "MOVING_BOX"]),

  place: z
    .object({
      name: z.string().min(1, "You must enter a place"),
      address: z.string().optional(),
      placeId: z.string().optional(),
      location: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "You must select a place",
    })
    .optional(),

  dates: z
    .array(z.date({ required_error: "You must select valid dates" }))
    .length(2, { message: "You must select both start and end dates" })
    .refine(([start, end]) => end >= start, {
      message: "End date cannot be before start date",
    })
    .optional(),

  from: z
    .object({
      name: z.string().min(1, "You must select a starting place"),
      address: z.string().optional(),
      placeId: z.string().optional(),
      location: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "You must select a starting place",
    })
    .optional(),

  to: z
    .object({
      name: z.string().min(1, "You must select a destination"),
      address: z.string().optional(),
      placeId: z.string().optional(),
      location: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "You must select a destination",
    })
    .optional(),

  transportType: z
    .string()
    .min(1, { message: "You must select a transport type" })
    .optional(),

  departureDate: z
    .date({ required_error: "You must select a departure date" })
    .nullable()
    .refine((val) => val !== null, { message: "You must select a departure date" })
    .optional(),

  departureTime: z
    .date({ required_error: "You must select a departure time" })
    .nullable()
    .refine((val) => val !== null, { message: "You must select a departure time" })
    .optional(),
});

export const updatePointController =
    async (input: Partial<z.infer<typeof inputSchema>>) : Promise<ReturnType<typeof updatePointUseCase >> => { 
         
         
         //input validation
         const { data, error: inputParseError } = inputSchema.safeParse(input);
    
         
         if (inputParseError) {
              throw new InputParseError('Invalid data', { cause: inputParseError });
         }

          return await updatePointUseCase({
            id : data.id ,
            tripId: data.tripId ,
            role: data.role ,
            index: data.index ,
            place: {
              name: data.place?.name! ,
              address: data.place?.address! ,
              placeId: data.place?.placeId! ,
              location: {
                lat: data.place?.location.lat! ,
                lng: data.place?.location.lng! 
                } 
              },
              startDate : data.dates?.[0],
              endDate : data.dates?.[1] ,
              from: {
                 name: data.from?.name! ,
                 address: data.from?.address! ,
                 placeId: data.from?.placeId! ,
                 location: {
                   lat: data.from?.location.lat! ,
                   lng: data.from?.location.lng! 
                   } 
              },
              to: {
                 name: data.to?.name! ,
                 address: data.to?.address! ,
                 placeId: data.to?.placeId! ,
                 location: {
                   lat: data.to?.location.lat! ,
                   lng: data.to?.location.lng! 
                   } 
              },
              transportType: data.transportType,
              departureDate: data.departureDate,
              departureTime: data.departureTime
          });
    }
    