'use client'

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import TransportDropdown from "../transportdropdown";
import PlaceSearchWrapper from "./locationinput";
import { Button } from "@/components/ui/button";
import DatePickerExample from "./datepicker";
import { updatePoint } from "../../action";

type PlaceData = {
  name: string;
  address: string;
  placeId: string;
  location: {
    lat: number;
    lng: number;
  };
};

type TripSegment = {
  id: string;
  tripId: string;
  role: "MOVING_BOX" | string;
  index: number;

  fromName: string;
  fromAddress: string;
  fromPlaceId: string;
  fromLat: number;
  fromLng: number;

  toName: string;
  toAddress: string;
  toPlaceId: string;
  toLat: number;
  toLng: number;

  transportType: string;
  departureDate: Date;
  departureTime: Date;
};

type Props = {
  data: TripSegment;
};

const ViewMovingBoxModal = ({ data }: Props) => {
  const [formData, setFormData] = useState<TripSegment>(data);

  // -----------------------------
  // Generic value update
  // -----------------------------
  const handleChange = (field: keyof TripSegment, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // -----------------------------
  // From / To update
  // -----------------------------
  const handlePlaceChange = (type: "from" | "to", place: PlaceData) => {
    setFormData((prev) => ({
      ...prev,
      [`${type}Name`]: place.name,
      [`${type}Address`]: place.address,
      [`${type}PlaceId`]: place.placeId,
      [`${type}Lat`]: place.location.lat,
      [`${type}Lng`]: place.location.lng,
    }));
  };

  // -----------------------------
  // Save handler
  // -----------------------------
  const handleSave = async () => {
    const original = JSON.stringify(data);
    const updated = JSON.stringify(formData);

    if (original === updated) {
      console.log("No changes — skipping backend update");
      return;
    }

    // Prepare FormData for server action
    const fd = new FormData();
    fd.append("id", formData.id);
    fd.append("tripId", formData.tripId);
    fd.append("role", formData.role);
    fd.append("index", String(formData.index));

    fd.append("fromName", formData.fromName);
    fd.append("fromId", formData.fromPlaceId);
    fd.append("fromAddress", formData.fromAddress);
    fd.append("fromLat", String(formData.fromLat));
    fd.append("fromLng", String(formData.fromLng));

    fd.append("toName", formData.toName);
    fd.append("toId", formData.toPlaceId);
    fd.append("toAddress", formData.toAddress);
    fd.append("toLat", String(formData.toLat));
    fd.append("toLng", String(formData.toLng));

    fd.append("transportType", formData.transportType);
    fd.append("departureDate", formData.departureDate.toISOString());
    fd.append("departureTime", formData.departureTime.toISOString());

    // TODO: call your server action
    console.log("Sending update:", Object.fromEntries(fd));

    // example:
     await updatePoint(fd);

    console.log("Saved!");
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="flex flex-col gap-6 overflow-y-auto p-2">
      <div className="grid grid-cols-1 820:grid-cols-2 gap-4">

        {/* From */}
        <div className="flex flex-col gap-1">
          <Label>From</Label>
          <PlaceSearchWrapper
            onMovingbox
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}
            defaultQuery={data.fromName}
            onPlaceSelected={(place) => handlePlaceChange("from", place)}
          />
        </div>

        {/* To */}
        <div className="flex flex-col gap-1">
          <Label>To</Label>
          <PlaceSearchWrapper
            onMovingbox
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}
            defaultQuery={data.toName}
            onPlaceSelected={(place) => handlePlaceChange("to", place)}
          />
        </div>

        {/* Transport Type */}
        <div className="flex flex-col gap-1">
          <Label>By</Label>
          <TransportDropdown
            value={formData.transportType}
            onChange={(value) => handleChange("transportType", value)}
          />
        </div>

        {/* Departure Date */}
        <div className="flex flex-col gap-1">
          <Label>Departure Date</Label>
          <DatePickerExample
            defaultValue={data.departureDate}
            onChange={(value) => {
              const v = Array.isArray(value) ? value[0] : (value as Date);
              handleChange("departureDate", v);
            }}
          />
        </div>

        {/* Departure Time */}
        <div className="flex flex-col gap-1">
          <Label>Departure Time</Label>
          <DatePickerExample
            onlyTime
            defaultValue={data.departureTime}
            onChange={(value) => {
              const v = Array.isArray(value) ? value[0] : (value as Date);
              handleChange("departureTime", v);
            }}
          />
        </div>
      </div>

      {/* Save */}
      <div className="w-full flex items-end justify-end">
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

export default ViewMovingBoxModal;
