"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  withTime?: boolean;
  isRange?: boolean;
  onlyTime?: boolean;
  onChange?: (value: Date | [Date | null, Date | null] | null) => void;
  namePrefix?: string;

  // NEW:
  defaultValue?: Date | [Date | null, Date | null] | null;
  fromItinerary?: boolean
  minDate?: Date;

};

export default function DateRangePicker({
  withTime,
  isRange,
  onlyTime,
  onChange,
  fromItinerary,
  namePrefix = "date",
  defaultValue = null,
  minDate,
}: Props) {
  const [date, setDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // ✅ Initialize on mount when defaultValue is provided
  useEffect(() => {
    if (isRange) {
      if (Array.isArray(defaultValue)) {
        setStartDate(defaultValue[0]);
        setEndDate(defaultValue[1]);
      }
    } else {
      if (defaultValue instanceof Date) {
        setDate(defaultValue);
      }
    }
  }, [defaultValue, isRange]);

  // Handle range selection
  const handleRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onChange?.(dates);
  };

  // Handle single date or time
  const handleSingleChange = (d: Date | null) => {
    setDate(d);
    onChange?.(d);
  };

  const inputClass =
    `border relative focus:border-black focus:outline-none px-3  text-sm placeholder-gray-500  ${fromItinerary ? 'w-full rounded-lg h-[37px] sm:h-[37px] ' : '343:w-60 w-auto rounded h-[40px] sm:h-[44px]' }  `;

  return (
    <div className={`flex flex-col ${fromItinerary ? "w-full" : "w-auto"}`}>

      {/* TIME-ONLY MODE */}
      {onlyTime ? (
        <>
          <DatePicker
            portalId="datepicker-portal"
            popperPlacement="bottom-start"
            popperClassName="z-[9999]"
            selected={date}
            onChange={handleSingleChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="HH:mm"
            placeholderText="Select time"
            className={inputClass}
            minDate={minDate}
          />

          <input
            type="hidden"
            name={`${namePrefix}_time`}
            value={date ? date.toISOString() : ""}
          />
        </>
      ) : isRange ? (

        // DATE RANGE MODE
        <div>
          <DatePicker
            selected={startDate}
            onChange={handleRangeChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            minDate={minDate}
            showTimeSelect={withTime}
            timeIntervals={15}
            timeCaption="Time"
            dateFormat={withTime ? "dd/MM/yyyy HH:mm" : "dd/MM/yyyy"}
            placeholderText={
              withTime ? "Enter a date & time range" : "Enter a date range"
            }
            className={inputClass}
          />

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

        // SINGLE DATE OR DATE+TIME
        <div>
          <DatePicker
            selected={date}
            onChange={handleSingleChange}
            minDate={minDate}
            showTimeSelect={withTime}
            timeIntervals={15}
            timeCaption="Time"
            dateFormat={withTime ? "dd/MM/yyyy HH:mm" : "dd/MM/yyyy"}
            placeholderText={withTime ? "Select date & time" : "Select date"}
            className={inputClass}
          />

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
