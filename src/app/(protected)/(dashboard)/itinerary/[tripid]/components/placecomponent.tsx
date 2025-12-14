import React from 'react'
import { IoStar } from "react-icons/io5";

import { Button } from '@/components/ui/button';
import Link from 'next/link';



type props = {
  key : number
  rating : number
  displayName : string
  type : string
  latitude? : number
  longitude? : number
  description: string
  address : string
  link? : string
}

const Placecomponent = (props : props) => {

  return (
    <div  className="flex items-start justify-start gap-4 h-full shadow-lg rounded-md bg-white p-4">
      {/* Main content area */}
      <div className="flex-1 h-full  relative">
        {/* Display Name */}
        <h4 className="text-lg font-semibold tracking-tight text-center w-full py-2 border-b border-gray-200">
          {props.displayName || "Unknown Place"}
        </h4>

        {/* Rating and Type */}
        <div className="  h-12 flex flex-row items-center justify-between mt-4 px-4 ">
          <div className="flex items-center gap-2">
            <IoStar color="gold" size={20} title="Rating" />
            <p className="font-medium text-gray-700">{props.rating ? 2 * props.rating : "N/A"}</p>
          </div>
         {/** <p className="text-gray-600 text-sm">{props.type || "Type not specified"}</p>
          <div className="absolute left-4 top-0 text-blue-700 text-3xl font-bold">  
            
          </div> */}
        </div>

        {/* Description */}
        {props.description && (
          <p className="text-sm text-gray-500 mt-2 px-4 line-clamp-3">
            {props.description}
          </p>
        )}

        {/* Address */}
        {props.address && (
          <div className="mt-3  px-4 flex gap-1 text-sm text-gray-600">
            <p className="font-medium">Address:</p>
            <p>{props.address }</p>
          </div>
        )}

        {/* Buttons */}
        <div className="absolute right-4 bottom-4 flex gap-3">
          <Link href={props.link || ''}>
             <Button
               className="bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition duration-200 ease-in-out h-8 px-4 text-sm rounded"      
               aria-label="View details"
             >
            View
          </Button>
          </Link>
          <Button
            className="bg-green-600 text-white hover:bg-green-700 active:bg-green-800 transition duration-200 ease-in-out h-8 px-4 text-sm rounded"
            
            aria-label="Add to list"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Placecomponent