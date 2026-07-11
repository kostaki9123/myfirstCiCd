import type { Tour } from "nextstepjs";

export const getOnboardingSteps = (isMobile: boolean): Tour[] => [
  {
    tour: "plan-onboarding",
    steps: [
      {
        icon: <>👋</>,
        title: "Welcome to Tripaki!",
        content: <>Tap here to start building your first trip.</>,
        selector: "#onboarding-plan-trip",
        side: "bottom",
        showControls: false,
        showSkip: true,
        pointerPadding: 0,
        pointerRadius: 10,
      },
      {
        icon: <>📍</>,
        title: "Click to add your first destination",
        content: <>Tap here to start building your route.</>,
        selector: isMobile
          ? "#onboarding-add-circle-mobile"
          : "#onboarding-add-circle-desktop",
        side: 'bottom' ,
        showControls: false,
        showSkip: true,
        pointerPadding: 0,
        pointerRadius: 999,
        
      },
      {
        icon: <>🗺️</>,
        title: "Add a destination or transport",
        content: (
          <>
            Add destinations you want to visit or transport between them.
          </>
        ),
        selector: "#onboarding-destination-transport",
        side: "bottom",
        showControls: true,
        showSkip: true,
        pointerPadding: 4,
        pointerRadius: 8,
      },
    ],
  },

  {
    tour: "itinerary-onboarding",
    steps: [
      {
        icon: <>↔️</>,
        title: "Switch between destinations",
        content: (
          <>
            Select a destination to view and organize its itinerary.
          </>
        ),
        selector: "#onboarding-destination-switcher",
        side: "bottom",
        showControls: true,
        showSkip: false,
        pointerPadding: 5,
        pointerRadius: 10,
      },
      {
        icon: <>📅</>,
        title: "Organize your itinerary",
        content: (
          <>
            Add accommodation and places you want to visit for this destination.
          </>
        ),
        selector: "#onboarding-itinerary-action",
        side: "bottom",
        showControls: true,
        showSkip: false,
        pointerPadding: 0,
        pointerRadius: 12,
      },
    ],
  },
];