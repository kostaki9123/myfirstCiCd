import Link from "next/link";
import Createtripmodal from "../component/create-trip-modal";
import DeleteAlertDialog from "../component/delete-trip-modal";
import { getTrips } from "./action";
import UpdateTripModal from "../component/UpdateTripModal";

export default async function Home() {

  let trips = await getTrips();

   trips.sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
  ); 

  return (
    <div className="  min-h-screen bg-gradient-to-b bg-[#010038] text-white pt-20">
      
      {/* Header */}
      <header className="w-full py-8 text-center shadow-lg">
        <div className="mb-6">
         <h1 className="text-white/70 text-2xl font-medium">
           My Trips
         </h1>
         
         <p className="text-white/40 text-sm mt-1">
           Manage and track all your planned trips
         </p>
        </div>
      </header>

      {/* Action Buttons */}
      <div className="mt-10 flex justify-center space-x-6">
        <Createtripmodal /> 
      </div>

      {/* Trip Cards */}
        
      <main className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-12 ">
        {trips.map((trip , key) => (
          <div
            key={key}
            className="
            border border-white/10
           hover:bg-white/15
            duration-300
            relative mb-6 bg-white/10 rounded-xl p-6 shadow-md hover:shadow-xl transform 
            hover:-translate-y-2 transition-all"
          >
            {/* Update Modal */}
           <UpdateTripModal
             tripId={trip.id}
             initialName={trip.tripName}
             initialBudget={trip.tripBudget}        // 🔹 required
             initialTravelingWith={trip.travelingWith} // 🔹 required
             initialTripTypes={trip.tripTypes}      // array
            />


            {/* Trip Name */}
            <h2 className="text-lg font-semibold text-white/90">{trip.tripName}</h2>

            {/* Features */}
            <div className="mt-6 flex flex-wrap gap-3">
                <span  className=" px-3 py-1 bg-white/5    border border-white/10    text-white/80    text-sm    rounded-full    backdrop-blur-md  "> 
                 💵 {trip.tripBudget}
                </span>
              
                <span className=" px-3 py-1 bg-white/5    border border-white/10    text-white/80    text-sm    rounded-full    backdrop-blur-md  ">
                  👥 {trip.travelingWith}
                </span>
              
                {trip.tripTypes.map((type, idx) => (
                  <span
                    key={idx}
                    className=" px-3 py-1 bg-white/10    border border-white/10    text-white/80    text-sm    rounded-full    backdrop-blur-md  "
                  >
                     {type}
                  </span>
                ))}              
             </div>

            {/* Actions */}
            <div className="mt-6 flex justify-between items-center">
              <Link
                href={{
                  pathname: `/home/${trip.id}`,
                }}
              >
                <button className="
                bg-[#0356BC] hover:bg-[#0466D9] text-white border border-white/10 shadow-lg
                 shadow-blue-950/40 px-4 py-2 rounded-xl font-medium transition-all duration-200 active:scale-[0.98]">
                  Open
                </button>
              </Link>
              <DeleteAlertDialog tripId={trip.id} />
            </div>
          </div>
        ))}
      </main>
        
    </div>
  );
}
