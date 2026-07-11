"use client";

import { useEffect, useRef } from "react";
import { useNextStep } from "nextstepjs";

export default function ContinueOnboarding() {
  const {
    startNextStep,
    setCurrentStep,
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

    const interval = window.setInterval(() => {
      const mobileTarget = document.querySelector(
        "#onboarding-add-circle-mobile"
      );

      const desktopTarget = document.querySelector(
        "#onboarding-add-circle-desktop"
      );

      const visibleTarget = [mobileTarget, desktopTarget].find(
        (element) =>
          element instanceof HTMLElement &&
          element.getClientRects().length > 0
      );

      if (!visibleTarget) return;

      window.clearInterval(interval);
      hasContinued.current = true;

      startNextStep("plan-onboarding");

      window.setTimeout(() => {
        setCurrentStep(1);

        sessionStorage.removeItem(
          "tripaki-plan-onboarding-step"
        );
      }, 200);
    }, 100);

    return () => {
      window.clearInterval(interval);
    };
  }, [startNextStep, setCurrentStep]);

  return null;
}