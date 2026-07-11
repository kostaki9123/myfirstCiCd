"use client";

import type { CardComponentProps } from "nextstepjs";

export default function OnboardingCard({
  step,
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  skipTour,
  arrow,
}: CardComponentProps) {
  if (!step) return null;

  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div
      className="
        w-[calc(100vw-24px)]
        max-w-[0px]
        rounded-xl
        bg-white
        p-3
        text-sm
        text-black
        shadow-xl
        sm:max-w-[360px]
        sm:p-5
        sm:text-base
      "
    >
      <div className="flex items-start gap-3">
        {step.icon && (
          <div className="text-xl">
            {step.icon}
          </div>
        )}

        <div>
          <h3 className="text-base font-semibold sm:text-lg">
            {step.title}
          </h3>

          <div className="mt-1 text-sm text-black/70">
            {step.content}
          </div>
        </div>
      </div>

      {arrow}

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-black/50">
          {currentStep + 1}/{totalSteps}
        </span>

        <div className="flex gap-2">
          {currentStep > 0 && prevStep && (
            <button
              type="button"
              onClick={prevStep}
              className="rounded-md px-3 py-2"
            >
              Back
            </button>
          )}

          {step.showControls && nextStep && (
            <button
              type="button"
              onClick={nextStep}
              className="rounded-md bg-[#0356BC] px-3 py-2 text-white"
            >
              {isLastStep ? "Finish" : "Next"}
            </button>
          )}

          {step.showSkip && skipTour && (
            <button
              type="button"
              onClick={skipTour}
              className="rounded-md px-3 py-2"
            >
              Skip
            </button>
          )}
        </div>
      </div>
    </div>
  );
}