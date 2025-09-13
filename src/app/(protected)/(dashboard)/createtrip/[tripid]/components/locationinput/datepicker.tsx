"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  withTime?: boolean;
  isRange?: boolean;
  onlyTime?: boolean; // ⏰ new prop: time-only mode
};

export default function DateRangePicker({ withTime, isRange, onlyTime }: Props) {
  // Single date/time
  const [date, setDate] = useState<Date | null>(null);

  // Range dates
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="flex flex-col gap-4">
      {onlyTime ? (
        // 🔹 Time-only picker
        <DatePicker
          selected={date}
          onChange={(d) => setDate(d)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="HH:mm"
          placeholderText="Select time"
          className="border focus:border-black focus:outline-none p-2 px-3 placeholder-gray-500 rounded w-auto 343:w-60 text-sm"
        />
      ) : isRange ? (
        // 🔹 Range picker
        <DatePicker
          selected={startDate}
          onChange={handleRangeChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          showTimeSelect={withTime}
          timeIntervals={15}
          timeCaption="Time"
          dateFormat={withTime ? "dd/MM/yyyy HH:mm" : "dd/MM/yyyy"}
          placeholderText={
            withTime ? "Enter a date & time range" : "Enter a date range"
          }
          className="border focus:border-black focus:outline-none p-2 px-3 placeholder-gray-500 rounded w-auto 343:w-60 text-sm"
        />
      ) : (
        // 🔹 Single date/datetime picker
        <DatePicker
          selected={date}
          onChange={(d) => setDate(d)}
          showTimeSelect={withTime}
          timeIntervals={15}
          timeCaption="Time"
          dateFormat={withTime ? "dd/MM/yyyy HH:mm" : "dd/MM/yyyy"}
          placeholderText={
            withTime ? "Select date & time" : "Select date"
          }
          className="border focus:border-black focus:outline-none p-2 px-3 placeholder-gray-500 rounded w-auto 343:w-60 text-sm"
        />
      )}
    </div>
  );
}
