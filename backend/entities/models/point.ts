import { z } from 'zod';

export const selectPointSchema = z.object({
  id: z.string(),      //must
  tripId: z.string(),  //must
  role: z.enum(["POINT", "MOVING_BOX"]),   //must
  index: z.number(),    //must

  //only for point

  place: z
    .object({
      name: z.string().min(1, "You must enter a place"),
      address: z.string(),
      placeId: z.string(),
      location: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
    })
    .nullable()
    .refine((val) => val !== null, { message: "You must select a place" })
    .optional(),

    startDate: z.date({ required_error: "You must select a start date" }).optional(),
    endDate: z.date({ required_error: "You must select an end date" }).optional(),
  //only for momving box

   from: z
    .object({
      name: z.string().min(1, "You must select a starting place"),
      address: z.string(),
      placeId: z.string(),
      location: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
    })
    .nullable()
    .refine((val) => val !== null, { message: "You must select a starting place" })
    .optional(),

  to: z
    .object({
      name: z.string().min(1, "You must select a destination"),
      address: z.string(),
      placeId: z.string(),
      location: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
    })
    .nullable()
    .refine((val) => val !== null, { message: "You must select a destination" })
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

  notes: z
     .string().nullable().optional(),
});

export type Point = z.infer<typeof selectPointSchema>;


export const insertCreatePointSchema = selectPointSchema.pick({
 tripId : true,
 role: true ,
 index: true,
 place: true ,
 startDate: true ,
 endDate: true ,
 from: true ,
 to: true ,
 transportType : true ,
 departureDate : true ,
 notes : true ,
});

export type PointInsert = z.infer<typeof insertCreatePointSchema>;