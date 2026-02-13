'use client'

import React, { useState } from 'react'
import { IoLocationSharp } from "react-icons/io5";
import DatePickerExample from "./locationinput/datepicker";
import Curveline from './curveline';
import PlaceSearchWrapper from "./locationinput/locationinput";
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
import Addnewcyrcle from './addnewcyrcle';
import Actionsmenu from './actionmenu/actionmenu';
import ViewPlaceMoadal from './locationinput/viewplacemodal';
import { Input } from '@/components/ui/input';
import EditableText from './editableInput';
import { Button } from '@/components/ui/button';
import { z } from "zod";
import { updatePoint } from '../action';

// import Savebtn from '../viewcyrclemodal/deletebtn';

const updateSchema = z.object({
  place: z
    .object({
      name: z.string().min(1),
      address: z.string().optional(),
      placeId: z.string().optional(),
      location: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
    })
    .nullable()
    .refine((v) => v !== null, "Place is required"),

  dates: z
    .array(z.date())
    .length(2, "Start and end dates are required")
    .refine(([s, e]) => e >= s, "End date cannot be before start date"),

  id: z.string(),
  tripId: z.string(),
  index: z.number(),
});


type TripSegment = {
  id: string;
  tripId: string;
  role: 'MOVING_BOX' | string; // enum-like if you have defined roles
  index: number;

  placeName: string | null;
  placeAddress: string;
  placeId: string;
  placeLat: number | null;
  placeLng: number | null;

  startDate: Date | null;
  endDate: Date | null;

  fromName: string;
  fromAddress: string;
  fromPlaceId: string;
  fromLat: number;
  fromLng: number;

  toName: string;
  toAddress: string;
  toPlaceId: string;
  toLat: number;
  toLng: number;

  transportType: 'car' | 'bus' | 'train' | 'flight' | string; // expand as needed
  departureDate: Date;
  departureTime: Date;
};

type Props = {
  data : TripSegment
  index : number  
  datalenght : number
  tripId : string
  withcurveline : boolean
  minDate?: Date
} 

const fakeAccommodations = [
    {
      id: "1",
      name: "Cozy Airbnb",
      description: "Perfect for couples",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=300&fit=crop",
    },
  ];

  const fakePlaces = [
    {
      id: "1",
      name: "Eiffel Tower",
      description: "Iconic landmark in Paris",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&h=300&fit=crop",
    },
    {
      id: "2",
      name: "Notre Dame",
      description: "Famous medieval cathedral",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=300&fit=crop",
    },
    {
      id: "",
      name: "Notre Dame",
      description: "Famous medieval cathedral",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=300&fit=crop",
    },
  ];

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
  {gridColumn: 2, gridRow : 2, line : "left" },
  {gridColumn: 1, gridRow : 3 ,line : "right"  },
  {gridColumn: 2, gridRow : 4 ,line : "left" },
  {gridColumn: 1, gridRow : 5 ,line : "right" , pl : '50px' },
  {gridColumn: 2, gridRow : 6 ,line : "left"  , pl : '10px' },
  {gridColumn: 1, gridRow : 7 ,line : "right" , pl : '50px' },
  {gridColumn: 2, gridRow : 8 ,line : "left"  , pl : '10px' },
  {gridColumn: 1, gridRow : 9 ,line : "right" , pl : '50px' },
  {gridColumn: 2, gridRow : 10 ,line : "left" , pl : '10px'},
  {gridColumn: 1, gridRow : 11 ,line : "right" , pl : '50px'},
  {gridColumn: 2, gridRow : 12 ,line : "left"  , pl : '10px'},
  {gridColumn: 1, gridRow : 13 ,line : "right" , pl : '50px'},
  {gridColumn: 2, gridRow : 14 ,line : "left"  , pl : '10px'},
  {gridColumn: 1, gridRow : 15 ,line : "right" , pl : '50px'},
  {gridColumn: 2, gridRow : 16 ,line : "left"  , pl : '10px'},
  {gridColumn: 1, gridRow : 17 ,line : "right" , pl : '50px'},
  {gridColumn: 2, gridRow : 18 ,line : "left"  , pl : '10px'},
  {gridColumn: 1, gridRow : 19 ,line :"right"  , pl : '50px'},
  {gridColumn: 2, gridRow : 20 ,line : "left"  , pl : '10px'},
  {gridColumn: 1, gridRow : 21 ,line : "right" , pl : '50px'} ,
  ]

const Point =  (props:Props) => {
  
 const [selectedPlace, setSelectedPlace] = useState<{
    name: string;
    address: string;
    placeId: string;
    location: { lat: number; lng: number };
  } | null>({
    name: props.data.placeName ?? "",
    address: props.data.placeAddress,
    placeId: props.data.placeId,
    location: {
      lat: props.data.placeLat ?? 0,
      lng: props.data.placeLng ?? 0,
    },
  });

  // DATE RANGE
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    props.data.startDate ?? null,
    props.data.endDate ?? null,
  ]);

  const [isOpen, setIsOpen] = useState(false);

  // SHOW SAVE BUTTON ONLY IF USER CHANGED SOMETHING
  const [isDirty, setIsDirty] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleModalChange = (open: boolean) => {
  if (!open) {
    // Reset everything to initial values when modal closes
    setSelectedPlace({
      name: props.data.placeName ?? "",
      address: props.data.placeAddress,
      placeId: props.data.placeId,
      location: {
        lat: props.data.placeLat ?? 0,
        lng: props.data.placeLng ?? 0,
      },
    });
    setDateRange([props.data.startDate ?? null, props.data.endDate ?? null]);
    setIsDirty(false);
    setError(null);
  }
  setIsOpen(open);
  };

  // -------------------------------------------------
  // ⭐ HANDLE UPDATE
  // -------------------------------------------------
  const handleSave = async () => {
    setError(null);

    const dates =
      dateRange[0] && dateRange[1] ? [dateRange[0], dateRange[1]] : [];

      console.log('selected place 1' , selectedPlace )
    const validation = updateSchema.safeParse({
      place: selectedPlace,
      dates,
      id: props.data.id,
      tripId: props.data.tripId,
      index: props.data.index,
    });

    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    const d = validation.data;

    const fd = new FormData();
    fd.append("id", d.id);
    fd.append("tripId", d.tripId);
    fd.append("index", String(d.index));
    fd.append("role", "POINT");

    fd.append("placeName", d.place.name);
    fd.append("placeId", d.place.placeId || "");
    fd.append("placeAddress", d.place.address || "");
    fd.append("placeLat", String(d.place.location.lat));
    fd.append("placeLng", String(d.place.location.lng));

    fd.append("startDate", d.dates[0].toISOString());
    fd.append("endDate", d.dates[1].toISOString());

    try {
       console.log('selected place 2' , selectedPlace )
      await updatePoint(fd); // <--- your backend update
      setIsDirty(false);
    } catch (e) {
      setError("Failed to update.");
      console.error(e);
    }
  };

 
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
  //const formattedStartDate = props.data.startDate.replace(/ /g, "/");

// let formattedEndDate
// if (props.data.enddate){
// formattedEndDate = props.data.enddate.replace(/ /g, "/");
// }
console.log(props.index)
console.log(props.datalenght)
console.log(props.withcurveline)


  function isSingleDigit(input : number) {
    if (typeof input === "number" && input >= 0 && input <= 9) {
        return true; // Single-digit number
    }
    return false; // Not a single-digit number
  }

  
  return (
    <>
    <Dialog open={isOpen} onOpenChange={handleModalChange} >
       <div style={{ paddingBottom: `${props.withcurveline === false && '20px'}` , marginLeft: props.withcurveline  ? '0px' 
      : positiongridphone[props.datalenght + 2 - props.index].pl ,gridRow :` ${props.withcurveline ?positiongrid[props.index].gridRow : props.datalenght + 2 - props.index}`  ,gridColumn :
       `${props.withcurveline 
           ? props.index + 2  
            : positiongridphone[props.datalenght + 2 - props.index].gridColumn}`, display : "flex" , alignItems : "center", justifyItems : "center" , height : "100px" , width : "100px" , position : "relative"}} >
           <DialogTrigger asChild>
             <div onClick={() => setIsOpen(true)}  className=' text-white cursor-pointer bg-[#2E305B]  h-[100px] w-[100px] rounded-[50%] flex items-center justify-center gap-[3px] flex-col z-50'>
                <IoLocationSharp className=' text-xl'/>
                <h4 className=' text-center'>
                   {/**  {result.shortFormattedAddress ? <>{result.shortFormattedAddress}</> : */} 
                   <>{props.data.placeName}</>  
                </h4>
                <div className=' h-5'>
                </div>
             </div>
           </DialogTrigger>
           <div key={props.data.id} className=' absolute  bottom-5 xxs:bottom-2 right-[40px] text-white  z-50'>
                <Actionsmenu tripId={props.tripId} pointslength={props.datalenght} pointIndex={props.index + 1} pointId={props.data.id}/>
           </div>
             
           <div className=' relative '>
             {props.withcurveline ?
                <>
                 {positiongrid[props.index].line === "up" ?
                    <div className=' absolute top-[-100px] right-[-46px] z-0 '>
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
                  <CurvelinePhone isthefirst={props.data.index === 0} color={false} line={positiongridphone[props.datalenght + 2 - props.index].line} />
                </>
             }  
            </div>    
        </div>


         <DialogContent  onOpenAutoFocus={(e) => e.preventDefault()} className="  z-[52]    sm:max-h-[90%] min-w-[262px] w-full sm:w-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-3">
            <DialogHeader className='flex justify-start  items-start'>
              <DialogTitle className=' text-xl w-[90%] '>
                  <PlaceSearchWrapper
                      onPlaceSelected={(place) => {
                        setSelectedPlace(place)
                        setIsDirty(true);
                      }}
                      onMovingbox
                      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}
                      defaultQuery={props.data?.placeName!}
                    />              
              </DialogTitle>
            </DialogHeader>
                 
                    <DatePickerExample
                        isRange
                        onChange={(value) => {
                          if (Array.isArray(value)) {
                            setDateRange(value as [Date | null, Date | null]);
                          } else {
                            setDateRange([value as Date, null]);
                          }
                           setIsDirty(true);
                        }}
                        namePrefix="booking"
                        defaultValue={dateRange}
                     />  
                 
            {isDirty && (
            <div className="flex justify-end ">
                <Button onClick={handleSave}>Save</Button>
            </div>
          )}

             <ViewPlaceMoadal pointId={props.data.id} tripId={props.tripId}  />
            {/**
             * 
            <Savebtn  />  */}
          </DialogContent>
     </Dialog>
     {props.datalenght === props.index + 1 && (
          <>  
            <Addnewcyrcle minDate={props.data.endDate!} index={ props.data.index + 1} tripId={props.data.tripId} withcurveline={props.withcurveline} />
          </>
      )}

    </>
  )
}

export default Point