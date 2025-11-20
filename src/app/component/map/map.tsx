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
function App({ cyrclesArr }: { cyrclesArr: TripSegment[] }) {
  const sorted = [...cyrclesArr].sort((a, b) => a.index - b.index);

  const COLOR_A = "#1E90FF"; // normal connections
  const COLOR_B = "#FF0000"; // internal MOVING_BOX (from → to)

  const transportIcons: Record<string, string> = {
    flight: "✈️",
    train: "🚆",
    bus: "🚌",
    car: "🚗",
    subway: '🚇',
    walking: '🚶',  
    bicycle: '🚲',
    other: "➡️",
    motorbike: '🏍️',  
    boat: '⛴️' 
  };

  const pathSegments: { path: LatLng[]; color: string }[] = [];
  const transportMarkers: { pos: LatLng; icon: string }[] = [];

  /* ---------------------- BUILD CONNECTIONS ---------------------- */
  for (let i = 0; i < sorted.length; i++) {
    const item = sorted[i];

    /* -------- 1. POINT → next segment -------- */
    if (item.role === "POINT") {
      const p = safePoint(item.placeLat, item.placeLng);
      if (!p) continue;

      const next = sorted[i + 1];
      if (next) {
        const target =
          next.role === "MOVING_BOX"
            ? { lat: next.fromLat, lng: next.fromLng }
            : safePoint(next.placeLat, next.placeLng);

        if (target) {
          pathSegments.push({
            path: [p, target],
            color: COLOR_A,
          });
        }
      }
    }

    /* -------- 2. MOVING_BOX.from → MOVING_BOX.to (red) -------- */
    if (item.role === "MOVING_BOX") {
      const from: LatLng = { lat: item.fromLat, lng: item.fromLng };
      const to: LatLng = { lat: item.toLat, lng: item.toLng };

      // segment inside the moving box
      pathSegments.push({
        path: [from, to],
        color: COLOR_B,
      });

      // place icon
      const icon = transportIcons[item.transportType] || transportIcons.default;
      transportMarkers.push({ pos: getMid(from, to), icon });

      /* -------- 3. MOVING_BOX.to → next POINT/MOVING_BOX -------- */
      const next = sorted[i + 1];
      if (next) {
        const target =
          next.role === "MOVING_BOX"
            ? { lat: next.fromLat, lng: next.fromLng }
            : safePoint(next.placeLat, next.placeLng);

        if (target) {
          pathSegments.push({
            path: [to, target],
            color: COLOR_A,
          });
        }
      }
    }
  }

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

  /* ---------------------- RENDER ---------------------- */
  return (
    <Map className="h-[100%] w-full z-50" defaultCenter={mapCenter} defaultZoom={3}>
      {/* LINES */}
      {pathSegments.map((seg, i) => (
        <PolylineOverlay
          key={i}
          path={seg.path}
          options={{
            strokeColor: seg.color,
            strokeOpacity: 1,
            strokeWeight: 3,
          }}
        />
      ))}

      {/* MOVING BOX ICONS */}
      {transportMarkers.map((tm, i) => (
        <TransportMarker key={i} position={tm.pos} icon={tm.icon} />
      ))}

      {/* POINT MARKERS */}
      {sorted
        .filter((i) => i.role === "POINT")
        .map((pt) => {
          const pos = safePoint(pt.placeLat, pt.placeLng);
          if (!pos) return null;
          return <Marker key={pt.id} position={pos} />;
        })}
    </Map>
  );
}

export default App;
