import { allowExpensiveAI } from "./flags/flags"

export default async function Home({searchParams}:{searchParams :{ [key: string]: string | string[] | undefined}}) {

  const expensiveAI = await allowExpensiveAI();  //feauture flag

  let sortMethod = searchParams?.sort
    if (sortMethod === undefined){
        sortMethod === "alltrips"
    }

  //get user action -> controller -> use case -> repository

  

  return (
  <div className=' h-full w-full'>
    <div className=" min-h-screen bg-[#5893D4] w-full text-white min-w-[344px] ">
        {/**<Navbar/>**/}
        <div className="h-fit w-full bg-[#5893D4] absolute top-20  flex items-center justify-center flex-col min-w-[344px] ">

            <div className="xxxll:w-[70%] xll:w-[80%] 600:w-[72%] 535:w-[80%] 426:w-[85%] base:w-[92%] p-6">
                   <h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0">
                      {expensiveAI  ? 'My trips' : 'My journeys' }
                   </h2>
            </div>

            <div className=" xxxll:w-[70%] xll:w-[80%] 600:w-[72%] 535:w-[80%] 426:w-[85%] base:w-[92%]   flex justify-between  ">
          { /**   <Dropdown/>
             <Createtripmodal/>  */ }
            </div>

            <div className=" xxxll:w-[70%] xll:w-[80%] 600:w-[72%] 535:w-[80%] 426:w-[85%] base:w-[92%]   p-3  ">
                <div className=" p-3 flex gap-3 flex-wrap ">
                 {/**    {getalltrip.map((trip , key) =>
                        <Tripmodal key={key} tripTitle={trip.tripName} tripId={trip.id as string}/>  
                 ) }            */  }         
                </div>


            </div>

        </div>  
    </div>
  </div>
  )
}
