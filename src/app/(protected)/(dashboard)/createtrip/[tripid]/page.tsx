import React from 'react'

import Mapprovider from '@/app/component/map/map-provider';
import Tripboard from './components/tripboard';
import Tripboardphone from './components/tripboardphone';

const points = [
  {
    id: "1",
    role: "POINT",
    index: 0,
    startdate: "2024-12-01",
    location: "New York, USA",
    enddate: null,
    to: null,
    from: null,
    time: "10:30 AM",
    moveIcon: null,
    lat1: "40.7128",
    lng1: "-74.0060",
    lat2: null,
    lng2: null,
    placeId1: "ChIJqaUj8fBLzEwRZ5UY3sHGz90",
    placeId2: null,
    cyrcleArrId: "C1",
  },
  {
  id: "2",
  role: "MOVINGBOX",
  index: 1,
  startdate: "2024-12-02",          // departure date
  enddate: "2024-12-03",            // arrival date
  from: "New York, USA",
  to: "Los Angeles, USA",
  departureTime: "2024-12-02T16:00:00", // ISO format recommended
  arrivalTime: "2024-12-03T19:30:00",
  transportType: "Plane",
  duration: "5h 30m",
  cost: "$320",
  notes: "Direct flight, check-in 2 hours before departure.",
  moveIcon: "plane",
  location: null, // not needed here but you kept it in your schema
  time: "4:00 PM", // consider replacing this with departureTime
  lat1: "40.7128", // New York coords
  lng1: "-74.0060",
  lat2: "34.0522", // Los Angeles coords
  lng2: "-118.2437",
  placeId1: "ChIJqaUj8fBLzEwRZ5UY3sHGz90",
  placeId2: "ChIJE9on3F3HwoAR9AhGJW_fL-I",
  cyrcleArrId: "C2",
  },
  {
    id: "3",
    role: "POINT",
    index: 2,
    startdate: "2024-12-04",
    location: "Los Angeles, USA",
    enddate: null,
    to: null,
    from: null,
    time: "8:00 AM",
    moveIcon: null,
    lat1: "34.0522",
    lng1: "-118.2437",
    lat2: null,
    lng2: null,
    placeId1: "ChIJE9on3F3HwoAR9AhGJW_fL-I",
    placeId2: null,
    cyrcleArrId: "C3",
  },
  {
    id: "4",
    role: "MOVINGBOX",
    index: 3,
    startdate: "2024-12-05",
    location: null,
    enddate: "2024-12-06",
    to: "Chicago, USA",
    from: "Los Angeles, USA",
    time: "3:00 PM",
    moveIcon: "train",
    lat1: "34.0522",
    lng1: "-118.2437",
    lat2: "41.8781",
    lng2: "-87.6298",
    placeId1: "ChIJE9on3F3HwoAR9AhGJW_fL-I",
    placeId2: "ChIJ7cv00DwsDogRAMDACa2m4K8",
    cyrcleArrId: "C4",
  },

];

const page = () => {
  return (
    <div className=' min-h-[490px] xxs:border-4  bottom-0 absolute right-0 left-0 top-0  flex flex-col '>
        
        <div className=' h-[45%]  xxs:block hidden    ' >
           <Tripboard  tripId='' cyrclesArr={points} />
        </div>
        <div className=' h-[55%]  w-full xxs:block hidden bg-slate-500  ' >
             <Mapprovider cyrclesArr={points} /> 
        </div>

       
       
        <div  className='  h-[43%] block xxs:hidden '>
           <Tripboardphone  tripId='' cyrclesArr={points} />
        </div>
    </div>
  )
}

export default page