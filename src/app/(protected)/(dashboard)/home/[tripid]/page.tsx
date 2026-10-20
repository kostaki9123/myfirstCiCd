
import { CalendarDays, MapPin, Route, Plane } from "lucide-react";
import { getPoints } from "../../plan/[tripid]/action";
import { getPlaces } from "../../itinerary/[tripid]/action";
import Transportui from "./components/transportui";
import Placeui from "./components/placeui";
import PhoneMap from "../../itinerary/[tripid]/components/phonemap";
import StartOnboarding from "@/app/component-custom/onboarding/start-onboarding";
import PlanTripOnboardingLink from "./components/PlanTripOnboardingLink";

interface PageProps {
  params: Promise<{ tripid: string }>;
}

const DATE_COLORS = [
  "#3b82f6", "#92400e", "#7c3aed", "#f97316", "#ec4899",
  "#ef4444", "#10b981", "#f59e0b", "#06b6d4", "#84cc16",
  "#e11d48", "#0ea5e9", "#a855f7", "#14b8a6", "#f43f5e",
];

function getDateRange(points: any[]) {
  const dates = points
    .flatMap((p) => [p.startDate, p.endDate, p.departureDate])
    .filter(Boolean)
    .map((d) => new Date(d).getTime())
    .filter(Number.isFinite);

  if (!dates.length) return "Dates not set";

  const min = new Date(Math.min(...dates));
  const max = new Date(Math.max(...dates));

  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  return `${fmt(min)} – ${fmt(max)}, ${max.getFullYear()}`;
}

function getDayCount(points: any[]) {
  const dates = points
    .flatMap((p) => [p.startDate, p.endDate])
    .filter(Boolean)
    .map((d) => new Date(d).getTime())
    .filter(Number.isFinite);

  if (!dates.length) return 0;

  const min = Math.min(...dates);
  const max = Math.max(...dates);

  return Math.max(
    1,
    Math.round((max - min) / 86_400_000) + 1
  );
}

export default async function Home({ params }: PageProps) {
  const { tripid } = await params;
  const points = await getPoints(tripid);

  const destinations = points
    .filter((p: any) => p.role === "POINT")
    .sort((a: any, b: any) => a.index - b.index);

  const placesByDestination = await Promise.all(
    destinations.map((point: any) => getPlaces(point.id))
  );

  const allPlaces = placesByDestination.flat();

  const placesToVisit = allPlaces.filter(
    (p: any) => p.placeType === "PLACE_TO_VISIT"
  );

  const stays = allPlaces
    .filter((p: any) => p.placeType === "ACCOMMODATION")
    .map((p: any) => ({
      id: String(p.id),
      name: p.name,
      location: {
        lat: Number(p.latitude),
        lng: Number(p.longitude),
      },
    }));

  const visits = placesToVisit.map((p: any) => ({
    id: String(p.id),
    name: p.name,
    location: {
      lat: Number(p.latitude),
      lng: Number(p.longitude),
    },
  }));

  const visitDateColors: Record<string, string> = {};

  for (const point of destinations) {
    const pointVisits = placesToVisit.filter(
      (place: any) =>
        place.pointId === point.id && place.visitDate
    );

    const uniqueDates = Array.from(
      new Set(
        pointVisits.map((place: any) =>
          new Date(place.visitDate).toISOString().split("T")[0]
        )
      )
    ).sort();

    const colors: Record<string, string> = {};

    uniqueDates.forEach((date, index) => {
      colors[date] = DATE_COLORS[index % DATE_COLORS.length];
    });

    for (const place of pointVisits) {
      const date = new Date(place.visitDate!)
        .toISOString()
        .split("T")[0];

      if (colors[date]) {
        visitDateColors[String(place.id)] = colors[date];
      }
    }
  }

  const transfers = points.filter(
    (p: any) => p.role !== "POINT"
  );

  const dateRange = getDateRange(points);
  const dayCount = getDayCount(points);

  return (
    <main className="absolute inset-0 overflow-hidden bg-[#020b2b] text-white">
      <StartOnboarding />

      {/* Scrollable itinerary workspace */}
      <div className="h-full overflow-y-auto overflow-x-hidden">
        <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">

          {/* Page heading */}
          <header className="mb-6">
            <p className="mb-2 text-sm font-medium text-blue-400">
              TRIPAKI / YOUR TRIP
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Your itinerary
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Explore your trip, one destination at a time.
            </p>
          </header>

          {/* Trip overview */}
          <section className="mb-8 grid grid-cols-3 overflow-hidden rounded-xl border border-blue-900/70 bg-[#071638]">
            <div className="flex min-w-0 items-center gap-2 border-r border-blue-900/70 px-3 py-4 sm:gap-3 sm:px-6">
              <CalendarDays className="h-5 w-5 shrink-0 text-blue-400" />
              <div className="min-w-0">
                <p className="text-lg font-semibold">
                  {dayCount || "—"}
                </p>
                <p className="text-xs text-slate-400 sm:text-sm">
                  Days
                </p>
              </div>
            </div>

            <div className="flex min-w-0 items-center gap-2 border-r border-blue-900/70 px-3 py-4 sm:gap-3 sm:px-6">
              <MapPin className="h-5 w-5 shrink-0 text-blue-400" />
              <div className="min-w-0">
                <p className="text-lg font-semibold">
                  {destinations.length}
                </p>
                <p className="text-xs text-slate-400 sm:text-sm">
                  Destinations
                </p>
              </div>
            </div>

            <div className="flex min-w-0 items-center gap-2 px-3 py-4 sm:gap-3 sm:px-6">
              <Route className="h-5 w-5 shrink-0 text-blue-400" />
              <div className="min-w-0">
                <p className="text-lg font-semibold">
                  {transfers.length}
                </p>
                <p className="text-xs text-slate-400 sm:text-sm">
                  Transfers
                </p>
              </div>
            </div>
          </section>

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Your route</h2>
              <p className="mt-1 text-sm text-slate-400">
                {dateRange}
              </p>
            </div>
          </div>

          {/* Destination timeline */}
          {points.length === 0 ? (
            <PlanTripOnboardingLink tripid={tripid}>
              <div
                id="onboarding-plan-trip"
                className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-blue-700/60 bg-[#071638] p-8 text-center transition hover:border-blue-400 hover:bg-blue-950/60"
              >
                <MapPin className="mb-4 h-10 w-10 text-blue-400" />
                <h3 className="text-lg font-semibold">
                  Start planning your trip
                </h3>
                <p className="mt-2 max-w-sm text-sm text-slate-400">
                  Add your first destination to start building your itinerary.
                </p>
              </div>
            </PlanTripOnboardingLink>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div
                className="absolute bottom-12 left-[19px] top-6 w-0.5 bg-gradient-to-b from-blue-400 via-blue-600/70 to-blue-950 sm:left-[23px]"
                aria-hidden="true"
              />

              <div className="space-y-7 sm:space-y-8">
                {points.map((point: any, key: number) => {
                  if (point.role === "POINT") {
                    const destinationNumber = destinations.findIndex(
                      (p: any) => p.id === point.id
                    );

                    return (
                      <section
                        key={point.id}
                        className="relative pl-12 sm:pl-14"
                      >
                        {/* Numbered timeline marker */}
                        <div className="absolute left-0 top-1 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-500 bg-[#06204c] text-sm font-bold shadow-[0_0_18px_rgba(0,112,255,0.18)] sm:h-12 sm:w-12">
                          {String(destinationNumber + 1).padStart(2, "0")}
                        </div>

                        {/* Existing destination component */}
                        <div className="min-w-0">
                          <Placeui
                            id={point.id}
                            index={point.index}
                            placeName={point.placeName}
                            tripId={tripid}
                            startDate={point.startDate}
                            endDate={point.endDate}
                          />
                        </div>
                      </section>
                    );
                  }

                 
return (
  <div
    key={point.id ?? key}
    className="relative min-w-0 pl-12 sm:pl-14"
  >
    <Transportui
      notes={point.notes}
      toId={point.toPlaceId}
      toName={point.toName}
      toAddress={point.toAddress}
      toLat={String(point.toLat ?? "")}
      toLng={String(point.toLng ?? "")}
      fromId={point.fromPlaceId}
      fromName={point.fromName}
      fromAddress={point.fromAddress}
      fromLat={String(point.fromLat ?? "")}
      fromLng={String(point.fromLng ?? "")}
      id={point.id}
      tripId={tripid}
      index={point.index}
      transportType={point.transportType || "other"}
      departureDate={point.departureDate}
      departureTime={point.departureTime}
    />
  </div>
);

                })}
              </div>
            </div>
          )}

          {/* Map */}
          <div className="mt-10">
            <PhoneMap
              cyrclesArr={points}
              addedplacetostay={stays}
              addedplacetovisit={visits}
              visitDateColors={visitDateColors}
            />
          </div>

          <div className="h-16 sm:h-8" />
        </div>
      </div>
    </main>
  );
}
