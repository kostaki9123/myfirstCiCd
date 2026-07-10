"use client";

import { useEffect, useRef } from "react";
import { useNextStep } from "nextstepjs";

type Props = {
  hasDestinations: boolean;
};

export default function StartItineraryOnboarding({
  hasDestinations,
}: Props) {
  const {
    startNextStep,
    isNextStepVisible,
    currentTour,
  } = useNextStep();

  const hasStarted = useRef(false);

  useEffect(() => {
    if (!hasDestinations) return;
    if (hasStarted.current) return;

    const alreadySeen =
      localStorage.getItem("itineraryOnboardingSeen") === "true";

    if (alreadySeen) return;

    // Περίμενε αν υπάρχει άλλο ενεργό tour.
    if (isNextStepVisible) return;

    const waitForTarget = window.setInterval(() => {
      const target = document.querySelector(
        "#onboarding-destination-switcher"
      );

      if (!target) return;

      window.clearInterval(waitForTarget);

      hasStarted.current = true;

      console.log("Starting itinerary onboarding", {
        currentTour,
        target,
      });

      startNextStep("itinerary-onboarding");
    }, 100);

    return () => {
      window.clearInterval(waitForTarget);
    };
  }, [
    hasDestinations,
    isNextStepVisible,
    currentTour,
    startNextStep,
  ]);

  return null;
}