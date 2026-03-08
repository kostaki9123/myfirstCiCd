"use client"

import { APIProvider } from '@vis.gl/react-google-maps'
import React, { useMemo } from 'react'
import App, { RecommendedPlace } from './map'
import { Place } from '../../../../backend/entities/models/place';

type LatLng = { lat: number; lng: number };

type Props = {
  cyrclesArr: any[]
  focusplace?: LatLng | null;
  addedplacetovisit?: RecommendedPlace[]
  addedplacetostay?: RecommendedPlace[]
  recommendedVisits?: RecommendedPlace[];
  recommendedStays?: RecommendedPlace[];
  allPlaces?: Place[]
}

const Mapprovider = ({
  allPlaces,
  cyrclesArr,
  focusplace,
  addedplacetovisit,
  addedplacetostay,
  recommendedVisits,
  recommendedStays,
}: Props) => {

  // If allPlaces is provided, separate them into stays and visits
  const { addedStaysFromAll, addedVisitsFromAll } = useMemo(() => {
    if (!allPlaces) return { addedStaysFromAll: undefined, addedVisitsFromAll: undefined };

    const mapped = allPlaces
      .filter(p => p.latitude != null && p.longitude != null)
      .map(p => ({
        id: p.id,
        name: p.name,
        location: { lat: Number(p.latitude), lng: Number(p.longitude) },
        type: p.placeType,
      }));

    return {
      addedStaysFromAll: mapped.filter(p => p.type === "ACCOMMODATION"),
      addedVisitsFromAll: mapped.filter(p => p.type === "PLACE_TO_VISIT"),
    };
  }, [allPlaces]);

  // Decide final props for App: prefer manually passed props, else computed from allPlaces
  const finalAddedStays = addedplacetostay ?? addedStaysFromAll;
  const finalAddedVisits = addedplacetovisit ?? addedVisitsFromAll;

  console.log('added place to stay:', finalAddedStays)
  console.log('added place to visit:', finalAddedVisits)

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}>
      <App
        cyrclesArr={cyrclesArr}
        focusplace={focusplace}
        recommendedStays={recommendedStays}
        recommendedVisits={recommendedVisits}
        addedplacetostay={finalAddedStays}
        addedplacetovisit={finalAddedVisits}
      />
    </APIProvider>
  )
}

export default Mapprovider; 