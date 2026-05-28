"use client";

import { useState } from "react";
import { z, ZodError } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DatePickerExample from "./locationinput/datepicker";
import PlaceSearchWrapper from "./locationinput/locationinput";
import { InputParseError } from "../../../../../../../backend/entities/errors/common";
import { createPoint } from "../action";

// --------------------
// ✅ Zod Schema
// --------------------
export const formSchema = z.object({
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
    .refine((val) => val !== null, { message: "You must select a place" }),

  dates: z
    .array(z.date({ required_error: "You must select valid dates" }))
    .length(2, { message: "You must select dates" })
    .refine(([start, end]) => end >= start, {
      message: "End date cannot be before start date",
    }),

});

// --------------------
// ✅ Component
// --------------------
type props = {
  index : number
  tripId : string
  minDate?: Date
  onSubmitSuccess?: () => void;
}

const Createplaceform = (props : props) => {
  const [selectedPlace, setSelectedPlace] = useState<{
    name: string;
    address: string;
    placeId: string;
    location: { lat: number; lng: number };
  } | null>(null);

  // Type-safe date range
  const [dateRange, setDateRange] = useState<[Date | null, Date | null] | null>(
    null
  );

  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);

  const [generalError, setGeneralError] = useState<string>("");

  // --------------------
  // ✅ Submit Handler
  // --------------------
  const onSubmit = async () => {
    const dates =
      Array.isArray(dateRange) && dateRange[0] && dateRange[1]
        ? [dateRange[0], dateRange[1]]
        : [];

    try {

      if(props.index === 10){
           setGeneralError('Maximum limit reached.')
           return
      }

      const validation = formSchema.safeParse({
        place: selectedPlace,
        dates,
      });

      if (!validation.success) {
        const errors = validation.error.flatten().fieldErrors;

        setErrorMessages({
          place: errors.place?.[0] || "",
          dates: errors.dates?.[0] || "",
        });
        return;
      }

      console.log("✅ Validated data:", validation.data);
      console.log("✅ Index:",`${props.index}`);
       const formData = new FormData();
      formData.append("tripId", `${props.tripId}`);
      formData.append("role", 'POINT');
      formData.append("index", `${props.index}`);
      formData.append("PlaceName", validation.data.place.name);
      formData.append("PlaceId", validation.data.place.placeId!);
      formData.append("PlaceAddress", validation.data.place.address!);
      formData.append("PlaceLat", validation.data.place.location.lat.toString());
      formData.append("PlaceLng", validation.data.place.location.lng.toString());
      formData.append("startDate", validation.data.dates?.[0].toLocaleDateString("en-CA"));
      formData.append("endDate", validation.data.dates?.[1].toLocaleDateString("en-CA"));

      // TODO: send data to backend here
      await createPoint(formData);

      setErrorMessages({});
      if (props.onSubmitSuccess) props.onSubmitSuccess();
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

  // --------------------
  // ✅ Render
  // --------------------
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await onSubmit();
      }}
      className="w-full m-1 text-white/90"
    >
      <p className="text-white/60 text-sm pb-5">
        Destination represents a city, town, or village you will stay.
      </p>

      {/* PLACE */}
      <Label>Place</Label>
      <PlaceSearchWrapper
        onPlaceSelected={(place) => setSelectedPlace(place)}
        onMovingbox={false}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}
      />
      {errorMessages.place && (
        <p className="text-red-500 text-sm mt-1">{errorMessages.place}</p>
      )}

      {/* DATES */}
      <Label>Dates</Label>
      <div className="rounded-sm z-50">
        <DatePickerExample
          isRange
          onChange={(value) => {
            if (Array.isArray(value)) {
              setDateRange(value as [Date | null, Date | null]);
            } else {
              setDateRange([value as Date, null]);
            }
          }}
          namePrefix="booking"
          minDate={props.minDate}
        />
      </div>
      {errorMessages.dates && (
        <p className="text-red-500 text-sm mt-1">{errorMessages.dates}</p>
      )}

    

      {/* SUBMIT BUTTON */}
      <div className="h-14 flex flex-col justify-center items-center">
          {generalError && (
              <p className="text-red-500 text-sm mt-4 text-center ">{generalError}</p>
           )}
        <Button type="submit" disabled={isLoading}       
           className='bg-[#0356BC] hover:bg-[#0466D9] text-white border border-white/10 shadow-lg shadow-blue-950/40 px-4 py-2 ml-4 rounded-xl font-medium transition-all duration-200 active:scale-[0.98]'>
          {isLoading ? "Creating..." : "Create destination"}
        </Button>
      </div>
    </form>
  );
};

export default Createplaceform;
