"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import { MdHotel } from "react-icons/md";
import { getPlaces } from "@/app/(protected)/(dashboard)/itinerary/[tripid]/action";

type Place = {
  id: string;
  pointId: string;
  placeType: "ACCOMMODATION" | "PLACE_TO_VISIT";
  name: string;
  internalId?: string;
  stayFrom?: Date | null;
  stayUntil?: Date | null;
  cost?: number | null;
  notes?: string | null;
  visitDate?: Date | null;
  visitTime?: Date | null;
};

type Props = {
  pointId: string;
  tripId:string 
};

const ActionRow = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} className="w-full">
    <div className="w-full  bg-white/10
            rounded-md p-2  cursor-pointer group  ">
       <div className="text-white/70 hover:text-white flex items-center gap-3 ">    
          <div className="w-12 h-12 flex items-center justify-center rounded-md ">
            <IoMdAdd size={20} />
          </div>
          <p className="font-medium  ">
            {label}
          </p>
      </div>   
    </div>
  </Link>
);

const formatDate = (d?: Date | null) =>
  d
    ? new Date(d).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      })
    : "--";

const formatTime = (d?: Date | null) =>
  d
    ? new Date(d).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--";

const ViewPlaceModal = ({ pointId , tripId }: Props) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  /* 🔹 FETCH ON MOUNT */
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPlaces(pointId);

        // ensure Date objects
        setPlaces(
          data.map((p: Place) => ({
            ...p,
            stayFrom: p.stayFrom ? new Date(p.stayFrom) : null,
            stayUntil: p.stayUntil ? new Date(p.stayUntil) : null,
            visitDate: p.visitDate ? new Date(p.visitDate) : null,
            visitTime: p.visitTime ? new Date(p.visitTime) : null,
          }))
        );
         setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [pointId]);

  const accommodations = places.filter(
    (p) => p.placeType === "ACCOMMODATION"
  );

  const placesToVisit = places.filter(
    (p) => p.placeType === "PLACE_TO_VISIT"
  );

if (loading) {
  return (
    <div className="pl-0 flex flex-col 820:flex-row gap-6 w-full p-4 overflow-hidden">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="w-full sm:w-[250px] min-h-[13rem] rounded-lg   p-4 animate-pulse"
        >
          <div className="h-4 bg-white/10 rounded w-1/2 mx-auto mb-4" />

          <div className="space-y-3">
            {[1].map((j) => (
              <div
                key={j}
                className="flex items-center gap-3 bg-white/10 rounded-md p-2"
              >
                <div className="w-12 h-12 bg-white/10rounded-md" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-white/10 rounded w-3/4" />
                  <div className="h-2 bg-white/10 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


  return (
    <div className="pl-0 flex flex-col 820:flex-row gap-6 max-h-[375px] items-start justify-start w-full overflow-x-auto overflow-y-auto p-4 ">
      {/* ---------------- ACCOMMODATION ---------------- */}
      <div className="flex-shrink-0 relative flex flex-col    overflow-auto gap-2 min-h-[13rem] w-full sm:w-[250px] rounded-lg p-4">
        <h4 className="text-base font-semibold text-center mb-2">
          Accommodation
        </h4>

        {accommodations.length === 0 ? (
          <ActionRow href={`/itinerary/${tripId}`} label="Add Accommodation" />
        ) : (
         
          <div className="flex flex-col gap-3 w-full  ">
            {accommodations.map((acc) => (
            <Link href={`/itinerary/${tripId}`}>
              <div
                key={acc.id}
                className="flex items-center gap-3 bg-white/10  rounded-md p-2 "
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-md ">
                  <MdHotel />
                </div>

                <div className="flex flex-col">
                  <div className="max-w-[141px]">
                       <p className="font-medium text-white/90 line-clamp-2">
                         {acc.name}
                       </p>
                  </div>

                  <p className="text-xs text-gray-500">
                    {formatDate(acc.stayFrom)} → {formatDate(acc.stayUntil)}
                  </p>
                  {acc.notes && (
                    <p className="text-xs text-white/60 line-clamp-2">
                      {acc.notes}
                    </p>
                  )}
                </div>
              </div>
           </Link>
            ))}
               

            <ActionRow href={`/itinerary/${tripId}`} label="Change Accommodation" />
          </div>
        )}
      </div>

      {/* ---------------- PLACES ---------------- */}
      <div className="flex-shrink-0 x flex flex-col gap-2 overflow-auto min-h-[13rem] w-full sm:w-[250px] rounded-lg  p-4">
        <h4 className="text-base font-semibold text-center mb-2">
          Places to visit
        </h4>

        {placesToVisit.length === 0 ? (
          <ActionRow href={`/itinerary/${tripId}`} label="Add Place" />
        ) : (
          <div className="flex flex-col gap-3 w-full ">
            {placesToVisit.map((place) => (
            <Link href={`/itinerary/${tripId}`}>
              <div
                key={place.id}
                className="flex items-center gap-3 bg-white/10  rounded-md p-2 "
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-md text-white/60">
                  📍
                </div>

                <div className="flex flex-col">
                 <div className="max-w-[141px]">
                    <p className="font-medium text-white/90 line-clamp-2">
                      {place.name}
                    </p>
                 </div>



                  <p className=" text-xs text-gray-500">
                    {formatDate(place.visitDate)} · {place.visitTime && place.visitTime.toLocaleTimeString('en-GB', {
                                       hour: '2-digit',
                                       minute: '2-digit',
                                       hour12: false ,
                                       timeZone: 'UTC'
                                     })}
                  </p>
                </div>
              </div>
            </Link> 
            ))}

            <ActionRow href={`/itinerary/${tripId}`} label="Add Place" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPlaceModal;
