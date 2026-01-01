"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BsHouseAddFill } from "react-icons/bs";
import { MdAddCircle } from "react-icons/md";
import Placecomponent from "./placecomponent";
import LocationInput from "./inputauto";
import { APIProvider } from "@vis.gl/react-google-maps";
import Mapprovider from "@/app/component/map/map-provider";
import { ItineraryPoint } from "./itineraryboard";
import { Place } from "../../../../../../../backend/entities/models/place";


// Lodging types dropdown options
const lodgingTypes = [
  { label: "Hotel", value: "hotel" },
  { label: "Hostel", value: "hostel" },
  { label: "Motel", value: "motel" },
  { label: "Guest House", value: "guest_house" },
  { label: "Resort", value: "resort" },
  { label: "Lodging", value: "lodging" },
  { label: "Campground", value: "campground" },
];


type props = {
  selectedPlace: ItineraryPoint
  latitude: number;
  longitude: number;
  cyrclesArr: any;
  triggerName: string;
  descriptionName: string;
  addedPlaces : Place[]
};

type AffiliateMap = Record<
  string,
  { affiliate_url: string; source?: string } | null
>;

const Addaplace = (props: props) => {
  const [placesResult, setPlacesResult] = useState<any[]>([]);
  const [affiliateMap, setAffiliateMap] = useState<AffiliateMap>({});
  const [inputLocation, setinputLocation] = useState<any>();
  const [selectedType, setSelectedType] = useState<string>("hotel");
  const [loading, setLoading] = useState(false);
  const [requestCount, setRequestCount] = useState<number>(0);
  const maxRequests = 5;

  let LatLng = { lat: props.latitude , lng: props.longitude } 

  const mergeAlreadyVisited = (results: any[]) => {
    return results.map((place) => ({
      ...place,
      alreadyAdded: props.addedPlaces.some(
        (p) => p.id === place.id && p.pointId === props.selectedPlace.id
      ),
    }));
    };

  const fetchPlaces = async () => {
    if (requestCount >= maxRequests) {
      alert(`You have reached the maximum of ${maxRequests} searches.`);
      return;
    }

    try {
      setLoading(true);

      if (props.triggerName === "Add a place to visit") {
        if (props.triggerName === "Add a place to visit") {
               const response = await fetch(
                 "https://places.googleapis.com/v1/places:searchNearby",
                 {
                   method: "POST",
                   headers: {
                     "Content-Type": "application/json",
                     "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAP_API!,
                     "X-Goog-FieldMask":
                       "places.id,places.displayName,places.rating,places.primaryTypeDisplayName,places.location,places.websiteUri,places.googleMapsUri,places.shortFormattedAddress",
                   },
                   body: JSON.stringify({
                     includedTypes: [
                       "tourist_attraction",
                       "museum",
                       "art_gallery",
                       "park",
                       "zoo",
                       "amusement_park",
                       "historical_landmark",
                     ],
                     maxResultCount: 9,
                     locationRestriction: {
                       circle: {
                         center: {
                           latitude: Number(props.latitude),
                           longitude: Number(props.longitude),
                         },
                         radius: 10000,
                       },
                     },
                   }),
                 }
               );
              
               const result = await response.json();
               let places = result.places || [];
               places = mergeAlreadyVisited(places); 
               setPlacesResult(places);
               setRequestCount((prev) => prev + 1);

               
              
               // ✅ BULK affiliate lookup (όπως σωστά κάνεις)
               const placeIds = places.map((p: any) => p.id);
              
               if (placeIds.length) {
                 const res = await fetch("/api/links/bulk", {
                   method: "POST",
                   headers: { "Content-Type": "application/json" },
                   body: JSON.stringify({ placeIds }),
                 });
              
                 const affiliateData = await res.json();
                 
                 setAffiliateMap(affiliateData);
               }
          }

      } else {
        // --- Google Places ---
        const response = await fetch(
          "https://places.googleapis.com/v1/places:searchNearby",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAP_API!,
              "X-Goog-FieldMask":
                "places.id,places.displayName,places.rating,places.primaryTypeDisplayName,places.location,places.websiteUri,places.googleMapsUri,places.shortFormattedAddress",
            },
            body: JSON.stringify({
              includedTypes: [selectedType],
              maxResultCount: 9,
              locationRestriction: {
                circle: {
                  center: {
                    latitude: Number(props.latitude),
                    longitude: Number(props.longitude),
                  },
                  radius: 10000,
                },
              },
            }),
          }
        );

        const result = await response.json();
        let places = result.places || [];
        places = mergeAlreadyVisited(places);
        setPlacesResult(places);
        setRequestCount((prev) => prev + 1);

        // ✅ BULK affiliate lookup
        const placeIds = places.map((p: any) => p.id);

        if (placeIds.length) {
          const res = await fetch("/api/links/bulk", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ placeIds }),
          });

          const affiliateData = await res.json();
          setAffiliateMap(affiliateData);
        }
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  // ✅ URL resolver
  const resolveUrl = (place: any) =>
    affiliateMap[place.id]?.affiliate_url ||
    place.websiteUri ||
    place.googleMapsUri;

    console.log(placesResult ,'affiliate', affiliateMap )


  //For map component
  const reccomendedforMapPlaces = placesResult.map(place => ({
    id: place.id,
    location: { lat: place.location.latitude ,
                lng: place.location.longitude
               },
    name: place.displayName?.text ?? "",
   }));

  return (
    <Dialog>
      <DialogTrigger className="bg-gray-400 rounded-md min-w-[260px] h-10 flex items-center justify-center w-full gap-7 p-5 cursor-pointer">
        {props.triggerName === "Add a place to stay" ? (
          <BsHouseAddFill fontSize="20px" />
        ) : (
          <MdAddCircle fontSize="20px" />
        )}
        <div className="text-base font-medium">{props.triggerName}</div>
      </DialogTrigger>

      <DialogContent className="flex gap-2 h-[480px] w-[90%] sm:w-[70%] min-w-[320px] z-[60] sm:pl-4 mt-6">
        <div className="sm:w-full 950:w-[70%]">
          <DialogTitle>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}>
              <LocationInput
                inputName=""
                setLocation={setinputLocation}
                deafultValue={undefined}
              />
            </APIProvider>
          </DialogTitle>

          {props.triggerName === "Add a place to stay" && (
            <div className="mt-3 px-2 flex items-center gap-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-[140px] border border-gray-300 rounded-md p-2 text-sm"
              >
                {lodgingTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              <button
                onClick={fetchPlaces}
                className="px-3 py-2 bg-blue-500 text-white rounded-md text-sm"
              >
                {loading
                  ? "Loading..."
                  : `Search (${requestCount}/${maxRequests})`}
              </button>
            </div>
          )}

          <div className="w-full flex gap-2 flex-col h-[345px] pt-2 pr-2 overflow-auto">
            <div className="text-sm sm:text-md pl-2">
              {props.descriptionName}
            </div>

            {placesResult.map((place: any, index: number) => (
              <div key={index} className="relative">
                <Placecomponent
                  tripId={props.selectedPlace.tripId}
                  pointId={props.selectedPlace.id}
                  placeId={place.id}
                  index={index}
                  description={place.description ?? ""}
                  longitude={place.location?.longitude ?? 0}
                  latitude={place.location?.latitude ?? 0}
                  type={props.triggerName === "Add a place to visit" ? 'PLACE_TO_VISIT' :'ACCOMMODATION'}
                  rating={place.rating ?? 0}
                  address={place.shortFormattedAddress ?? ""}
                  displayName={place.displayName?.text || "Unknown"}
                  link={resolveUrl(place)}
                  alreadyAdded={place.alreadyAdded} // ✅ pass this
                />
              </div>
            ))}
          </div>
        </div>
        <div className="border-2 border-pink-700 hidden 950:flex w-[50%] mt-7 h-[407px] z-50 cursor-pointer"> 
          <Mapprovider
          cyrclesArr={props.cyrclesArr}
          focusplace={LatLng}
          recommendedStays={props.triggerName === "Add a place to visit" ? [] : reccomendedforMapPlaces }
          recommendedVisits={props.triggerName === "Add a place to visit" ? reccomendedforMapPlaces : []}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Addaplace;
