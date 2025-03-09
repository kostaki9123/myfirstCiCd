"use client";

import { APIProvider, useMap, Map, Marker, useMapsLibrary } from '@vis.gl/react-google-maps';



const fakeCoordinates = [
  { lat: 40.7128, lng: -74.0060 }, // New York
  { lat: 34.0522, lng: -118.2437 }, // Los Angeles
  { lat: 41.8781, lng: -87.6298 }, // Chicago
  { lat: 29.7604, lng: -95.3698 }, // Houston
  { lat: 33.4484, lng: -112.0740 } // Phoenix
];

type props = {
cyrclesArr : any
}

function App(props : props) {
  const map = useMap();
  const maps = useMapsLibrary("maps");

  console.log(props)

  if (!maps) {
    return null;
  }

  const customMarkerIcon = {
    url: '/location-pin.png', // URL to your custom icon
    scaledSize: new google.maps.Size(30, 30), // Scale the icon
    origin: new google.maps.Point(0, 0), // Origin point
    anchor: new google.maps.Point(16, 32), // Anchor point
  };

  return (
    <Map className='h-[100%] w-full z-50' defaultCenter={{ lat: 39.8283, lng: -98.5795 }} // Centered roughly in the US
    defaultZoom={4}  >
      {fakeCoordinates.map((coord, index) => (
        <Marker key={index} position={coord}  />
      ))}
    </Map>
  );
}

export default App;
