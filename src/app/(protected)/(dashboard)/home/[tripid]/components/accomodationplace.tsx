import NotesBox from '@/app/component/notes/edittextarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { MdHotel } from 'react-icons/md'
import { RiExternalLinkLine } from 'react-icons/ri'
import Notes from './note'

type props = {
 id: string
 pointId : string
 notes : string | null | undefined
 name : string
 stayFrom : Date
 stayUntil : Date
 mapurl? : string //na figi optional later
}

const Accomodationplace = (props:props) => {
  return (
      <div className=" flex flex-col" >
                               <h2 className=" text-base py-2 font-semibold text-white hidden lg:block ">Accomodation</h2>
                               
                               <Card className=" w-72 426:w-auto relative h-fit p-2 ">
                                 <CardHeader className="flex flex-row gap-2 p-3 ">
                                   <div className=" flex flex-row items-center gap-2">
                                     <CardTitle className="">{props.name}</CardTitle>
                                     <MdHotel className="h-full text-xl" />
                                   </div>
                                 </CardHeader>
                               
                                 <CardContent className="  p-2 pt-0 space-y-2 text-xs text-muted-foreground">
                                   <div className="flex items-start px-2 flex-col gap-2"> 
                                       {props.stayFrom ?
                                        <span>From  Date : {props.stayFrom.toLocaleString('en-US', { month: 'short', day: '2-digit' })}</span>
                                        : <span>From  Date : -- </span>
                                      }
                                       {props.stayUntil ?
                                        <span>Until Date : {props.stayUntil.toLocaleString('en-US', { month: 'short', day: '2-digit' })}</span>
                                       : <span>Until  Date : -- </span>
                                       }
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
                               
                                   <Notes
                                    id={props.id}
                                    pointId={props.pointId}
                                    notes={props.notes}
                                    />
                                   
                                 </CardContent>
                                </Card>
        </div>
  )
}

export default Accomodationplace