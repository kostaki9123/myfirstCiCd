import React, { useState } from "react";
import { IoStar } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  TbSquareRoundedNumber1Filled,
  TbSquareRoundedNumber2Filled,
  TbSquareRoundedNumber3Filled,
  TbSquareRoundedNumber4Filled,
  TbSquareRoundedNumber5Filled,
  TbSquareRoundedNumber6Filled,
  TbSquareRoundedNumber7Filled,
  TbSquareRoundedNumber8Filled,
  TbSquareRoundedNumber9Filled,
} from "react-icons/tb";



const numbersiconArr = [
  <TbSquareRoundedNumber1Filled />,
  <TbSquareRoundedNumber2Filled />,
  <TbSquareRoundedNumber3Filled />,
  <TbSquareRoundedNumber4Filled />,
  <TbSquareRoundedNumber5Filled />,
  <TbSquareRoundedNumber6Filled />,
  <TbSquareRoundedNumber7Filled />,
  <TbSquareRoundedNumber8Filled />,
  <TbSquareRoundedNumber9Filled />,
];

type Props = {
  placeId : string 
  pointId : string
  index: number;
  rating: number;
  displayName: string;
  type: string;
  latitude?: number;
  longitude?: number;
  description: string;
  address: string;
  link?: string;
  alreadyAdded : boolean
  tripId : string
};

import { z, ZodError } from 'zod';
import { InputParseError } from "../../../../../../../backend/entities/errors/common";
import { createPlace } from "../action";

/** Match your Prisma enum */
export const PlaceTypeEnum = z.enum([
  'ACCOMMODATION',
  'PLACE_TO_VISIT',
]);

export const formSchema = z.object({

  id : z.string() ,

  pointId: z.string() ,
 
  placeType: PlaceTypeEnum,

  name: z.string().min(1, 'Name is required'),

  stayFrom: z.coerce.date().optional(),
  stayUntil: z.coerce.date().optional(),

  cost: z.coerce.number().positive().optional(),

  notes: z.string().optional(),

  visitDate: z.coerce.date().optional(),
  visitTime: z.coerce.date().optional(),
});


const Placecomponent = (props: Props) => {
     const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>(
       {}
     );
     const [isLoading, setIsLoading] = useState(false);
   

    const addPlace = async () => {
              console.log("✅ create btn pressed id", props.placeId );

      try {
        const validation = formSchema.safeParse({
          id: props.placeId,
          pointId : props.pointId,    
          placeType: props.type,
          name:  props.displayName,  
        });
  
        if (!validation.success) {
          const errors = validation.error.flatten().fieldErrors;
  
          setErrorMessages({
             id: errors.id?.[0] || "",
             pointId : errors.id?.[0] || "",
             placeType: errors.id?.[0] || "",
             name: errors.id?.[0] || ""
          });
          console.log('error in frontend:',errors);
          return;
        }
  
        console.log("✅ Validated data:chat", validation.data);
        
         const formData = new FormData();
        formData.append("id", `${props.placeId}`);
        formData.append("pointId", `${props.pointId}`);
        formData.append("placeType", `${props.type}`);
        formData.append("name", `${props.displayName}` );
        formData.append("tripId", `${props.tripId}` );
        
        //TODO: send data to backend here
          await createPlace(formData);
  
         setErrorMessages({});
      } catch (err) {
        if (err instanceof InputParseError && err.cause instanceof ZodError) {
          const flattened = err.cause.flatten();
          setErrorMessages({
            general: flattened.formErrors?.[0] || "Input parsing failed",
          });
        } else {
          console.error("Unexpected error:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };
  


  return (
    <div className="flex flex-col items-center shadow-lg rounded-md bg-white p-4 w-full relative">
      {/* Display Name */}
       <div className="absolute top-4 left-7 text-3xl text-blue-600  ">
            {numbersiconArr[props.index]}
        </div>
      <h4 className="text-lg font-semibold tracking-tight text-center break-words pb-2 border-b border-gray-200 pl-12 pr-2 w-full">
              {props.displayName || "Unknown Place"}
      </h4>

      {/* Rating, Type, and Address */}
      <div className="flex flex-col sm:flex-row sm:justify-between w-full mt-4 px-2 gap-2">
        {/* Rating */}
        <div className="flex items-center gap-2">
          <IoStar color="gold" size={20} title="Rating" />
          <p className="font-medium text-gray-700">{props.rating || "N/A"}</p>
        </div>

        {/* Type */}
        <p className="text-gray-600 text-sm">{props.type || "Type not specified"}</p>

        {/* Address */}
        {props.address && (
          <p className="text-gray-600 text-sm break-words">{props.address}</p>
        )}
      </div>

      {/* Description */}
      {props.description && (
        <p className="text-sm text-gray-500 mt-2 px-2 line-clamp-3 text-center sm:text-left">
          {props.description}
        </p>
      )}

      {/* Buttons */}
      <div className="mt-4 flex gap-3 flex-wrap justify-center sm:justify-end w-full">
        <Link href={props.link || "#"} className="w-full sm:w-auto">
          <Button
            className="bg-blue-600  text-white hover:bg-blue-700 active:bg-blue-800 transition duration-200 ease-in-out h-8 px-4 text-sm rounded w-full sm:w-auto"
            aria-label="View details"
          >
            View
          </Button>
        </Link>
        <Button
           className={`h-8 px-4 text-sm rounded w-full sm:w-auto transition duration-200 ease-in-out
             ${props.alreadyAdded 
               ? "bg-gray-400 text-white cursor-not-allowed" // disabled style
               : "bg-green-600 text-white hover:bg-green-700 active:bg-green-800" // active style
             }`}
          onClick={addPlace}
        >
          {props.alreadyAdded ? "Added" : "Add"}
        </Button>
      </div>
    </div>
  );
};

export default Placecomponent;
