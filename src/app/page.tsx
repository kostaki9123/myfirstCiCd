export const dynamic = 'force-dynamic';

import { auth } from "@clerk/nextjs/server";

import Createtripmodal from "./component/create-trip-modal";
import DeleteAlertDialog from "./component/delete-trip-modal";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { signIn } from "./action";



export default async function Home() {
  const trips = [
    {
      id: 1,
      name: "Vacation in Bali",
      countries: [{ name: "Indonesia", flag: "🇮🇩" }],
      moneyStatus: "Affordable",
      travelingAlone: false,
      type: "Beach",
      cost: 1200,
      startsInDays: 30,
    },
    {
      id: 2,
      name: "Viaje en Chipre",
      countries: [{ name: "Cyprus", flag: "🇨🇾" }],
      moneyStatus: "Affordable",
      travelingAlone: false,
      type: "Beach",
      cost: 1600,
      startsInDays: 20,
    },
   
  ];
    

    const { userId ,sessionId  } = await auth()
  
    try{
       if (userId) {
          const user = await clerkClient.users.getUser(userId) // ✅ No need to await clerkClient itself
      
          const email = user.emailAddresses[0]?.emailAddress
          const username = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
    
          let freshuser = await signIn(user.id,email,username);
       //   console.log(freshuser)
          
        }
     }catch(err){
      // console.log(err)
       if (sessionId) {
        await clerkClient.sessions.revokeSession(sessionId);
        }
      
      throw new Error(`Ops something went wrong:'${(err as Error).message}`)
      
      //redi
     }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-gray-200 pt-20">
      {/* Header */}
      <header className="w-full py-8 text-center  shadow-lg">
        <h1 className="text-4xl font-extrabold tracking-wide text-white">
          My trips
        </h1>
       
      </header>

    

      {/* Action Buttons */}
      <div className="mt-10 flex justify-center space-x-6">
        <Createtripmodal/>
      
        <button className="px-6 py-3 bg-gradient-to-r from-[#6d28d9] to-[#9333ea] text-white rounded-lg shadow-lg hover:scale-105 transition-transform duration-200">
          Sort Trips
        </button>
      </div>

      {/* Trip Cards */}
      <main className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="relative  mb-6  bg-[#1e293b] rounded-xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all"
          >
            {/* Trip Name */}
            <h2 className="text-2xl font-bold text-[#38bdf8]">{trip.name}</h2>

            {/* Countries */}
            <div className="mt-3 flex items-center space-x-2">
              {trip.countries.map((country, idx) => (
                <span key={idx} className="text-sm text-gray-400">
                  {country.flag} {country.name}
                </span>
              ))}
            </div>

            {/* Features */}
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-[#16a34a]/20 text-[#16a34a] text-sm rounded-full">
                💵 {trip.moneyStatus}
              </span>
              <span className="px-3 py-1 bg-[#3b82f6]/20 text-[#3b82f6] text-sm rounded-full">
                {trip.travelingAlone ? "🧍 Traveling Alone" : "👥 Group Travel"}
              </span>
              <span className="px-3 py-1 bg-[#facc15]/20 text-[#facc15] text-sm rounded-full">
                🌟 {trip.type}
              </span>
            </div>

            {/* Cost and Details */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-400 uppercase">
                Cost and Details:
              </h3>
              <div className="flex justify-between mt-2">
                <div className="flex flex-col text-center">
                  <small className="text-sm text-gray-400">Cost</small>
                  <div className="text-lg font-semibold text-gray-300">
                    ${trip.cost}
                  </div>
                </div>
                <div className="flex flex-col text-center">
                  <small className="text-sm text-gray-400">Starts in</small>
                  <div className="text-lg font-semibold text-gray-300">
                    {trip.startsInDays} days
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-between items-center">
              <button className="px-4 py-2 bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white rounded-lg shadow-lg hover:scale-105 transition-transform">
                Join Dashboard
              </button>
              <DeleteAlertDialog tripId="ndejd" />
              
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
