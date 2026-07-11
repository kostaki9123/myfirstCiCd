"use client";

import { useEffect, useRef } from "react";
import { useNextStep } from "nextstepjs";

export default function StartOnboarding() {
  const { startNextStep, isNextStepVisible } = useNextStep();
  const hasStarted = useRef(false);

  useEffect(() => {
    const alreadySeen =
      localStorage.getItem("planOnboardingSeen") === "true";

    console.log("Plan onboarding check:", {
      alreadySeen,
      isNextStepVisible,
      target: document.querySelector("#onboarding-plan-trip"),
    });

    if (alreadySeen || isNextStepVisible || hasStarted.current) {
      return;
    }

    const interval = window.setInterval(() => {
      const target = document.querySelector("#onboarding-plan-trip");

      if (!target) {
        console.log("Waiting for #onboarding-plan-trip");
        return;
      }

      window.clearInterval(interval);
      hasStarted.current = true;

      console.log("Starting plan-onboarding");
      startNextStep("plan-onboarding");
    }, 100);

    const timeout = window.setTimeout(() => {
      window.clearInterval(interval);
    }, 5000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [startNextStep, isNextStepVisible]);

  return null;
}