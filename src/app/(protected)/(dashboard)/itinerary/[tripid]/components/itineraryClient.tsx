  'use client';

  import { useEffect, useMemo, useState } from 'react';
  import Itineraryboard from './itineraryboard';
  import Mapprovider from '@/app/component/map/map-provider';
  import { Place } from '../../../../../../../backend/entities/models/place';
import PhoneMap from './phonemap';

  export type Trip = {
    id: string;
    tripName: string;
    userId: string;
    tripBudget: string;
    travelingWith: string;
    tripTypes: string[];
  };

  type LatLng = {
    lat: number;
    lng: number;
  };

  export type PlaceforMap = {
    id: string ;
    name: string;
    location: {
      lat: number;
      lng: number;
    };
    pinColor? : string
  };

  const ItineraryClient = ({
    points,
    places,
    budgetId,
    trip,
    selectedpointId
  }: {
    points: any[];
    places: Place[];
    budgetId: string;
    trip: Trip;
    selectedpointId?: string;
  }) => {

    /* ✅ SAFE DEFAULT FOCUS */
    const defaultLocation =
      points.length > 0 &&
      points[0]?.placeLat != null &&
      points[0]?.placeLng != null
        ? { lat: points[0].placeLat, lng: points[0].placeLng }
        : null;

    const [focusplace, setFocusplace] = useState<LatLng | null>(
      defaultLocation
    );
    const [addedStays, setaddedStays] = useState<PlaceforMap[] >([]);
    const [addedVisits, setaddedVisits] = useState<PlaceforMap[]>([]);
    

    /* ✅ DERIVE SELECTED POINT ID SAFELY */
    const selectedPointId = useMemo(() => {
      if (!focusplace) return null;

      const matchedPoint = points.find(
        (p) =>
          p.placeLat === focusplace.lat &&
          p.placeLng === focusplace.lng
      );

      return matchedPoint?.id ?? null;
    }, [focusplace, points]);

    /* ✅ SAFE MAP DATA */
    useEffect(() => {
    if (!selectedPointId) {
      setaddedStays([]);
      setaddedVisits([]);
      return;
    }

     const filtered = places.filter(
    (p) =>
      p.pointId === selectedPointId &&
      p.latitude != null &&
      p.longitude != null
  );

  const stays: PlaceforMap[] = filtered
    .filter((p) => p.placeType === 'ACCOMMODATION')
    .map((p) => ({
      id: String(p.id),
      name: p.name,
      location: {
        lat: Number(p.latitude),
        lng: Number(p.longitude),
      }
    }));

  const visits: PlaceforMap[] = filtered
    .filter((p) => p.placeType === 'PLACE_TO_VISIT')
    .map((p) => ({
      id: String(p.id),
      name: p.name,
      location: {
        lat: Number(p.latitude),
        lng: Number(p.longitude),
      },
    }));

  setaddedStays(stays);
  setaddedVisits(visits);

  }, [places, selectedPointId]);

   const placesToVisit = useMemo(() => {
  return places
    .filter(
      (place) =>
        place.pointId === selectedPointId &&
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
    
}, [places, selectedPointId]);

const DATE_COLORS = ['#3b82f6', '#92400e', '#7c3aed', '#f97316', '#ec4899','#ef4444', '#10b981',
    '#f59e0b', '#06b6d4', '#84cc16', '#e11d48','#0ea5e9','#a855f7', '#14b8a6', '#f43f5e', 
];

const visitDateColorMap = useMemo(() => {
  const dates = placesToVisit
    .filter((p) => p.visitDate)
    .map((p) => new Date(p.visitDate!).toISOString().split('T')[0]);

  const uniqueDates = Array.from(new Set(dates));

  return uniqueDates.reduce<Record<string, string>>((acc, date, i) => {
    acc[date] = DATE_COLORS[i % DATE_COLORS.length];
    console.log(acc)
    return acc;
  }, {});
}, [placesToVisit]);

const visitDateColors = useMemo(() => {
  const colors: Record<string, string> = {};
  for (const place of placesToVisit) {
    if (place.visitDate) {
      const dateKey = new Date(place.visitDate).toISOString().split('T')[0];
      const color = visitDateColorMap[dateKey];
      if (color) colors[String(place.id)] = color;
    }
  }
  return colors;
}, [placesToVisit, visitDateColorMap]);


    return (
      <div className="h-full absolute inset-0 bg-[#010038] flex min-w-[344px]">

        {/* LEFT */}
        <div className="h-full w-full 950:w-[53%] overflow-auto">
          {points.length === 0 ? (
            <div className="h-fit min-h-40 w-full p-3">
              <div className="w-full bg-white/10 text-white rounded-md min-h-40 flex items-center justify-center p-2 ">
                There is no destination yet
              </div>
            </div>
          ) : (
            <Itineraryboard
              places={places}
              trip={trip}
              cyrclesArr={points}
              focusplace={focusplace}
              setFocusplace={setFocusplace}
              budgetId={budgetId}
              selectedpointId={selectedpointId}
              setaddedStays={setaddedStays}
              setaddedVisits={setaddedVisits}
              addedStaysForMap={addedStays}
              addedVisitsForMap={addedVisits}
              visitDateColorMap={visitDateColorMap}
            />
          )}
        </div>

         <PhoneMap 
            cyrclesArr={points}
            focusplace={focusplace}
            addedplacetostay={addedStays}
            addedplacetovisit={addedVisits}
            visitDateColors={visitDateColors}
         />
         

        {/* RIGHT MAP */}
        <div className="h-full w-[47%] hidden 950:block">
          <Mapprovider
            cyrclesArr={points}
            focusplace={focusplace}
            addedplacetostay={addedStays}
            addedplacetovisit={addedVisits}
            visitDateColors={visitDateColors}
          />
        </div>
      </div>
    );
  };

  export default ItineraryClient;