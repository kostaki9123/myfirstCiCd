
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdHotel } from "react-icons/md";
import { RiExternalLinkLine } from "react-icons/ri";
import { CalendarDays, Pencil } from "lucide-react";
import Notes from "./placenote";
import Link from "next/link";

type Props = {
  internalId: string;
  notes: string | null | undefined;
  name: string;
  stayFrom: Date;
  stayUntil: Date;
  pointId: string;
  googleMapLink: string | null | undefined;
  paymentStatus?: string | null;
  tripId: string;

  // Optional fields for the screenshot-style design
  imageUrl?: string | null;
  rating?: number | null;
  bookingUrl?: string | null;
};

const extractPlaceId = (url?: string | null) => {
  if (!url) return null;

  const match =
    url.match(/place_id:([A-Za-z0-9_-]+)/) ||
    url.match(/[?&]q=place_id:([A-Za-z0-9_-]+)/);

  return match?.[1] ?? null;
};

const formatDate = (date?: Date | null) => {
  if (!date) return "--";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "--";

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const paymentStyles: Record<string, string> = {
  PAID: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  UNPAID: "border-red-500/30 bg-red-500/10 text-red-300",
  PARTIALLY_PAID:
    "border-amber-500/30 bg-amber-500/10 text-amber-300",
};

const paymentLabels: Record<string, string> = {
  PAID: "Paid",
  UNPAID: "Unpaid",
  PARTIALLY_PAID: "Partially paid",
};

const Accomodationplace = (props: Props) => {
  const placeId = extractPlaceId(props.googleMapLink);

  const googleLink = props.googleMapLink
    ? placeId
      ? `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${placeId}`
      : props.googleMapLink
    : null;

  return (
    <Card className="w-full min-w-0 overflow-hidden rounded-xl border border-blue-900/80 bg-[#071638] p-0 text-white shadow-none transition-colors hover:border-blue-700/80">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 px-4 pb-3 pt-4">
        <CardTitle className="flex min-w-0 items-center gap-2 text-base font-semibold text-slate-100">
          <MdHotel className="h-5 w-5 shrink-0 text-blue-500" />
          <span className="truncate">Accommodation</span>
        </CardTitle>

        <Link
          href={`/itinerary/${props.tripId}?point=${props.pointId}`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-blue-800 px-3 py-2 text-xs font-medium text-blue-300 transition hover:border-blue-500 hover:bg-blue-600/10 hover:text-white"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </Link>
      </CardHeader>

      {/* Accommodation details */}
      <CardContent className="px-4 pb-4 pt-0">
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
          {/* Hotel image */}
          <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-lg border border-blue-900/70 bg-gradient-to-br from-blue-900/70 to-[#020b2b] sm:h-[104px] sm:w-[155px]">
            {props.imageUrl ? (
              <img
                src={props.imageUrl}
                alt={props.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <MdHotel className="h-10 w-10 text-blue-400/70" />
              </div>
            )}
          </div>

          {/* Hotel information */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="min-w-0 break-words text-base font-semibold text-white">
                {props.name}
              </h3>

              {props.paymentStatus &&
                paymentLabels[props.paymentStatus] && (
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                      paymentStyles[props.paymentStatus]
                    }`}
                  >
                    {paymentLabels[props.paymentStatus]}
                  </span>
                )}
            </div>

            {/* Optional rating */}
            {props.rating != null && (
              <div className="mt-1 flex items-center gap-2">
                <span
                  className="tracking-wide text-amber-400"
                  aria-label={`Rating: ${props.rating} out of 5`}
                >
                  {"★".repeat(
                    Math.max(0, Math.min(5, Math.round(props.rating)))
                  )}
                  <span className="text-slate-600">
                    {"★".repeat(
                      5 -
                        Math.max(
                          0,
                          Math.min(5, Math.round(props.rating))
                        )
                    )}
                  </span>
                </span>
                <span className="text-xs text-blue-300">
                  ({props.rating.toFixed(1)})
                </span>
              </div>
            )}

            {/* Check-in and check-out */}
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3 text-xs">
              <div>
                <span className="text-slate-400">Check-in</span>
                <p className="mt-1 flex items-center gap-1.5 text-slate-200">
                  <CalendarDays className="h-3.5 w-3.5 shrink-0 text-blue-400" />
                  {formatDate(props.stayFrom)}
                </p>
              </div>

              <div>
                <span className="text-slate-400">Check-out</span>
                <p className="mt-1 flex items-center gap-1.5 text-slate-200">
                  <CalendarDays className="h-3.5 w-3.5 shrink-0 text-blue-400" />
                  {formatDate(props.stayUntil)}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {props.bookingUrl && (
                <a
                  href={props.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-blue-600 bg-blue-600/10 px-3 py-2 text-xs font-medium text-blue-300 transition hover:bg-blue-600/20 hover:text-white"
                >
                  View booking
                  <RiExternalLinkLine className="h-3.5 w-3.5" />
                </a>
              )}

              {googleLink && (
                <a
                  href={googleLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 transition hover:text-blue-300"
                  title="Open accommodation in Google Maps"
                >
                  <RiExternalLinkLine className="h-4 w-4" />
                  Open in Maps
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Notes */}
        {props.notes && (
          <div className="mt-4 border-t border-blue-900/60 pt-3">
            <Notes
              internalId={props.internalId}
              notes={props.notes}
              forAccomodation
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Accomodationplace;
