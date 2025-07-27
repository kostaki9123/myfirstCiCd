'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React,{ useState } from 'react';
import { z, ZodError } from 'zod';
//import { createtrip } from './actions';
import { MdAdd } from "react-icons/md";

import { Checkbox } from '@/components/ui/checkbox';

import { createTrip } from '../(protected)/action';
import Budgetdropdown from './budgetdropdown';
import { useUser } from '@clerk/nextjs';
import { InputParseError } from '../../../backend/entities/errors/common';

export const formSchema = z.object({
  tripName: z
    .string()
    .min(1, { message: "You must enter a trip name" })
    .max(25, { message: "Trip name too long (max 25 characters)." }),

  tripBudget: z.enum(["Economy traveler", "Balanced Traveler", "Luxury traveler"], {
    errorMap: () => ({ message: "You must select a valid trip budget" }),
  }),

  travelingWith: z.enum(["Solo", "Friends", "Couple", "Family", "Group"], {
    errorMap: () => ({ message: "You must select who you're traveling with" }),
  }),

  tripTypes: z
    .array(z.string())
    .min(1, { message: "Select at least one trip type" })
    .max(3, { message: "You can select up to 3 trip types" }),
});

const Createtripmodal = () => {
  const [open, setOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>({})
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [tripBudget, setTripBudget] = useState<string>(""); // controlled
  const [travelingWith, setTravelingWith] = useState<string>(""); // controlled

  const { user } = useUser();
  let currentUserId = user?.id
  

  const handleCheckboxChange = (value: string) => {
    setSelectedTypes((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else if (prev.length < 3) {
        return [...prev, value];
      }
      return prev;
    });
  };

  const isDisabled = (value: string) => {
    return selectedTypes.length >= 3 && !selectedTypes.includes(value);
  };

function onSubmit(
  tripBudget: string,
  travelingWith: string,
  selectedTypes: string[],
  setOpen: (open: boolean) => void
) {
  return async (formData: FormData) => {
    formData.append("tripBudget", tripBudget);
    formData.append("travelingWith", travelingWith);
    selectedTypes.forEach((type) => {
      formData.append("tripTypes", type);
    });

    const tripName = formData.get("tripName") as string;
    const tripTypes = formData.getAll("tripTypes") as string[];

    try {
      const validation = formSchema.safeParse({
        tripName: tripName,
        tripBudget: tripBudget,
        travelingWith: travelingWith,
        tripTypes: tripTypes,
      });

      if (!validation.success) {
        const errors = validation.error.flatten().fieldErrors;
        
        // Map errors to errorMessages state
        setErrorMessages({
          tripName: errors.tripName?.[0] || "",
          tripBudget: errors.tripBudget?.[0] || "",
          travelingWith: errors.travelingWith?.[0] || "",
          tripTypes: errors.tripTypes?.[0] || "",
        });
        return;
      }
      console.log('run front')
      await createTrip(formData);
     

      setErrorMessages({});
      setOpen(false);
    } catch (err) {
       if (err instanceof Error && err.name === "DatabaseOperationError") {
            setErrorMessages({
               GeneralError: 'Trip could not created.There was problem with database',
             })
       }
    //    setErrorMessage(err.message); 
       if (err instanceof InputParseError && err.cause instanceof ZodError) {
         const flattened = err.cause.flatten();
         setErrorMessages({
           tripName: flattened.fieldErrors.tripName?.[0] || "",
           tripBudget: flattened.fieldErrors.tripBudget?.[0] || "",
           travelingWith: flattened.fieldErrors.travelingWith?.[0] || "",
           tripTypes: flattened.fieldErrors.tripTypes?.[0] || "",
         });
       } else {
         console.error("Unexpected error:", err);
       }
     }
  };
}




  return (
    <Dialog open={open} onOpenChange={setOpen}>
       <DialogTrigger  className="px-6 py-3 bg-gradient-to-r from-[#16a34a] to-[#22c55e] text-white rounded-lg shadow-lg hover:scale-105 transition-transform duration-200">
          + Create Trip    
      </DialogTrigger>

      <DialogContent className=" w-[300px] 535:w-fit  h-fit  text-black   p-0">
        <form action={onSubmit(tripBudget, travelingWith, selectedTypes, setOpen)}>
          <Card className=" w-[300px] 535:w-fit  text-black">
            <CardHeader>
              <DialogTitle>
                Create trip
              </DialogTitle>
              <DialogDescription>Plan the Perfect Trip with Us!</DialogDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name" className="pb-2">Trip Name</Label>
                  <Input id="name" name="tripName" placeholder="Name of your trip" maxLength={28} />
                 {errorMessages.tripName && <p className="text-red-500">{errorMessages.tripName}</p>}
                </div>
              </div>
              <div className=' pt-2 flex '>
                 <div className=' w-1/2 ' >
                     <Label htmlFor="name" >Trip Budget</Label>
                     <Budgetdropdown
                       deafaultOption="Select"
                       allOptions={["Economy traveler", "Balanced Traveler", "Luxury traveler"]}
                       value={tripBudget}
                       onChange={setTripBudget}
                     />
                     {errorMessages.tripBudget && <p className="text-red-500">{errorMessages.tripBudget}</p>}
                 </div>

                 <div className=' w-1/2  ' >
                     <Label htmlFor="name" >Traveling with</Label>
                     <Budgetdropdown
                        deafaultOption="Select"
                        allOptions={["Solo", "Friends", "Couple", "Family", "Group"]}
                        value={travelingWith}
                        onChange={setTravelingWith}
                      />
                      {errorMessages.travelingWith && <p className="text-red-500">{errorMessages.travelingWith}</p>}
                 </div>     
              </div>
              <div className=' w-full pt-2 ' >
                     <Label htmlFor="name"  >Trip type {"(Max 3)"}</Label>
                     <div className='flex flex-wrap gap-2 w-full  mt-2 max-w-[400px]'>
                     {["Adventures", "Cultural enthusiasts", "Natural lovers", "Nightlife", "Festival", "Sports Enthusiast", "Events"].map((type , key) => (
                    <div key={key} className="flex items-center space-x-1">
                      <Checkbox
                        id={type}
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={() => handleCheckboxChange(type)}
                        disabled={isDisabled(type)}
                      />
                      <label
                        htmlFor={type}
                        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${isDisabled(type) ? "text-gray-500" : ""}`}
                      >
                        {type}
                      </label>
                    </div>
                  ))}    
                   {errorMessages.tripTypes && <p className="text-red-500">{errorMessages.tripTypes}</p>}      
                   {errorMessages.GeneralError && <p className="text-red-500">{errorMessages.GeneralError}</p>}      
                     </div>
              </div> 
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit">Create trip</Button>
            </CardFooter>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Createtripmodal;
   
