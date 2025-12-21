"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Calendar, MapPin, BedDouble, Plane } from "lucide-react";
import { GoChecklist  } from "react-icons/go";
import { MdHotel } from "react-icons/md"
import { BiSolidMessageAltAdd } from "react-icons/bi";
import { FaNotesMedical } from "react-icons/fa6";
import { FaNoteSticky } from "react-icons/fa6";
import { MdAddLocationAlt } from "react-icons/md";
import Checklist from "./components/checklist";



const Home = () => {
  return (
    <div className=" absolute top-0 inset-0 flex items-start justify-start overflow-x-hidden 535:overflow-x-auto  bg-[#010038] ">
      
    
      
      <div className="relative   flex items-start justify-start   h-full w-full">
          
       <Checklist/>
        
          
      <div className="flex 535:flex-col flex-col 535:mt-0 relative  max-w-[200px]   535:max-w-conent   justify-start items-start   gap-2 min-w-max p-6  ">
           <div className=" absolute left-[-9px] top-0   pl-4 h-full ">
                  <div className=" bottom-0 w-1 bg-gray-500 rounded-full h-[98%] my-5 "></div>
           </div>

        {/* Trip Overview */}
        <div className="flex   w-full gap-12    ">
          <div  className="relative pl-10 text-white w-40 hidden lg:flex  ">
              
               
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
        <div className="space-y-4 min-w-[500px] text-white ">
        <div className="  flex flex-col lg:flex-row gap-3 lg:gap-12  justify-center items-start lg:items-center ">
          <div  className="relative pl-10 text-white w-40   ">
                <div className="absolute left-0 top-1.5 w-3 h-3 bg-white rounded-full border-2 border-lime-500 "></div>
                <div className="text-lg font-semibold">Copenhagen</div>
               
          </div>
          <div className=" flex flex-col pl-3 lg:pl-0 items-center " >
             
             
               <div className="flex flex-col  535:flex-row  gap-4 w-max">
               <div className=" flex flex-col" >
                         <h2 className=" text-base pb-2 font-semibold hidden lg:block ">Accomodation</h2>
                        <Card className="min-w-[250px] relative h-fit  p-2">
                          <CardHeader className="flex flex-row gap-2 p-3  " >
                            <div className="flex flex-row  items-center gap-2  ">
                              <CardTitle className="">Downtonw hostel</CardTitle>
                              <MdHotel className="  h-full text-xl" />
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-1 text-xs text-muted-foreground p-3 pt-0  ">
                            <div>Arrival at 9:00 AM ✈️</div>
                            <div>Visit: Eiffel Tower, Louvre</div>
                            <div>Stay: Hotel Parisian Dreams</div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className=" flex flex-col" >
                         <h2 className=" text-base pb-2 font-semibold  hidden lg:block">Places</h2>
                        <Card className="min-w-[250px] relative  p-2 ">
                          <CardHeader className=" p-3">
                            <CardTitle>Small mairmaed</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-1 p-3 pt-0 text-xs text-muted-foreground">
                            <div>Arrival at 9:00 AM ✈️</div>
                            <div>Visit: Eiffel Tower, Louvre</div>
                            <div>Stay: Hotel Parisian Dreams</div>
                          </CardContent>
                        </Card>
                      </div>
             
                      <div className=" flex flex-col " >
                        <h2 className=" text-base py-3 min-h-[32px] font-semibold  hidden lg:block"></h2>
                        <Card className="min-w-[250px] relative  p-2 ">
                          <CardHeader className=" p-3">
                            <CardTitle>calsberg musuem</CardTitle>
                          </CardHeader>
                          <CardContent className=" p-3 pt-0 space-y-1 text-xs text-muted-foreground">
                            <div>Time: 9:00 AM</div>
                            <div>Tickets: </div>
                            <div>Stay: Hotel Parisian Dreams</div>
                          </CardContent>
                        </Card>
                      </div>
               </div>
           
            </div>
        </div>
        </div>

        {/* Transport */}
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-12  justify-center items-start lg:items-center ">
          <div  className="relative pl-10 text-white w-40   ">
                <div className="absolute left-0 top-1.5 w-3 h-3 bg-white rounded-full border-2 border-lime-500"></div>
                <div className="text-lg font-semibold">Bus</div>
               
          </div>
          
          <Card className=" group min-w-[300px] lg:mt-5 535:min-w-[300px] relative ml-3 lg:ml-0 p-2 ">
            <CardHeader className="p-3">
              <CardTitle>Transport</CardTitle>    
            </CardHeader>
            <CardContent className=" p-2 pt-0 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Plane className="h-4 w-4" />
                <span>Bus: Copenhagen to Humburg</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane className="h-4 w-4" />
                <span>Bus: Humburg to Berlin</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Accommodation */}
         <div className="  flex flex-col lg:flex-row gap-3 lg:gap-12  justify-center items-start lg:items-center ">
          <div  className="relative pl-10 text-white w-40   ">
                <div className="absolute left-0 top-1.5 w-3 h-3 bg-white rounded-full border-2 border-lime-500 "></div>
                <div className="text-lg font-semibold">Berlin</div>
               
          </div>
          <div className=" flex flex-col pl-3 lg:pl-0 items-center " >
             
             
               <div className="flex flex-col  535:flex-row  gap-4 w-max">
               <div className=" flex flex-col" >
                         <h2 className=" text-base pb-2 font-semibold hidden lg:block ">Accomodation</h2>
                        <Card className="min-w-[250px] relative h-fit  p-2">
                          <CardHeader className="flex flex-row gap-2 p-3  " >
                            <div className="flex flex-row  items-center gap-2  ">
                              <CardTitle className="">Downtonw hostel</CardTitle>
                              <MdHotel className="  h-full text-xl" />
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-1 text-xs text-muted-foreground p-3 pt-0  ">
                            <div>Arrival at 9:00 AM ✈️</div>
                            <div>Visit: Eiffel Tower, Louvre</div>
                            <div>Stay: Hotel Parisian Dreams</div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className=" flex flex-col" >
                         <h2 className=" text-base pb-2 font-semibold  hidden lg:block">Places</h2>
                        <Card className="min-w-[250px] relative  p-2 ">
                          <CardHeader className=" p-3">
                            <CardTitle>Small mairmaed</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-1 p-3 pt-0 text-xs text-muted-foreground">
                            <div>Arrival at 9:00 AM ✈️</div>
                            <div>Visit: Eiffel Tower, Louvre</div>
                            <div>Stay: Hotel Parisian Dreams</div>
                          </CardContent>
                        </Card>
                      </div>
             
                      <div className=" flex flex-col " >
                        <h2 className=" text-base py-3 min-h-[32px] font-semibold  hidden lg:block"></h2>
                        <Card className="min-w-[250px] relative  p-2 ">
                          <CardHeader className=" p-3">
                            <CardTitle>calsberg musuem</CardTitle>
                          </CardHeader>
                          <CardContent className=" p-3 pt-0 space-y-1 text-xs text-muted-foreground">
                            <div>Time: 9:00 AM</div>
                            <div>Tickets: </div>
                            <div>Stay: Hotel Parisian Dreams</div>
                          </CardContent>
                        </Card>
                      </div>
               </div>
           
            </div>
        </div>


        <div className="flex flex-col lg:flex-row gap-3 lg:gap-12  justify-center items-start lg:items-center">
          <div  className="relative pl-10 text-white w-40 ">
                <div className="absolute left-0 top-1.5 w-3 h-3 bg-white rounded-full border-2 border-lime-500"></div>
                <div className="text-lg font-semibold">Train</div>         
          </div>
          <Card className=" group min-w-[400px] min-h-[142px] 535:min-w-[500px] relative ml-3 lg:ml-0 ">
            <CardHeader>
              <CardTitle>Transport</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Plane className="h-4 w-4" />
                <span>Train: Berlin to cologne</span>
              </div>
            </CardContent>
          </Card>
        </div>

                  
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-12  justify-center items-start lg:items-center  ">
          <div  className="relative pl-10 text-white w-40 ">
                <div className="absolute left-0 top-1.5 w-3 h-3 bg-white rounded-full border-2 border-lime-500"></div>
                <div className="text-lg font-semibold">Cologne</div>
               
          </div>
          <div className=" flex flex-col text-white  pl-3 lg:pl-0  " >
             
             
               <div className="flex flex-col  535:flex-row  gap-4 w-max">
                      <div className=" flex flex-col" >
                         <h2 className=" text-base py-3 font-semibold">Accomodation</h2>
                        <Card className="min-w-[350px] relative h-[162px] ">
                          <CardHeader className="flex flex-row gap-2  " >
                            <div className="flex flex-row  items-center gap-2 ">
                              <CardTitle className=" ">Downtonw hostel</CardTitle>
                              <MdHotel className="  h-full text-xl" />
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-1 text-sm text-muted-foreground">
                            <div>Arrival at 9:00 AM ✈️</div>
                            <div>Visit: Eiffel Tower, Louvre</div>
                            <div>Stay: Hotel Parisian Dreams</div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className=" flex flex-col" >
                         <h2 className=" text-base py-3 font-semibold">Places</h2>
                        <Card className="min-w-[250px] relative  ">
                          <CardHeader>
                            <CardTitle>Small mairmaed</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-1 text-sm text-muted-foreground">
                            <div>Arrival at 9:00 AM ✈️</div>
                            <div>Visit: Eiffel Tower, Louvre</div>
                            <div>Stay: Hotel Parisian Dreams</div>
                          </CardContent>
                        </Card>
                      </div>
             
                      <div className=" flex flex-col " >
                        <h2 className=" text-base py-3 min-h-[46px] font-semibold"></h2>
                        <Card className="min-w-[250px] relative  ">
                          <CardHeader>
                            <CardTitle>calsberg musuem</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-1 text-sm text-muted-foreground">
                            <div>Time: 9:00 AM</div>
                            <div>Tickets: </div>
                            <div>Stay: Hotel Parisian Dreams</div>
                          </CardContent>
                        </Card>
                      </div>
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
                    
               </div>
          <div className=" flex flex-col text-white  pl-3 lg:pl-0  " >
             
             
               <div className="flex flex-col  535:flex-row  gap-4 w-max">
                      <div className=" flex flex-col" >
                         <h2 className=" text-base py-3 font-semibold">Accomodation</h2>
                        <Card className="min-w-[350px] relative h-[162px] ">
                          <CardHeader className="flex flex-row gap-2  " >
                            <div className="flex flex-row  items-center gap-2 ">
                              <CardTitle className=" ">Downtonw hostel</CardTitle>
                              <MdHotel className="  h-full text-xl" />
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-1 text-sm text-muted-foreground">
                            <div>Arrival at 9:00 AM ✈️</div>
                            <div>Visit: Eiffel Tower, Louvre</div>
                            <div>Stay: Hotel Parisian Dreams</div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className=" flex flex-col" >
                         <h2 className=" text-base py-3 font-semibold">Places</h2>
                        <Card className="min-w-[250px] relative  ">
                          <CardHeader>
                            <CardTitle>Small mairmaed</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-1 text-sm text-muted-foreground">
                            <div>Arrival at 9:00 AM ✈️</div>
                            <div>Visit: Eiffel Tower, Louvre</div>
                            <div>Stay: Hotel Parisian Dreams</div>
                          </CardContent>
                        </Card>
                      </div>
             
                      <div className=" flex flex-col " >
                        <h2 className=" text-base py-3 min-h-[46px] font-semibold"></h2>
                        <Card className="min-w-[250px] relative  ">
                          <CardHeader>
                            <CardTitle>calsberg musuem</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-1 text-sm text-muted-foreground">
                            <div>Time: 9:00 AM</div>
                            <div>Tickets: </div>
                            <div>Stay: Hotel Parisian Dreams</div>
                          </CardContent>
                        </Card>
                      </div>
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
                    
               </div>
              </div>
           
            </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Home;
