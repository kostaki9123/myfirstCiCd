"use client"

import { APIProvider } from '@vis.gl/react-google-maps'
import React, { Dispatch, SetStateAction } from 'react'
import App, { RecommendedPlace } from './map'
import { Place } from '../../../../backend/entities/models/place';

type LatLng = { lat: number; lng: number };

type props = {
  cyrclesArr? : any
  focusplace?: LatLng | null;
  addedplacetovisit?: any[]// add these 
  addedplacetostay?: any[]// add these 
  recommendedVisits?: RecommendedPlace[];
  recommendedStays?:RecommendedPlace[];
}

const Mapprovider = ({
  cyrclesArr,
  focusplace,
  addedplacetovisit ,
  addedplacetostay ,
  recommendedVisits ,
  recommendedStays ,
} : props) => {

  console.log('added place to visit:', addedplacetostay)

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!} >
          <App cyrclesArr={cyrclesArr}
               focusplace={focusplace} 
               recommendedStays={recommendedStays ? recommendedStays : undefined}
               recommendedVisits={recommendedVisits ? recommendedVisits : undefined}
               addedplacetovisit={addedplacetovisit ?? undefined}
               addedplacetostay={addedplacetostay ?? undefined}
                 />
               
    </APIProvider>
  )
}

export default Mapprovider