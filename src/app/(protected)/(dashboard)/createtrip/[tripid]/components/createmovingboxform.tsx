'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import DateRangePicker from './locationinput/datepicker'
import PlaceSearchWrapper from './locationinput/locationinput'
import { MovingBoxData } from './locationinput/viewmovingbox'
import TransportDropdown from './transportdropdown'



const Createmovingboxform = () => {
  const [formData, setFormData] = useState<MovingBoxData>({
    from: '',
    to: '',
    transportType: '',
    departureTime: '',
    arrivalTime: '' ,
  });

  // Handle updates for any input field
  const handleChange = (field: keyof MovingBoxData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clientaction = async (formData: FormData) => {
    // Handle submission logic here
    console.log('Form submitted:', formData)
  };

  return (
    <form action={clientaction} className="w-full m-1">
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-gray-600 text-xs md:text-sm pb-3 450:whitespace-nowrap ">
        The moving box represents your journey between places.
      </p>

      <Label>From</Label>
      <PlaceSearchWrapper onMovingbox={true} apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!} />

      <Label>To</Label>
      <PlaceSearchWrapper onMovingbox={true} apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!} />

      <Label>By</Label>
      <div>
        <TransportDropdown
          value={formData.transportType!}
          onChange={(value) => handleChange('transportType', value)}
         />
       
      </div>

      <Label>Departure Date</Label>
      <div className='relative'>
        <DateRangePicker />
      </div>

      <Label>Departure time</Label>
        <DateRangePicker onlyTime  />

      <div className='h-14 flex justify-center items-end'>
        <Button type='submit' className='right-0 ml-4'>
          Create moving circle
        </Button>
      </div>
    </form>
  );
};

export default Createmovingboxform;
