"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BsHouseAddFill } from "react-icons/bs";
import Placecomponent from "./placecomponent";
import LocationInput from "./inputauto";
import { APIProvider } from "@vis.gl/react-google-maps";
import Mapprovider from "@/app/component/map/map-provider";
import { ItineraryPoint } from "./itineraryboard";
import { Place } from "../../../../../../../backend/entities/models/place";
import { RecommendedPlace } from "@/app/component/map/map";

/* ----------------------------------
   TRIP CONTEXT TYPES
----------------------------------- */

type TravelWith = "family" | "friends" | "solo" | "couple" | "group" | string;
type TripBudget = "economy" | "balanced" | "luxury" | string;
type TripType =
  | "adventure"
  | "cultural"
  | "nature"
  | "nightlife"
  | "festival"
  | "sportsEnthusiast"
  | "events"
  | string;

const tripLabels = {
  travelingWith: {
    family: { label: "Family trip", icon: "👨‍👩‍👧‍👦" },
    friends: { label: "With friends", icon: "🧑‍🤝‍🧑" },
    solo: { label: "Solo traveler", icon: "🧍" },
    couple: { label: "Couple getaway", icon: "❤️" },
    group: { label: "Group adventure", icon: "👥" },
  } as Record<TravelWith, { label: string; icon: string }>,

  tripBudget: {
    economy: { label: "Budget-friendly", icon: "💰" },
    balanced: { label: "Balanced budget", icon: "⚖️" },
    luxury: { label: "Luxury stay", icon: "✨" },
  } as Record<TripBudget, { label: string; icon: string }>,

  tripType: {
    adventure: { label: "Adventure", icon: "🧗" },
    cultural: { label: "Cultural focus", icon: "🏛" },
    nature: { label: "Nature focused", icon: "🌿" },
    nightlife: { label: "Nightlife", icon: "🌙" },
    festival: { label: "Festival vibes", icon: "🎉" },
    sportsEnthusiast: { label: "Sports activities", icon: "⚽" },
    events: { label: "Special events", icon: "🎟️" },
  } as Record<TripType, { label: string; icon: string }>,
};

/* ----------------------------------
   Mapping for incoming strings
----------------------------------- */

const budgetMap: Record<string, TripBudget> = {
  economy: "economy",
  balanced: "balanced",
  luxury: "luxury",
  "luxury traveler": "luxury",
};

const tripTypeMap: Record<string, TripType> = {
  adventure: "adventure",
  adventures: "adventure",
  cultural: "cultural",
  "cultural enthusiasts": "cultural",
  nature: "nature",
  "natural lovers": "nature",
  nightlife: "nightlife",
  festival: "festival",
  "sports": "sportsEnthusiast",
  "sports enthusiast": "sportsEnthusiast",
  events: "events",
};

type ScoredPlace = {
  _score: number;
  _distanceKm: number;
  _reason: string;
  alreadyAdded: boolean;
  id: string;
  location: { latitude: number; longitude: number };
  rating?: number;
  displayName?: { text: string };
  shortFormattedAddress?: string;
  websiteUri?: string;
  googleMapsUri?: string;
  // other fields from the API if needed
};

/* ----------------------------------
   UTILS
----------------------------------- */

const haversineDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) => {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

const distanceScore = (km: number) => {
  if (km < 1) return 30;
  if (km < 3) return 22;
  if (km < 6) return 14;
  if (km < 10) return 6;
  return 0;
};

const formatPrice = (
  price: number | null | undefined,
  currency: string = "EUR"
) => {
  if (!price) return null;
  const symbol = currency === "USD" ? "$" : "€";
  return `${symbol}${price} / night`;
};

const getFallbackPriceLabel = (budget: TripBudget) => {
  if (budget === "economy") return "Usually budget-friendly";
  if (budget === "balanced") return "Mid-range pricing";
  return "Premium stay";
};

/* ----------------------------------
   Trip Context Chips
----------------------------------- */

const TripContextChips = ({
  travelingWith,
  tripBudget,
  tripTypes,
}: {
  travelingWith: TravelWith;
  tripBudget: TripBudget;
  tripTypes: TripType[];
}) => {
  const chips: { label: string; icon: string }[] = [];

  // Normalize travelingWith
  const twKey = travelingWith.toLowerCase() as string;
  if (tripLabels.travelingWith[twKey]) chips.push(tripLabels.travelingWith[twKey]);

  // Normalize budget
  const normalizedBudget = budgetMap[tripBudget.toLowerCase()];
  if (normalizedBudget && tripLabels.tripBudget[normalizedBudget])
    chips.push(tripLabels.tripBudget[normalizedBudget]);

  // Normalize trip types
  tripTypes.forEach((type) => {
    const normalizedType = tripTypeMap[type.toLowerCase()];
    if (normalizedType && tripLabels.tripType[normalizedType])
      chips.push(tripLabels.tripType[normalizedType]);
  });

  if (chips.length === 0) return null;

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

/* ----------------------------------
   MAIN COMPONENT
----------------------------------- */

type Props = {
  selectedPlace: ItineraryPoint;
  latitude: number;
  longitude: number;
  cyrclesArr: any;
  triggerName: string;
  descriptionName: string;
  addedPlaces: Place[];

  travelingWith: TravelWith;
  tripBudget: TripBudget;
  tripTypes: TripType[];
  onSubmitSuccess?: any //fix it later
};

type AffiliateMap = Record<
  string,
  {
    affiliate_url: string;
    pricePerDay: number | null;
    currency?: "EUR" | "USD";
  } | null
>;

const Addaplace = (props: Props) => {
  const [placesResult, setPlacesResult] = useState<any[]>([]);
  const [affiliateMap, setAffiliateMap] = useState<AffiliateMap>({});
  const [inputLocation, setInputLocation] = useState<any>();
  const [visibleCount, setVisibleCount] = useState(10);
  const [addedStayss, setAddedStays] = useState<RecommendedPlace[]>([]);
  const [addedVisitss, setaddedVisits] = useState<RecommendedPlace[]>([]);
 
  const getPlaceCategory = (types: string[] = []) => {
  if (types.includes("restaurant")) return "Restaurant ";
  if (types.includes("cafe")) return "Cafe";
  if (types.includes("bar")) return "Bar";
  if (types.includes("tourist_attraction")) return "Attraction";
  if (types.includes("museum")) return "Museum";
  if (types.includes("park")) return "Nature";
  if (types.includes("night_club")) return "Nightlife";
  if (types.includes("lodging")) return "Accommodation";
  return null;
};

const getAccommodationCategory = (types: string[] = []) => {
  // ✅ MOST SPECIFIC FIRST
  if (types.includes("hostel")) return "Hostel";
  if (types.includes("motel")) return "Motel";
  if (types.includes("resort_hotel")) return "Resort";
  if (types.includes("guest_house")) return "Guest House";
  if (types.includes("bed_and_breakfast")) return "B&B";
  if (types.includes("campground")) return "Campground";
  if (types.includes("rv_park")) return "RV Park";

  // ⚠️ LESS SPECIFIC
  if (types.includes("hotel")) return "Hotel";

  // ⚠️ GENERIC FALLBACK
  if (types.includes("lodging")) return "Accommodation";

  return null;
};


 const scorePlace = (place: any) => {
  const rating = place.rating ?? 0;
  const km = place._distanceKm ?? 10;

  const budget = props.tripBudget.toLowerCase();
  const travelingWith = props.travelingWith.toLowerCase();
  const tripTypes = props.tripTypes.map((t) => t.toLowerCase());

  let score = 0;



  /* ---------------------------------- */
  /* 1️⃣ Distance Weight (0–35 pts) */
  /* ---------------------------------- */
  if (km <= 1) score += 35;
  else if (km <= 3) score += 25;
  else if (km <= 6) score += 15;
  else if (km <= 10) score += 8;
  else score -= 5;

  /* ---------------------------------- */
  /* 2️⃣ Rating Weight (non-linear) */
  /* ---------------------------------- */
  score += Math.pow(rating, 2); // makes 4.8 much stronger than 4.3

  /* ---------------------------------- */
  /* 3️⃣ Budget Logic */
  /* ---------------------------------- */

  if (budget.includes("luxury")) {
    if (rating >= 4.6) score += 18;
    if (rating < 4.2) score -= 20;
  }

  if (budget.includes("balanced")) {
    if (rating >= 4.3) score += 10;
    if (rating < 4.0) score -= 8;
  }

  if (budget.includes("economy")) {
    if (rating >= 4.0 && rating <= 4.6) score += 12;
    if (rating > 4.8) score -= 6; // too premium
  }

  /* ---------------------------------- */
  /* 4️⃣ Traveling With Logic */
  /* ---------------------------------- */

  if (travelingWith === "family") {
    if (km < 5 && rating >= 4.2) score += 12;
  }

  if (travelingWith === "couple") {
    if (rating >= 4.5) score += 10;
  }

  if (travelingWith === "friends" || travelingWith === "group") {
    if (rating >= 4.2) score += 8;
  }

  if (travelingWith === "solo") {
    if (km < 3) score += 8;
  }

  /* ---------------------------------- */
  /* 5️⃣ Trip Type Matching */
  /* ---------------------------------- */

  const name = place.displayName?.text?.toLowerCase() ?? "";

  const keywordBoost: Record<string, string[]> = {
    adventures: ["adventure", "climb", "hike", "rafting", "trek"],
    "natural lovers": ["park", "nature", "trail", "lake", "forest"],
    "cultural enthusiasts": ["museum", "historic", "art", "gallery", "temple"],
    nightlife: ["bar", "club", "pub", "night"],
    festival: ["festival", "event"],
    "sports enthusiast": ["stadium", "arena", "sport"],
    events: ["center", "hall", "theater"],
  };

  tripTypes.forEach((type) => {
    const keywords = keywordBoost[type];
    if (!keywords) return;

    keywords.forEach((word) => {
      if (name.includes(word)) {
        score += 14;
      }
    });
  });

  /* ---------------------------------- */
  /* 6️⃣ Low Rating Penalty */
  /* ---------------------------------- */

  if (rating < 4.0) score -= 18;

  return score;
};

const buildReason = (place: any) => {
  const rating = place.rating ?? 0;
  const km = place._distanceKm ?? 0;

  const budget = props.tripBudget.toLowerCase();
  const travelingWith = props.travelingWith.toLowerCase();
  const tripTypes = props.tripTypes.map((t) => t.toLowerCase());

  const reasons: string[] = [];

  /* ---------------------------------- */
  /* ⭐ Rating-based reasons (strongest) */
  /* ---------------------------------- */

  if (rating >= 4.8) {
    reasons.push("Outstanding reviews");
  } else if (rating >= 4.5) {
    reasons.push("Highly rated by travelers");
  }

  /* ---------------------------------- */
  /* 📍 Distance (only if VERY close) */
  /* ---------------------------------- */

  if (km < 1) {
    reasons.push("Steps away from your selected location");
  }

  /* ---------------------------------- */
  /* 💎 Budget Match */
  /* ---------------------------------- */

  if (budget.includes("luxury") && rating >= 4.6) {
    reasons.push("Premium experience match");
  }

  if (budget.includes("economy") && rating >= 4.0 && rating <= 4.6) {
    reasons.push("Great value for money");
  }

  /* ---------------------------------- */
  /* 👨‍👩‍👧 Traveling With */
  /* ---------------------------------- */
  

 
  if (travelingWith === "solo" && rating >= 4.3) {
  reasons.push("Great for solo travelers");
}


  if (travelingWith === "family" && rating >= 4.3) {
    reasons.push("Family-friendly choice");
  }

  if (travelingWith === "couple" && rating >= 4.5) {
    reasons.push("Perfect for couples");
  }

  if (
    (travelingWith === "friends" || travelingWith === "group") &&
    rating >= 4.2
  ) {
    reasons.push("Great for groups");
  }

  /* ---------------------------------- */
  /* 🎯 Trip Type Relevance */
  /* ---------------------------------- */

  const name = place.displayName?.text?.toLowerCase() ?? "";

  const typeKeywords: Record<string, string[]> = {
    adventures: ["adventure", "hike", "climb", "rafting"],
    "natural lovers": ["park", "lake", "forest", "trail"],
    "cultural enthusiasts": ["museum", "historic", "gallery", "temple"],
    nightlife: ["bar", "club", "pub"],
    festival: ["festival"],
    "sports enthusiast": ["stadium", "arena"],
    events: ["hall", "center", "theater"],
  };

  tripTypes.forEach((type) => {
    const keywords = typeKeywords[type];
    if (!keywords) return;

    if (keywords.some((word) => name.includes(word))) {
      reasons.push("Matches your trip interests");
    }
  });

  /* ---------------------------------- */
  /* 🎯 FINAL FILTER */
  /* ---------------------------------- */

  const uniqueReasons = [...new Set(reasons)];

  if (uniqueReasons.length > 0) {
  return uniqueReasons.slice(0, 2).join(" · ");
}

/* ---------------------------------- */
/* 🎯 Smart Personalized Fallback */
/* ---------------------------------- */

if (travelingWith === "solo") {
  return "Recommended for solo travelers";
}

if (travelingWith === "family") {
  return "Recommended for family trips";
}

if (travelingWith === "couple") {
  return "Recommended for couples";
}

if (travelingWith === "friends") {
  return "Recommended for trips with friends";
}

if (travelingWith === "group") {
  return "Recommended for group travel";
}

/* Budget fallback if somehow travelingWith missing */

if (budget.includes("luxury")) {
  return "Great choice for luxury travelers";
}

if (budget.includes("economy")) {
  return "Ideal for budget-conscious travelers";
}

return "Recommended based on your trip preferences";
};
  const fetchPlaces = async () => {
    try {
      const centerLat = inputLocation?.lat ?? props.latitude;
      const centerLng = inputLocation?.lng ?? props.longitude;

      const isStay = props.triggerName.toLowerCase().includes("stay");

let includedTypes: string[] = [];

if (isStay) {
  const travelingWith = props.travelingWith.toLowerCase();
  const budget = props.tripBudget.toLowerCase();

  /* ---------------------------------- */
  /* 🏨 Base Stay Types (VALID ONLY) */
  /* ---------------------------------- */

  includedTypes = ["lodging"]; // always include

  /* ---------------------------------- */
  /* 👤 SOLO */
  /* ---------------------------------- */

  if (travelingWith === "solo") {
    includedTypes.push("hostel", "motel");
  }

  /* ---------------------------------- */
  /* 👨‍👩‍👧 FAMILY */
  /* ---------------------------------- */

  else if (travelingWith === "family") {
    includedTypes.push( "campground","hotel", "rv_park");
  }

  /* ---------------------------------- */
  /* ❤️ COUPLE */
  /* ---------------------------------- */

  else if (travelingWith === "couple") {
    includedTypes.push("hotel");
  }

  /* ---------------------------------- */
  /* 🧑‍🤝‍🧑 FRIENDS / GROUP */
  /* ---------------------------------- */

  else if (travelingWith === "friends" || travelingWith === "group") {
   
  }

  else {
    includedTypes.push("hotel", "motel");
  }

  /* ---------------------------------- */
  /* 💰 Budget Refinement (VALID ONLY) */
  /* ---------------------------------- */

  if (budget.includes("economy")) {
    includedTypes.push("hostel", "motel", "campground");
  }

  if (budget.includes("luxury")) {
   
  }

  /* ---------------------------------- */
  /* 🧠 Remove duplicates */
  /* ---------------------------------- */

  includedTypes = [...new Set(includedTypes)];

} else {
  const tripTypes = props.tripTypes.map((t) => t.toLowerCase());

  /* ---------------------------------- */
  /* 🎯 Base Attractions */
  /* ---------------------------------- */

  includedTypes = [
    "tourist_attraction",
    "restaurant"
  ];

  /* ---------------------------------- */
  /* 🏛 Cultural */
  /* ---------------------------------- */

  if (tripTypes.includes("cultural")) {
    includedTypes.push(
      "museum",
      "art_gallery",
      "church",
      "mosque",
      "hindu_temple",
      "synagogue"
    );
  }

  /* ---------------------------------- */
  /* 🌿 Nature */
  /* ---------------------------------- */

  if (tripTypes.includes("nature")) {
    includedTypes.push(
      "park",
      "natural_feature",
      "zoo",
      "aquarium"
    );
  }

  /* ---------------------------------- */
  /* 🌙 Nightlife */
  /* ---------------------------------- */

  if (tripTypes.includes("nightlife")) {
    includedTypes.push(
      "bar",
      "night_club",
      "casino"
    );
  }

  /* ---------------------------------- */
  /* 🎢 Adventure */
  /* ---------------------------------- */

  if (tripTypes.includes("adventure")) {
    includedTypes.push(
      "amusement_park",
      "bowling_alley"
    );
  }

  /* ---------------------------------- */
  /* ⚽ Sports */
  /* ---------------------------------- */

  if (tripTypes.includes("sportsenthusiast")) {
    includedTypes.push(
      "stadium",
      "gym",
      "sports_complex"
    );
  }

  /* ---------------------------------- */
  /* 🎉 Events */
  /* ---------------------------------- */

  if (tripTypes.includes("events")) {
    includedTypes.push(
      "movie_theater",
      "performing_arts_theater",
      "event_venue"
    );
  }

  /* ---------------------------------- */
  /* 🧠 Remove duplicates */
  /* ---------------------------------- */

  includedTypes = [...new Set(includedTypes)];
}
      const response = await fetch(
        "https://places.googleapis.com/v1/places:searchNearby",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAP_API!,
            "X-Goog-FieldMask":
              "places.id,places.displayName,places.rating,places.location,places.websiteUri,places.googleMapsUri,places.shortFormattedAddress,places.types",
          },
          body: JSON.stringify({
            includedTypes,
            maxResultCount: 20,
            locationRestriction: {
              circle: {
                center: { latitude: Number(centerLat), longitude: Number(centerLng) },
                radius: 10000,
              },
            },
          }),
        }
      );

      const result = await response.json();
      let places = result.places || [];

       console.log('1aqui:',places)

      places = places
        .map((p: any) => {
          const km = haversineDistance(
            centerLat,
            centerLng,
            p.location.latitude,
            p.location.longitude
          );

          return {
            ...p,
            _distanceKm: km,
            _score: scorePlace({ ...p, _distanceKm: km }),
            _reason: buildReason({ ...p, _distanceKm: km }),
            category: props.triggerName.toLowerCase().includes("stay") ? getAccommodationCategory(p.types) :  getPlaceCategory(p.types),
            alreadyAdded: props.addedPlaces.some(
              (a) => a.id === p.id && a.pointId === props.selectedPlace.id
            ),
          } as ScoredPlace;
        }) 
        .sort((a:ScoredPlace, b:ScoredPlace) => b._score - a._score);

      setPlacesResult(places);

      console.log('aqui:',places)

      const placeIds = places.map((p : any) => p.id);
      if (placeIds.length) {
        const res = await fetch("/api/links/bulk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ placeIds }),
        });
        setAffiliateMap(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, [props.addedPlaces, inputLocation, props.triggerName]);

  const mapData = placesResult.slice(0, visibleCount).map((p) => ({
    id: p.id,
    name: p.displayName?.text ?? "",
    location: { lat: p.location.latitude, lng: p.location.longitude },
  }));

  useEffect(() => {
  const addedPlacesForMap: any[] = props.addedPlaces
    .filter(p => p.pointId === props.selectedPlace.id)
    .map(p => ({
      id: p.id,
      name: p.name,
      location: { lat: Number(p.latitude), lng: Number(p.longitude) },
      type: p.placeType, // "ACCOMMODATION" or "PLACE_TO_VISIT"
    }));

  setAddedStays(addedPlacesForMap.filter(p => p.type === "ACCOMMODATION"));
  setaddedVisits(addedPlacesForMap.filter(p => p.type === "PLACE_TO_VISIT"));
}, [props.addedPlaces, props.selectedPlace.id]);






  const handleSeeMore = () => setVisibleCount((prev) => prev + 5);

console.log('ree',addedStayss)



  return (
    <Dialog>
      <DialogTrigger  onClick={() => {
    props.onSubmitSuccess(false);
    localStorage.setItem("tripItineraryHintSeen", "true");
  }} className="bg-gray-400 rounded-md min-w-[260px] h-10 flex items-center justify-center w-full gap-7 p-5 cursor-pointer">
        <BsHouseAddFill fontSize="20px" />
        <div className="text-base font-medium">{props.triggerName}</div>
      </DialogTrigger>

      <DialogContent className="flex gap-2 h-[480px] w-[90%] sm:w-[70%] z-[60] sm:pl-4 mt-6" onOpenAutoFocus={(e) => e.preventDefault()}>
        <div className="sm:w-full 950:w-[70%]">
          <DialogTitle>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}>
              <LocationInput
                inputName=""
                lat={props.latitude}
                lng={props.longitude}
                addedPlaces={props.addedPlaces}
                triggerName={props.triggerName}
                selectedPlace={props.selectedPlace}
                setLocation={setInputLocation}
              />
            </APIProvider>
          </DialogTitle>

          <div className="w-full flex gap-2 flex-col h-[345px] pt-2 pr-2 overflow-auto mt-2">
            <TripContextChips
              travelingWith={props.travelingWith}
              tripBudget={props.tripBudget}
              tripTypes={props.tripTypes}
            />

            {placesResult.slice(0, visibleCount).map((place, index) => {
              const affiliateData = affiliateMap[place.id];
              const priceLabel = affiliateData?.pricePerDay
                ? 
                  (affiliateData.pricePerDay, affiliateData.currency)
                : null;
              const fallbackLabel = getFallbackPriceLabel(props.tripBudget);

              return (
                <Placecomponent
                  key={place.id}
                  tripId={props.selectedPlace.tripId}
                  pointId={props.selectedPlace.id}
                  placeId={place.id}
                  category={ place.category}
                  index={index}
                  description={place._reason}
                  longitude={place.location.longitude}
                  latitude={place.location.latitude}
                  type={props.triggerName.toLowerCase().includes("stay") ? "ACCOMMODATION" : "PLACE_TO_VISIT"}
                  rating={place.rating ?? 0}
                  address={place.shortFormattedAddress ?? ""}
                  displayName={place.displayName?.text || ""}
                  link={affiliateData?.affiliate_url || place.websiteUri || place.googleMapsUri}
                  priceLabel={priceLabel ?? fallbackLabel}
                  hasExactPrice={!!priceLabel}
                  alreadyAdded={place.alreadyAdded}
                  googleMapsUri={place.googleMapsUri}
                />
              );
            })}

            {visibleCount < placesResult.length && (
              <div className="flex justify-center mt-3">
                <button
                  onClick={handleSeeMore}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                >
                  See more
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="hidden 950:flex w-[50%] mt-7 h-[407px]">
          <Mapprovider
            cyrclesArr={props.cyrclesArr}
            focusplace={{ lat: props.latitude, lng: props.longitude }}
            recommendedStays={props.triggerName.toLowerCase().includes("stay") ? mapData : []}
            recommendedVisits={props.triggerName.toLowerCase().includes("visit") ? mapData : []}
            addedplacetovisit={addedVisitss ?? []}
            addedplacetostay={addedStayss ?? []}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Addaplace;
