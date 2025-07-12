import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { BsHouseAddFill } from "react-icons/bs";
import Placecomponent from "./placecomponent";
import { TbSquareRoundedNumber1Filled } from "react-icons/tb";
import { TbSquareRoundedNumber2Filled } from "react-icons/tb";
import { TbSquareRoundedNumber3Filled } from "react-icons/tb";
import { TbSquareRoundedNumber4Filled } from "react-icons/tb";
import { TbSquareRoundedNumber5Filled } from "react-icons/tb";
import { TbSquareRoundedNumber6Filled } from "react-icons/tb";
import { TbSquareRoundedNumber7Filled } from "react-icons/tb";
import { TbSquareRoundedNumber8Filled } from "react-icons/tb";
import { TbSquareRoundedNumber9Filled } from "react-icons/tb";
import App from "@/app/component/map/map";
import Mapprovider from "@/app/component/map/map-provider";
import LocationInput from "./inputauto";



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
  latitude: string
  longitude: string
  cyrclesArr: any
  triggerName : string
  descriptionName : string
}

//  props pou prepei na prosthethoun
//dialog btn name :  Add a place to stay ,Add a place to visit
//description dialog : These places to stay are highly recommended by our team for their prime location, affordability, and safety , ...

//prosexe responsive

const Addaplace = async (props:props) => {


//const url = `https://places.googleapis.com/v1/places/${props.data.placeId1}?fields=*&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}`

const url = `https://places.googleapis.com/v1/places:searchNearby`

 const requestBody = {
   includedTypes: ["hostel" ], 
   maxResultCount: 9,  
   locationRestriction: {
     circle: {
       center: {
         latitude:  34.9521888,
         longitude: 33.5908529
       },
       radius: 10000.0
     }
   },
 };

 const response : any = await fetch(`${url}`, {
     method: 'POST' ,
     headers: {
       'Content-Type': 'application/json',
       'X-Goog-Api-Key': `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}`,
       'X-Goog-FieldMask': '*'
     },
     cache: 'no-store',
     body: JSON.stringify(requestBody)
       })

  const result = await response.json();
  console.log(result)

  if (!response.ok) {
    throw new Error('Error to get accomodation places:', result.error.message);
  }

//  console.log("result" , result)



//
//
// setlocArr(formattedLocations);
  
// console.log("Aqui" ,formattedLocations)
  return (
      <Dialog >  
          <DialogTrigger className='    bg-gray-400 rounded-md xxl:[60%] min-w-[260px] xxl:[70%] xxxl:w-[55%] h-10 flex items-center justify-start gap-[22%] p-5 cursor-pointer' >
                        <BsHouseAddFill fontSize="20px"/>    {/**diaforetiko based on trigger name */} 
                        <div className=" text-base font-medium">{props.triggerName}</div>          
          </DialogTrigger>
         
      
          <DialogContent  className={` h-[520px] w-[90%] sm:w-[70%] min-w-[320px]  sm:pl-4 mt-3  `}   >
             <DialogTitle>Dialog title</DialogTitle>
             {/** <Input 
               className=" border-b-2 border-t-0 border-r-0 border-l-0 focus:border-t-0 focus-visible:ring-0  border-black rounded-none w-[90%] px-2" 
               placeholder="Search a place"     
               />
             }
              {/** <AutocompleteInput searchPlace="cy"/> */}
            <div className="flex gap-2 " >
               <div className="  sm:w-full 950:w-[70%]">
                  <div className=" text-sm sm:text-md ">
                  These places to stay are highly recommended by our team for their prime location, affordability, and safety {/**na ginei prop */}
                  </div>
                  <div className=" w-full flex gap-2 flex-col h-[387px]  pr-4 overflow-auto " >
                        {
                           result.places &&
                           Array.isArray(result.places) &&
                           result.places.map((place: any, index: number) => (
                            <div className="relative" >
                                   <div className=" absolute top-7 left-8" >  
                                      {numbersiconArr.map((icon, key) => (
                                        <>   {index === key &&
                                            <div key={index} className="text-3xl text-blue-600">
                                              {icon}
                                            </div>
                                              }
                                         </> 
                                       ))}
                                    </div>
                                  <Placecomponent
                                    longitude={22302493043}
                                    latitude={10930202}
                                    key={index}
                                    type={place.primaryTypeDisplayName.text}
                                    rating={place.rating}
                                    description="life is wonderful even ..."
                                    address="xristou andreou"
                                    displayName={place.displayName.text || 'omonoia'}
                                    />
                           </div>
                   
                        ))
                      }                 
                   </div> 
                </div>
                
                <div className=" border-2 border-yellow-700 hidden 950:flex  w-[50%] h-[440px]  z-50 cursor-pointer ">
                    <Mapprovider/>
                </div>
           </div>
           
           </DialogContent> 
      </Dialog>
  )
}

export default Addaplace