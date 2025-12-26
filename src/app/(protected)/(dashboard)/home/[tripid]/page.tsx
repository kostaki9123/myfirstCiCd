import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, BedDouble, Plane } from "lucide-react";
import { GoChecklist  } from "react-icons/go";
import { MdAddLocationAlt } from "react-icons/md";
import Checklist from "./components/checklist";
import { getPoints } from "../../createtrip/[tripid]/action";

import Link from "next/link";
import Transportui from "./components/transportui";
import Placeui from "./placeui";


interface PageProps {
  params: Promise<{ tripid: string }>; // ✅ params is now async
}

const Home = async ({ params }: PageProps) => {

  const { tripid } = await params;

  console.log("Server-side ID:", tripid); 

  const points = await getPoints(tripid);

  console.log('herreeee',points)

 
  

  return (
    <div className=" absolute top-0 inset-0 flex items-start justify-start overflow-x-hidden 535:overflow-x-auto  bg-[#010038] ">
      
    
      
      <div className="relative   flex items-start justify-start   h-full w-full">
          
       <Checklist/>
        
          
      <div className="  flex 535:flex-col flex-col 535:mt-0 relative  max-w-[200px]  535:max-w-conent   justify-start items-start   gap-2 min-w-max p-6  ">
           <div className=" absolute left-[-9px] top-0   pl-4 h-full ">
                  <div className=" bottom-0 w-1 bg-gray-500 rounded-full h-[98%] my-5 "></div>
           </div>

        {/* Trip Overview */}
        <div className="flex w-full gap-12 ">
          <div  className="relative pl-10 text-white w-40 hidden lg:flex ">
              
               
          </div>
          
           <Card className=" w-[250px]  535:min-w-[300px] p-2  ">
            <CardHeader className=" p-3"> 
              <CardTitle >Summer Adventure 🌍</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p p-3  text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>June 10 - June 20, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Paris → Rome → Barcelona</span>
              </div>
            </CardContent>
          </Card>
        
        </div>


        {/* Itinerary */}
          {points.length === 0 && 
            <Link href={`/createtrip/${tripid}`} >
              <div className=" flex flex-col " >
                        
                  <h2 className=" text-base py-3 min-h-[46px] font-semibold"></h2>
                  <button
                    className="group flex min-w-[250px] h-full items-center justify-center rounded-2xl bg-white p-10 shadow-md transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Start planning your trip"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <MdAddLocationAlt className="text-5xl text-blue-600 transition-transform group-hover:scale-110" />
                      <span className="text-base font-semibold text-gray-700 group-hover:text-blue-600">
                        Plan Your Trip
                      </span>
                    </div>
                   </button>
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
          <Transportui id={point.id} index={point.index} departureTime fromName={point.fromName}  toName={point.toName} transportType={point.transportType} />    
        ))}
        
        </div>
      </div>
    </div>
    
  );
};

export default Home;
