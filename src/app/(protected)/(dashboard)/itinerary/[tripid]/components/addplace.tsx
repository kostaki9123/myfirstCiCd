"use client"

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BsHouseAddFill } from "react-icons/bs";

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
import Placecomponent from "./placecomponent";

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

type props = {
  latitude: string;
  longitude: string;
  cyrclesArr: any;
  triggerName: string;
  descriptionName: string;
};

const Addaplace = (props: props) => {
  const [placesResult, setPlacesResult] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const url = `https://places.googleapis.com/v1/places:searchNearby`;

        const requestBody = {
          includedTypes: ["hostel"],
          maxResultCount: 9,
          locationRestriction: {
            circle: {
              center: {
                latitude: Number(props.latitude),
                longitude: Number(props.longitude),
              },
              radius: 10000.0,
            },
          },
        };

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAP_API!,
            "X-Goog-FieldMask": "*",
          },
          cache: "no-store",
          body: JSON.stringify(requestBody),
        });

        const result = await response.json();

        if (!response.ok) {
          console.error("Error fetching places:", result.error?.message);
          return;
        }

        setPlacesResult(result.places || []);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    }

    fetchPlaces();
  }, [props.latitude, props.longitude]);

  return (
    <Dialog>
      <DialogTrigger className="bg-gray-400 rounded-md min-w-[260px] h-10 flex items-center justify-start gap-[22%] p-5 cursor-pointer">
        <BsHouseAddFill fontSize="20px" />
        <div className="text-base font-medium">{props.triggerName}</div>
      </DialogTrigger>

      <DialogContent className="h-[480px] w-[90%] sm:w-[70%] min-w-[320px] z-[60] sm:pl-4 mt-6">
        <DialogTitle>{props.triggerName}</DialogTitle>

        <div className="flex gap-2">
          <div className="sm:w-full 950:w-[70%]">
            <div className="text-sm sm:text-md">{props.descriptionName}</div>
            <div className="w-full flex gap-2 flex-col h-[370px] pr-4 overflow-auto">
              {placesResult.map((place: any, index: number) => (
                <div key={index} className="relative">
                  <div className="absolute top-7 left-8 text-3xl text-blue-600">
                    {numbersiconArr[index]}
                  </div>
                  <Placecomponent
                    key={index}
                    longitude={22302493043}
                    latitude={10930202}
                    type={place.primaryTypeDisplayName?.text}
                    rating={place.rating}
                    description="life is wonderful even ..."
                    address="xristou andreou"
                    displayName={place.displayName?.text || "omonoia"}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="border-2 border-yellow-700 hidden 950:flex w-[50%] h-[400px] z-50 cursor-pointer">
            {/* <Mapprovider/> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Addaplace;
