
import React from "react";
import Link from "next/link";
import { getPlaces } from "../../../itinerary/[tripid]/action";
import { Place } from "../../../../../../../backend/entities/models/place";
import Accomodationplace from "./accomodationplace";
import Visitplace from "./visitplace";
import { BedDouble, MapPin, Plus } from "lucide-react";

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

const formatDate = (date: Date | string | null | undefined) => {
  if (!date) return null;

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return null;

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const Placeui = async (props: Props) => {
  // Fetch all places for this destination
  const data: Place[] = (await getPlaces(props.id)).sort(
    (a, b) => {
      const priority = (place: Place) => {
        if (place.placeType === "ACCOMMODATION") return 0;
        if (place.placeType === "PLACE_TO_VISIT") return 1;
        return 2;
      };

      const priorityDifference = priority(a) - priority(b);

      if (priorityDifference !== 0) {
        return priorityDifference;
      }

      const dateA =
        a.placeType === "ACCOMMODATION"
          ? a.stayFrom
          : a.visitDate;

      const dateB =
        b.placeType === "ACCOMMODATION"
          ? b.stayFrom
          : b.visitDate;

      const timeA = dateA
        ? new Date(dateA).getTime()
        : null;

      const timeB = dateB
        ? new Date(dateB).getTime()
        : null;

      if (timeA === null && timeB === null) return 0;
      if (timeA === null) return 1;
      if (timeB === null) return -1;

      return timeA - timeB;
    }
  );

  const accommodations = data.filter(
    (place) => place.placeType === "ACCOMMODATION"
  );

  const placesToVisit = data.filter(
    (place) => place.placeType === "PLACE_TO_VISIT"
  );

  const start = formatDate(props.startDate);
  const end = formatDate(props.endDate);

  const itineraryUrl =
    `/itinerary/${props.tripId}?point=${props.id}`;

  return (
    <div className="w-full min-w-0">
      {/* Destination heading */}
      <header className="mb-4 flex min-w-0 flex-wrap items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-blue-800/70 bg-gradient-to-br from-blue-800/60 to-[#071638] sm:h-16 sm:w-16">
          <MapPin className="h-7 w-7 text-blue-400" />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="break-words text-xl font-bold tracking-tight text-white sm:text-2xl">
            {props.placeName || "Destination"}
          </h2>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-400">
            {start || end ? (
              <span>
                {start || "Date not set"}
                {end ? ` – ${end}` : ""}
              </span>
            ) : (
              <span>Travel dates not set</span>
            )}
          </div>
        </div>

        <Link
          href={itineraryUrl}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-blue-700/80 bg-blue-600/10 px-3 py-2 text-xs font-medium text-blue-300 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white sm:text-sm"
        >
          <Plus className="h-4 w-4" />
          Add item
        </Link>
      </header>

      {/* Accommodation and places to visit */}
      <div className="grid min-w-0 grid-cols-1 items-start gap-4 xl:grid-cols-2">
        {/* Accommodation column */}
        <section className="min-w-0 rounded-xl  ">
         

          <div className="space-y-3">
            {accommodations.length > 0 ? (
              accommodations.map((place) => (
                <Accomodationplace
                  key={place.id}
                  internalId={String(place.id)}
                  notes={place.notes}
                  name={place.name}
                  stayFrom={place.stayFrom!}
                  stayUntil={place.stayUntil!}
                  pointId={props.id}
                  googleMapLink={place.googleMapLink}
                  paymentStatus={place.paymentStatus}
                  tripId={props.tripId}
                />
              ))
            ) : (
              <Link
                href={itineraryUrl}
                className="flex lex min-h-[185px] flex-col items-center justify-center rounded-lg border border-dashed border-blue-900/80 px-4 py-6 text-center transition hover:border-blue-500 hover:bg-blue-950/30"
              >
                <BedDouble className="mb-3 h-6 w-6 text-blue-400" />

                <span className="text-sm font-medium text-slate-200">
                  Add accommodation
                </span>

                <span className="mt-1 text-xs text-slate-500">
                  Choose where to stay
                </span>
              </Link>
            )}
          </div>
        </section>

        {/* Places to visit column */}
        <section className="min-w-0 rounded-xl  ">
          

          <div className="space-y-3">
            {placesToVisit.length > 0 ? (
              placesToVisit.map((place) => (
                <Visitplace
                  key={place.id}
                  internalId={String(place.id)}
                  notes={place.notes}
                  name={place.name}
                  visitTime={place.visitTime!}
                  visitdate={place.visitDate!}
                  pointId={props.id}
                  googleMapLink={place.googleMapLink}
                  paymentStatus={place.paymentStatus}
                  tripId={props.tripId}
                  
                />
              ))
            ) : (
              <Link
                href={itineraryUrl}
                className="flex min-h-[185px]  flex-col items-center justify-center rounded-lg border border-dashed border-blue-900/80 px-4 py-6 text-center transition hover:border-blue-500 hover:bg-blue-950/30"
              >
                <MapPin className="mb-3 h-6 w-6 text-blue-400" />

                <span className="text-sm font-medium text-slate-200">
                  Add places to visit
                </span>

                <span className="mt-1 text-xs text-slate-500">
                  Discover attractions and activities
                </span>
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Placeui;
