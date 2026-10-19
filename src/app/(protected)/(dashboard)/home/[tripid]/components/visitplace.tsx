
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ChevronRight, CalendarDays, Clock } from "lucide-react";
import { RiExternalLinkLine } from "react-icons/ri";
import Notes from "./placenote";

type Props = {
  internalId: string;
  notes: string | null | undefined;
  name: string;
  visitdate: Date;
  visitTime: Date | undefined;
  pointId: string;
  googleMapLink: string | null | undefined;
  paymentStatus?: string | null;
  tripId: string;
  imageUrl?: string | null;
};

const extractPlaceId = (url?: string | null) => {
  if (!url) return null;

  const match =
    url.match(/place_id:([A-Za-z0-9_-]+)/) ||
    url.match(/[?&]q=place_id:([A-Za-z0-9_-]+)/);

  return match?.[1] ?? null;
};

const formatDate = (date?: Date | string | null) => {
  if (!date) return "--";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "--";

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const formatTime = (time?: Date | string | null) => {
  if (!time) return "--";

  const parsed = new Date(time);
  if (Number.isNaN(parsed.getTime())) return "--";

  return parsed.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });
};

const Visitplace = (props: Props) => {
  const placeId = extractPlaceId(props.googleMapLink);

  const googleLink = props.googleMapLink
    ? placeId
      ? `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${placeId}`
      : props.googleMapLink
    : null;

  return (
    <div className="group min-w-0 border-b border-blue-950/90 last:border-b-0">
      <Link
        href={`/itinerary/${props.tripId}?point=${props.pointId}`}
        className="flex min-w-0 items-center gap-3 px-0 py-2 transition hover:bg-blue-900/20 sm:gap-4"
      >
        {/* Place thumbnail */}
        <div className="h-[60px] w-[100px] shrink-0 overflow-hidden rounded-xl border border-blue-900/80 bg-gradient-to-br from-blue-900/70 to-[#020b2b] sm:h-[68px] sm:w-[110px]">
          {props.imageUrl ? (
            <img
              src={props.imageUrl}
              alt={props.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <MapPin className="h-7 w-7 text-blue-400/70" />
            </div>
          )}
        </div>

        {/* Place name and details */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-medium text-slate-100 sm:text-base">
            {props.name}
          </h3>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5 text-blue-400" />
              {formatDate(props.visitdate)}
            </span>

            {props.visitTime && (
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-blue-400" />
                {formatTime(props.visitTime)}
              </span>
            )}

            {props.paymentStatus && (
              <span
                className={
                  props.paymentStatus === "PAID"
                    ? "text-emerald-300"
                    : props.paymentStatus === "UNPAID"
                      ? "text-red-300"
                      : "text-amber-300"
                }
              >
                {props.paymentStatus === "PARTIALLY_PAID"
                  ? "Partially paid"
                  : props.paymentStatus === "PAID"
                    ? "Paid"
                    : props.paymentStatus === "UNPAID"
                      ? "Unpaid"
                      : props.paymentStatus}
              </span>
            )}
          </div>
        </div>

        <ChevronRight className="h-5 w-5 shrink-0 text-blue-300 transition-transform group-hover:translate-x-0.5" />
      </Link>

      {/* Additional actions and notes 
      {(googleLink || props.notes) && (
        <div className="pb-2 pl-0 sm:pl-[126px]">
         

          {props.notes && (
            <div className="mt-2 border-t border-blue-950/70 pt-2">
              <Notes
                internalId={props.internalId}
                notes={props.notes}
              />
            </div>
          )}
        </div>
      )}
        */}
    </div>
  );
};

export default Visitplace;
