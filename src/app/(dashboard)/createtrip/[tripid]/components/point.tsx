import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import Addnewcyrcle from './addnewcyrcle';
import Curveline from './curveline';
// import Actionsmenu from '../actionsmenu/actionsmenu';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
// import ViewPlaceMoadal from '../viewcyrclemodal/viewplacemodal';

// import Savebtn from '../viewcyrclemodal/deletebtn';

type Props = {
  data : any
  index : number  
  datalenght : number
  tripId : string
}

const positiongrid = [
  {gridColumn: 2, gridRow : 3 ,line : "up"},  //grid colunm delte if not needded
  {gridColumn: 3, gridRow : 2 ,line : "down" },
  {gridColumn: 4, gridRow : 3 ,line : "up" },
  {gridColumn: 5, gridRow : 2 ,line : "down"},
  {gridColumn: 6, gridRow : 3 ,line : "up" },
  {gridColumn: 7, gridRow : 2 ,line : "down"},
  {gridColumn: 8, gridRow : 3 ,line : "up" },
  {gridColumn: 9, gridRow : 2 ,line : "down"},
  {gridColumn: 10, gridRow : 3 ,line : "up" },
  {gridColumn: 11, gridRow : 2 ,line : "down"},
  {gridColumn: 12, gridRow : 3 ,line : "up" },
  {gridColumn: 13, gridRow : 2 ,line : "down"},
  {gridColumn: 14, gridRow : 3 ,line : "up" },
  {gridColumn: 15, gridRow : 2 ,line : "down"},
  {gridColumn: 16, gridRow : 3 ,line : "up" },
  {gridColumn: 17, gridRow : 2 ,line : "down"},
  {gridColumn: 18, gridRow : 3 ,line : "up" },
  {gridColumn: 19, gridRow : 2 ,line : "down"},
  {gridColumn: 20, gridRow : 3 ,line : "up" },
  {gridColumn: 21, gridRow : 2 ,line : "down"},
 ]



const Point = async (props:Props) => {
  // const fields = 'id,displayName';
//
  // 
  // const url = `https://places.googleapis.com/v1/places/${props.data.placeId1}?fields=*&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}`
//
  // const response : any = await fetch(`${url}`, {
  //    // headers: {
  //    //      'Content-Type': 'application/json',
  //    //      'X-Goog-Api-Key': process.env.NEXT_PUBLIC_GOOGLE_MAP_API!,
  //    //      'X-Goog-FieldMask': 'places.websiteUri,places.types,places.id'
  //    //    },
  //     cache: 'no-store'
  //       })
  //    console.log(response)
  // const result = await response.json();

  //  console.log("Id data" ,result , props.data.placeId1)
  const formattedStartDate = props.data.startdate.replace(/ /g, "/");

  let formattedEndDate
  if (props.data.enddate){
  formattedEndDate = props.data.enddate.replace(/ /g, "/");
  }

  return (
    <>
    <Dialog >
       <div style={{gridRow :`${positiongrid[props.index].gridRow}`  ,gridColumn : `${props.index + 2} `, display : "flex" , alignItems : "center", justifyItems : "center" , height : "83px" , width : "89px" , position : "relative"}} >
           <DialogTrigger asChild>
             <div className=' text-white cursor-pointer bg-[#2E305B] h-[90px] w-[90px] rounded-[50%] flex items-center justify-center gap-[3px] flex-col'>
                <IoLocationSharp className=' text-xl'/>
                <h4 className=''>
                   {/**  {result.shortFormattedAddress ? <>{result.shortFormattedAddress}</> : */} 
                   <>Place</>  
                </h4>
                <div className=' h-5'>
                </div>
             </div>
           </DialogTrigger>
           <div className=' absolute bottom-2 right-[33px] text-white z-10'>
                  {/** action menu <Actionsmenu cyrcleId={props.data.id}/> */}
           </div>
           <div className=' relative '>
              {positiongrid[props.index].line === "up"  ?
                 <div className=' absolute top-[-100px] right-[-46px]'>
                       <Curveline line="up" />
                 </div> 
                 :
                 <div  className=' absolute top-[21px] right-[-64px]'>
                       <Curveline line="down"/>
                 </div>
                 }
            </div>      
        </div>


         <DialogContent className="  h-fit w-fit  absolute ">
            <DialogHeader>
              <DialogTitle className=' text-xl'>
                  {props.data.location}
              </DialogTitle>   
              <DialogDescription>
                 {formattedStartDate}-{formattedEndDate}
              </DialogDescription>
            </DialogHeader>

            {/** <ViewPlaceMoadal/>
           
            <Savebtn  />  */}
          </DialogContent>
     </Dialog>
     {props.datalenght === props.index + 1 && (
          <>  
            <Addnewcyrcle index={ props.index + 1} tripId={props.tripId} cyrcleArrId={props.data.cyrcleArrId} />
          </>
      )}

    </>
  )
}

export default Point