"use client"

import { APIProvider } from '@vis.gl/react-google-maps'
import React from 'react'
import App from './map'


type props = {
  cyrclesArr? : any
}

const Mapprovider = (props : props) => {

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!} >
          <App cyrclesArr={props.cyrclesArr}/>
    </APIProvider>
  )
}

export default Mapprovider