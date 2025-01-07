import React from 'react'
import { IoStar } from "react-icons/io5";
import { TbSquareRoundedNumber1Filled } from "react-icons/tb";
import { TbSquareRoundedNumber2Filled } from "react-icons/tb";
import { TbSquareRoundedNumber3Filled } from "react-icons/tb";
import { TbSquareRoundedNumber4Filled } from "react-icons/tb";
import { TbSquareRoundedNumber5Filled } from "react-icons/tb";
import { TbSquareRoundedNumber6Filled } from "react-icons/tb";
import { TbSquareRoundedNumber7Filled } from "react-icons/tb";
import { TbSquareRoundedNumber8Filled } from "react-icons/tb";
import { TbSquareRoundedNumber9Filled } from "react-icons/tb";
import { Button } from '@/components/ui/button';


const numbersiconArr = [
    <TbSquareRoundedNumber1Filled/>,
    <TbSquareRoundedNumber2Filled/>,
    <TbSquareRoundedNumber3Filled/>,
    <TbSquareRoundedNumber4Filled/>,
    <TbSquareRoundedNumber5Filled/>,
    <TbSquareRoundedNumber6Filled/>,
    <TbSquareRoundedNumber7Filled/>,
    <TbSquareRoundedNumber8Filled/>,
    <TbSquareRoundedNumber9Filled/>,
   ]

type props = {
  key : number
  photoname : string | null
  rating : number
  displayName : string
  type : string
  latitude? : number
  longitude? : number
}

const Placecomponent = (props : props) => {


  return (
    <div key={props.key} className=" w-full ">
                      
                      <>
                        {/**    <Image src={ `https:${place.photos[3].authorAttributions[0].photoUri}`} alt="" height={1365} width={2048}/> */}
                        <div className="flex items-start justify-start gap-2  h-full shadow-lg rounded-md">
                           <div className="  sm:w-[230px] h-[130px]  flex items-center justify-center p-2 ">
                                { /**      **width edo epireazei responsive phone
                                 * <Placephoto photoName={props.photoname}/> */ }/
                           </div>
                           <div className=" flex-1 h-full  relative">
                                <h4 className=" text-base font-semibold tracking-tight text-center w-full py-2">{props.displayName}</h4>
                               {/**   <a href={place.websiteUri}>View more</a>     */} 
                                <div className=" h-10 flex flex-row items-center justify-center relative ">
                                     <div className="absolute right-0 flex flex-row items-center gap-1 ">
                                       <IoStar color="gold"/>
                                       <p className="pr-2">{2*props.rating}</p>  
                                     </div>                       
                                       <p className="">{props.type}</p>      
                                     <div className="absolute left-4 top-[5px] text-blue-700 text-3xl ">
                                        {props.key}                 
                                     </div>   
                                   {/**   <Useclient latitude={props.latitude} longitude={props.longitude}/>    */ }     
                                </div>

                                <div className="absolute right-2 bottom-2 flex  gap-2">            
                                    <Button  className="bg-blue-700 hover:bg-blue hover:opacity-100 h-8 w-14" >View</Button>
                                    <Button  className="bg-blue-700 hover:bg-blue hover:opacity-100 h-8 w-14" >Add</Button>
                                </div>
                           </div>     
                        </div>
                        
                      </>
                                             
                 </div>
  )
}

export default Placecomponent