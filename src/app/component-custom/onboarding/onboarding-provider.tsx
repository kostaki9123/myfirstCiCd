"use client";

import { useEffect, useMemo, useState } from "react";
import { NextStep, NextStepProvider } from "nextstepjs";
import { getOnboardingSteps } from "@/app/(protected)/lib/onboardingSteps";

export default function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 474px)");

    const updateScreenSize = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateScreenSize();

    mediaQuery.addEventListener("change", updateScreenSize);

    return () => {
      mediaQuery.removeEventListener("change", updateScreenSize);
    };
  }, []);

  const onboardingSteps = useMemo(() => {
    return getOnboardingSteps(isMobile);
  }, [isMobile]);

  const markTourAsSeen = (tourName: string | null) => {
    if (tourName === "plan-onboarding") {
      localStorage.setItem("planOnboardingSeen", "true");
    }

    if (tourName === "itinerary-onboarding") {
      localStorage.setItem("itineraryOnboardingSeen", "true");
    }
  };

  return (
    <NextStepProvider>
      <NextStep
        key={isMobile ? "mobile-onboarding" : "desktop-onboarding"}
        steps={onboardingSteps}
        shadowRgb="0, 0, 0"
        shadowOpacity="0.7"
        onComplete={(tourName: string | null) => {
          console.log("Completed onboarding:", tourName);
          markTourAsSeen(tourName);
        }}
        onSkip={(step: number, tourName: string | null) => {
          console.log("Skipped onboarding:", {
            step,
            tourName,
          });

          markTourAsSeen(tourName);
        }}
      >
        {children}
      </NextStep>
    </NextStepProvider>
  );
}