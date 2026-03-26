import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { MdHotel } from 'react-icons/md'
import { RiExternalLinkLine } from 'react-icons/ri'
import Notes from './placenote'

type props = {
 internalId: string
 notes : string | null | undefined
 name : string
 visitdate : Date
 visitTime : Date | undefined
 googleMapLink : string| null | undefined //na figi optional later
 paymentStatus?: string | null
}

const Visitplace = (props : props) => {
  return (
              <div className=" flex flex-col  " >
                           <h2 className=" text-base py-2 font-semibold text-white hidden lg:block ">Place</h2>
                           
                           <Card className=" w-72 426:w-auto relative h-full p-2 535:max-w-[370px] max-w-[350px]">
                             <CardHeader className="flex flex-row gap-2 p-3">
                               <div className=" flex flex-row items-start  gap-2">
                                 <CardTitle className="">{props.name}</CardTitle>

                                 {props.paymentStatus === "PAID" && (
                                     <span className="text-[10px] px-2 py-1 rounded-full font-medium bg-green-100 text-green-700">
                                       Paid
                                     </span>
                                  )}
                                  {props.paymentStatus === "UNPAID" && (
                                     <span className="text-[10px] px-2 py-1 rounded-full font-medium bg-red-100 text-red-500">
                                       Unpaid
                                     </span>
                                  )}
                                  {props.paymentStatus === "PARTIALLY_PAID" && (
                                     <span className="text-[10px] px-2 py-1 rounded-full font-medium bg-yellow-100 text-yellow-500">
                                       Partially Paid
                                     </span>
                                  )}
                               </div>
                                <a
                                  href={`/itinerary?place=${props.internalId}`}
                                   className="text-xs max-h-7 px-2 py-1 rounded-md border border-blue-200 text-blue-700 hover:bg-blue-50 transition"
                                    >
                                      Edit
                                </a>
                             </CardHeader>
                           
                             <CardContent className="  p-2 pt-0 space-y-2 text-xs text-muted-foreground">
                               <div className="flex items-start px-2 flex-col gap-2"> 
                                {props.visitdate ? (
                                  <span>
                                    Visit Date : {new Date(props.visitdate).toLocaleDateString(undefined, {
                                        day: "numeric",
                                       month: "short", 
                                    })}
                                  </span>
                                ) : (
                                  <span>Visit Date : -- </span>
                                )}
                                 {props.visitTime ?
                                   <span>
                                     Visit Time : {props.visitTime.toLocaleTimeString('en-GB', {
                                       hour: '2-digit',
                                       minute: '2-digit',
                                       hour12: false ,
                                       timeZone: 'UTC'
                                     })}
                                   </span>
                                   : <span>Visit Time : -- </span>
                                 }
                                  {props.googleMapLink &&
                                  <a
                                     href={`${props.googleMapLink}`}
                                     target="_blank"
                                     rel="noopener noreferrer"
                                     className="text-muted-foreground hover:text-blue-600 transition flex gap-1 items-center"
                                     title="Open in map"
                                     ><RiExternalLinkLine className=' text-lg'/>
                                       <span className='pt-[2px]'> Open In Map</span>
                                     
                                   </a>
                                   }
                               </div>
                           
                               <Notes
                                internalId={props.internalId}    
                                 notes={props.notes}
                               />
                               
                             </CardContent>
                            </Card>
                 </div>
  )
}

export default Visitplace