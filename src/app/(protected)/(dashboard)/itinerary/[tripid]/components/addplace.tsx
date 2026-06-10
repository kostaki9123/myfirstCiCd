'use client';

import { useEffect, useState } from "react";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { APIProvider } from "@vis.gl/react-google-maps";
import { IoAddCircleSharp } from "react-icons/io5";


import { Place } from "../../../../../../../backend/entities/models/place";
import { ItineraryPoint } from "./itineraryboard";
import LocationInput from "./inputauto";
import TripContextChips from "./tripContextChips";
import Placecomponent from "./placecomponent";
import Mapprovider from "@/app/component/map/map-provider";
import { RecommendedPlace } from "@/app/component/map/map";
import { PlaceforMap } from "./itineraryClient";

type Props = {
  selectedPlace: ItineraryPoint;
  latitude: number;
  longitude: number;
  cyrclesArr: any;
  triggerName: string;
  descriptionName: string;
  addedPlaces: Place[];
  addedStaysForMap: PlaceforMap[]
  addedVisitsForMap: PlaceforMap[]
  travelingWith: TripWith;
  tripBudget: TripBudget;
  tripTypes: TripType[];
  onSubmitSuccess?: (success: boolean) => void;
};

export type TripWith =
  | "Solo"
  | "Friends"
  | "Couple"
  | "Family"
  | "Group"


export type TripBudget =
  | "Economy traveler"
  | "Balanced traveler"
  | "Luxury traveler"


export type TripType =
  | "Adventures"
  | "Cultural Enthusiast"
  | "Natural lovers"
  | "Nightlife"
  | "Festival"
  | "Sports Enthusiast"
  | "Events"

const Addaplace = (props: Props) => {
  const [placesResult, setPlacesResult] = useState<any[]>([]);
  const [inputLocation, setInputLocation] = useState<any>();
  const [visibleCount, setVisibleCount] = useState(10);

  const [loding, setloading] = useState<Boolean>(false);

  const [debouncedLocation] = useState(inputLocation);

  const [activePlaceIndex, setActivePlaceIndex] = useState(0);

// The focused place, ready to pass to Mapprovider when prop is ready

  const fetchPlaces = async () => {
       setloading(true)
    try {
      const centerLat = debouncedLocation?.lat ?? props.latitude;
      const centerLng = debouncedLocation?.lng ?? props.longitude;

      const isStay = props.triggerName
        .toLowerCase()
        .includes("stay");

      let includedTypes: string[] = [];

      const travelingWith: TripWith = props.travelingWith;
      const tripbudget: TripBudget = props.tripBudget;
      const tripType: TripType[] = props.tripTypes;

      // =========================
      // STAYS
      // =========================
      if (isStay) {
        includedTypes = ["lodging"];

        if (travelingWith === "Solo") {
          includedTypes.push("rv_park");
        }

        if (travelingWith === "Family") {
          includedTypes.push("rv_park");
        }

        if (travelingWith === "Couple") {
          includedTypes.push("rv_park", "campground");
        }

        if (
          travelingWith === "Friends" ||
          travelingWith === "Group"
        ) {
          includedTypes.push("rv_park", "campground");
        }

        if (tripType.includes("Adventures")) {
          includedTypes.push("rv_park", "campground");
        }

        if (tripType.includes("Natural lovers")) {
          includedTypes.push("rv_park", "campground");
        }
      }

      // =========================
      // VISITS
      // =========================
      else {
        includedTypes = [
          "tourist_attraction",
          "museum",
          "park",
          "amusement_park",
          "zoo",
          "aquarium",
          "restaurant",
          "cafe",
          "bar",
          "night_club",
        ];

        if (tripType.includes("Adventures")) {
          includedTypes.push(
            "amusement_park",
            "bowling_alley",
            "stadium"
          );
        }

        if (tripType.includes("Cultural Enthusiast")) {
          includedTypes.push(
            "museum",
            "art_gallery",
            "church",
            "mosque",
            "synagogue"
          );
        }

        if (tripType.includes("Events")) {
          includedTypes.push(
            "stadium",
            "movie_theater"
          );
        }

        if (tripType.includes("Festival")) {
          includedTypes.push(
            "park",
            "stadium",
            "tourist_attraction"
          );
        }

        if (tripType.includes("Natural lovers")) {
          includedTypes.push(
            "park",
            "zoo",
            "aquarium"
          );
        }

        if (tripType.includes("Nightlife")) {
          includedTypes.push(
            "bar",
            "night_club",
            "casino"
          );
        }

        if (tripType.includes("Sports Enthusiast")) {
          includedTypes.push(
            "stadium",
            "gym",
            "bowling_alley"
          );
        }
      }

      includedTypes = [...new Set(includedTypes)];

      const cacheKey = `${centerLat}-${centerLng}-${includedTypes.join(",")}`;

      sessionStorage.removeItem(cacheKey);

      const cached = sessionStorage.getItem(cacheKey);

      if (cached) {
        setPlacesResult(JSON.parse(cached));
        return;
      }

      const response = await fetch("/api/places/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: centerLat,
          lng: centerLng,
          types: [],
        }),
      });

      const result = await response.json();

      let places = result.results || [];

      if (!places.length) {
        setPlacesResult([]);
        return;
      }


      const compound_code =
      places.find((place: any )=> place?.plus_code?.compound_code)
        ?.plus_code?.compound_code || "";
        console.log('compound_code:',compound_code)

     const cityName = compound_code
         ?.replace(/"/g, "")
         ?.split(" ")?.[1]
         ?.replace(",", "");

     console.log('extract',cityName)

      const accomodationOrPLaces = isStay
        ? "ACCOMMODATION"
        : "PLACE_TO_VISIT";

      const res = await fetch("/api/links/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          places,
          cityName,
          tripbudget,
          tripType,
          travelingWith,
          accomodationOrPLaces,
        }),
      });

      const data = await res.json();

      console.log(data , 'dataa')

      places = data.data.map((p: any) => ({
        ...p,
        alreadyAdded: props.addedPlaces.some(
          (a) =>
            a.id === p.place_id &&
            a.pointId === props.selectedPlace.id
        ),
        googleMapsUri: `https://www.google.com/maps/place/?q=place_id:${p.place_id}`,
        category: p.TypeOflodgindOrPlace
      }));

      sessionStorage.setItem(
        cacheKey,
        JSON.stringify(places)
      );

      console.log('ddd',places)
      if(places.length === 0){
         setPlacesResult([])
      }else{
      setPlacesResult(places);
      }
      setloading(false)
  
    } catch (err) {

      setloading(false)
      console.error("fetchPlaces error:", err);
    }
  };

  const mapData = placesResult
    .slice(0, visibleCount)
    .map((p: any) => ({
      id: p.place_id,
      name: p.displayName?.text || p.name,
      location: {
         lat: Number(
         p.geometry?.location?.lat ?? p.latitude
       ),
       
       lng: Number(
         p.geometry?.location?.lng ?? p.longitude
       ),  
   }
    }));

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

const activeFocusPlace = mapData[activePlaceIndex]?.location?.lat && mapData[activePlaceIndex]?.location?.lng
  ? {
      lat: mapData[activePlaceIndex].location.lat,
      lng: mapData[activePlaceIndex].location.lng,
    }
  : undefined;

  useEffect(() => {
  console.log("Active place index:", activePlaceIndex);
}, [activePlaceIndex]);

  return (
    <Dialog>
      <DialogTrigger
        onClick={() => {
          props.onSubmitSuccess?.(false);

          if (typeof window !== "undefined") {
            localStorage.setItem(
              "tripItineraryHintSeen",
              "true"
            );
          }

          fetchPlaces();
        }}
        className="bg-white/10 hover:bg-white/5 rounded-md min-w-[260px] h-10 flex items-center justify-center w-full gap-7 p-5 cursor-pointer"
      >
        <IoAddCircleSharp fontSize="20px" />

        <div className="text-base font-medium">
          {props.triggerName}
        </div>
      </DialogTrigger>

      <DialogContent
        className="flex flex-col-reverse 950:flex-row gap-2  950:h-[480px] w-[90%] sm:w-[70%] z-[60] sm:pl-4 mt-6 bg-[#010038] border border-white/10 text-white"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        
        <div className="sm:w-full 950:w-[70%]">
          <DialogTitle>
            <APIProvider
              apiKey={
                process.env.NEXT_PUBLIC_GOOGLE_MAP_API!
              }
            >
              <LocationInput
                inputName=""
                placeholder={props.triggerName
                      .toLowerCase()
                      .includes("stay")
                      ? 'Add custom accommodation'
                      : 'Add custom place'}
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
              tripTypes={props.tripTypes}/>

        { loding ?
          <div className="flex justify-center items-center h-32">
                  <span className="text-gray-500">Loading...</span>
          </div>
          : 
           <> {placesResult.length === 0 &&
              <div className="flex justify-center items-center h-32  w-full">
                      <span className="text-white/70 text-center max-w-[60%]  ">No recommendations available yet — 
                      coming soon.You can add places manually in the meantime.</span>
              </div>
              }
              {placesResult
              .slice(0, visibleCount)
              .map((place: any, index: number) => (
                <Placecomponent
                  key={index}
                  onVisible={(i) => setActivePlaceIndex(i)}
                  tripId={props.selectedPlace.tripId}
                  pointId={props.selectedPlace.id}
                  placeId={place.place_id ?? place.id}
                  category={place.category}
                  index={index}
                  description={place.description  }
                  longitude={
                    place.location?.longitude ??
                    place.longitude ??
                    place.geometry?.location?.lng
                  }
                  latitude={
                    place.location?.latitude ??
                    place.latitude ??
                    place.geometry?.location?.lat
                  }
                  LocationComments={place.LocationComments}
                  type={
                    props.triggerName
                      .toLowerCase()
                      .includes("stay")
                      ? "ACCOMMODATION"
                      : "PLACE_TO_VISIT"
                  }
                  Priceperday={place.Priceperday}
                  rating={place.Rating ?? 0}
                  address={
                    place.shortFormattedAddress ?? ""
                  }
                  displayName={
                    place.name
                  }
                  affiliatelink={place?.affiliate_url
                     || place.googleMapsUri}
                  priceLabel={place.Priceperday}
                  alreadyAdded={place.alreadyAdded}
                  googleMapsUri={place.googleMapsUri}
                  photoreference={place.PhotoUrl}
                />
              ))}
              {visibleCount < placesResult.length && (
                <div className="flex justify-center mt-3">
                  <button
                    onClick={handleSeeMore}
                    className="px-4 py-2 bg-white/10 rounded text-white text-sm"
                  >
                    See more
                  </button>
                </div>
              )}
          </>  
        }   
          </div>
        </div>

        <div className=" 950:flex max-h-64  w-full 950:max-h-none 950:w-[50%] mt-7 h-[407px]">
          <Mapprovider
            cyrclesArr={props.cyrclesArr}
            focusplace={{
              lat: props.latitude,
              lng: props.longitude,
            }}
            recommendedStays={
              props.triggerName
                .toLowerCase()
                .includes("stay")
                ? mapData
                : []
            }
            recommendedVisits={
              props.triggerName
                .toLowerCase()
                .includes("visit")
                ? mapData
                : []
            }
            
            activePlace={activeFocusPlace}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Addaplace;