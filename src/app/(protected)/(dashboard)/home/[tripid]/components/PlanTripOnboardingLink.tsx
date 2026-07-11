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
    closeNextStep,
  } = useNextStep();

  const handleClick = () => {
    const isFirstPlanStep =
      isNextStepVisible &&
      currentTour === "plan-onboarding" &&
      currentStep === 0;

    if (isFirstPlanStep) {
      // Tell the Plan page to continue at Step 2.
      sessionStorage.setItem(
        "tripaki-plan-onboarding-step",
        "1"
      );

      // Hide the old spotlight before changing page.
      closeNextStep();
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