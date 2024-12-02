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
import CurvelinePhone from './curvelinephone';
// import ViewPlaceMoadal from '../viewcyrclemodal/viewplacemodal';

// import Savebtn from '../viewcyrclemodal/deletebtn';

type Props = {
  data : any
  index : number  
  datalenght : number
  tripId : string
  withcurveline : boolean
} 

const positiongrid = [
  {gridColumn: 2, gridRow : 3 ,line : "up"   },  //grid colunm delte if not needded
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

 const positiongridphone = [
  {gridColumn:1, gridRow : 2, line : "left" },
  {gridColumn:2, gridRow : 3 ,line : "right"  },
  {gridColumn:1, gridRow : 4 ,line : "left" },
  {gridColumn:2, gridRow : 5 ,line : "right"},
  {gridColumn:1, gridRow : 6 ,line : "left" },
  {gridColumn:2, gridRow : 7 ,line : "right"},
  {gridColumn:1, gridRow : 8 ,line : "left" },
  {gridColumn:2, gridRow : 9 ,line : "right"},
  {gridColumn: 1, gridRow : 10 ,line : "left" },
  {gridColumn: 2, gridRow : 11 ,line : "right"},
  {gridColumn: 1, gridRow : 12 ,line : "left" },
  {gridColumn: 2, gridRow : 13 ,line : "right"},
  {gridColumn: 1, gridRow : 14 ,line : "left" },
  {gridColumn: 2, gridRow : 15 ,line : "right"},
  {gridColumn: 1, gridRow : 16 ,line : "left" },
  {gridColumn: 2, gridRow : 17 ,line : "right"},
  {gridColumn: 1, gridRow : 18 ,line : "left" },
  {gridColumn: 2, gridRow : 19 ,line :"right"},
  {gridColumn: 1, gridRow : 20 ,line : "left" },
  {gridColumn: 2, gridRow : 21 ,line : "right"},
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
       <div style={{ paddingBottom: `${props.withcurveline === false && '20px'}` , marginLeft: props.withcurveline  ? '0px' 
      : (positiongridphone[props.index].gridColumn === 2 ? '10px' : '50px') ,gridRow :` ${props.withcurveline ?positiongrid[props.index].gridRow : props.datalenght + 2 - props.index}`  ,gridColumn : `${props.withcurveline ? props.index + 2 : positiongridphone[props.index].gridColumn} `, display : "flex" , alignItems : "center", justifyItems : "center" , height : "83px" , width : "89px" , position : "relative"}} >
           <DialogTrigger asChild>
             <div className=' text-white cursor-pointer bg-[#2E305B] h-[90px] w-[90px] rounded-[50%] flex items-center justify-center gap-[3px] flex-col z-40'>
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
             {props.withcurveline ?
                <>
                 {positiongrid[props.index].line === "up" ?
                    <div className=' absolute top-[-100px] right-[-46px]'>
                          <Curveline line="up" />
                    </div> 
                    :
                    <div  className=' absolute top-[21px] right-[-64px]'>
                          <Curveline line="down"/>
                    </div>
                    }   
                </> 
                :
                <>
                  <CurvelinePhone isthefirst={props.index === 0} color={false} line={positiongridphone[props.datalenght + 2 - props.index].line} />
                </>
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
            <Addnewcyrcle index={ props.index + 1} tripId={props.tripId} cyrcleArrId={props.data.cyrcleArrId} withcurveline={props.withcurveline} />
          </>
      )}

    </>
  )
}

export default Point