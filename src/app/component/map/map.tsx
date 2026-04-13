"use client";

import { useEffect, useRef, useMemo } from "react";
import { Map, Marker, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

/* ---------------------- TYPES ---------------------- */
type TripSegment = {
  id: string;
  tripId: string;
  role: "MOVING_BOX" | "POINT" | string;
  index: number;

  placeLat: number | null;
  placeLng: number | null;

  fromLat: number;
  fromLng: number;

  toLat: number;
  toLng: number;

  transportType: "car" | "bus" | "train" | "flight" | string;
};

type LatLng = { lat: number; lng: number };

export type RecommendedPlace = {
  id: string;
  name: string;
  location: LatLng;
};

/* ---------------------- SAFE POINT ---------------------- */
function safePoint(lat: number | null, lng: number | null): LatLng | null {
  if (lat == null || lng == null) return null;
  return { lat, lng };
}

/* ---------------------- POLYLINE ---------------------- */
function PolylineOverlay({
  path,
  options,
}: {
  path: LatLng[];
  options?: google.maps.PolylineOptions;
}) {
  const map = useMap();
  const maps = useMapsLibrary("maps");
  const ref = useRef<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map || !maps) return;

    if (ref.current) ref.current.setMap(null);

    const poly = new maps.Polyline({ path, ...options });
    poly.setMap(map);
    ref.current = poly;

    return () => poly.setMap(null);
  }, [map, maps, path, options]);

  return null;
}

/* ---------------------- MIDPOINT ---------------------- */
function getMid(a: LatLng, b: LatLng): LatLng {
  return {
    lat: (a.lat + b.lat) / 2,
    lng: (a.lng + b.lng) / 2,
  };
}

/* ---------------------- TRANSPORT ICON MARKER ---------------------- */
function TransportMarker({
  position,
  icon,
}: {
  position: LatLng;
  icon: string;
}) {
  return (
    <Marker
      position={position}
      icon={{
        url: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
      }}
      label={{ text: icon, fontSize: "20px" }}
    />
  );
}

/* ---------------------- MAIN COMPONENT ---------------------- */
function App({
  cyrclesArr,
  focusplace,
  recommendedVisits,
  recommendedStays,
   addedplacetovisit,
  addedplacetostay,
}: {
  cyrclesArr: TripSegment[];
  focusplace?: LatLng | null;
  recommendedVisits?: RecommendedPlace[];
  recommendedStays?: RecommendedPlace[];
   addedplacetovisit?: RecommendedPlace[];
  addedplacetostay?: RecommendedPlace[];
}) {
  const sorted = [...cyrclesArr].sort((a, b) => a.index - b.index);


  function MapController({ focusplace }: { focusplace?: LatLng | null }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !focusplace) return;

    map.panTo(focusplace);
    map.setZoom(13);
  }, [map, focusplace]);

  return null;
}

  const COLOR_A = "#1E90FF";
  const COLOR_B = "#FF0000";

  const transportIcons: Record<string, string> = {
    flight: "✈️",
    train: "🚆",
    bus: "🚌",
    car: "🚗",
    subway: "🚇",
    walking: "🚶",
    bicycle: "🚲",
    motorbike: "🏍️",
    boat: "⛴️",
    other: "➡️",
  };

  console.log('reccomended',addedplacetostay)


  const transportMarkers: { pos: LatLng; icon: string }[] = [];

 const movingBoxPaths: LatLng[][] = useMemo(() => {
  const paths: LatLng[][] = []

  const sorted = [...cyrclesArr].sort((a, b) => a.index - b.index)

  for (const item of sorted) {
    if (item.role === "MOVING_BOX") {
      paths.push([
        { lat: item.fromLat, lng: item.fromLng },
        { lat: item.toLat, lng: item.toLng },
      ])
    }
  }

  return paths
}, [cyrclesArr])



  /* ---------------------- MAP CENTER ---------------------- */
  const mapCenter = useMemo(() => {
    const pts: LatLng[] = [];

    sorted.forEach((i) => {
      const p = safePoint(i.placeLat, i.placeLng);
      if (p) pts.push(p);
      pts.push({ lat: i.fromLat, lng: i.fromLng });
      pts.push({ lat: i.toLat, lng: i.toLng });
    });

    if (!pts.length) return { lat: 39, lng: -98 };

    return {
      lat: pts.reduce((s, p) => s + p.lat, 0) / pts.length,
      lng: pts.reduce((s, p) => s + p.lng, 0) / pts.length,
    };
  }, [cyrclesArr]);

  const finalCenter = focusplace ?? mapCenter;

  /* ---------------------- RENDER ---------------------- */
  return (
    <Map
      className="h-[100%] w-full z-50"
      defaultCenter={finalCenter}
      defaultZoom={focusplace ? 13 : 3}
    >
      <MapController focusplace={focusplace} />
      {/* ROUTES */}
      
      {movingBoxPaths.map((path, i) => (
        <PolylineOverlay
          key={i}
          path={path}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 1,
            strokeWeight: 3,
          }}
        />
      ))}

      {/* TRANSPORT ICONS */}
      {transportMarkers.map((tm, i) => (
        <TransportMarker key={i} position={tm.pos} icon={tm.icon} />
      ))}

      {/* TRIP POINTS */}
      {sorted
        .filter((i) => i.role === "POINT")
        .map((pt ,key) => {
          const pos = safePoint(pt.placeLat, pt.placeLng);
          if (!pos) return null;
          return <Marker key={pt.id} position={pos} label={{ text: String(key + 1) }} zIndex={1000} />;
        })}

{addedplacetovisit?.map((place, key) => (
  <Marker
    key={`added-visit-${place.id}`}
    position={place.location}
    icon={{
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg width="32" height="48" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg">
          <!-- Blue map pin -->
          <path d="M12 0C7 0 3 4 3 9c0 6 9 21 9 21s9-15 9-21c0-5-4-9-9-9z" fill="#401eff" stroke="#311eff" stroke-width="1"/>

          <!-- Circle icon (moved UP) -->
          <circle cx="12" cy="9" r="4" fill="white"/>

          <!-- Number label -->
          <text 
            x="12" 
            y="22" 
            text-anchor="middle" 
            font-size="10" 
            fill="white" 
            font-family="Arial" 
            font-weight="bold">
            ${key + 1}
          </text>
        </svg>
      `)}`,
    }}
    title={place.name}
  />
))}



     {addedplacetostay?.map((place, key) => (
  <Marker
    key={`added-stay-${place.id}`}
    position={place.location}
    zIndex={1}
    icon={{
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg width="32" height="48" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg">
          <!-- Pin base -->
          <path d="M12 0C7 0 3 4 3 9c0 6 9 21 9 21s9-15 9-21c0-5-4-9-9-9z" fill="#22c55e"/>
          

          <!-- House (final tiny move UP) -->
          <path d="M8 8.5 L12 4.5 L16 8.5 V13.5 H8 Z" fill="white"/>
          <rect x="10" y="10.5" width="4" height="3" fill="#22c55e"/>

          <!-- Number (moved UP) -->
          <text 
            x="12" 
            y="22" 
            text-anchor="middle" 
            font-size="10" 
            fill="white" 
            font-family="Arial" 
            font-weight="bold">
            ${key + 1}
          </text>
        </svg>
      `)}`
    }}
    title={place.name}
  />
))}
    
          {/* 🏨 RECOMMENDED STAYS — now numbered */}
          {recommendedStays?.map((place, idx) => (
       <Marker
    key={`visit-${place.id}`}
    position={place.location}
    icon={{
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg width="32" height="48" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg">
          <!-- Blue map pin -->
          <path d="M12 0C7 0 3 4 3 9c0 6 9 21 9 21s9-15 9-21c0-5-4-9-9-9z" fill="#1E90FF" stroke="#1E90FF" stroke-width="1"/>
          <!-- Number label inside the pin -->
          <text x="12" y="13" text-anchor="middle" font-size="10" fill="white" font-family="Arial" font-weight="bold">${idx + 1}</text>
        </svg>
      `)}`,
      scaledSize: new google.maps.Size(32, 48),
      anchor: new google.maps.Point(16, 48),
    }}
    title={place.name}
  />
    ))}

      {/* ⭐ RECOMMENDED VISITS — now numbered */}
     {recommendedVisits?.map((place, idx) => (
  <Marker
    key={`visit-${place.id}`}
    position={place.location}
    icon={{
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg width="32" height="48" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg">
          <!-- Blue map pin -->
          <path d="M12 0C7 0 3 4 3 9c0 6 9 21 9 21s9-15 9-21c0-5-4-9-9-9z" fill="#1E90FF" stroke="#1E90FF" stroke-width="1"/>
          <!-- Number label inside the pin -->
          <text x="12" y="13" text-anchor="middle" font-size="10" fill="white" font-family="Arial" font-weight="bold">${idx + 1}</text>
        </svg>
      `)}`,
      scaledSize: new google.maps.Size(32, 48),
      anchor: new google.maps.Point(16, 48),
    }}
    title={place.name}
  />

    ))}


    </Map>
  );
}

export default App;
