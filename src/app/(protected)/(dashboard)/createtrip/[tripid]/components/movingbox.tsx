'use client'
import React from 'react'
import { IoLocationSharp } from "react-icons/io5";

//import Actionsmenu from '../actionsmenu/actionsmenu';
import { IoAirplaneOutline , IoTrain } from "react-icons/io5";
import { FaCar , FaBusAlt , FaBicycle, FaShip,FaWalking } from "react-icons/fa";
import { FaTrainTram, FaMotorcycle , FaTrainSubway , FaTaxi , FaFerry  } from "react-icons/fa6";
import { FaHelicopter } from "react-icons/fa";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Curveline from './curveline';
import CurvelinePhone from './curvelinephone';
import Addnewcyrcle from './addnewcyrcle';
import Actionsmenu from './actionmenu/actionmenu';
import Viewmovingboxmodal from './locationinput/viewmovingbox';
//import Savebtn from '../viewcyrclemodal/deletebtn';
//import ViewPlaceMoadal from '../viewcyrclemodal/viewplacemodal';

export type TripSegment = {
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
  notes: string;
};


type Props = {
  data : TripSegment
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

const Movingbox = (props : Props) => {
 // const [by , setBy] = useState<string>(props.data.moveIcon)
 //const [isByEdit , setisByEdit] = useState<boolean>(false)
 //const inputBy = useRef<any>(null);

//  useEffect(() => {
//    function handleClickOutside(event: MouseEvent) {
//        if (inputBy.current && !inputBy.current.contain,(event.target as Node)) {
//            setisByEdit(false);
//        }
//    }
//
//    document.addEventListener('mousedown', handleClickOutside);
//
//    return () => {
//        document.removeEventListener('mousedown', handleClickOutside);
//    };
//  }, []);
const transportModes = [
  { value: "flight", icon: <IoAirplaneOutline /> },
  { value: "bus", icon: <FaBusAlt /> },
  { value: "train", icon: <IoTrain /> },
  { value: "subway", icon: <FaTrainSubway /> },
  { value: "car", icon: <FaCar /> },
  { value: "walking", icon: <FaWalking /> },
  { value: "bicycle", icon: <FaBicycle /> },
  { value: "motorbike", icon: <FaMotorcycle /> },
  { value: "boat", icon: <FaShip /> },
  { value: "other", icon: <FaShip /> },
];


const getTransportIcon = (type: string) => {
  const found = transportModes.find((m) => m.value === type);
  return found ? found.icon : type;
};

const icon = getTransportIcon(props.data.transportType);

//const formattedDate = props.data.startdate.replace(/ /g, "/");
  
 // console.log("by" ,by)
  return (
<>
    <Dialog >
       <div style={{ paddingBottom: `${props.withcurveline === false && '20px'}`, marginLeft: props.withcurveline    ? '0px' : positiongridphone[props.datalenght + 2 - props.index].pl,gridRow :`${props.withcurveline ?positiongrid[props.index].gridRow : props.datalenght + 2 - props.index}`  ,gridColumn : `${props.withcurveline ? props.index + 2 : positiongridphone[props.datalenght + 2 - props.index].gridColumn} `, display : "flex" , alignItems : "center", justifyItems : "center" , height : "100px" , width : "100px" , position: 'relative' }} >
           <DialogTrigger asChild>
             <div className=' text-white cursor-pointer bg-[#2E305B] h-[100px] w-[100px] rounded-[50%] flex items-center justify-center gap-[3px] z-50 flex-col'>
                  <div className=' text-xl ' >
                    {icon}
                  </div>
                <div className=' h-5'>
                </div>
             </div>
           </DialogTrigger>
           <div className=' absolute  bottom-5 xxs:bottom-5 right-[40px] text-white  z-50'>
                <Actionsmenu tripId={props.tripId} pointIndex={props.index + 1} pointslength={props.datalenght} pointId={props.data.id}/>
           </div>
           <div className=' relative '>
              {props.withcurveline ? 
                 <>
                   {positiongrid[props.index].line === "up"  ?
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
                  <CurvelinePhone isthefirst={props.index === 0} color={true} line={positiongridphone[props.datalenght + 2 - props.index].line} />
                </>   
               }     
            </div>
           
        </div>


         <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className=" z-[52] pb-2    h-[70%]  820:w-fit w-[90%] 450:w-[350px]  pr-2   ">
            <DialogHeader className=''>
              <DialogTitle className=' text-xl'>
                 Transport Details
              </DialogTitle>             
            </DialogHeader>

            <Viewmovingboxmodal data={props.data}/> 
           
           {/**  <Savebtn  /> */}
          </DialogContent>
     </Dialog>
     {props.datalenght === props.index + 1  && (
          <>  
            <Addnewcyrcle  withcurveline={props.withcurveline} index={ props.index + 1} tripId={props.tripId}  />
          </>
      )}

    </>

  )
}

export default Movingbox