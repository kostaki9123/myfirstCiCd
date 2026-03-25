import NotesBox from '@/app/component/notes/edittextarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { MdHotel } from 'react-icons/md'
import { RiExternalLinkLine } from 'react-icons/ri'
import Notes from './placenote'

type props = {
 internalId: string
 notes : string | null | undefined
 name : string
 stayFrom : Date
 stayUntil : Date
 googleMapLink : string| null | undefined//na figi optional later
 isPaid?: boolean
}

const Accomodationplace = (props:props) => {
  return (
      <div className=" flex flex-col" >
                               <h2 className=" text-base py-2 font-semibold text-white hidden lg:block ">Accomodation</h2>
                               
                               <Card className=" w-72 426:w-auto relative h-fit p-2 535:max-w-[370px] max-w-[350px] ">
                                 <CardHeader className="flex flex-row gap-2 p-3 ">
                                  {/* LEFT: title + icon + badge */}
                                    <div className="flex items-center gap-2">
                                      <CardTitle>{props.name}</CardTitle>
                                      <MdHotel className="text-4xl 535:text-xl" />
                                  
                                      {props.isPaid && (
                                        <span className="text-[10px] px-2 py-1 rounded-full font-medium bg-green-100 text-green-700">
                                          Paid
                                        </span>
                                      )}
                                    </div>
                                  
                                    {/* RIGHT: action */}
                                    <a
                                      href={`/itinerary?place=${props.internalId}`}
                                      className="text-xs px-2 py-1 rounded-md border border-blue-200 text-blue-700 hover:bg-blue-50 transition"
                                    >
                                      Edit
                                    </a>
                                 </CardHeader>
                               
                                 <CardContent className="  p-2 pt-0 space-y-3 text-xs text-muted-foreground">
                                   <div className="flex items-start px-2 flex-col gap-2"> 
                                      {props.stayFrom ? (
                                          <span>
                                           From Date : {new Date(props.stayFrom).toLocaleDateString(undefined, {
                                                 day: "numeric",
                                                 month: "short",
                                            })}
                                          </span>
                                        ) : (
                                          <span>From Date : --</span>
                                        )}
                                        
                                        {props.stayUntil ? (
                                          <span>
                                            Until Date : {new Date(props.stayUntil).toLocaleDateString(undefined, {
                                                 day: "numeric",
                                                 month: "short",
                                            })}
                                          </span>
                                        ) : (
                                          <span>Until Date : --</span>
                                        )}
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

export default Accomodationplace