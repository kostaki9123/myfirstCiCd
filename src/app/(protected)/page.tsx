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
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-gray-200 pt-20">
      
      {/* Header */}
      <header className="w-full py-8 text-center shadow-lg">
        <h1 className="text-4xl font-extrabold tracking-wide text-white">
          My trips
        </h1>
      </header>

      {/* Action Buttons */}
      <div className="mt-10 flex justify-center space-x-6">
        <Createtripmodal /> 
      </div>

      {/* Trip Cards */}
        
      <main className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12">
        {trips.map((trip , key) => (
          <div
            key={key}
            className="relative mb-6 bg-[#1e293b] rounded-xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all"
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
            <h2 className="text-2xl font-bold text-[#38bdf8]">{trip.tripName}</h2>

            {/* Features */}
            <div className="mt-6 flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-slate-700 text-slate-200 text-sm rounded-full">
                  💵 {trip.tripBudget}
                </span>
              
                <span className="px-3 py-1 bg-slate-700 text-slate-200 text-sm rounded-full">
                  👥 {trip.travelingWith}
                </span>
              
                {trip.tripTypes.map((type, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-700 text-slate-200 text-sm rounded-full"
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
                <button className="px-4 py-2 bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white rounded-lg shadow-lg hover:scale-105 transition-transform">
                  Join Dashboard
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
