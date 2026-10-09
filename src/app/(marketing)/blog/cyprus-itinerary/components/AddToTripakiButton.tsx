"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function AddToTripakiButton() {
const { isLoaded, isSignedIn, userId } = useAuth();
const router = useRouter();

const [loading, setLoading] = useState(false);

// Prevent duplicate requests when the component re-renders.
const creatingRef = useRef(false);
const attemptedImportRef = useRef(false);

const createCyprusTrip = useCallback(async () => {
if (!isLoaded || !isSignedIn || creatingRef.current) {
return;
}


creatingRef.current = true;
setLoading(true);

try {
  const response = await fetch("/api/trips/from-template", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      template: "cyprus-7-day",
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to create trip");
  }

  // Open the newly created trip.
  router.replace(`/home/${data.tripId}`);
} catch (error) {
  console.error("Failed to import Cyprus trip:", error);

  alert("Something went wrong while creating your trip. Please try again.");

  creatingRef.current = false;
  attemptedImportRef.current = false;
  setLoading(false);
}


}, [isLoaded, isSignedIn, router]);

// Automatically import the template after returning from sign-up/sign-in.
useEffect(() => {
if (!isLoaded || !isSignedIn) {
return;
}


const params = new URLSearchParams(window.location.search);

if (
  params.get("import") === "cyprus-7-day" &&
  !attemptedImportRef.current
) {
  attemptedImportRef.current = true;
  void createCyprusTrip();
}


}, [isLoaded, isSignedIn, createCyprusTrip]);

const handleAddToTripaki = async () => {
if (!isLoaded || loading) {
return;
}


if (!isSignedIn) {
  const returnUrl =
    "/blog/cyprus-itinerary?import=cyprus-7-day";

  router.push(
    `/sign-up?redirect_url=${encodeURIComponent(returnUrl)}`
  );

  return;
}

await createCyprusTrip();


};

return (
<button
onClick={handleAddToTripaki}
disabled={!isLoaded || loading}
className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#0356BC] px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:bg-[#0466D9] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
>
{loading ? "Creating your trip..." : "Add to My Tripaki"}


  {!loading && <span className="ml-2">→</span>}
</button>


);
}
