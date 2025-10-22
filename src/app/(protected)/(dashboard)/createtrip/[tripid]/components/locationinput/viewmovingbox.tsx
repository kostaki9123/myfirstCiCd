'use client'
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input"; // assuming you have a styled input
import { Label } from "@/components/ui/label"; // for consistency
import TransportDropdown from "../transportdropdown";
import PlaceSearchWrapper from "./locationinput";
import { Button } from "@/components/ui/button";

export type MovingBoxData = {
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  transportType?: string; // e.g. "Plane", "Train", "Bus", "Car"
  duration?: string; // calculated or manual
  cost?: string; // optional
  notes?: string; // user notes
};

type Props = {
  data: MovingBoxData;
  onChange?: (updatedData: MovingBoxData) => void;
};

const ViewMovingBoxModal = ({ data, onChange }: Props) => {
  const [formData, setFormData] = useState<MovingBoxData>(data);

  const handleChange = (field: keyof MovingBoxData, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onChange?.(updated);
  };

  return (
    <div className="flex flex-col gap-6 overflow-y-auto p-2 ">
      {/* Header */}

      {/* Main info grid */}
      <div className="grid grid-cols-1 820:grid-cols-2 gap-4">
        {/* From */}
        <div className="flex flex-col gap-1     ">
          <Label htmlFor="from">From</Label>
          <PlaceSearchWrapper onMovingbox apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}/>
        </div>

        {/* To */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="to">To</Label>
          <PlaceSearchWrapper onMovingbox apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}/>
        </div>

        {/* Departure */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="departure">Departure Time</Label>
          <Input
            id="departure"
            type="datetime-local"
            value={formData.departureTime}
            onChange={(e) => handleChange("departureTime", e.target.value)}
          />
        </div>

        {/* Arrival */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="arrival">Arrival Time</Label>
          <Input
            id="arrival"
            type="datetime-local"
            value={formData.arrivalTime}
            onChange={(e) => handleChange("arrivalTime", e.target.value)}
          />
        </div>

        {/* Transport Type */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="transportType">By</Label>
          <TransportDropdown
           value={formData.transportType!}
           onChange={(value) => handleChange('transportType', value)}
          />
        </div>

        {/* Duration */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            value={formData.duration || ""}
            onChange={(e) => handleChange("duration", e.target.value)}
          />
        </div>
      
        
      </div>
        <div className="w-full flex items-end justify-end ">
          <Button className="  ">Save</Button> 
        </div>

    </div>
  );
};

export default ViewMovingBoxModal;
