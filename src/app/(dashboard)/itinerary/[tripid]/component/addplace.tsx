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
               <div className=" border-2 border-pink-600  sm:w-full 950:w-[70%]">
                  <div className=" text-sm sm:text-md ">
                  These places to stay are highly recommended by our team for their prime location, affordability, and safety {/**na ginei prop */}
                  </div>
                  <div className=" w-full flex gap-2 flex-col h-[387px]  pr-4 overflow-auto " >
                        {/**result.places.map */}  
                     {
                          result.places.map((place  : any , key : number ) => 
                           place.photos  &&
                          <Placecomponent longitude={22302493043} latitude={10930202  } key={key} type={place.primaryTypeDisplayName.text} photoname={place.photos[0].name} rating={place.rating} displayName={place.displayName.text}/>

                      )}                             
                   </div> 
                </div>
                
                <div className=" border-2 border-yellow-700 hidden 950:flex  w-[50%] h-[440px]  z-50 cursor-pointer ">
                  
                </div>
           </div>
           
           </DialogContent> 
      </Dialog>
  )
}

export default Addaplace