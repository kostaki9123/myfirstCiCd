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

  const scorePlace = (place: any) => {
    let score = 0;
    const rating = place.rating ?? 0;
    const km = place._distanceKm;

    score += distanceScore(km);
    if (rating >= 4.5) score += 10;
    else if (rating >= 4.2) score += 7;
    else if (rating >= 4.0) score += 4;
    else score -= 6;

    if (props.tripBudget === "economy" && rating >= 4.7) score -= 8;
    if (props.tripBudget === "luxury" && rating < 4.2) score -= 12;

    if (props.travelingWith === "family" && km < 3 && rating >= 4.2)
      score += 4;

    return score;
  };

  const buildReason = (place: any) => {
    if (place._distanceKm < 1 && place.rating >= 4.5)
      return "Excellent location · Top reviews";
    if (place._distanceKm < 3) return "Great location near your plan";
    if (place.rating >= 4.5) return "Highly rated by travelers";
    return "Good value for this area";
  };

  const fetchPlaces = async () => {
    try {
      const centerLat = inputLocation?.lat ?? props.latitude;
      const centerLng = inputLocation?.lng ?? props.longitude;

      const isStay = props.triggerName.toLowerCase().includes("stay");
      const includedTypes = isStay
        ? ["hotel", "lodging"]
        : ["tourist_attraction", "museum", "park"];

      const response = await fetch(
        "https://places.googleapis.com/v1/places:searchNearby",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAP_API!,
            "X-Goog-FieldMask":
              "places.id,places.displayName,places.rating,places.location,places.websiteUri,places.googleMapsUri,places.shortFormattedAddress",
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
            alreadyAdded: props.addedPlaces.some(
              (a) => a.id === p.id && a.pointId === props.selectedPlace.id
            ),
          } as ScoredPlace;
        }) 
        .sort((a:ScoredPlace, b:ScoredPlace) => b._score - a._score);

      setPlacesResult(places);

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

  const handleSeeMore = () => setVisibleCount((prev) => prev + 5);

  return (
    <Dialog>
      <DialogTrigger className="bg-gray-400 rounded-md min-w-[260px] h-10 flex items-center justify-center w-full gap-7 p-5 cursor-pointer">
        <BsHouseAddFill fontSize="20px" />
        <div className="text-base font-medium">{props.triggerName}</div>
      </DialogTrigger>

      <DialogContent className="flex gap-2 h-[480px] w-[90%] sm:w-[70%] z-[60] sm:pl-4 mt-6">
        <div className="sm:w-full 950:w-[70%]">
          <DialogTitle>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}>
              <LocationInput
                inputName=""
                lat={props.latitude}
                lng={props.longitude}
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
                ? formatPrice(affiliateData.pricePerDay, affiliateData.currency)
                : null;
              const fallbackLabel = getFallbackPriceLabel(props.tripBudget);

              return (
                <Placecomponent
                  key={place.id}
                  tripId={props.selectedPlace.tripId}
                  pointId={props.selectedPlace.id}
                  placeId={place.id}
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
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Addaplace;
