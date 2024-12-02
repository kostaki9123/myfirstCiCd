import React, { useState } from 'react'
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
import CurvelinePhone from './curvelinephone';
//import Createplaceform from '../createtripforms/createplaceform';
//import Createmovingform from '../createtripforms/createmovingform';

type Props = {
    index : number
    tripId : string
    cyrcleArrId : string | undefined
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

const Addnewcyrcle = async (props : Props) => {

 // const cyrcleArrId = await prisma.cyrcleArr.create({
 //   data : {
 //       tripId : props.tripId
 //   }
 //})
 console.log(props.tripId)


  return (
    <Dialog >

        <DialogTrigger style={{  marginLeft: props.withcurveline ? '0px' : (positiongridphone[props.index].gridColumn === 2 ? '10px' : '50px')  ,gridRow :`${props.withcurveline ?positiongrid[props.index].gridRow : 2}`,border:"2px solid red" ,borderRadius : "50%" ,gridColumn : `${props.withcurveline ? props.index + 2 : positiongridphone[props.index].gridColumn} `, display : "flex" , alignItems : "center", justifyItems : "center" , height : "83px" , width : "89px" , zIndex : 2 ,}} >
               <div className='flex items-center justify-center border-2 border-lime-500 rounded-[50%] w-[89px] h-[83px] z-50 bg-slate-700 cursor-pointer'>
                   <MdAddLocationAlt style={{fontSize : "30px" , fontWeight : "bolder"}}/>
               </div>
        </DialogTrigger>
        {props.withcurveline === false && props.lengtharr !== 0 &&
          <div className='relative border-2 border-yellow-600'>
            <div className={`h-[100px] w-[224px] top-[134px] z-0 left-[104px] rotate-[132deg] absolute`}>
              <svg viewBox="0 0 200 100">
                {/* First curve with matching control points */}
                <path d="M 20 70 q 90 -130 200 10" fill="none" stroke="white" strokeWidth="4" strokeDasharray="7 5" />
              </svg>
            </div>
          </div>
         }

        <DialogContent className=' h-fit w-[473px] absolute' >
          <DialogTitle></DialogTitle>
          <DialogDescription>
          </DialogDescription>
          <Tabs defaultValue="account" className="w-[420px]">
              <TabsList className="grid  grid-cols-2 w-[350px] mx-9">
                   <TabsTrigger value="account">Place cyrcle </TabsTrigger>
                   <TabsTrigger value="password">Moving cyrcle</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className='px-5  w-full '>
                {/** <Createplaceform index={props.index} tripId={props.tripId} cyrcleArrId={props.cyrcleArrId}/>  {/** create place form */}
              </TabsContent>
              <TabsContent value="password" >
                {/**  <Createmovingform index={props.index} tripId={props.tripId} cyrcleArrId={props.cyrcleArrId}/>  {/** create moving form */}
              </TabsContent>
         </Tabs>
      </DialogContent>
    </Dialog>
  
  )
}

export default Addnewcyrcle