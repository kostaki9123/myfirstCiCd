'use client'

import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Place } from "../../../../../../../backend/entities/models/place";
import { ItineraryPoint } from "./itineraryboard";
import { BsHouseAddFill } from "react-icons/bs";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { APIProvider } from "@vis.gl/react-google-maps";
import LocationInput from "./inputauto";
import TripContextChips from "./tripContextChips";
import Placecomponent from "./placecomponent";
import Mapprovider from "@/app/component/map/map-provider";
import { useState } from "react";
import { RecommendedPlace } from "@/app/component/map/map";

type Props = {
  selectedPlace: ItineraryPoint;
  latitude: number;
  longitude: number;
  cyrclesArr: any;
  triggerName: string;
  descriptionName: string;
  addedPlaces: Place[];
  travelingWith: TripWith;
  tripBudget: TripBudget;
  tripTypes: TripType[];
  onSubmitSuccess?: (success: boolean) => void; //fix it later
};

export type TripWith = "Solo" | "Friends" | "Couple" |  "Family" | "Group"
export type TripBudget = "Economy traveler" | "Balanced traveler" | "Luxury traveler"
export type TripType = "Adventures"| "Cultural Enthusiast"| "Natural lovers"| "Nightlife"| "Festival"| "Sports Enthusiast"| "Events"


const AddPlace = (props: Props) => {
      const [placesResult, setPlacesResult] = useState<any[]>([]);
      const [inputLocation, setInputLocation] = useState<any>();
      const [visibleCount, setVisibleCount] = useState(10);
      const [addedStayss, setAddedStays] = useState<RecommendedPlace[]>([]);
      const [addedVisitss, setaddedVisits] = useState<RecommendedPlace[]>([]);
      const [debouncedLocation, setDebouncedLocation] = useState(inputLocation);


const fetchPlaces = async () => {

    const centerLat = debouncedLocation?.lat ?? props.latitude;
    const centerLng = debouncedLocation?.lng ?? props.longitude;

    const isStay = props.triggerName.toLowerCase().includes("stay");

    let includedTypes: string[] = [];

     const travelingWith: TripWith = props.travelingWith
      const tripbudget: TripBudget = props.tripBudget
      const tripType : TripType[] = props.tripTypes
   
    if (isStay) {
      //Keyword for reccomended accomodation

      includedTypes = ['lodging',]; // always include. 'rv_park','campground'

      if (travelingWith === "Solo") {
        includedTypes.push("rv_park");
      } else if (travelingWith === "Family") {
        includedTypes.push("rv_park");
      } else if (travelingWith === "Couple") {
        includedTypes.push("rv_park",'campground');
      } else if (travelingWith === "Friends" || travelingWith === "Group") {
        includedTypes.push("rv_park",'campground');
      }

      //den mporoume na prosthesoume keyword gia budget status

      if (tripType.includes('Adventures')) {
        includedTypes.push("rv_park",'campground');
      } else if (tripType.includes('Natural lovers')) {
        includedTypes.push("rv_park",'campground');
       
    } else {
      //Keyword for reccomended places to visit 
      let includedTypes = ["tourist_attraction","museum","park","amusement_park","zoo","aquarium",
          "restaurant","cafe","bar","night_club",
        ];

               // 🧗 Adventures
               if (tripType.includes("Adventures")) {
                 includedTypes.push("amusement_park","bowling_alley","stadium"
                 );
               }
               
               // 🏛 Cultural
               if (tripType.includes("Cultural Enthusiast")) {
                 includedTypes.push("museum","art_gallery","church","mosque","synagogue"
                 );
               }
               
               // 🎟 Events
               if (tripType.includes("Events")) {
                 includedTypes.push("stadium","movie_theater"
                 );
               }
               
               // 🎉 Festival
               if (tripType.includes("Festival")) {
                 includedTypes.push("park","stadium","tourist_attraction"
                 );
               }
               
               // 🌿 Nature
               if (tripType.includes("Natural lovers")) {
                 includedTypes.push("park","zoo","aquarium"
                 );
               }
               
               // 🌙 Nightlife
               if (tripType.includes("Nightlife")) {
                 includedTypes.push("bar","night_club","casino"
                 );
               }
               
               // ⚽ Sports
               if (tripType.includes("Sports Enthusiast")) {
                 includedTypes.push(  "stadium",  "gym",  "bowling_alley"
                 );
               }
        }
         // ✅ remove duplicates
         includedTypes = [...new Set(includedTypes)];
    }

    const cacheKey = `${centerLat}-${centerLng}-${includedTypes.join(",")}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      setPlacesResult(JSON.parse(cached));
      return;
    }

    console.log('incuded types before req accomodation :' ,includedTypes)
    // ✅ UPDATED FETCH: call your Next.js API route instead of exposing API key
    const response = await fetch("/api/places/search", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
         lat: centerLat,
         lng: centerLng,
         types: includedTypes, // this can be an array
       }),
     });

    const result = await response.json();
    let places = result.results; // legacy API uses "results"

    console.log('places after req:',places)

    //extract city name 
    let compound_code = places[0].plus_code.compound_code
    let cityName = compound_code.replace(/"/g, '').split(' ')[1].replace(',', '');

    console.log('cityName:',cityName)

    //accomodation or place to visit
    let accomodationOrPLaces =  isStay ? 'ACCOMMODATION' : 'PLACE_TO_VISIT'

    //data we need to send ,20[] places,cityname,tripbudget,tripTyoe,Tripwith,for accomodation or places to visit 
    const res  = await fetch("/api/links/bulk", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
         places,
         cityName, 
         tripbudget,
         tripType,
         travelingWith,   
         accomodationOrPLaces
        }),
     });
  

     const data = await res.json();

      console.log(data);

      setPlacesResult(places)

     places = data.data
      .map((p: any) => {
    return {
      ...p,
      alreadyAdded: props.addedPlaces.some(
        (a) => a.id === p.place_id && a.pointId === props.selectedPlace.id
      ),
      googleMapsUri: `https://www.google.com/maps/place/?q=place_id:${p.place_id}`,
    } 
  })

   const mapData = placesResult.slice(0, visibleCount).map((p) => ({
    id: p.place.place_id,
    name: p.name ,
    location: { lat: p.lat, lng: p.lng },
  }));

    const handleSeeMore = () => setVisibleCount((prev) => prev + 5);

 return (     
     <Dialog>
           <DialogTrigger 
              onClick={() => {
                props.onSubmitSuccess!(false);   
                if (typeof window !== "undefined") {
                  localStorage.setItem("tripItineraryHintSeen", "true");
                  setPlacesResult(placesResult);
                }
               }}
              className="bg-gray-400 rounded-md min-w-[260px] h-10 flex items-center justify-center w-full gap-7 p-5 cursor-pointer">
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
     
                 {places.map((place:any, index:any) => {
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
                       affiliatelink={place?.affiliate_url }
                       priceLabel={place.Priceperday}
                       alreadyAdded={place.alreadyAdded}
                       googleMapsUri={place.googleMapsUri}
                       photoreference={place.PhotoUrl}
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
}}
 export default AddPlace