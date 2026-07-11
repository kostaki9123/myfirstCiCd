"use client";

import { useNextStep } from "nextstepjs";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

type Props = {
  tripid: string;
  children: ReactNode;
};

export default function PlanTripOnboardingLink({
  tripid,
  children,
}: Props) {
  const router = useRouter();

  const {
    currentTour,
    currentStep,
    isNextStepVisible,
  } = useNextStep();

  const handleClick = () => {
    console.log("Plan card clicked:", {
      currentTour,
      currentStep,
      isNextStepVisible,
    });

    const isFirstPlanStep =
      isNextStepVisible &&
      currentTour === "plan-onboarding" &&
      currentStep === 0;

    if (isFirstPlanStep) {
      console.log("Saving continuation for Step 2");

      sessionStorage.setItem(
        "tripaki-plan-onboarding-step",
        "1"
      );
    }

    router.push(`/plan/${tripid}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="block w-full text-left"
    >
      {children}
    </button>
  );
}