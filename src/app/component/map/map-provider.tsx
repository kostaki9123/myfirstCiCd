"use client"

import { APIProvider } from '@vis.gl/react-google-maps'
import React, { Dispatch, SetStateAction } from 'react'
import App, { RecommendedPlace } from './map'

type LatLng = { lat: number; lng: number };

type props = {
  cyrclesArr? : any
  focusplace?: LatLng | null;
  recommendedVisits?: RecommendedPlace[];
  recommendedStays?:RecommendedPlace[];
}

const Mapprovider = (props : props) => {

  console.log('mapprivider:',props.focusplace)

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!} >
          <App cyrclesArr={props.cyrclesArr}
               focusplace={props.focusplace} 
               recommendedStays={props.recommendedStays ? props.recommendedStays : undefined}
               recommendedVisits={props.recommendedVisits ? props.recommendedVisits : undefined} />
               
    </APIProvider>
  )
}

export default Mapprovider