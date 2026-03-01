'use client';

import { useMemo, useState } from 'react';
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

const ItineraryClient = ({
  points,
  places,
  budgetId,
  trip,
}: {
  points: any[];
  places: Place[];
  budgetId: string;
  trip: Trip;
}) => {

  /* ---------------- DEFAULT FOCUS ---------------- */
  const defaultLocation =
    points[0]?.placeLat != null && points[0]?.placeLng != null
      ? { lat: points[0].placeLat, lng: points[0].placeLng }
      : null;

  const [focusplace, setFocusplace] = useState<LatLng | null>(
    defaultLocation
  );

  /* ---------------- DERIVE SELECTED POINT ID ---------------- */
  const selectedPointId = useMemo(() => {
    if (!focusplace) return null;

    const matchedPoint = points.find(
      (p) =>
        p.placeLat === focusplace.lat &&
        p.placeLng === focusplace.lng
    );

    return matchedPoint?.id ?? null;
  }, [focusplace, points]);

  /* ---------------- BUILD MAP PLACES ---------------- */
  const { addedStays, addedVisits } = useMemo(() => {

    if (!selectedPointId) {
      return { addedStays: [], addedVisits: [] };
    }

    const mapped = places
      .filter(
        (p) =>
          p.pointId === selectedPointId &&
          p.latitude != null &&
          p.longitude != null
      )
      .map((p) => ({
        id: p.id,
        name: p.name,
        location: {
          lat: Number(p.latitude),
          lng: Number(p.longitude),
        },
        type: p.placeType,
      }));

    return {
      addedStays: mapped.filter(
        (p) => p.type === "ACCOMMODATION"
      ),
      addedVisits: mapped.filter(
        (p) => p.type === "PLACE_TO_VISIT"
      ),
    };

  }, [places, selectedPointId]);

  /* ---------------- RENDER ---------------- */

  return (
    <div className="h-full absolute inset-0 flex min-w-[344px]">

      {/* LEFT SIDE */}
      <div className="h-full w-full 950:w-[53%] overflow-auto">
        {points.length === 0 ? (
          <div className="h-fit min-h-40 w-full p-3">
            <div className="w-full rounded-md min-h-40 flex items-center justify-center p-2 bg-[#ACA7CB] min-w-[290px] relative">
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
          />
        )}
      </div>

      {/* RIGHT SIDE MAP */}
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