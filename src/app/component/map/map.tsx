"use client";

import { useEffect, useRef } from "react";
import { Map, Marker, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

type Props = {
cyrclesArr: any[];
};

// ✅ Polyline overlay wrapper
function PolylineOverlay({
path,
options,
}: {
path: { lat: number; lng: number }[];
options?: google.maps.PolylineOptions;
}) {
const map = useMap();
const maps = useMapsLibrary("maps");
const polylineRef = useRef<google.maps.Polyline | null>(null);

useEffect(() => {
if (!map || !maps) return;


if (polylineRef.current) {
  polylineRef.current.setMap(null);
}

const polyline = new maps.Polyline({
  path,
  ...options,
});

polyline.setMap(map);
polylineRef.current = polyline;

return () => {
  polyline.setMap(null);
};


}, [map, maps, path, options]);

return null;
}

function App({ cyrclesArr }: Props) {
const transportStyles: Record<
string,
{ color: string; }

> = {
 plane: { color: "#1E90FF", },
 train: { color: "#228B22", },
 bus: { color: "#FFA500", },
 car: { color: "#DC143C",  },
 default: { color: "#555",},
 };

// Utility: midpoint between two coords
const getMidpoint = (
lat1: number,
lng1: number,
lat2: number,
lng2: number
) => {
return { lat: (lat1 + lat2) / 2, lng: (lng1 + lng2) / 2 };
};

return (
<Map
className="h-[100%] w-full z-50"
defaultCenter={{ lat: 39.8283, lng: -98.5795 }}
defaultZoom={4}
>
{/* POINT markers */}
{cyrclesArr
.filter((item) => item.role === "POINT")
.map((point) => (
<Marker
key={point.id}
position={{
lat: parseFloat(point.lat1),
lng: parseFloat(point.lng1),
}}
/>
))}


  {/* MOVINGBOX polylines + midpoint icons */}
  {cyrclesArr
    .filter((item) => item.role === "MOVINGBOX")
    .map((move) => {
      const style = transportStyles[move.moveIcon || "default"];
      const startLat = parseFloat(move.lat1);
      const startLng = parseFloat(move.lng1);
      const endLat = parseFloat(move.lat2);
      const endLng = parseFloat(move.lng2);
      const midpoint = getMidpoint(startLat, startLng, endLat, endLng);

      return (
        <>
          <PolylineOverlay
            key={`line-${move.id}`}
            path={[
              { lat: startLat, lng: startLng },
              { lat: endLat, lng: endLng },
            ]}
            options={{
              strokeColor: style.color,
              strokeOpacity: 0.9,
              strokeWeight: 3,
            }}
          />
          {/* Transport icon at midpoint */}
          <Marker
            key={`icon-${move.id}`}
            position={midpoint}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 0, // hide actual marker graphic
            }}
          />
        </>
      );
    })}
</Map>

);
}

export default App;
