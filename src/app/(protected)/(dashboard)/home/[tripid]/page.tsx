import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin} from "lucide-react";
import { MdAddLocationAlt } from "react-icons/md";
import { getPoints } from "../../plan/[tripid]/action";
import Link from "next/link";
import Transportui from "./components/transportui";
import Placeui from "./components/placeui";
import { getPlaces } from "../../itinerary/[tripid]/action";
import PhoneMap from "../../itinerary/[tripid]/components/phonemap";
import StartOnboarding from "@/app/component-custom/onboarding/start-onboarding";
import PlanTripOnboardingLink from "./components/PlanTripOnboardingLink";

const DATE_COLORS = [
  '#3b82f6',
  '#92400e',
  '#7c3aed',
  '#f97316',
  '#ec4899',
  '#ef4444',
  '#10b981',
  '#f59e0b',
  '#06b6d4',
  '#84cc16',
  '#e11d48',
  '#0ea5e9',
  '#a855f7',
  '#14b8a6',
  '#f43f5e',
]

interface PageProps {
  params: Promise<{ tripid: string }>; // ✅ params is now async
}

const Home = async ({ params }: PageProps) => {

  const { tripid } = await params;

  const points = await getPoints(tripid);

  function formatDateRange(points: any[]) {
  const dates = points
    .flatMap((p) => [
      p.startDate ? new Date(p.startDate) : null,
      p.endDate ? new Date(p.endDate) : null,
      p.departureDate ? new Date(p.departureDate) : null,
    ])
    .filter(Boolean) as Date[];

  if (dates.length === 0) return "No dates";

  const min = new Date(Math.min(...dates.map((d) => d.getTime())));
  const max = new Date(Math.max(...dates.map((d) => d.getTime())));

  return `${min.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",

  })} - ${max.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  
  })}`;
}

function formatRoute(points: any[]) {
  return points
    .filter((p) => p.role === "POINT" && p.placeName)
    .sort((a, b) => a.index - b.index)
    .map((p) => p.placeName)
    .join(" → ");
}

const dateRange = formatDateRange(points);
const route = formatRoute(points);




const pointsOnly = points.filter((p) => p.role === "POINT");

const placesPerPoint = await Promise.all(
  pointsOnly.map((point) => getPlaces(point.id))
);

const allPlaces = placesPerPoint.flat();

const placesToVisit = allPlaces.filter(
  (p) => p.placeType === "PLACE_TO_VISIT"
);

const stays = allPlaces
  .filter((p) => p.placeType === "ACCOMMODATION")
  .map((p) => ({
    id: String(p.id),
    name: p.name,
    location: {
      lat: Number(p.latitude),
      lng: Number(p.longitude),
    },
  }));

const visits = placesToVisit.map((p) => ({
  id: String(p.id),
  name: p.name,
  location: {
    lat: Number(p.latitude),
    lng: Number(p.longitude),
  },
}));

const visitDateColors: Record<string, string> = {};

for (const point of pointsOnly) {
  const pointPlacesToVisit = placesToVisit.filter(
    (place) => place.pointId === point.id && place.visitDate
  );

  const uniqueDatesForPoint = Array.from(
    new Set(
      pointPlacesToVisit.map((place) =>
        new Date(place.visitDate!).toISOString().split("T")[0]
      )
    )
  ).sort();

  const dateColorMapForPoint: Record<string, string> = {};

  uniqueDatesForPoint.forEach((date, index) => {
    dateColorMapForPoint[date] = DATE_COLORS[index % DATE_COLORS.length];
  });

  for (const place of pointPlacesToVisit) {
    const dateKey = new Date(place.visitDate!).toISOString().split("T")[0];
    const color = dateColorMapForPoint[dateKey];

    if (color) {
      visitDateColors[String(place.id)] = color;
    }
  }
}

  return (
    <div className=" absolute top-0 inset-0 flex items-start justify-start overflow-x-hidden 535:overflow-x-auto bg-[#010038] "> 
      <div className="relative   flex items-start justify-start   h-full w-full">   
        <div className=" flex 535:flex-col flex-col 535:mt-0 relative  w-9   max-w-[200px]  535:max-w-content   justify-start items-start   gap-2 min-w-max p-6  ">
             <StartOnboarding/>
             <div className=" absolute left-[-9px] top-0   pl-4 h-full ">
                    <div className=" bottom-0 w-1 bg-gray-500 rounded-full h-[98%] my-5 "></div>
             </div>

            {/* Trip Overview */}
            <div className="flex w-full gap-12 ">
         
               <Card className=" w-[83%] xxs:w-full p-2 535:max-w-[370px] bg-white/10  border border-white/10
           hover:bg-white/15  text-white  ">
                  <CardHeader className="text-white/90 p-3 text-lg"> 
                    <CardTitle >Trip Summary </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 p p-3 text-white/70   text-xs text-muted-foreground">
                    <div className="flex  text-white/70  items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{dateRange}</span>
                    </div>
                    <div className="flex  text-white/70  items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{route || "No places yet"}</span>
                    </div>
                  </CardContent>
              </Card>   
           </div>

           {/* Itinerary */}
           {points.length === 0 && (
            <PlanTripOnboardingLink tripid={tripid}>
              <div
                id="onboarding-plan-trip"
                className="group  w-[83%] xxs:w-full 535:max-w-[370px] flex flex-col items-center justify-center rounded-2xl 
                border border-white/10 bg-white/10  hover:bg-white/15 text-white  p-8 shadow-md transition hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                aria-label="Start planning your trip"
              >
                <MdAddLocationAlt className="text-5xl text-[#0356BC] transition-transform group-hover:scale-110" />
          
                <span className="mt-2 text-base text-white/90 font-semibold text-white group-hover:text-white">
                  Plan Your Trip
                </span>
          
                <p className="text-sm text-white/70 mt-1 text-center">
                  Add your first place to start building the journey
                </p>
              </div>
            </PlanTripOnboardingLink>
            )}
              
           {points.map(( point: any, key:number ) => ( 
              point.role === "POINT" 
             ? 
              <Placeui  id={point.id} index={point.index} key={key}
              placeName={point.placeName} tripId={tripid}  startDate={point.startDate}  endDate={point.endDate}   />         
             :
              <Transportui  key={key}  notes={point.notes}    toId={point.toPlaceId} toName={point.toName}  toAddress={point.toAddress} toLat={point.toLat.toString()} toLng={point.toLng.toString()!} fromId={point.fromPlaceId} fromName={point.fromName}  fromAddress={point.fromAddress} fromLat={point.fromLat.toString()!} fromLng={point.fromLng.toString()!}  id={point.id} tripId={point.tripId} index={point.index} transportType={point.transportType!} departureDate={point.departureDate} />    
            ))}
            <div className="h-20 535:hidden"></div>
            <PhoneMap
                    cyrclesArr={points}
                    addedplacetostay={stays}
                    addedplacetovisit={visits}
                    visitDateColors={visitDateColors}
             />
        </div>
      </div>
    </div>
    
  );
};

export default Home;
