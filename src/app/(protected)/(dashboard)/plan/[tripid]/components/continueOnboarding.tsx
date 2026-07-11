"use client";

import { useEffect, useRef } from "react";
import { useNextStep } from "nextstepjs";

export default function ContinueOnboarding() {
  const {
    currentTour,
    setCurrentStep,
    startNextStep,
  } = useNextStep();

  const hasContinued = useRef(false);

  useEffect(() => {
    if (hasContinued.current) return;

    const alreadySeen =
      localStorage.getItem("planOnboardingSeen") === "true";

    if (alreadySeen) {
      sessionStorage.removeItem(
        "tripaki-plan-onboarding-step"
      );
      return;
    }

    const shouldContinue =
      sessionStorage.getItem(
        "tripaki-plan-onboarding-step"
      ) === "1";

    if (!shouldContinue) return;

    const waitForTarget = window.setInterval(() => {
      const target = document.querySelector(
        "#onboarding-add-circle-mobile, #onboarding-add-circle-desktop"
      );

      if (!target) {
        console.log("Waiting for onboarding circle target");
        return;
      }

      window.clearInterval(waitForTarget);
      hasContinued.current = true;

      console.log("Found onboarding target:", target);

      if (currentTour !== "plan-onboarding") {
        startNextStep("plan-onboarding");
      }

      window.setTimeout(() => {
        setCurrentStep(1);

        sessionStorage.removeItem(
          "tripaki-plan-onboarding-step"
        );
      }, 250);
    }, 100);

    return () => {
      window.clearInterval(waitForTarget);
    };
  }, [
    currentTour,
    setCurrentStep,
    startNextStep,
  ]);

  return null;
}