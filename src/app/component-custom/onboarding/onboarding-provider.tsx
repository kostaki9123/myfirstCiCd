"use client";

import { onboardingSteps } from "@/app/(protected)/lib/onboardingSteps";
import { NextStep, NextStepProvider } from "nextstepjs";

export default function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const markTourAsSeen = (tourName?: string | null) => {
    console.log("Saving tour as seen:", tourName);

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
        steps={onboardingSteps}
        shadowRgb="0, 0, 0"
        shadowOpacity="0.7"
        onComplete={(tourName : any) => {
          console.log("Completed:", tourName);
          markTourAsSeen(tourName);
        }}
        onSkip={(step :any, tourName : any) => {
          console.log("Skipped:", {
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