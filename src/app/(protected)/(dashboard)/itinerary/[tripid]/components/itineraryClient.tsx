  'use client';

  import { useEffect, useMemo, useState } from 'react';
  import Itineraryboard from './itineraryboard';
  import Mapprovider from '@/app/component/map/map-provider';
  import { Place } from '../../../../../../../backend/entities/models/place';

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
            />
          )}
        </div>

        {/* RIGHT MAP */}
        <div className="h-full w-[47%] hidden 950:block">
          <Mapprovider
            cyrclesArr={points}
            focusplace={focusplace}
            addedplacetostay={addedStays}
            addedplacetovisit={addedVisits}
          />
        </div>
      </div>
    );
  };

  export default ItineraryClient;