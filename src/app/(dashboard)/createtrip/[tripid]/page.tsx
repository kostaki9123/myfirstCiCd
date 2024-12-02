import React from 'react'
import Tripboard from './components/tripboard'
import Tripboardphone from './components/tripboardphone';

const points = [
  {
    id: "1",
    role: "POINT",
    index: 0,
    startdate: "2024-11-29T08:00:00Z",
    location: "New York, NY",
    enddate: null,
    to: null,
    from: null,
    time: null,
    moveIcon: null,
    lat1: "40.7128",
    lng1: "-74.0060",
    lat2: null,
    lng2: null,
    placeId1: "ChIJOwg_06VPwokRYv534QaPC8g",
    placeId2: null,
    cyrcleArrId: "A1"
  },
  {
    id: "2",
    role: "MOVINGBOX",
    index: 1,
    startdate: "2024-11-29T09:00:00Z",
    location: null,
    enddate: "2024-11-29T10:00:00Z",
    to: "Los Angeles, CA",
    from: "New York, NY",
    time: "2h 30m",
    moveIcon: "airplane",
    lat1: "40.7128",
    lng1: "-74.0060",
    lat2: "34.0522",
    lng2: "-118.2437",
    placeId1: "ChIJOwg_06VPwokRYv534QaPC8g",
    placeId2: "ChIJE9on3F3HwoAR9AhGJW_fL-I",
    cyrcleArrId: "A2"
  },
  {
    id: "3",
    role: "POINT",
    index: 2,
    startdate: "2024-11-29T12:00:00Z",
    location: "Los Angeles, CA",
    enddate: null,
    to: null,
    from: null,
    time: null,
    moveIcon: null,
    lat1: "34.0522",
    lng1: "-118.2437",
    lat2: null,
    lng2: null,
    placeId1: "ChIJE9on3F3HwoAR9AhGJW_fL-I",
    placeId2: null,
    cyrcleArrId: "A3"
  },
  {
    id: "3",
    role: "MOVINGBOX",
    index: 3,
    startdate: "2024-11-29T15:00:00Z",
    location: null,
    enddate: "2024-11-29T17:00:00Z",
    to: "San Francisco, CA",
    from: "Los Angeles, CA",
    time: "6h",
    moveIcon: "car",
    lat1: "34.0522",
    lng1: "-118.2437",
    lat2: "37.7749",
    lng2: "-122.4194",
    placeId1: "ChIJE9on3F3HwoAR9AhGJW_fL-I",
    placeId2: "ChIJIQBpAG2ahYAR_6128GcTUEo",
    cyrcleArrId: "A4"
  },
  {
    id: "4",
    role: "MOVINGBOX",
    index: 4,
    startdate: "2024-11-29T15:00:00Z",
    location: null,
    enddate: "2024-11-29T17:00:00Z",
    to: "San Francisco, CA",
    from: "Los Angeles, CA",
    time: "6h",
    moveIcon: "car",
    lat1: "34.0522",
    lng1: "-118.2437",
    lat2: "37.7749",
    lng2: "-122.4194",
    placeId1: "ChIJE9on3F3HwoAR9AhGJW_fL-I",
    placeId2: "ChIJIQBpAG2ahYAR_6128GcTUEo",
    cyrcleArrId: "A4"
  },
  
];


const page = () => {
  return (
    <div className=' xxs:border-4   h-full bottom-0 absolute right-0 left-0  flex flex-col  '>
        
        <div className=' h-1/2 xxs:block hidden  ' >
           <Tripboard  tripId='' cyrclesArr={points} />
        </div>
        <div className=' h-[52%]  w-full xxs:block hidden bg-slate-500 ' >
           google map
        </div>

       
       
        <div  className=' block xxs:hidden h-full'>
           <Tripboardphone  tripId='' cyrclesArr={points} />
        </div>
    </div>
  )
}

export default page