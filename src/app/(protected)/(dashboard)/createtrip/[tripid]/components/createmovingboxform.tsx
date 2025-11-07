"use client";

import { useState } from "react";
import { z, ZodError } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DatePickerExample from "./locationinput/datepicker";
import PlaceSearchWrapper from "./locationinput/locationinput";
import TransportDropdown from "./transportdropdown";
import { InputParseError } from "../../../../../../../backend/entities/errors/common";
import { createPoint } from "../action";

// --------------------
// ✅ Zod Schema
// --------------------
export const formSchema = z.object({
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
    .refine((val) => val !== null, { message: "You must select a starting place" }),

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
    .refine((val) => val !== null, { message: "You must select a destination" }),

  transportType: z
    .string()
    .min(1, { message: "You must select a transport type" }),

  departureDate: z
    .date({ required_error: "You must select a departure date" })
    .nullable()
    .refine((val) => val !== null, { message: "You must select a departure date" }),

  departureTime: z
    .date({ required_error: "You must select a departure time" })
    .nullable()
    .refine((val) => val !== null, { message: "You must select a departure time" }),
});

// --------------------
// ✅ Component
// --------------------
const Createmovingboxform = () => {
  const [fromPlace, setFromPlace] = useState<{
    name: string;
    location: { lat: number; lng: number };
  } | null>(null);

  const [toPlace, setToPlace] = useState<{
    name: string;
    location: { lat: number; lng: number };
  } | null>(null);

  const [transportType, setTransportType] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [departureTime, setDepartureTime] = useState<Date | null>(null);

  const [generalError, setGeneralError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // --------------------
  // ✅ Submit Handler
  // --------------------
  const onSubmit = async () => {
    try {
      const validation = formSchema.safeParse({
        from: fromPlace,
        to: toPlace,
        transportType,
        departureDate,
        departureTime,
      });

      if (!validation.success) {
        setGeneralError("⚠️ Please fill all fields correctly.");
        return;
      }

      console.log("✅ Validated Moving Box Data:", validation.data);
      const formData = new FormData();
      formData.append("tripId", 'cmdyi5gpi0001ky0486uxkn2q');
      formData.append("role", 'MOVING_BOX');
      formData.append("index", '1');
      formData.append("fromName", validation.data.from.name);
      formData.append("fromId", validation.data.from.placeId!);
      formData.append("fromAddress", validation.data.from.address!);
      formData.append("fromLat", validation.data.from.location.lat.toString());
      formData.append("fromLng", validation.data.from.location.lng.toString());
      formData.append("toName", validation.data.to.name);
      formData.append("toId", validation.data.to.placeId!);
      formData.append("toAddress", validation.data.to.address!);
      formData.append("toLat", validation.data.to.location.lat.toString());
      formData.append("toLng", validation.data.to.location.lng.toString());
      formData.append("transportType", validation.data.transportType);
      formData.append("departureDate", validation.data.departureDate.toISOString());
      formData.append("departureTime", validation.data.departureTime.toISOString());

      await createPoint(formData);

      // TODO: send to backend
        

      setGeneralError("");
    } catch (err) {
      if (err instanceof InputParseError && err.cause instanceof ZodError) {
        setGeneralError("⚠️ Invalid input. Please try again.");
      } else {
        console.error("Unexpected error:", err);
        setGeneralError("⚠️ Something went wrong. Please try again.");
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
      className="w-full m-1"
    >
      <p className="leading-7  [&:not(:first-child)]:mt-6 text-gray-600 text-xs md:text-sm pb-1 450:whitespace-nowrap ">
        The moving box represents your journey between places.
      </p>

      {/* FROM */}
      <Label className=" " >From</Label>
      <PlaceSearchWrapper
        onPlaceSelected={(place) => setFromPlace(place)}
        onMovingbox={true}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}
      />

      {/* TO */}
      <Label>To</Label>
      <PlaceSearchWrapper
        onPlaceSelected={(place) => setToPlace(place)}
        onMovingbox={true}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}
      />

      {/* TRANSPORT */}
      <Label>By</Label>
      <div>
        <TransportDropdown
          value={transportType}
          onChange={(value) => setTransportType(value)}
        />
      </div>

      {/* DEPARTURE DATE */}
      <Label>Departure Date</Label>
      <div className="relative">
        <DatePickerExample
          onChange={(value) => {
            if (Array.isArray(value)) {
              setDepartureDate(value[0] ?? null);
            } else {
              setDepartureDate(value as Date);
            }
          }}
        />
      </div>

      {/* DEPARTURE TIME */}
      <Label>Departure Time</Label>
      <DatePickerExample
        onlyTime
        onChange={(value) => {
          if (Array.isArray(value)) {
            setDepartureTime(value[0] ?? null);
          } else {
            setDepartureTime(value as Date);
          }
        }}
      />

      {/* GLOBAL ERROR MESSAGE */}
      {generalError && (
        <p className="text-red-500 text-sm  text-center ">{generalError}</p>
      )}

      {/* SUBMIT BUTTON */}
      <div className="h-10 flex justify-center items-end ">
        <Button type="submit" disabled={isLoading} className="ml-4">
          {isLoading ? "Creating..." : "Create moving circle"}
        </Button>
      </div>
    </form>
  );
};

export default Createmovingboxform;
