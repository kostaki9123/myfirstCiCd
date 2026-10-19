
"use client";

import React from "react";
import {
  IoAirplaneOutline,
  IoTrain,
} from "react-icons/io5";
import {
  FaCar,
  FaBusAlt,
  FaBicycle,
  FaShip,
  FaWalking,
} from "react-icons/fa";
import {
  FaMotorcycle,
  FaTrainSubway,
} from "react-icons/fa6";
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
    (mode) => mode.value === props.transportType
  );

  const icon = transport?.icon ?? <FaCar />;

  const capitalizeFirst = (value: string) =>
    value ? value.charAt(0).toUpperCase() + value.slice(1) : "Transport";

  const date = props.departureDate
    ? new Date(props.departureDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : null;

  const departureTime = props.departureTime
    ? String(props.departureTime)
    : null;

  return (
    <section className="relative w-full min-w-0">
      {/* Subtle connector to the next destination */}
      <div className="flex w-full min-w-0 items-center gap-3 rounded-xl border border-blue-900/80 border-l-4 border-l-blue-500 bg-[#071638] px-3 py-3 shadow-sm transition-colors hover:border-blue-700 sm:gap-4 sm:px-4 sm:py-3.5">
        {/* Transport icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-md shadow-blue-950/50 sm:h-12 sm:w-12 [&>svg]:text-xl">
          {icon}
        </div>

        {/* Route information */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-sm font-semibold text-white sm:text-base">
              {capitalizeFirst(props.transportType)}
            </span>

            {date && (
              <span className="rounded-full border border-blue-900 bg-blue-950/70 px-2 py-0.5 text-[11px] text-blue-200">
                {date}
              </span>
            )}
          </div>

          <p className="mt-1 truncate text-xs text-slate-400 sm:text-sm">
            {props.fromName || "Starting point"}
            <span className="mx-2 text-blue-400">→</span>
            {props.toName || "Next destination"}
          </p>

          {departureTime && (
            <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
              <Clock3 className="h-3 w-3" />
              {departureTime}
            </p>
          )}
        </div>

        {/* Existing edit action */}
        <div className="flex shrink-0 items-center">
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
