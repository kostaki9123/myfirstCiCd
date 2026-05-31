'use client'

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import TransportDropdown from "../transportdropdown";
import PlaceSearchWrapper from "./locationinput";
import { Button } from "@/components/ui/button";
import DatePickerExample from "./datepicker";
import { updatePoint } from "../../action";
import CreateTripNotesBox from "../notes";
import { z } from "zod";
import { CiCircleCheck } from "react-icons/ci";


const tripSegmentSchema = z.object({
  fromName: z.string().min(1, "From location is required"),
  toName: z.string().min(1, "To location is required"),
  transportType: z.string().min(1, "Transport type is required"),
  departureDate: z.date({
    required_error: "Departure date is required",
    invalid_type_error: "Invalid date",
  }),
  notes: z.string().max(200, "Notes cannot exceed 200 characters").optional(),
}); 
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
  notes: string;
};

type Props = {
  data: TripSegment;
};

const ViewMovingBoxModal = ({ data }: Props) => {
  const [formData, setFormData] = useState<TripSegment>(data);
  const [notes, setNotes] = useState<string>(data.notes); 
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showUpdated, setShowUpdated] = useState(false);

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

     const validate = () => {
  const result = tripSegmentSchema.safeParse({
    fromName: formData.fromName,
    toName: formData.toName,
    transportType: formData.transportType,
    departureDate: formData.departureDate,
    notes,
  });

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};

    result.error.errors.forEach((err) => {
      const field = err.path[0] as string;
      fieldErrors[field] = err.message;
    });

    setErrors(fieldErrors);
    return false;
  }

  setErrors({});
  return true;
};

  // -----------------------------
  // Save handler
  // -----------------------------
  const handleSave = async () => {
      if (!validate()) return; 

    const original = JSON.stringify(data);
    const updated = JSON.stringify(formData);
    let oldNotes = data.notes
    let newNotes = notes

    if (original === updated && oldNotes === newNotes ) {
      console.log("No changes — skipping backend update");
      return;
    }

 

    console.log('run 1')
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
    fd.append("notes", notes);

    // example:
     try {
          const update = await updatePoint(fd);
          setShowUpdated(true);

          setTimeout(() => {
            setShowUpdated(false);
          }, 3000);

        } catch (e) {
          console.error(e);
        }

  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="flex flex-col gap-6 overflow-y-auto p-2 text-white/90">
      <div className="grid grid-cols-1 820:grid-cols-2 gap-4">

        {/* From */}
        <div className="flex flex-col gap-1">
          <Label>From</Label>
          <PlaceSearchWrapper
            Placeholder=""
            onMovingbox
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}
            defaultQuery={data.fromName}
            onPlaceSelected={(place) => handlePlaceChange("from", place)}
          />
          {errors.fromName && (
              <p className="text-red-500 text-sm">{errors.fromName}</p>
          )}
        </div>

        {/* To */}
        <div className="flex flex-col gap-1">
          <Label>To</Label>
          <PlaceSearchWrapper
            Placeholder=""
            onMovingbox
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}
            defaultQuery={data.toName}
            onPlaceSelected={(place) => handlePlaceChange("to", place)}
          />
          {errors.toName && (
           <p className="text-red-500 text-sm">{errors.toName}</p>
          )}
        </div>

        {/* Transport Type */}
        <div className="flex flex-col gap-1">
          <Label>By</Label>
          <TransportDropdown
            value={formData.transportType}
            onChange={(value) => handleChange("transportType", value)}
          />
          {errors.transportType && (
           <p className="text-red-500 text-sm">{errors.transportType}</p>
           )}
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
          {errors.departureDate && (
              <p className="text-red-500 text-sm">{errors.departureDate}</p>
            )}
        </div>

       
      </div> 
       {/*Transport notes*/}
          <div className="flex flex-col gap-1 ">
          <Label>Notes</Label>
            <CreateTripNotesBox
             placeholder="e.g. Flight BA117 arrives at 14:30, pick up rental car"
             value={notes}
             onChange={setNotes}
            />
            {errors.notes && (
            <p className="text-red-500 text-sm">{errors.notes}</p>
           )}
        </div>

        {showUpdated && (
           <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-xl  bg-white/10 backdrop-blur-md px-4 py-2 text-green-200 shadow-lg">
               <CiCircleCheck
                 className="text-green-400"
                 size={20}
               />
             
               <div className="text-sm font-medium">
                 Updated successfully
               </div>
            </div>
         )}

      {/* Save */}
      <div className="w-full flex gap-2 items-end justify-end">
        <Button onClick={handleSave}              
         className='bg-[#0356BC] hover:bg-[#0466D9] text-white border border-white/10 shadow-lg shadow-blue-950/40 px-4 py-2 rounded-xl font-medium transition-all duration-200 active:scale-[0.98]'
         >Save
         </Button>
      </div>
    </div>
  );
};

export default ViewMovingBoxModal;
