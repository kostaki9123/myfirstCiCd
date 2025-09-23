import Link from "next/link";
import React from "react";
import { IoMdAdd } from "react-icons/io";

const ViewPlaceModal = () => {
  return (
    <div className="flex flex-col 820:flex-row gap-6 items-start justify-start w-full overflow-y-auto p-4">
      
      {/* Accommodation Card */}
      <Link href={`/itinerary/8293`}>
         <div className="relative flex flex-col items-center justify-center min-h-[13rem] max-h-[14rem] w-full rounded-lg border-2 border-dashed border-gray-400 hover:border-gray-600 transition-all duration-200 cursor-pointer group">
           <h4 className="absolute top-2 text-base font-semibold tracking-tight text-center">
             Accommodation
           </h4>
           <div className="flex flex-col items-center justify-center gap-3">
             <div className="h-20 w-20 flex items-center justify-center rounded-full bg-gray-500 text-white group-hover:bg-gray-600 transition-all duration-200">
               <IoMdAdd size={28} />
             </div>
             <p className="w-3/4 text-center text-gray-500 font-medium group-hover:text-gray-700 transition-all duration-200">
               Add a Place to Stay
             </p>
           </div>
         </div>
      </Link>

      {/* Places Card */}
      <Link  href={`/itinerary/8293`}>
        <div className="relative flex flex-col items-center justify-center min-h-[13rem] max-h-[14rem] w-full rounded-lg border-2 border-dashed border-gray-400 hover:border-gray-600 transition-all duration-200 cursor-pointer group">
          <h4 className="absolute top-2 text-base font-semibold tracking-tight text-center">
            Places
          </h4>
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="h-20 w-20 flex items-center justify-center rounded-full bg-gray-500 text-white group-hover:bg-gray-600 transition-all duration-200">
              <IoMdAdd size={28} />
            </div>
            <p className="w-3/4 text-center text-gray-500 font-medium group-hover:text-gray-700 transition-all duration-200">
              Add a Place to Visit
            </p>
          </div>
        </div>
      </Link>

    </div>
  );
};

export default ViewPlaceModal;
