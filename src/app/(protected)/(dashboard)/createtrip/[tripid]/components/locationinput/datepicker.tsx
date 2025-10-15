"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


type Props = {
  withTime?: boolean;
  isRange?: boolean;
  onlyTime?: boolean;
};

export default function DateRangePicker({ withTime, isRange, onlyTime }: Props) {
  const [date, setDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const inputClass =
    "border relative focus:border-black focus:outline-none px-3 rounded text-sm placeholder-gray-500 w-auto 343:w-60 h-[40px] sm:h-[44px]";

  return (
    <div className="flex flex-col ">
      {onlyTime ? (
        <DatePicker
          selected={date}
          onChange={(d) => setDate(d)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="HH:mm"
          placeholderText="Select time"
          className={inputClass}
          popperClassName="datepicker-popper"
        />
      ) : isRange ? (
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
      ) : (
        <DatePicker
          selected={date}
          onChange={(d) => setDate(d)}
          showTimeSelect={withTime}
          timeIntervals={15}
          timeCaption="Time"
          dateFormat={withTime ? "dd/MM/yyyy HH:mm" : "dd/MM/yyyy"}
          placeholderText={withTime ? "Select date & time" : "Select date"}
          popperPlacement="bottom-start"
          className="border  focus:border-black focus:outline-none px-3 rounded text-sm placeholder-gray-500 w-auto 343:w-60 h-[40px] sm:h-[44px]"
          popperClassName="datepicker-popper"
        />
      )}
    </div>
  );
}
