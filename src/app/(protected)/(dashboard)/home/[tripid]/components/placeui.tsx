'use'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useState } from 'react'
import { MdHotel } from "react-icons/md"
import { BiSolidMessageAltAdd } from "react-icons/bi";
import { FaNotesMedical } from "react-icons/fa6";
import { FaNoteSticky } from "react-icons/fa6";
import NotesBox from '../../../../../component/notes/edittextarea';
 

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
    notes?: string
}

const Placeui = (props : props) => {
  const [notes1, setNotes1] = useState(props.notes ?? "");
  const [notes2, setNotes2] = useState(props.notes ?? "");
  const [notes3, setNotes3] = useState(props.notes ?? "");

  const start = props.startDate.toLocaleString('en-US', { month: 'short', day: '2-digit' });
  const end = props.endDate.toLocaleString('en-US', { month: 'short', day: '2-digit' });


  return (
    <div className="relative  flex flex-col lg:flex-row gap-3 lg:gap-12  justify-center items-start lg:items-center ">
               <div className="lg:absolute top-1 mt-1 lg:mt-0 left-[-6px] px-3 py-1.5 rounded-md
                bg-gray-700 text-white text-[11px] shadow-lg flex items-center gap-1">
                   <div className="uppercase tracking-wide text-gray-200">{start.split(' ')[0]}</div>
                   <div className="font-semibold">{start.split(' ')[1]}</div>
                   <span>-</span>
                   <div className="uppercase tracking-wide text-gray-200">{end.split(' ')[0]}</div>
                   <div className="font-semibold">{end.split(' ')[1]}</div>
                </div>



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
                           
                             <CardContent className="  p-2 pt-0 space-y-2 text-xs text-muted-foreground">
                               <div className="flex items-start px-2 flex-col gap-2"> 
                                  <span>From  Date :12/10</span>
                                  <span>Until Date :16/10</span>
                               </div>
                           
                               {/* ⬇️ Notes box inserted here */}
                               <NotesBox 
                                onChange={(v: string) => {
                                   setNotes1(v);
                                 }}
                                 value={notes1}
                                />
                             </CardContent>
                            </Card>
                       </div>


                       <div className=" flex flex-col" >
                          <h2 className=" text-base pb-2 font-semibold text-white hidden lg:block">Places</h2>
                         <Card className="min-w-[250px] relative   p-2 ">
                           <CardHeader className=" p-3 py-[14px] ">
                             <CardTitle>Small mairmaed</CardTitle>
                       
                           </CardHeader>
                            <CardContent className="  p-2 pt-0 space-y-2 text-xs text-muted-foreground">
                             <div className="flex items-start px-2 flex-col gap-2"> 
                               <div>Visit Date: 13/10</div>
                               <div>Visit Time: 9:00 AM</div>
                             </div>
                             <NotesBox
                               onChange={(v: string) => {
                                   setNotes2(v);
                                 }}
                                 value={notes2}
                                />
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
                             <div>Visit Date: 13/10</div>
                             <div>Visit Time: 13:00 AM</div>
                             <NotesBox 
                              onChange={(v: string) => {
                                   setNotes3(v);
                                 }}
                                 value={notes3}
                             />
                           </CardContent>
                         </Card>
                       </div>
                </div>  
             </div>
         </div>
  )
}

export default Placeui