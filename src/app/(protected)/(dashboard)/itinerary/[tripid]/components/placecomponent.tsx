import React, { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { z, ZodError } from "zod";
import { InputParseError } from "../../../../../../../backend/entities/errors/common";
import { createPlace } from "../action";
import Image from "next/image";


type Props = {
  placeId: string;
  pointId: string;
  index: number;
  rating: number;
  displayName: string;
  type: string;
  latitude: number;
  longitude: number;
  description: string;
  address: string;
  alreadyAdded: boolean;
  tripId: string;
  priceLabel: string;
  Priceperday: number;
  googleMapsUri: string;
  category: string;
  affiliatelink:string
  photoreference? : string
  LocationComments : string
};

export const PlaceTypeEnum = z.enum([
  "ACCOMMODATION",
  "PLACE_TO_VISIT",
]);

export const formSchemaPlace = z.object({
  id: z.string(),
  pointId: z.string(),
  placeType: PlaceTypeEnum,
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  name: z.string().min(1, "Name is required"),
});

/* -------------------- COMPONENT -------------------- */

const Placecomponent = (props: Props) => {
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>({});
  const [justAdded, setJustAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  
 useEffect(() => {
      setIsMobile(isMobileDevice());
  }, []);

// detect mobile safely
const isMobileDevice = () => {
  if (typeof window === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i.test(
    navigator.userAgent
  );
};

// extract place_id
const extractPlaceId = (url?: string | null) => {
  if (!url) return null;

  const match =
    url.match(/place_id:([A-Za-z0-9_-]+)/) ||
    url.match(/[?&]q=place_id:([A-Za-z0-9_-]+)/);

  return match?.[1] ?? null;
};

 const placeId = extractPlaceId(props.googleMapsUri);

  // FINAL URL LOGIC (BEST RELIABILITY)
  const googleLink = (() => {
    if (!props.googleMapsUri) return null;

    // If we have place_id → use strongest universal format
    if (placeId) {
      return `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${placeId}`;
    }

    // fallback
    return props.googleMapsUri;
  })();



  const addPlace = async () => {
    try {
      setIsLoading(true);

      const validation = formSchemaPlace.safeParse({
        id: props.placeId,
        pointId: props.pointId,
        placeType: props.type,
        name: props.displayName,
        latitude: props.latitude,
        longitude: props.longitude,
      });
      
      if (!validation.success) {
        const errors = validation.error.flatten().fieldErrors;

        setErrorMessages({
          id: errors.id?.[0] || "",
          pointId: errors.pointId?.[0] || "",
          placeType: errors.placeType?.[0] || "",
          name: errors.name?.[0] || "",
        });
        return;
      }

      const formData = new FormData();
      formData.append("id", props.placeId);
      formData.append("pointId", props.pointId);
      formData.append("placeType", props.type);
      formData.append(
       "latitude",
          props.latitude.toString() ?? ""
         );

      formData.append(
       "longitude",
         props.longitude.toString() ?? ""
         );
      formData.append("name", props.displayName);
      formData.append("tripId", props.tripId);
      formData.append("googleMapsUri", props.googleMapsUri);
      formData.append("affiliatelink", props.affiliatelink);

      await createPlace(formData);
      setJustAdded(true);
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


  const isAdded = props.alreadyAdded || justAdded;

  return (
   <div className="relative flex flex-col sm:max-w-xl bg-white/10 rounded-xl shadow-md hover:shadow-lg transition duration-200 p-4 ">

  {/* TOP SECTION */}
  <div className="flex flex-col sm:flex-row gap-3">

    {/* IMAGE */}
    {props.photoreference &&
    <div className="w-full sm:w-[160px] h-[140px] sm:h-[120px] flex-shrink-0">
      <Image
        src={props.photoreference}
        alt={props.displayName}
        width={200}
        height={150}
        loading={props.index < 4 ? "eager" : "lazy"}
        priority={props.index < 2}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
    }
    {/* CONTENT */}
    <div className="relative flex flex-col flex-1 min-w-0 p-1">

      {/* Ranking */}
      <div className="absolute left-1 top-1 w-6 h-6 flex items-center justify-center bg-[#40E0D0] text-white text-xs font-medium rounded">
        {props.index + 1}
      </div>

      {/* Title */}
      <h4
        title={props.displayName}
        className="text-base sm:text-lg font-semibold pl-8 pr-2 border-b pb-1 sm:truncate"
      >
        {props.displayName || "Unknown Place"}
      </h4>

      {/* Distance + Rating */}
      <div className="flex justify-between items-center mt-2 text-sm">
        <div className="flex flex-col">
             <p className="text-white/90">{props.category ? props.category : props.type === 'PLACE_TO_VISIT' ? 'attraction' : 'lodging'}</p>
             {props.LocationComments &&
              <p className="text-xs text-white/70 line-clamp-3 ">
                {props.LocationComments}
              </p> 
             }
             {props.description &&
              <p className="text-xs text-gray-500 line-clamp-3 ">
                {props.description}
              </p> 
             }
        </div>
        <div className="flex items-center gap-1">
          <IoStar className="text-yellow-500" size={14} />
          <span className="font-medium text-white/90 text-sm">
            {props.rating ? props.rating.toFixed(1) : "N/A"}
          </span>
         </div>
      </div>

      {/* Price */}
      {props.Priceperday > 0  &&
       <div className="mt-2 flex justify-between items-end"> 
           <div>
              <div className="text-sm font-semibold text-white/90"> {props.Priceperday}$
                 {props.type === 'ACCOMMODATION' &&
                 <span className="text-xs font-normal text-white/60">/ night</span>
                  }
                </div> 
              <div className="text-[10px] text-white/60"> estimated price </div> 
           </div>
      </div>
      }
   </div>
  </div>
  {/* BUTTONS */}
  <div className="mt-4 flex gap-2">
    <Button
      disabled={isAdded || isLoading}
      onClick={addPlace}
      className={`flex-1 h-9 text-sm rounded-md ${
        isAdded
          ? "bg-gray-300 text-gray-600"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}
    >
      {isAdded ? "Added" : isLoading ? "Adding..." : "Add"}
    </Button>

    <a href={props.affiliatelink ? props.affiliatelink : googleLink!} target="_blank" className="flex-1">
      <Button
        variant="outline"
        className="w-full text-black h-9 text-sm"
      >
        View
      </Button>
    </a>
  </div>

  {/* ERROR */}
  {errorMessages.general && (
    <p className="text-xs text-red-500 mt-2">
      {errorMessages.general}
    </p>
  )}
</div>
  );
};

export default Placecomponent;
         