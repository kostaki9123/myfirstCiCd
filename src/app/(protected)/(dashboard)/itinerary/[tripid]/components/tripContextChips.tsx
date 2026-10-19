
export type TripWith =
  | "Solo"
  | "Friends"
  | "Couple"
  | "Family"
  | "Group";

export type TripBudget =
  | "Economy traveler"
  | "Balanced traveler"
  | "Luxury traveler";

export type TripType =
  | "Adventures"
  | "Cultural Enthusiast"
  | "Natural lovers"
  | "Nightlife"
  | "Festival"
  | "Sports Enthusiast"
  | "Events";

type TripChip = {
  label: string;
  icon: string;
};

const tripLabels = {
  travelingWith: {
    Family: { label: "Family trip", icon: "👨‍👩‍👧‍👦" },
    Friends: { label: "With friends", icon: "🧑‍🤝‍🧑" },
    Solo: { label: "Solo traveler", icon: "🧍" },
    Couple: { label: "Couple getaway", icon: "❤️" },
    Group: { label: "Group adventure", icon: "👥" },
  } satisfies Record<TripWith, TripChip>,

  tripBudget: {
    "Economy traveler": {
      label: "Economy traveler",
      icon: "💰",
    },
    "Balanced traveler": {
      label: "Balanced traveler",
      icon: "⚖️",
    },
    "Luxury traveler": {
      label: "Luxury traveler",
      icon: "✨",
    },
  } satisfies Record<TripBudget, TripChip>,

  tripType: {
    Adventures: { label: "Adventures", icon: "🧗" },
    "Cultural Enthusiast": {
      label: "Cultural Enthusiast",
      icon: "🏛️",
    },
    "Natural lovers": { label: "Natural lovers", icon: "🌿" },
    Nightlife: { label: "Nightlife", icon: "🌙" },
    Festival: { label: "Festival", icon: "🎉" },
    "Sports Enthusiast": {
      label: "Sports Enthusiast",
      icon: "⚽",
    },
    Events: { label: "Events", icon: "🎟️" },
  } satisfies Record<TripType, TripChip>,
};

type Props = {
  travelingWith?: TripWith | null;
  tripBudget?: TripBudget | null;
  tripTypes?: TripType[] | null;
};

const TripContextChips = ({
  travelingWith,
  tripBudget,
  tripTypes,
}: Props) => {
  const chips: TripChip[] = [];

  const withChip = travelingWith
    ? tripLabels.travelingWith[travelingWith]
    : undefined;

  const budgetChip = tripBudget
    ? tripLabels.tripBudget[tripBudget]
    : undefined;

  if (withChip) chips.push(withChip);
  if (budgetChip) chips.push(budgetChip);

  for (const type of tripTypes ?? []) {
    const chip = tripLabels.tripType[type];

    if (chip) {
      chips.push(chip);
    }
  }

  return (
    <div className="px-2 mb-2">
      <div className="flex flex-wrap gap-2 mb-1">
        {chips.map((chip) => (
          <span
            key={`${chip.label}`}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-white/10 text-white/90 rounded-full"
          >
            <span>{chip.icon}</span>
            <span>{chip.label}</span>
          </span>
        ))}
      </div>

      <div className="text-[11px] text-white/70">
        Recommendations adapted to your trip style
      </div>
    </div>
  );
};

export default TripContextChips;
