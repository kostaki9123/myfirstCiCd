"use client";

import { useEffect, useRef } from "react";
import { useNextStep } from "nextstepjs";

export default function StartOnboarding() {
  const { startNextStep, isNextStepVisible } = useNextStep();

  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    const alreadySeen =
      localStorage.getItem("planOnboardingSeen") === "true";

    if (alreadySeen || isNextStepVisible) return;

    const waitForTarget = window.setInterval(() => {
      const target = document.querySelector(
        "#onboarding-plan-trip"
      );

      if (!target) return;

      window.clearInterval(waitForTarget);
      startNextStep("plan-onboarding");
    }, 100);

    return () => {
      window.clearInterval(waitForTarget);
    };
  }, [isNextStepVisible, startNextStep]);

  return null;
}