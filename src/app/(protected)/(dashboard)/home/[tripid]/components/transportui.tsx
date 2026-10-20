
"use client";

import React from "react";
import { IoAirplaneOutline, IoTrain } from "react-icons/io5";
import {
  FaCar,
  FaBusAlt,
  FaBicycle,
  FaShip,
  FaWalking,
} from "react-icons/fa";
import { FaMotorcycle, FaTrainSubway } from "react-icons/fa6";
import { Clock3 } from "lucide-react";
import Pointnotes from "./pointnotes";

const transportModes = [
  { value: "flight", icon: <IoAirplaneOutline /> },
  { value: "bus", icon: <FaBusAlt /> },
  { value: "train", icon: <IoTrain /> },
  { value: "subway", icon: <FaTrainSubway /> },
  { value: "car", icon: <FaCar /> },
  { value: "walking", icon: <FaWalking /> },
  { value: "bicycle", icon: <FaBicycle /> },
  { value: "motorbike", icon: <FaMotorcycle /> },
  { value: "boat", icon: <FaShip /> },
  { value: "other", icon: <FaShip /> },
];

type Props = {
  id: string;
  tripId: string;
  index: number;
  fromId: string;
  fromName: string;
  fromAddress: string;
  fromLat: string;
  fromLng: string;
  toName: string;
  toId: string;
  toAddress: string;
  toLat: string;
  toLng: string;
  transportType: string;
  departureDate?: any;
  departureTime?: any;
  notes?: string;
};

const Transportui = (props: Props) => {
  const transport = transportModes.find(
    (mode) => mode.value === props.transportType?.toLowerCase()
  );

  const icon = transport?.icon ?? <FaCar />;

  const capitalizeFirst = (value: string) =>
    value
      ? value.charAt(0).toUpperCase() + value.slice(1)
      : "Transport";

  const date = props.departureDate
    ? (() => {
        const parsed = new Date(props.departureDate);

        return Number.isNaN(parsed.getTime())
          ? null
          : parsed.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
      })()
    : null;

  const departureTime =
    props.departureTime != null && String(props.departureTime).trim()
      ? String(props.departureTime)
      : null;

  return (
    <section className="relative w-full min-w-0">
      <div
        className="
          grid w-full min-w-0
          grid-cols-[40px_minmax(0,1fr)]
          items-start gap-x-3 gap-y-3
          rounded-xl border border-blue-900/80 border-l-4
          border-l-blue-500 bg-[#071638]
          p-3 shadow-sm transition-colors
          hover:border-blue-700
          sm:grid-cols-[48px_minmax(0,1fr)_auto]
          sm:items-center sm:gap-x-4 sm:p-4
        "
      >
        {/* Transport icon */}
        <div
          className="
            row-start-1 flex h-10 w-10 shrink-0
            items-center justify-center rounded-full
            bg-blue-600 text-white shadow-md
            shadow-blue-950/50
            sm:row-span-2 sm:h-12 sm:w-12
            [&>svg]:text-xl
          "
        >
          {icon}
        </div>

        {/* Transport title and date */}
        <div className="col-start-2 row-start-1 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 sm:col-start-2">
          <span className="text-sm font-semibold text-white sm:text-base">
            {capitalizeFirst(props.transportType)}
          </span>

          {date && (
            <span className="inline-flex shrink-0 items-center rounded-full border border-blue-900 bg-blue-950/70 px-2 py-0.5 text-[11px] text-blue-200">
              {date}
            </span>
          )}
        </div>

        {/* Route and time: below the title on phones */}
        <div
          className="
            col-start-2 row-start-2 min-w-0
            sm:col-start-2 sm:row-start-2
          "
        >
          <p className="whitespace-normal break-words text-xs leading-relaxed text-slate-400 sm:text-sm">
            <span>{props.fromName || "Starting point"}</span>

            <span className="mx-1.5 text-blue-400 sm:mx-2">
              →
            </span>

            <span>{props.toName || "Next destination"}</span>
          </p>

          {departureTime && (
            <p className="mt-1.5 flex min-w-0 items-start gap-1.5 text-xs leading-relaxed text-slate-400">
              <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-400" />
              <span className="min-w-0 break-words">
                {departureTime}
              </span>
            </p>
          )}
        </div>

        {/* Edit action */}
        <div
          className="
            col-span-2 row-start-3 flex min-w-0
            justify-end border-t border-blue-900/50 pt-2
            sm:col-span-1 sm:col-start-3
            sm:row-span-2 sm:row-start-1
            sm:items-center sm:border-0 sm:pt-0
          "
        >
          <Pointnotes
            toName={props.toName}
            toId={props.toId}
            toAddress={props.toAddress}
            toLat={props.toLat}
            toLng={props.toLng}
            fromName={props.fromName}
            fromId={props.fromId}
            fromAddress={props.fromAddress}
            fromLat={props.fromLat}
            fromLng={props.fromLng}
            index={props.index}
            id={props.id}
            tripId={props.tripId}
            notes={props.notes}
            transportType={props.transportType}
            departureDate={props.departureDate}
          />
        </div>
      </div>
    </section>
  );
};

export default Transportui;
