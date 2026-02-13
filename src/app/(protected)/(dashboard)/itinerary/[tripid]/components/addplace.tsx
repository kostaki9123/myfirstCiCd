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

type TravelWith = "family" | "friends" | "solo" | "couple";
type TripBudget = "economy" | "balanced" | "luxury";
type TripType = "cultural" | "nature" | "nightlife" | "adventure";

const tripContext: {
  travelingWith: TravelWith;
  tripBudget: TripBudget;
  tripType: TripType;
} = {
  travelingWith: "family",
  tripBudget: "balanced",
  tripType: "cultural",
};

const tripLabels = {
  travelingWith: {
    family: { label: "Family trip", icon: "👨‍👩‍👧‍👦" },
    friends: { label: "With friends", icon: "🧑‍🤝‍🧑" },
    solo: { label: "Solo traveler", icon: "🧍" },
    couple: { label: "Couple getaway", icon: "❤️" },
  } as Record<TravelWith, { label: string; icon: string }>,
  tripBudget: {
    economy: { label: "Budget-friendly", icon: "💰" },
    balanced: { label: "Balanced budget", icon: "⚖️" },
    luxury: { label: "Luxury stay", icon: "✨" },
  } as Record<TripBudget, { label: string; icon: string }>,
  tripType: {
    cultural: { label: "Cultural focus", icon: "🏛" },
    nature: { label: "Nature focused", icon: "🌿" },
    nightlife: { label: "Nightlife", icon: "🌙" },
    adventure: { label: "Adventure", icon: "🧗" },
  } as Record<TripType, { label: string; icon: string }>,
};

type Props = {
  selectedPlace: ItineraryPoint;
  latitude: number;
  longitude: number;
  cyrclesArr: any;
  triggerName: string;
  descriptionName: string;
  addedPlaces: Place[];
};

type AffiliateMap = Record<
  string,
  {
    affiliate_url: string;
    pricePerDay: number | null;
    currency?: "EUR" | "USD";
  } | null
>;

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

const TripContextChips = () => {
  const chips = [
    tripLabels.travelingWith[tripContext.travelingWith],
    tripLabels.tripBudget[tripContext.tripBudget],
    tripLabels.tripType[tripContext.tripType],
  ];

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
   COMPONENT
----------------------------------- */

const Addaplace = (props: Props) => {
  const [placesResult, setPlacesResult] = useState<any[]>([]);
  const [affiliateMap, setAffiliateMap] = useState<AffiliateMap>({});
  const [inputLocation, setInputLocation] = useState<any>();
  const [loading, setLoading] = useState(false);

  const [visibleCount, setVisibleCount] = useState(10); // Show 10 by default

  const scorePlace = (place: any) => {
    let score = 0;
    const rating = place.rating ?? 0;
    const km = place._distanceKm;

    score += distanceScore(km);
    if (rating >= 4.5) score += 10;
    else if (rating >= 4.2) score += 7;
    else if (rating >= 4.0) score += 4;
    else score -= 6;

    if (tripContext.tripBudget === "economy" && rating >= 4.7) score -= 8;
    if (tripContext.tripBudget === "luxury" && rating < 4.2) score -= 12;

    if (tripContext.travelingWith === "family" && km < 3 && rating >= 4.2)
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
      setLoading(true);

      const centerLat = inputLocation?.lat ?? props.latitude;
      const centerLng = inputLocation?.lng ?? props.longitude;

      // Determine type: stay or visit
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
            maxResultCount: 20, // fetch more so “see more” works
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

          const score = scorePlace({ ...p, _distanceKm: km });
          const reason = buildReason({ ...p, _distanceKm: km });

          return {
            ...p,
            _distanceKm: km,
            _score: score,
            _reason: reason,
            alreadyAdded: props.addedPlaces.some(
              (a) => a.id === p.id && a.pointId === props.selectedPlace.id
            ),
          };
        })
        .sort((a: any, b: any) => b._score - a._score);

      setPlacesResult(places);

      const placeIds = places.map((p: any) => p.id);

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
    } finally {
      setLoading(false);
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

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

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
                setLocation={setInputLocation}
                deafultValue={undefined}
              />
            </APIProvider>
          </DialogTitle>

          <div className="w-full flex gap-2 flex-col h-[345px] pt-2 pr-2 overflow-auto  mt-2">
            <TripContextChips />

            {placesResult.slice(0, visibleCount).map((place, index) => {
              const affiliateData = affiliateMap[place.id];
              const priceLabel = affiliateData
                ? affiliateData.pricePerDay
                  ? formatPrice(affiliateData.pricePerDay, affiliateData.currency)
                  : null
                : null;
              const fallbackLabel = getFallbackPriceLabel(tripContext.tripBudget);

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
            focusplace={{
              lat: props.latitude,
              lng: props.longitude,
            }}
            recommendedStays={props.triggerName.toLowerCase().includes("stay") ? mapData : []}
            recommendedVisits={props.triggerName.toLowerCase().includes("visit") ? mapData : []}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Addaplace;
