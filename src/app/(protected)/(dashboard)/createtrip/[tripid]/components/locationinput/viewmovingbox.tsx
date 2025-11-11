'use client'
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input"; // assuming you have a styled input
import { Label } from "@/components/ui/label"; // for consistency
import TransportDropdown from "../transportdropdown";
import PlaceSearchWrapper from "./locationinput";
import { Button } from "@/components/ui/button";

type TripSegment = {
  id: string;
  tripId: string;
  role: 'MOVING_BOX' | string; // enum-like if you have defined roles
  index: number;

  placeName: string | null;
  placeAddress: string;
  placeId: string;
  placeLat: number | null;
  placeLng: number | null;

  startDate: Date | null;
  endDate: Date | null;

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

  transportType: 'car' | 'bus' | 'train' | 'flight' | string; // expand as needed
  departureDate: Date;
  departureTime: Date;
};


//export type MovingBoxData = {
//  from: string;
//  to: string;
//  departureTime: string;
//  arrivalTime: string;
//  transportType?: string; // e.g. "Plane", "Train", "Bus", "Car"
//  duration?: string; // calculated or manual
//  cost?: string; // optional
//  notes?: string; // user notes
//};

type Props = {
  data: TripSegment;
  onChange?: (updatedData: TripSegment) => void;
};

const ViewMovingBoxModal = ({ data, onChange }: Props) => {
  const [formData, setFormData] = useState<TripSegment>(data);

  const handleChange = (field: keyof TripSegment, value: string) => {
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
          <Label htmlFor="from ">From</Label>
          <PlaceSearchWrapper onMovingbox apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}/>
        </div>

        {/* To */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="to">To</Label>
          <PlaceSearchWrapper onMovingbox apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}/>
        </div>

       {/* <div className="flex flex-col gap-1">
          <Label htmlFor="arrival">Departure Date</Label>
       <Input
            id="arrival"
            type="date"
            value={formData.departureDate}
            onChange={(e) => handleChange("departureDate", e.target.value)}
          />
        </div>
        **/}

        {/* Departure */}
         {/*
        <div className="flex flex-col gap-1">
          <Label htmlFor="departure">Departure Time</Label>
          <Input
            id="departure"
            type="datetime-local"
            value={formData.departureTime}
            onChange={(e) => handleChange("departureTime", e.target.value)}
          />
        </div>
         **/}

        {/* Arrival */}
        

        {/* Transport Type */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="transportType">By</Label>
          <TransportDropdown
           value={formData.transportType!}
           onChange={(value) => handleChange('transportType', value)}
          />
        </div>

        {/* Duration */}
       
      
        
      </div>
        <div className="w-full flex items-end justify-end ">
          <Button className="  ">Save</Button> 
        </div>

    </div>
  );
};

export default ViewMovingBoxModal;
