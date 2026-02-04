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
 visitdate : Date
 visitTime : Date | undefined
 mapurl? : string //na figi optional later
}

const Visitplace = (props : props) => {
  return (
              <div className=" flex flex-col  " >
                           <h2 className=" text-base py-2 font-semibold text-white hidden lg:block ">Places</h2>
                           
                           <Card className=" w-72 426:w-auto relative h-full p-2 535:max-w-[370px] max-w-[350px]">
                             <CardHeader className="flex flex-row gap-2 p-3">
                               <div className=" flex flex-row items-center gap-2">
                                 <CardTitle className="">{props.name}</CardTitle>
                               </div>
                             </CardHeader>
                           
                             <CardContent className="  p-2 pt-0 space-y-2 text-xs text-muted-foreground">
                               <div className="flex items-start px-2 flex-col gap-2"> 
                                   {props.visitdate ?
                                    <span>Visit  Date : {props.visitdate.toLocaleString('en-US', { month: 'short', day: '2-digit' })}</span>
                                    : <span>Visit  Date : -- </span>
                                  }
                                   {props.visitTime ?
                                    <span>Visit  Time : {props.visitTime.toLocaleString('en-US', { month: 'short', day: '2-digit' })}</span>
                                    : <span>Visit  Time : -- </span>
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

export default Visitplace