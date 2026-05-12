import { TripWith, TripBudget, TripType } from "./newaddplace";

const tripLabels = {
  travelingWith: {
    Family: { label: "Family trip", icon: "👨‍👩‍👧‍👦" },
    Friends: { label: "With friends", icon: "🧑‍🤝‍🧑" },
    Solo: { label: "Solo traveler", icon: "🧍" },
    Couple: { label: "Couple getaway", icon: "❤️" },
    Group: { label: "Group adventure", icon: "👥" },
  } as Record<TripWith, { label: string; icon: string }>,

  tripBudget: {
    'Economy traveler' : { label: "conomy traveler", icon: "💰" },
    'Balanced traveler': { label: "Balanced traveler", icon: "⚖️" },
    'Luxury traveler' :  { label: "Luxury traveler", icon: "✨" },
  } as Record<TripBudget, { label: string; icon: string }>,

  tripType: {
    'Adventures' : { label: "Adventures", icon: "🧗" },
    'Cultural Enthusiast': { label: "Cultural Enthusiast", icon: "🏛" },
    'Natural lovers': { label: "Natural lovers", icon: "🌿" },
    'Nightlife': { label: "Nightlife", icon: "🌙" },
    'Festival': { label: "Festival", icon: "🎉" },
    'Sports Enthusiast': { label: "Sports Enthusiast", icon: "⚽" },
    'Events': { label: "Events", icon: "🎟️" },
  } as Record<TripType, { label: string; icon: string }>,
};

const TripContextChips = ({
  travelingWith,
  tripBudget,
  tripTypes,
}: {
  travelingWith: TripWith;
  tripBudget: TripBudget;
  tripTypes: TripType[];
}) => {
    
  const chips: { label: string; icon: string }[] = [];

  // Direct lookup (type-safe)
  chips.push(tripLabels.travelingWith[travelingWith]);
  chips.push(tripLabels.tripBudget[tripBudget]);

  tripTypes.forEach((type) => {
    chips.push(tripLabels.tripType[type]);
  });


  return (
    <div className="px-2 mb-2">
      <div className="flex flex-wrap gap-2 mb-1">
        {chips.map((chip, idx) => (
          <span
            key={idx}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
          >
            <span>{chip.icon}</span>
            <span>{chip.label}</span>
          </span>
        ))}
      </div>
      <div className="text-[11px] text-gray-500">
        Recommendations adapted to your trip style
      </div>
    </div>
  );
};

export default TripContextChips 