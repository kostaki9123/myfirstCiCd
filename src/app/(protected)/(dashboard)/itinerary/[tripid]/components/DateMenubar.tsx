"use client";

import { useEffect, useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type DateMenubarProps = {
  ablestayFrom?: string | Date | null;
  ablestayUntil?: string | Date | null;
  selectedDate: string | null;
  setSelectedDate: (date: string) => void;
};

export function DateMenubar({
  ablestayFrom,
  ablestayUntil,
  selectedDate,
  setSelectedDate,
}: DateMenubarProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const dates = useMemo(() => {
    if (!ablestayFrom || !ablestayUntil) return [];

    const startDate = new Date(ablestayFrom);
    const endDate = new Date(ablestayUntil);

    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(endDate.getTime()) ||
      startDate > endDate
    ) {
      return [];
    }

    const generatedDates: {
      id: string;
      day: string;
      date: string;
    }[] = [];

    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      generatedDates.push({
        id: currentDate.toISOString().split("T")[0],
        day: currentDate.toLocaleDateString("en-GB", {
          weekday: "short",
        }),
        date: currentDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        }),
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return generatedDates;
  }, [ablestayFrom, ablestayUntil]);

  useEffect(() => {
    if (dates.length === 0) return;

    const selectedDateExists = dates.some(
      (item) => item.id === selectedDate
    );

    if (!selectedDateExists) {
      setSelectedDate(dates[0].id);
    }
  }, [dates, selectedDate, setSelectedDate]);

  const scroll = (direction: "left" | "right") => {
    scrollContainerRef.current?.scrollBy({
      left: direction === "left" ? -240 : 240,
      behavior: "smooth",
    });
  };

  if (dates.length === 0) return null;

  return (
    <div className="flex w-full items-center gap-2 pt-5">
      <button
        type="button"
        onClick={() => scroll("left")}
        className="
          hidden h-9 w-9 shrink-0 items-center justify-center
          rounded-full
          border border-white/10
          bg-white/5
          text-white/70
          backdrop-blur-md
          transition
          hover:bg-white/10
          hover:text-white
          sm:flex
        "
        aria-label="Previous dates"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div
        ref={scrollContainerRef}
        className="
          w-full
          overflow-x-auto
          scroll-smooth
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        <div className="flex w-max min-w-full gap-2">
          {dates.map((item) => {
            const isSelected = selectedDate === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedDate(item.id)}
                className={`
                  flex min-w-[82px] shrink-0 flex-col items-center
                  rounded-2xl
                  border
                  px-4 py-2.5
                  text-center
                  transition-all duration-200
                  ${
                    isSelected
                      ? `
                        border-white/20
                        bg-white
                        text-[#010038]
                        shadow-lg
                        shadow-black/10
                      `
                      : `
                        border-white/10
                        bg-white/5
                        text-white/70
                        backdrop-blur-md
                        hover:border-white/20
                        hover:bg-white/10
                        hover:text-white
                      `
                  }
                `}
              >
                <span
                  className={`
                    text-[11px] font-medium uppercase tracking-wide
                    ${
                      isSelected
                        ? "text-[#010038]/55"
                        : "text-white/40"
                    }
                  `}
                >
                  {item.day}
                </span>

                <span className="mt-0.5 text-sm font-semibold">
                  {item.date}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={() => scroll("right")}
        className="
          hidden h-9 w-9 shrink-0 items-center justify-center
          rounded-full
          border border-white/10
          bg-white/5
          text-white/70
          backdrop-blur-md
          transition
          hover:bg-white/10
          hover:text-white
          sm:flex
        "
        aria-label="Next dates"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}