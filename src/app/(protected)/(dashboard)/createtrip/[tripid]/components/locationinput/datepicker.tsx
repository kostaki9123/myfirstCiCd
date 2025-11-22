"use client";

import { MiddlewareReturn } from "@floating-ui/core";
import { MiddlewareState } from "@floating-ui/dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  withTime?: boolean;
  isRange?: boolean;
  onlyTime?: boolean;
  onChange?: (value: Date | [Date | null, Date | null] | null) => void;
  namePrefix?: string; // optional, for form data field names
};

export default function DateRangePicker({
  withTime,
  isRange,
  onlyTime,
  onChange,
  namePrefix = "date",
}: Props) {
  const [date, setDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // ✅ Handle range selection
  const handleRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onChange?.(dates);
  };

  // ✅ Handle single date or time
  const handleSingleChange = (d: Date | null) => {
    setDate(d);
    onChange?.(d);
  };

  const inputClass =
    "border relative focus:border-black focus:outline-none px-3 rounded text-sm placeholder-gray-500 w-auto 343:w-60 h-[40px] sm:h-[44px]";

  return (
    <div className="flex flex-col">
      {/* ✅ Time-only mode */}
      {onlyTime ? (
        <>
          <DatePicker
            selected={date}
            onChange={handleSingleChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="HH:mm"
            placeholderText="Select time"
            className="border relative focus:border-black focus:outline-none px-3 rounded text-sm placeholder-gray-500 w-auto 343:w-60 h-[40px] sm:h-[44px]"
            popperClassName="timepicker-popper"
/>
          
          {/* Hidden input for FormData */}
          <input
            type="hidden"
            name={`${namePrefix}_time`}
            value={date ? date.toISOString() : ""}
          />
        </>
      ) : isRange ? (
        <div className="date-only">
          {/* ✅ Date range mode */}
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
            className={inputClass}
            popperClassName="datepicker-popper"
          />
          {/* Hidden inputs for FormData */}
          <input
            type="hidden"
            name={`${namePrefix}_start`}
            value={startDate ? startDate.toISOString() : ""}
          />
          <input
            type="hidden"
            name={`${namePrefix}_end`}
            value={endDate ? endDate.toISOString() : ""}
          />
       </div>
      ) : (
        <div className="date-only">
          {/* ✅ Single date or date-time mode */}
          <DatePicker
            selected={date}
            onChange={handleSingleChange}
            showTimeSelect={withTime}
            timeIntervals={15}
            timeCaption="Time"
            dateFormat={withTime ? "dd/MM/yyyy HH:mm" : "dd/MM/yyyy"}
            placeholderText={withTime ? "Select date & time" : "Select date"}
            popperPlacement="bottom-start"
            className={inputClass}
            popperClassName="datepicker-popper"
          />
          {/* Hidden input for FormData */}
          <input
            type="hidden"
            name={namePrefix}
            value={date ? date.toISOString() : ""}
          />
        </div>
      )}
    </div>
  );
}
