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

/* ---------------------- TRANSPORT ICON MARKER ---------------------- */
function TransportMarker({ position, icon }: { position: LatLng; icon: string }) {
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

  const selectedIcon = transportIcons[icon] || transportIcons.other;

  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="24">
        ${selectedIcon}
      </text>
    </svg>
  `;

  // ✅ base64 handles multi-byte Unicode safely
  const url = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;

  return (
    <Marker
      position={position}
      icon={{
        url,
        scaledSize: new google.maps.Size(40, 40),
        anchor: new google.maps.Point(20, 20),
      }}
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
    setTimeout(() => map.setZoom(13), 500);
  }, [map, focusplace]);

  return null;
  }

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

const transportMarkers = useMemo(() => {
  const markers: { pos: LatLng; icon: string }[] = [];

  for (const item of sorted) {
    if (item.role === "MOVING_BOX") {
      // midpoint between from → to
      const midLat = (item.fromLat + item.toLat) / 2;
      const midLng = (item.fromLng + item.toLng) / 2;

      markers.push({
        pos: { lat: midLat, lng: midLng },
        icon: item.transportType,
      });
    }
  }

  return markers;
}, [sorted]);

  /* ---------------------- MAP CENTER ---------------------- */

const finalCenter = useMemo(() => {
  const pts: LatLng[] = [];

  // Transport marker positions
  transportMarkers.forEach((tm) => {
    pts.push(tm.pos);
  });

  // POINT locations
  sorted
    .filter((pt) => pt.role === "POINT")
    .forEach((pt) => {
      if (pt.placeLat != null && pt.placeLng != null) {
        pts.push({
          lat: pt.placeLat,
          lng: pt.placeLng,
        });
      }
    });

  if (!pts.length) {
    return { lat: 39, lng: -98 };
  }

  return {
    lat: pts.reduce((sum, p) => sum + p.lat, 0) / pts.length,
    lng: pts.reduce((sum, p) => sum + p.lng, 0) / pts.length,
  };
}, [transportMarkers, sorted]);

  

  /* ---------------------- RENDER ---------------------- */
  return (
    <Map
      className="h-[100%] w-full z-50"
      defaultCenter={finalCenter}
      defaultZoom={focusplace ? 8 : 3}
    >
      <MapController focusplace={focusplace} />
      {/* ROUTES */}
      
      {movingBoxPaths.map((path, i) => (
        <PolylineOverlay
          key={i}
          path={path}
          options={{
            strokeColor: "#1A1A4F",
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
          return  <Marker
            key={pt.id}
            position={pos}
            icon={{
              url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                <svg width="32" height="48" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C7 0 3 4 3 9c0 6 9 21 9 21s9-15 9-21c0-5-4-9-9-9z"
                        fill="#1A1A4F"
                        stroke="#1A1A4F"
                        stroke-width="1"/>
          
                  <circle cx="12" cy="9" r="4" fill="white"/>
          
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
            zIndex={1000}
          />
        })}

{addedplacetovisit?.map((place, key) => {
   const isActive = focusplace &&
      place.location.lat === focusplace.lat &&
      place.location.lng === focusplace.lng;

  return(
         <Marker
           key={`added-visit-${place.id}`}
           zIndex={999}
           position={place.location}
           icon={{
         url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
           <svg width="${isActive ? 40 : 32}" height="${isActive ? 60 : 48}" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg">
             <!-- Pin -->
             <path
               d="M12 0C7 0 3 4 3 9c0 6 9 21 9 21s9-15 9-21c0-5-4-9-9-9z"
               fill="#401eff"
               stroke="#311eff"
               stroke-width="1"
             />
       
             <!-- Tourist attraction star -->
             <path
               d="M12 4.5 L13.2 7.2 L16.2 7.5 L14 9.4 L14.7 12.2 L12 10.7 L9.3 12.2 L10 9.4 L7.8 7.5 L10.8 7.2 Z"
               fill="white"
             />
       
             <!-- Number -->
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
            scaledSize: { width: isActive ? 40 : 32, height: isActive ? 60 : 48 } as unknown as google.maps.Size,
anchor: { x: isActive ? 20 : 16, y: isActive ? 60 : 48 } as unknown as google.maps.Point,
          }}
          title={place.name}
        />)
})}



{addedplacetostay?.map((place, key) => {
  const isActive = focusplace &&
    place.location.lat === focusplace.lat &&
    place.location.lng === focusplace.lng;

  return (
    <Marker
      key={`added-stay-${place.id}`}
      position={place.location}
      zIndex={999}
      icon={{
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
          <svg width="${isActive ? 40 : 32}" height="${isActive ? 60 : 48}" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C7 0 3 4 3 9c0 6 9 21 9 21s9-15 9-21c0-5-4-9-9-9z" fill="#22c55e"/>
            <path d="M8 8.5 L12 4.5 L16 8.5 V13.5 H8 Z" fill="white"/>
            <rect x="10" y="10.5" width="4" height="3" fill="#22c55e"/>
            <text x="12" y="22" text-anchor="middle" font-size="10" fill="white" font-family="Arial" font-weight="bold">${key + 1}</text>
          </svg>
        `)}`,
       scaledSize: { width: isActive ? 40 : 32, height: isActive ? 60 : 48 } as unknown as google.maps.Size,
anchor: { x: isActive ? 20 : 16, y: isActive ? 60 : 48 } as unknown as google.maps.Point,
      }}
      title={place.name}
    />
  );
})}
    
          {/* 🏨 RECOMMENDED STAYS — now numbered */}
     {recommendedStays?.map((place, key) => {
  const isActive = focusplace &&
    place.location.lat === focusplace.lat &&
    place.location.lng === focusplace.lng;

  return (
    <Marker
      key={`stay-${place.id}`}
      position={place.location}
      zIndex={998}
      icon={{
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
          <svg width="${isActive ? 40 : 32}" height="${isActive ? 60 : 48}" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C7 0 3 4 3 9c0 6 9 21 9 21s9-15 9-21c0-5-4-9-9-9z" fill="#40E0D0"/>
            <path d="M8 8.5 L12 4.5 L16 8.5 V13.5 H8 Z" fill="white"/>
            <rect x="10" y="10.5" width="4" height="3" fill="#40E0D0"/>
            <text x="12" y="22" text-anchor="middle" font-size="10" fill="white" font-family="Arial" font-weight="bold">${key + 1}</text>
          </svg>
        `)}`,
      scaledSize: { width: isActive ? 40 : 32, height: isActive ? 60 : 48 } as unknown as google.maps.Size,
      anchor: { x: isActive ? 20 : 16, y: isActive ? 60 : 48 } as unknown as google.maps.Point,
      }}
      title={place.name}
    />
  );
})}

      {/* ⭐ RECOMMENDED VISITS — now numbered */}
    {recommendedVisits?.map((place, key) => {
  const isActive = focusplace &&
    place.location.lat === focusplace.lat &&
    place.location.lng === focusplace.lng;

  return (
    <Marker
      key={`visit-${place.id}`}
      position={place.location}
      zIndex={998}
      icon={{
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
          <svg width="${isActive ? 40 : 32}" height="${isActive ? 60 : 48}" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C7 0 3 4 3 9c0 6 9 21 9 21s9-15 9-21c0-5-4-9-9-9z" fill="#40E0D0" stroke="#40E0D0" stroke-width="1"/>
            <path d="M12 4.5 L13.2 7.2 L16.2 7.5 L14 9.4 L14.7 12.2 L12 10.7 L9.3 12.2 L10 9.4 L7.8 7.5 L10.8 7.2 Z" fill="white"/>
            <text x="12" y="22" text-anchor="middle" font-size="10" fill="white" font-family="Arial" font-weight="bold">${key + 1}</text>
          </svg>
        `)}`,
      scaledSize: { width: isActive ? 40 : 32, height: isActive ? 60 : 48 } as unknown as google.maps.Size,
      anchor: { x: isActive ? 20 : 16, y: isActive ? 60 : 48 } as unknown as google.maps.Point,
      }}
      title={place.name}
    />
  );
})}


    </Map>
  );
}

export default App;
