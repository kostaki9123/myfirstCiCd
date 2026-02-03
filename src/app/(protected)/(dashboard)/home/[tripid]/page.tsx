import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, BedDouble, Plane } from "lucide-react";
import { GoChecklist  } from "react-icons/go";
import { MdAddLocationAlt } from "react-icons/md";
import { getPoints } from "../../createtrip/[tripid]/action";

import Link from "next/link";
import Transportui from "./components/transportui";
import Placeui from "./components/placeui";


interface PageProps {
  params: Promise<{ tripid: string }>; // ✅ params is now async
}

const Home = async ({ params }: PageProps) => {

  const { tripid } = await params;

  console.log("Server-side ID:", tripid); 

  const points = await getPoints(tripid);

  console.log('herreeee',points)
  function formatDateRange(points: any[]) {
  const dates = points
    .filter((p) => p.role === "POINT" && p.startDate && p.endDate)
    .flatMap((p) => [new Date(p.startDate), new Date(p.endDate)]);

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


 
  

  return (
    <div className=" absolute top-0 inset-0 flex items-start justify-start overflow-x-hidden 535:overflow-x-auto  bg-[#010038] ">
      
    
      
      <div className="relative   flex items-start justify-start border-2 border-red-600   h-full w-full">
          
          
      <div className=" border-2 border-blue-600  flex 535:flex-col flex-col 535:mt-0 relative  w-full  535:max-w-[200px]  535:max-w-content   justify-start items-start   gap-2 min-w-max p-6  ">
           <div className=" absolute left-[-9px] top-0   pl-4 h-full ">
                  <div className=" bottom-0 w-1 bg-gray-500 rounded-full h-[98%] my-5 "></div>
           </div>

        {/* Trip Overview */}
        <div className="flex w-full gap-12 ">
         
          
           <Card className=" w-full  p-2  ">
            <CardHeader className=" p-3"> 
              <CardTitle >Trip Summary 🌍</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p p-3  text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{dateRange}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{route || "No places yet"}</span>
              </div>
            </CardContent>
          </Card>
        
        </div>


        {/* Itinerary */}
          {points.length === 0 && 
            <Link href={`/createtrip/${tripid}`} >
              <div className=" w-[250px]  535:min-w-[300px] min-h-32 flex items-center justify-center flex-col  " >        
                  {/**   className="group flex min-w-[250px] h-full items-center justify-center rounded-2xl bg-white p-10 shadow-md transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Start planning your trip"
                  >*/}
                    <div className="flex flex-col items-center space-y-2">
                      <MdAddLocationAlt className="text-5xl text-blue-600 transition-transform group-hover:scale-110" />
                      <span className="text-base font-semibold text-gray-700 group-hover:text-blue-600">
                        Plan Your Trip
                      </span>
                    </div>
                   
               </div>
            </Link>
          }
         
       
          {points.map(( point:any , key:number ) => ( 
              point.role === "POINT" 
            ? 
           <Placeui  id={point.id} index={point.index}
              placeName={point.placeName}  startDate={point.startDate}  endDate={point.endDate}   
             />
           :
            <Transportui id={point.id} index={point.index}  fromName={point.fromName}  toName={point.toName} transportType={point.transportType} departureDate={point.departureDate} />    
        ))}
        
        </div>
      </div>
    </div>
    
  );
};

export default Home;
