"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateRangePicker() {
  // 🔹 State for date range
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="flex flex-col gap-4">
   

      {/* Date range picker */}
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        dateFormat="dd/MM/yyyy"
        placeholderText="Enter a date range"
        className="border focus:border-black focus:outline-none  p-2 px-3  placeholder-gray-500  rounded w-60 text-sm  "
      />

      {/* State row */}
     
    </div>
  );
}
