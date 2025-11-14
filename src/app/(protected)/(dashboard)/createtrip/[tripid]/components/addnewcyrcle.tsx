import React from 'react'
import { MdAddLocationAlt } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Createplaceform from './createplaceform';
import Createmovingboxform from './createmovingboxform';
//import Createplaceform from '../createtripforms/createplaceform';
//import Createmovingform from '../createtripforms/createmovingform';

type Props = {
    index : number
    tripId : string
    withcurveline : boolean
    lengtharr? : number
  }
  
  const positiongrid = [
    {gridColumn: 2, gridRow : 3 },
    {gridColumn: 3, gridRow : 2 },
    {gridColumn: 4, gridRow : 3 },
    {gridColumn: 5, gridRow : 2 },
    {gridColumn: 6, gridRow : 3 },
    {gridColumn: 7, gridRow : 2 },
    {gridColumn: 8, gridRow : 3 },
    {gridColumn: 9, gridRow : 2 },
    {gridColumn: 10, gridRow : 3 },
    {gridColumn: 11, gridRow : 2 },
    {gridColumn: 12, gridRow : 3 },
    {gridColumn: 13, gridRow : 2 },
    {gridColumn: 14, gridRow : 3 },
    {gridColumn: 15, gridRow : 2 },
    {gridColumn: 16, gridRow : 3 },
    {gridColumn: 17, gridRow : 2 },
    {gridColumn: 18, gridRow : 3 },
    {gridColumn: 19, gridRow : 2 },
    {gridColumn: 20, gridRow : 3 },
    {gridColumn: 21, gridRow : 3 },
    ]

  const positiongridphone = [
    {gridColumn:1, gridRow : 2 },
    {gridColumn:2, gridRow : 3 },
    {gridColumn:1, gridRow : 4 },
    {gridColumn:2, gridRow : 5 },
    {gridColumn:1, gridRow : 6 },
    {gridColumn:2, gridRow : 7 },
    {gridColumn:1, gridRow : 8 },
    {gridColumn:2, gridRow : 9 },
    {gridColumn: 1, gridRow : 10 },
    {gridColumn: 2, gridRow : 11 },
    {gridColumn: 1, gridRow : 12 },
    {gridColumn: 2, gridRow : 13 },
    {gridColumn: 1, gridRow : 14 },
    {gridColumn: 2, gridRow : 15 },
    {gridColumn: 1, gridRow : 16 },
    {gridColumn: 2, gridRow : 17 },
    {gridColumn: 1, gridRow : 18 },
    {gridColumn: 2, gridRow : 19 },
    {gridColumn: 1, gridRow : 20 },
    {gridColumn: 2, gridRow : 21 },
    ]

const Addnewcyrcle =  (props : Props) => {

 // const cyrcleArrId = await prisma.cyrcleArr.create({
 //   data : {
 //       tripId : props.tripId
 //   }
 //})
  console.log('tripId add',props.tripId)  

  return (
    <Dialog >

        <DialogTrigger style={{  marginLeft: props.withcurveline ? '0px' :  '10px'   ,gridRow :`${props.withcurveline ?positiongrid[props.index].gridRow : 2}` ,borderRadius : "50%" ,gridColumn : `${props.withcurveline ? props.index + 2 : 2} `, display : "flex" , alignItems : "center", justifyItems : "center" , height : "100px" , width : "100px" , zIndex : 2 ,}} >
               <div className='flex items-center justify-center  rounded-[50%] w-[100px] h-[100px] z-50 bg-slate-700 cursor-pointer'>
                   <MdAddLocationAlt style={{fontSize : "30px" , fontWeight : "bolder"}}/>
               </div>
        </DialogTrigger>
        {props.withcurveline === false && props.lengtharr !== 0 &&
          <div className='relative '>
             <div className={`h-[100px] w-[224px] top-[139px] z-0 right-[-119px] rotate-[146deg] absolute`}>
                 <svg viewBox="0 0 200 100">
                   {/* First curve with matching control points */}
                   <path d="M 20 70 q 90 -130 200 10" fill="none" stroke="white" strokeWidth="4" strokeDasharray="7 5" />
                 </svg>
              </div>
          </div>
         }

         <DialogContent  className=" z-[52]    sm:max-h-[90%] min-w-[262px] w-full sm:w-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-1  360:p-2 sm:p-2 rounded-xl">
          <DialogTitle></DialogTitle>
          <DialogDescription>
          </DialogDescription>
          <Tabs defaultValue="account" className="  343:w-full ">
              <TabsList className="grid  grid-cols-2 w-full   ">
                   <TabsTrigger value="account">Place cyrcle </TabsTrigger>
                   <TabsTrigger value="password">Moving cyrcle</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className='px-5  w-full'>
                {/** <Createplaceform index={props.index} tripId={props.tripId} cyrcleArrId={props.cyrcleArrId}/>  {/** create place form */}
                <Createplaceform index={props.index} tripId={props.tripId} />
              </TabsContent>
              <TabsContent value="password" className='px-5  w-full ' >
                {/**  <Createmovingform index={props.index} tripId={props.tripId} cyrcleArrId={props.cyrcleArrId}/>  {/** create moving form */}
                <Createmovingboxform tripId={props.tripId} index={props.index}/>
              </TabsContent>
         </Tabs>
      </DialogContent>
    </Dialog>
  
  )
}

export default Addnewcyrcle