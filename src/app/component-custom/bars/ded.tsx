"use client";

import { getTrip } from "@/app/(protected)/action";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const Ded = () => {
  const { tripid } = useParams<{ tripid: string }>();
  const [tripName, setTripName] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!tripid) return;

    startTransition(async () => {
      const trip = await getTrip(tripid);
      setTripName(trip?.tripName ?? null);
    });
  }, [tripid]);

  if (isPending) {
    return (
      <h1 className="text-base font-semibold h-full hidden md:flex items-center justify-center px-3">
        
      </h1>
    );
  }

  return (
    <h1 className="text-base font-semibold h-full hidden md:flex items-center justify-center px-3">
      {tripName}
    </h1>
  );
};

export default Ded;
