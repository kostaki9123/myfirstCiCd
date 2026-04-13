'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { MdHotel } from "react-icons/md";
import { RiExternalLinkLine } from "react-icons/ri";
import Notes from "./placenote";
import Link from "next/link";

type props = {
  internalId: string;
  notes: string | null | undefined;
  name: string;
  stayFrom: Date;
  stayUntil: Date;
  pointId: string;
  googleMapLink: string | null | undefined;
  paymentStatus?: string | null;
  tripId: string;
};

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

const Accomodationplace = (props: props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  const placeId = extractPlaceId(props.googleMapLink);

  // FINAL MAP LINK (BEST RELIABILITY)
  const googleLink = (() => {
    if (!props.googleMapLink) return null;

    // best deep link if place_id exists
    if (placeId) {
      return `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${placeId}`;
    }

    return props.googleMapLink;
  })();

  return (
    <div className="flex flex-col">
      <h2 className="text-base py-2 font-semibold text-white hidden lg:block">
        Accomodation
      </h2>

      <Card className="w-72 426:w-auto relative h-fit p-2 535:max-w-[370px] max-w-[350px]">
        <CardHeader className="flex flex-row gap-2 p-3">
          {/* LEFT */}
          <div className="flex items-start gap-2">
            <CardTitle>{props.name}</CardTitle>
            <MdHotel className="text-4xl 535:text-xl" />

            {props.paymentStatus === "PAID" && (
              <span className="text-[10px] px-2 py-1 rounded-full font-medium bg-green-100 text-green-700">
                Paid
              </span>
            )}

            {props.paymentStatus === "UNPAID" && (
              <span className="text-[10px] px-2 py-1 rounded-full font-medium bg-red-100 text-red-500">
                Unpaid
              </span>
            )}

            {props.paymentStatus === "PARTIALLY_PAID" && (
              <span className="text-[10px] px-2 py-1 rounded-full font-medium bg-yellow-100 text-yellow-500">
                Partially Paid
              </span>
            )}
          </div>

          {/* RIGHT */}
          <Link
            href={`/itinerary/${props.tripId}?point=${props.pointId}`}
            className="text-xs max-h-7 px-2 py-1 rounded-md border absolute top-2 right-2 border-blue-200 text-blue-700 hover:bg-blue-50 transition"
          >
            Edit
          </Link>

          <div className="min-w-8" />
        </CardHeader>

        <CardContent className="p-2 pt-0 space-y-3 text-xs text-muted-foreground">
          <div className="flex items-start px-2 flex-col gap-2">
            {props.stayFrom ? (
              <span>
                From Date:{" "}
                {new Date(props.stayFrom).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            ) : (
              <span>From Date: --</span>
            )}

            {props.stayUntil ? (
              <span>
                Until Date:{" "}
                {new Date(props.stayUntil).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            ) : (
              <span>Until Date: --</span>
            )}

            {googleLink && (
              <a
                href={googleLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-600 transition flex gap-1 items-center"
                title="Open in map"
              >
                <RiExternalLinkLine className="text-lg" />
                <span className="pt-[2px]">Open In Map</span>
              </a>
            )}
          </div>

          <Notes internalId={props.internalId} notes={props.notes} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Accomodationplace;