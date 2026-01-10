'use client'

import React, { useState } from 'react'
import { IoAirplaneOutline , IoTrain } from "react-icons/io5";
import { FaCar , FaBusAlt , FaBicycle, FaShip,FaWalking } from "react-icons/fa";
import { FaTrainTram, FaMotorcycle , FaTrainSubway , FaTaxi , FaFerry  } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NotesBox from '../../../../../component/notes/edittextarea';
import Notes from './note';
import { RiExternalLinkLine } from 'react-icons/ri';


const transportModes = [
  { value: "flight", icon: <IoAirplaneOutline /> },
  { value: "bus", icon: <FaBusAlt /> },
  { value: "train", icon: <IoTrain /> },
  { value: "subway", icon: <FaTrainSubway /> },
  { value: "car", icon: <FaCar /> },
  { value: "walking", icon: <FaWalking /> },
  { value: "bicycle", icon: <FaBicycle /> },
  { value: "motorbike", icon: <FaMotorcycle /> },
  { value: "boat", icon: <FaShip /> },
  { value: "other", icon: <FaShip /> },
];


type props = {
   id: string ,
   index: number,
   fromName: string,
   toName: string,
   transportType: string,
   departureDate?: any,
   departureTime?: any
   notes?: string
}

const Transportui = (props : props) => {
   const [notes, setNotes] = useState(props.notes ?? "");

 const getTransportIcon = (type: string) => {
    const found = transportModes.find((m) => m.value === type);
    return found ? found.icon : type;
  };

function capitalizeFirst(str : string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

 const date = props.departureDate.toLocaleString('en-US', { month: 'short', day: '2-digit' });

  return (
     <div className="relative min-h-32 flex flex-col lg:flex-row gap-3 lg:gap-12  justify-center items-start lg:items-center ">
                 <div className=" lg:absolute top-1 mt-1 lg:mt-0s left-[-6px] px-3 py-1.5 rounded-md
                bg-gray-700 text-white text-[11px] shadow-lg flex items-center gap-1">
                   <div className="uppercase tracking-wide text-gray-200">{date.split(' ')[0]}</div>
                   <div className="font-semibold">{date.split(' ')[1]}</div>
                 </div>

                 <div  className="relative pl-10 text-white w-40   ">
                       <div className="absolute left-0 top-1.5 w-3 h-3 bg-white rounded-full border-2 border-lime-500"></div>
                       <div className="text-lg font-semibold">{capitalizeFirst(props.transportType)}</div>
                      
                 </div>
                    
                 <div className='flex flex-col' >  
                      <h2 className=" text-base h-[32px] font-semibold text-white hidden lg:block "></h2>

                      <Card className=" group  w-72 426:w-auto lg:mt-5  relative ml-3 lg:ml-0 p-2 ">
                        <CardHeader className="p-3">
                          <CardTitle>Transport</CardTitle>    
                        </CardHeader>
                        <CardContent className=" p-2 pt-0 space-y-2 text-xs text-muted-foreground">
                          <div className="flex items-start px-2 flex-col gap-2">
                                        
                            <span>From:{props.fromName}</span>
                            <span>To:{ props.toName}</span>
                            <a
                                  href=''
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-muted-foreground hover:text-blue-600 transition flex gap-1 items-center"
                                  title="Open in map"
                                  ><RiExternalLinkLine className=' text-lg'/>
                                    <span className='pt-[2px]'> Open In Map</span>
                                  
                            </a>
                          </div>
                          { /** 
                          <Notes
                            id={props.id}
                            pointId={props.pointId}
                            notes={props.notes}
                          /> */
                          }
                        </CardContent>
                      </Card>
                 </div> 
             </div>
  )
}

export default Transportui