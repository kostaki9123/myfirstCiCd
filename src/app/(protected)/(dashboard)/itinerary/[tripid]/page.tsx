import React from 'react'
import Itineraryboard from './components/itineraryboard';


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
    startdate: "2024-12-02",
    location: null,
    enddate: "2024-12-03",
    to: "Los Angeles, USA",
    from: "New York, USA",
    time: "4:00 PM",
    moveIcon: "plane",
    lat1: "40.7128",
    lng1: "-74.0060",
    lat2: "34.0522",
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
    <div className=' h-full bottom-0 absolute right-0 left-0  flex border-4 border-yellow-600 min-w-[344px] '>
      <div className=' h-[100%] 950:w-[53%] w-[100%]  block  bg-lime-500 ' >
         <Itineraryboard cyrclesArr={points} />
      </div>
      <div className=' h-[100%]  w-[47%]   950:block hidden bg-slate-500 ' >
           google map                           
      </div>
    </div>
  )
}

export default page