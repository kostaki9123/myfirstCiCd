import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { MdHotel } from "react-icons/md"
import { BiSolidMessageAltAdd } from "react-icons/bi";
import { FaNotesMedical } from "react-icons/fa6";
import { FaNoteSticky } from "react-icons/fa6";
import NotesBox from './components/edittextarea';
 

type props = {
    id: string,
    index: number,
    placeName: string,
    placeAddress?: string,
    placeId?: string,
    placeLat?: number,
    placeLng?: number,
    startDate: Date,
    endDate: Date,
}

const Placeui = (props : props) => {
  return (
    <div className="flex flex-col lg:flex-row gap-3 lg:gap-12  justify-center items-start lg:items-center ">

              <div  className="relative pl-10 text-white w-40   ">
                    <div className="absolute left-0 top-1.5 w-3 h-3 bg-white rounded-full border-2 border-lime-500 "></div>
                    <div className="text-lg font-semibold">{props.placeName}</div>         
              </div>

              <div className=" flex flex-col pl-3 lg:pl-0 items-center " >  
                 <div className="flex flex-col  535:flex-row  gap-4 w-max">
                       <div className=" flex flex-col" >
                           <h2 className=" text-base pb-2 font-semibold text-white hidden lg:block ">Accomodation</h2>
                           
                           <Card className="min-w-[250px] relative h-fit p-2">
                             <CardHeader className="flex flex-row gap-2 p-3">
                               <div className="flex flex-row items-center gap-2">
                                 <CardTitle className="">Downtonw hostel</CardTitle>
                                 <MdHotel className="h-full text-xl" />
                               </div>
                             </CardHeader>
                           
                             <CardContent className="space-y-1 text-xs text-muted-foreground p-3 pt-0">
                               <div>Arrival at 9:00 AM ✈️</div>
                               <div>Visit: Eiffel Tower, Louvre</div>
                               <div>Stay: Hotel Parisian Dreams</div>
                           
                               {/* ⬇️ Notes box inserted here */}
                               <NotesBox id="copenhagen-accommodation" defaultNotes="" />
                             </CardContent>
                            </Card>
                       </div>


                       <div className=" flex flex-col" >
                          <h2 className=" text-base pb-2 font-semibold text-white hidden lg:block">Places</h2>
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
  )
}

export default Placeui