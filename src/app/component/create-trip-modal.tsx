

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';


import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";




import { Checkbox } from '@/components/ui/checkbox';


// const formSchema = z.object({
//   tripname: z.string( {
//     message: "You must enter a trip name",
//   }).min(1, {
//     message: "You must enter a trip name",
//   })
//   // tripdescription: z.string().min(1, {
//   //   message: "You must enter a trip description",
//   // })
// });

const Createtripmodal = () => {
//  const [open, setOpen] = useState(false);
//  const [errorMessageTripname, setErrorMessageTripname] = useState<string>("");
//  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  

  
 // const userId = session?.user.id!
  


  const handleCheckboxChange = (value: string) => {
  //  setSelectedTypes((prev) => {
  //    if (prev.includes(value)) {
  //      return prev.filter((item) => item !== value);
  //    } else if (prev.length < 3) {
  //      return [...prev, value];
  //    }
  //    return prev;
  //  });
  };

  const isDisabled = (value: string) => {
  //   return selectedTypes.length >= 3 && !selectedTypes.includes(value);
  };

//  const onSubmit = useCallback((formData : FormData) => {
//    setErrorMessageTripname("")
//
//    const tripname = formData.get("tripName") as string;
//
//    const newTripInputCheck = {  
//      tripname,
//      // tripdescription
//    };
//
//    const result = formSchema.safeParse(newTripInputCheck);
//
//    if (!result.success) {
//      result.error.issues.forEach((issue) => {
//        if (issue.path[0] === "tripname") {
//       
//          setErrorMessageTripname(issue.message);
//        }
//        // if (issue.path[0] === "tripdescription") {
//        //   setErrorMessageTripdescription(issue.message);
//        // }
//      });
//      return;
//    }
//     const res:any = createtrip(formData , userId )
//   
//      setOpen(false);
//
//  } , [userId])



  return (
    <Dialog >
      <DialogTrigger  className="px-6 py-3 bg-gradient-to-r from-[#16a34a] to-[#22c55e] text-white rounded-lg shadow-lg hover:scale-105 transition-transform duration-200">
          + Create Trip    
      </DialogTrigger>

      <DialogContent className="h-fit w-fit  text-black   p-2">
        <form>
              <DialogTitle>
                Create trip
              </DialogTitle>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label>Trip Name</label>  
                  <input id="name" className='border-2 border-pink-600' name="tripName" placeholder="Name of your trip" maxLength={30} />
                  {/** errorMessageTripname && <p className="text-red-500">{errorMessageTripname}</p>  */}
                </div>
                {/* <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="Description" className="pb-2">Trip Description</Label>
                  <Textarea id="Description" name="tripdescription" className="resize-none h-fit" maxLength={62} />
                  {errorMessageTripdescription && <p className="text-red-500">{errorMessageTripdescription}</p>}
                </div> */}
              </div>
              <div className=' w-[400px]  pt-2 flex'>
                 <div className=' w-1/2 ' >
                     <label>Trip Budget</label>
                 </div>
                 <div className=' w-1/2 ' >
                     <label>Traveling with</label>
                 </div>     
              </div>
              <div className=' w-full pt-2 ' >
                     <label >Trip type </label>
                     <div className='flex flex-wrap gap-2 w-full  mt-2 max-w-[400px]'>
                     {["Adventures", "Cultural enthusiasts", "Natural lovers", "Nightlife", "Festival", "Sports Enthusiast", "Events"].map((type , key) => (
                    <div key={key} className="flex items-center space-x-1">
                     
                      <label
                        htmlFor={type}
                        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70  `}
                      >
                        {type}
                      </label>
                    </div>
                  ))}    
                    
                     </div>
              </div> 
          
              <button type="submit">Create trip</button>
     
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Createtripmodal;
