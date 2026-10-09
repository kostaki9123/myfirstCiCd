import React from "react";
import { getPlaces } from "../../../itinerary/[tripid]/action";
import { Place } from "../../../../../../../backend/entities/models/place";
import Accomodationplace from "./accomodationplace";
import Visitplace from "./visitplace";

type Props = {
  id: string;
  index: number;
  placeName: string;
  placeAddress?: string;
  placeId?: string;
  placeLat?: number;
  placeLng?: number;
  startDate: Date | null;
  endDate: Date | null;
  tripId: string;
};

const Placeui = async (props: Props) => {
  // --------------------------------------------------
  // Safely format dates
  // --------------------------------------------------

  const start = props.startDate
    ? props.startDate.toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
      })
    : null;

  const end = props.endDate
    ? props.endDate.toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
      })
    : null;

  // --------------------------------------------------
  // Get places
  // --------------------------------------------------

  let data: Place[] = [];

  data = (await getPlaces(props.id)).sort((a, b) => {
    const priority = (p: Place) => {
      if (p.placeType === "ACCOMMODATION") return 0;
      if (p.placeType === "PLACE_TO_VISIT") return 1;
      return 2;
    };

    const getDate = (p: Place) =>
      p.placeType === "ACCOMMODATION"
        ? p.stayFrom
        : p.visitDate;

    const dateA = getDate(a)
      ? new Date(getDate(a)!).getTime()
      : null;

    const dateB = getDate(b)
      ? new Date(getDate(b)!).getTime()
      : null;

    // 1. Type priority
    const pA = priority(a);
    const pB = priority(b);

    if (pA !== pB) {
      return pA - pB;
    }

    // 2. Null dates last
    if (dateA === null && dateB === null) {
      return 0;
    }

    if (dateA === null) {
      return 1;
    }

    if (dateB === null) {
      return -1;
    }

    // 3. Date sorting
    if (dateA !== dateB) {
      return dateA - dateB;
    }

    return 0;
  });

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <div className="relative min-h-32 flex flex-col lg:flex-row gap-3 lg:gap-12 justify-center items-start lg:items-center">

      {/* Date */}
      <div
        className="
          lg:absolute
          top-1
          mt-1
          lg:mt-0
          left-[-6px]
          px-3
          py-1.5
          rounded-md
          bg-gray-700
          text-[11px]
          shadow-lg
          flex
          items-center
          gap-1
        "
      >
        {start && end ? (
          <>
            <div className="uppercase tracking-wide text-gray-200">
              {start.split(" ")[0]}
            </div>

            <div className="font-semibold text-gray-200">
              {start.split(" ")[1]}
            </div>

            <span className="text-gray-200">-</span>

            <div className="uppercase tracking-wide text-gray-200">
              {end.split(" ")[0]}
            </div>

            <div className="font-semibold text-gray-200">
              {end.split(" ")[1]}
            </div>
          </>
        ) : (
          <div className="text-gray-300">
            Date not set
          </div>
        )}
      </div>

      {/* Point name */}
      <div className="relative pl-10 text-white w-40">
        <div className="absolute left-0 top-1.5 w-3 h-3 bg-white rounded-full border-2 border-lime-500" />

        <div className="text-lg font-semibold">
          {props.placeName}
        </div>
      </div>

      {/* Places */}
      <div className="flex flex-col pl-3 lg:pl-0 items-center">
        <div className="flex flex-col 535:flex-row gap-4 w-max">

          {data.length === 0 ? (
            <></>
          ) : (
            data.map((place: Place, key: number) => {
              if (place.placeType === "ACCOMMODATION") {
                return (
                  <Accomodationplace
                    pointId={props.id}
                    tripId={props.tripId}
                    key={key}
                    paymentStatus={place.paymentStatus}
                    internalId={place.internalId!}
                    googleMapLink={place.googleMapLink}
                    notes={place.notes}
                    name={place.name}
                    stayFrom={place.stayFrom!}
                    stayUntil={place.stayUntil!}
                  />
                );
              }

              return (
                <Visitplace
                  key={key}
                  pointId={props.id}
                  tripId={props.tripId}
                  internalId={place.internalId!}
                  paymentStatus={place.paymentStatus}
                  googleMapLink={place.googleMapLink}
                  notes={place.notes}
                  name={place.name}
                  visitdate={place.visitDate!}
                  visitTime={
                    place.visitTime
                      ? place.visitTime
                      : undefined
                  }
                />
              );
            })
          )}

        </div>
      </div>
    </div>
  );
};

export default Placeui;