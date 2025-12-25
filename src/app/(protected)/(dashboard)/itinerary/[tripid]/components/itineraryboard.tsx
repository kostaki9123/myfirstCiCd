'use client'

import React, { useState } from 'react'
import Placesdropdown from './placesdropdown'
import Addaplace from './addplace'
import { TripSegment } from '../../../createtrip/[tripid]/components/movingbox';
import DatePickerExample from "../../../createtrip/[tripid]/components/locationinput/datepicker";
import PlaceToStayCard from './PlaceToStayCard';
import PlaceToVisitCard from './PlaceToVisitCard';

export interface ItineraryPoint {
  id: string;
  tripId: string;
  role: "POINT" | "MOVING_BOX";
  index: number;

  // For POINT
  placeName?: string | null;
  placeAddress?: string;
  placeId?: string;
  placeLat?: number | null;
  placeLng?: number | null;
  startDate?: string | Date | null;
  endDate?: string | Date | null;

  // For MOVING_BOX (transport)
  fromName?: string | null;
  fromAddress?: string;
  fromPlaceId?: string;
  fromLat?: number | null;
  fromLng?: number | null;

  toName?: string | null;
  toAddress?: string;
  toPlaceId?: string;
  toLat?: number | null;
  toLng?: number | null;

  transportType?: "flight" | "car" | "train" | "bus" | null| string;

  // departure info
  departureDate?: string | Date | null;
  departureTime?: string | Date | null;
}


type props = {
    cyrclesArr : ItineraryPoint[]
    selectedPlacceId? : string
  }


const Itineraryboard = (props : props) => {
 

  
  

  const pointsOnly = props.cyrclesArr.filter(item => item.role === "POINT");

  //save selected place if exist from props.selectedPlacceId
  const selectedPlace: ItineraryPoint | undefined = pointsOnly.find(
  (item) => item.id === props.selectedPlacceId
  );
 
  const [selectedPoint, setSelectedPoint] = useState<ItineraryPoint>(selectedPlace ? selectedPlace : pointsOnly[0])
                             
  console.log('sele:', selectedPoint)
  //clean up and keep only the POINT

 

  return (
    <>
    <div className='  h-fit  base:w-[100%]   p-3   ' >

        <div className=' h-fit w-full rounded-md p-2 bg-[#ACA7CB] min-w-[290px]   '>


            {/**Header  */}
            <div className=' w-full flex justify-between relative  mb-2 '>

               <div className='left-0 h-full py-[1px] gap-2'>
                    {
                    <div >{selectedPoint.startDate && selectedPoint.endDate
                       ? `${new Date(selectedPoint.startDate).toLocaleDateString(undefined, { month: "2-digit", day: "2-digit" })} - ${new Date(selectedPoint.endDate).toLocaleDateString(undefined, { month: "2-digit", day: "2-digit" })}`
                       : selectedPoint.startDate
                         ? new Date(selectedPoint.startDate).toLocaleDateString(undefined, { month: "2-digit", day: "2-digit" })
                         : "No date"}
                    </div>
                   }
               </div>

                <div className=' min-h-8 '>
                  <Placesdropdown cyrclesArr={pointsOnly} selectedPlace={selectedPoint} setSelectedPoint={setSelectedPoint} /> 
                  {/** dropdown for change place */}             
                </div>

                <div className='  right-0  '>
                    <div className=' p-[2px] px-2 cursor-pointer rounded-sm w-20'></div>
                </div>
                
            </div>



            {/** Main */}

            <div className='flex justify-center gap-2 flex-col items-center p-2 pt-7  relative z-0  '>
                <small className="text-sm font-semibold leading-none  absolute left-2 top-2">Accomodation</small>
                {/** <StayDetailsCard/> */ }
                <PlaceToStayCard placeName='Copenhagen downtown hostel' endDate={selectedPoint.endDate} startDate={selectedPoint.startDate}  />
                <Addaplace triggerName='Add a place to stay' descriptionName='These places to stay are highly recommended by our team for their prime location, affordability, and safety' cyrclesArr={props.cyrclesArr} latitude={selectedPoint.placeLat?.toString()!} longitude={selectedPoint.placeLng?.toString()!}/> 
               
            </div>

            <div className='flex justify-center flex-col items-center p-2 pt-7 gap-2 relative  '>
                <small className="text-sm font-semibold leading-none  absolute left-2 top-2">Places</small> 
                <PlaceToVisitCard placeName='Copenhagen downtown hostel' endDate={selectedPoint.endDate} startDate={selectedPoint.startDate}   />              
                <Addaplace triggerName='Add a place to visit' descriptionName='These places to stay are highly recommended by our team for their prime location, affordability, and safety' cyrclesArr={props.cyrclesArr} latitude={selectedPoint.placeLat?.toString()!} longitude={selectedPoint.placeLng?.toString()!}/> 

                {/** <StayDetailsCard/> */ }
                {/** <Addaccomodationmodal triggerName='Add a place to stay' descriptionName='These places to stay are highly recommended by our team for their prime location, affordability, and safety' cyrclesArr={props.cyrclesArr} latitude={props.cyrclesArr[0].lat1} longitude={props.cyrclesArr[0].lng1}/> */}
              
            </div>

        </div>
    </div>

</>
  )
}

export default Itineraryboard