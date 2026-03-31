import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { MdHotel } from "react-icons/md"
import { BiSolidMessageAltAdd } from "react-icons/bi";
import { FaNotesMedical } from "react-icons/fa6";
import { FaNoteSticky } from "react-icons/fa6";
import NotesBox from '../../../../../component/notes/edittextarea';
import { getPlaces } from '../../../itinerary/[tripid]/action';
import { Place } from '../../../../../../../backend/entities/models/place';
import { RiExternalLinkLine } from "react-icons/ri";
import Accomodationplace from './accomodationplace';
import Visitplace from './visitplace';

 

type props = {
    id: string,
    index: number,
    placeName: string,
    placeAddress?: string,
    placeId?: string,
    placeLat?: number,
    placeLng?: number,
    startDate: Date,
    endDate: Date
    tripId:string
}

const Placeui = async (props : props) => {
  const start = props.startDate.toLocaleString('en-US', { month: 'short', day: '2-digit' });
  const end = props.endDate.toLocaleString('en-US', { month: 'short', day: '2-digit' });


  let data : Place[] = []

  
data = (await getPlaces(props.id!)).sort((a, b) => {
  const getDate = (p: Place) =>
    new Date(p.placeType === "ACCOMMODATION" ? p.stayFrom! : p.visitDate!);

  const dateA = getDate(a).getTime();
  const dateB = getDate(b).getTime();

  // First sort by date
  if (dateA !== dateB) return dateA - dateB;

  // If same date → ACCOMMODATION first
  if (a.placeType === "ACCOMMODATION" && b.placeType !== "ACCOMMODATION") return -1;
  if (a.placeType !== "ACCOMMODATION" && b.placeType === "ACCOMMODATION") return 1;

  return 0;
});
  return (
    <div className="relative min-h-32 flex flex-col lg:flex-row gap-3 lg:gap-12  justify-center items-start lg:items-center ">
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
                  {data.length === 0 ? 
                        <></>
                  :
                    data.map(( place:Place , key:number ) => ( 
                      place.placeType === "ACCOMMODATION" ?
                      <Accomodationplace pointId={props.id} tripId={props.tripId}  key={key} paymentStatus={place.paymentStatus} internalId={place.internalId!} googleMapLink={place.googleMapLink} notes={place.notes} name={place.name} stayFrom={place.stayFrom!} stayUntil={place.stayUntil!} />
                      :
                      <Visitplace key={key} pointId={props.id} tripId={props.tripId}  internalId={place.internalId!} paymentStatus={place.paymentStatus} googleMapLink={place.googleMapLink} notes={place.notes} name={place.name} visitdate={place.visitDate!} visitTime={place.visitTime ? place.visitTime : undefined} />                       
                    ))}
                </div>  
             </div>
         </div>
  )
}

export default Placeui