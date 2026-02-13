import React, { useState } from "react";
import { IoStar } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { z, ZodError } from "zod";
import { InputParseError } from "../../../../../../../backend/entities/errors/common";
import { createPlace } from "../action";

/* -------------------- TYPES -------------------- */

type Props = {
  placeId: string;
  pointId: string;
  index: number;
  rating: number;
  displayName: string;
  type: string;
  latitude?: number;
  longitude?: number;
  description: string;
  address: string;
  link?: string;
  alreadyAdded: boolean;
  tripId: string;
  priceLabel: string;
  hasExactPrice: boolean;
};

export const PlaceTypeEnum = z.enum([
  "ACCOMMODATION",
  "PLACE_TO_VISIT",
]);

export const formSchema = z.object({
  id: z.string(),
  pointId: z.string(),
  placeType: PlaceTypeEnum,
  name: z.string().min(1, "Name is required"),
});

/* -------------------- COMPONENT -------------------- */

const Placecomponent = (props: Props) => {
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const addPlace = async () => {
    try {
      setIsLoading(true);

      const validation = formSchema.safeParse({
        id: props.placeId,
        pointId: props.pointId,
        placeType: props.type,
        name: props.displayName,
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
      formData.append("name", props.displayName);
      formData.append("tripId", props.tripId);

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
    <div className="relative flex flex-col bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 p-4 w-full">

      {/* Ranking Icon — dynamically handle 1,2,…10+ */}
      <div className="absolute top-4 left-4 w-7 h-7 flex items-center justify-center bg-blue-600 text-white text-sm font-semibold rounded">
        {props.index + 1}
      </div>

      {/* Title */}
      <h4 className="text-lg font-semibold pl-12 pr-2 border-b pb-2">
        {props.displayName || "Unknown Place"}
      </h4>

      {/* Rating + Type */}
      <div className="flex justify-between items-center mt-3 text-sm">
        <div className="flex items-center gap-2">
          <IoStar color="gold" size={18} />
          <span className="font-medium">
            {props.rating ? props.rating.toFixed(1) : "N/A"}
          </span>
        </div>

        <span className="text-gray-500 text-xs tracking-wide">
          {props.type.replace("_", " ")}
        </span>
      </div>

      {/* Address */}
      {props.address && (
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {props.address}
        </p>
      )}

      {/* Description / AI Reason */}
      {props.description && (
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {props.description}
        </p>
      )}

      {/* Price Section */}
      <div className="flex items-center justify-between mt-4">
        <div>
          <div className="text-base font-semibold text-gray-900">
            {props.priceLabel}
          </div>

          {props.hasExactPrice && (
            <div className="text-[10px] text-gray-400">
              Estimated per night
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-3">
        <Link href={props.link || "#"} className="flex-1">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-9 text-sm rounded-md"
          >
            View
          </Button>
        </Link>

        <Button
          disabled={props.alreadyAdded || isLoading}
          onClick={addPlace}
          className={`flex-1 h-9 text-sm rounded-md transition
            ${
              props.alreadyAdded
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
        >
          {props.alreadyAdded ? "Added" : isLoading ? "Adding..." : "Add"}
        </Button>
      </div>

      {errorMessages.general && (
        <p className="text-xs text-red-500 mt-2">
          {errorMessages.general}
        </p>
      )}
    </div>
  );
};

export default Placecomponent;
