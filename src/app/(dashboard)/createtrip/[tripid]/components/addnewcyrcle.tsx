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
//import Createplaceform from '../createtripforms/createplaceform';
//import Createmovingform from '../createtripforms/createmovingform';

type Props = {
    index : number
    tripId : string
    cyrcleArrId : string | undefined
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

const Addnewcyrcle = async (props : Props) => {

 // const cyrcleArrId = await prisma.cyrcleArr.create({
 //   data : {
 //       tripId : props.tripId
 //   }
 //})
 console.log(props.tripId)


  return (
    <Dialog >

        <DialogTrigger style={{gridRow :`${positiongrid[props.index].gridRow}`,border:"2px solid red" ,borderRadius : "50%" ,gridColumn : `${props.index + 2} `, display : "flex" , alignItems : "center", justifyItems : "center" , height : "83px" , width : "89px" , zIndex : 2 ,}} >
               <div className='flex items-center justify-center border-2 border-lime-500 rounded-[50%] w-[89px] h-[83px] cursor-pointer'>
                   <MdAddLocationAlt style={{fontSize : "30px" , fontWeight : "bolder"}}/>
               </div>
        </DialogTrigger>
       
    
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