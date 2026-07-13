  'use client';

  import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
  import Placesdropdown from './placesdropdown';
  import Addaplace, { TripBudget, TripType, TripWith } from './addplace';
  import PlaceToStayCard from './PlaceToStayCard';
  import PlaceToVisitCard from './PlaceToVisitCard';
  import { Place } from '../../../../../../../backend/entities/models/place';
  import { PlaceforMap, Trip } from './itineraryClient';
import { DateMenubar } from './DateMenubar';
import ViewModeDropdown from './viewmodedropdown';

  export interface ItineraryPoint {
    id: string;
    tripId: string;
    role: 'POINT' | 'MOVING_BOX';
    index: number;

    placeName?: string | null;
    placeAddress?: string;
    placeId?: string;
    placeLat?: number | null;
    placeLng?: number | null;
    startDate?: Date | null;
    endDate?: Date | null;

    fromName?: string | null;
    toName?: string | null;
    transportType?: string | null;
  }

  type Props = {
    cyrclesArr: ItineraryPoint[];
    selectedPlacceId?: string;
    focusplace?: any;
    setFocusplace: Dispatch<SetStateAction<any>>;
    places: Place[];
    budgetId: string
    trip: Trip
    selectedpointId ?:string
    setaddedStays: Dispatch<React.SetStateAction<PlaceforMap[]>>
    setaddedVisits: Dispatch<React.SetStateAction<PlaceforMap[]>>
    addedStaysForMap: PlaceforMap[]
    addedVisitsForMap: PlaceforMap[]
    visitDateColorMap : any
  };

  const Itineraryboard = (props: Props) => {
   const [mode, setMode] = useState<"DAY_BY_DAY" | "CUSTOM">("DAY_BY_DAY");
   const [selectedDate, setSelectedDate] = useState<string | null>(null); 
    /** Only POINT items */
    const pointsOnly = useMemo(
      () => props.cyrclesArr.filter((item) => item.role === 'POINT'),
      [props.cyrclesArr]
    );


  const [selectedPoint, setSelectedPoint] = useState<ItineraryPoint>(
    () =>
      pointsOnly.find((p) => p.id === props.selectedpointId) ||
      pointsOnly[0]
  );

  useEffect(() => {
  if (
    selectedPoint?.placeLat != null &&
    selectedPoint?.placeLng != null
  ) {
    props.setFocusplace({
      lat: selectedPoint.placeLat,
      lng: selectedPoint.placeLng,
    });
  }
}, [selectedPoint?.placeLat, selectedPoint?.placeLng, props.setFocusplace]);


    /** Sync selectedPoint when prop changes */
    useEffect(() => {
      if (!props.selectedPlacceId) return;

      const nextPoint = pointsOnly.find(
        (p) => p.id === props.selectedPlacceId
      );

      if (nextPoint) {
        setSelectedPoint(nextPoint);
      }
    }, [props.selectedPlacceId, pointsOnly]);

    /** Accommodation places (recomputed on change) */
    const accommodationPlaces = useMemo(() => {
      return props.places.filter(
        (place) =>
          place.pointId === selectedPoint.id &&
          place.placeType === 'ACCOMMODATION'
      )
       .map((place) => ({
      ...place,
      location: {
        lat: Number(place.latitude),
        lng: Number(place.longitude),
      }}))
      
    }, [props.places, selectedPoint.id]);

    /** Places to visit (recomputed on change) */
   const placesToVisit = useMemo(() => {
  return props.places
    .filter(
      (place) =>
        place.pointId === selectedPoint.id &&
        place.placeType === 'PLACE_TO_VISIT'
    )
    .sort((a, b) => {
  // null dates last
  if (!a.visitDate && !b.visitDate) return 0;
  if (!a.visitDate) return 1;
  if (!b.visitDate) return -1;

  const dateDiff =
    new Date(a.visitDate).getTime() -
    new Date(b.visitDate).getTime();

  // different dates
  if (dateDiff !== 0) return dateDiff;

  // same date -> sort by time

  if (!a.visitTime && !b.visitTime) return 0;
  if (!a.visitTime) return 1; // null goes last
  if (!b.visitTime) return -1;

  return (
    new Date(a.visitTime).getTime() -
    new Date(b.visitTime).getTime()
  );
})
      .map((place) => ({
      ...place,
      location: {
        lat: Number(place.latitude),
        lng: Number(place.longitude),
      },
    }));
    
}, [props.places, selectedPoint.id]);

const visiblePlacesToVisit = useMemo(() => {
  if (mode === "CUSTOM") {
    return placesToVisit;
  }

  if (!selectedDate) {
    return [];
  }

  return placesToVisit.filter((place) => {
    if (!place.visitDate) return false;

    const visitDateKey = new Date(place.visitDate)
      .toISOString()
      .split("T")[0];

    return visitDateKey === selectedDate;
  });
}, [mode, placesToVisit, selectedDate]);

useEffect(() => {
  props.setaddedStays(accommodationPlaces);
  props.setaddedVisits(placesToVisit);
}, [accommodationPlaces, placesToVisit, props]);



    return (
      <div className="h-fit w-full p-3">
        <div className="w-full rounded-md p-2 bg-white/10 text-white min-w-[260px] relative">

          {/* HEADER */}
          <div className="flex justify-center mb-2 relative">
            <div className=' absolute top-1 left-2 max-w-20 450:max-w-max  '>
             {selectedPoint.startDate && selectedPoint.endDate
               ? `${new Date(selectedPoint.startDate).toLocaleDateString("en-GB", {
                   month: "2-digit",
                   day: "2-digit",
                 })} - ${new Date(selectedPoint.endDate).toLocaleDateString("en-GB", {
                   month: "2-digit",
                   day: "2-digit",
                 })}`
               : selectedPoint.startDate
               ? new Date(selectedPoint.startDate).toLocaleDateString("en-GB", {
                   month: "2-digit",
                   day: "2-digit",
                 })
               : "No date"}
            </div>

            <Placesdropdown
          
              cyrclesArr={pointsOnly}
              selectedPlace={selectedPoint}
              setSelectedPoint={setSelectedPoint}
            />
          </div>


          {/* ACCOMMODATION */}
          <div   className="flex flex-col items-center p-2  450:mt-0 pt-7 relative gap-2 ">

            <small className="absolute left-2 top-2 text-white font-semibold">
              Accommodation
            </small>

            {accommodationPlaces.map((place , key) => (
              <PlaceToStayCard
                index={key}
                key={place.internalId ?? place.id}
                budgetid={props.budgetId}
                internalId={place.internalId!}
                id={place.id}
                pointId={place.pointId}
                placeType={place.placeType}
                name={place.name}
                stayFrom={place.stayFrom }
                stayUntil={place.stayUntil }
                notes={place.notes}
                ablestayFrom={selectedPoint.startDate}
                ablestayUntil={selectedPoint.endDate}
                paymentStatus={place.paymentStatus ? place.paymentStatus : undefined}
                affiliateLink={place.affiliatelink}
                entryPrice={place.entryPrice}
              />
            ))}

            <Addaplace
              addedPlaces={props.places.filter(
                (p) => p.pointId === selectedPoint.id
              )}
              selectedPlace={selectedPoint}
              triggerName="Add a place to stay"
              descriptionName="Recommended accommodations based on location, safety, and price"
              cyrclesArr={props.cyrclesArr}
              latitude={selectedPoint.placeLat!}
              longitude={selectedPoint.placeLng!}
              travelingWith={props.trip.travelingWith as TripWith}
              tripBudget={props.trip.tripBudget as TripBudget}
              tripTypes={props.trip.tripTypes as TripType[]}
              addedStaysForMap={props.addedStaysForMap}
              addedVisitsForMap={props.addedVisitsForMap}
            />
          </div>

          {/* PLACES TO VISIT */}
          <div className={`flex flex-col items-center p-2 ${mode === 'DAY_BY_DAY' ? 'pt-7' : 'pt-11' } relative gap-2 `}>
             
              <small className="absolute left-2 top-2  flex gap-4 text-white font-semibold ">
                Places to Visit
                <ViewModeDropdown setSelectedMode={setMode} selectedMode={mode}/>
              </small>
              {mode === 'DAY_BY_DAY' &&
               <DateMenubar 
                 ablestayFrom={selectedPoint.startDate}
                 ablestayUntil={selectedPoint.endDate}
                 selectedDate={selectedDate}
                 setSelectedDate={setSelectedDate}/>
              }
         {visiblePlacesToVisit.map((place, key) => {
               const visitDateKey = place.visitDate
                 ? new Date(place.visitDate).toISOString().split("T")[0]
                 : null;
             
               return (
                 <PlaceToVisitCard
                   index={key}
                   key={place.internalId ?? place.id}
                   budgetid={props.budgetId}
                   internalId={place.internalId!}
                   id={place.id}
                   pointId={place.pointId}
                   placeType={place.placeType}
                   name={place.name}
                   visitDate={place.visitDate}
                   visitTime={place.visitTime}
                   ablestayFrom={selectedPoint.startDate}
                   ablestayUntil={selectedPoint.endDate}
                   notes={place.notes}
                   paymentStatus={place.paymentStatus ? place.paymentStatus : undefined}
                   affiliateLink={place.affiliatelink}
                   dateColorClass={visitDateKey ? props.visitDateColorMap[visitDateKey] : undefined}
                   entryPrice={place.entryPrice}
                 />
               );
             })}
            <Addaplace
           
              addedPlaces={props.places.filter(
                (p) => p.pointId === selectedPoint.id
              )}
              selectedPlace={selectedPoint}
            
              triggerName="Add a place to visit"
              descriptionName="Top attractions and must-see places nearby"
              cyrclesArr={props.cyrclesArr}
              latitude={selectedPoint.placeLat!}
              longitude={selectedPoint.placeLng!}
              travelingWith={props.trip.travelingWith as TripWith}
              tripBudget={props.trip.tripBudget as TripBudget}
              tripTypes={props.trip.tripTypes as TripType[]}
              addedStaysForMap={props.addedStaysForMap}
              addedVisitsForMap={props.addedVisitsForMap}
            />
          
               <div className="h-16 535:hidden"></div>
          </div>
        </div>
      </div>
    );
  };

  export default Itineraryboard;
