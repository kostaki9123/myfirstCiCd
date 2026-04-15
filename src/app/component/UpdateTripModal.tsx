'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { updateTrip } from '../(protected)/action';
import Budgetdropdown from './budgetdropdown';
import { formSchema } from './create-trip-modal';

type Props = {
  tripId: string;
  initialName: string;
  initialBudget: string;
  initialTravelingWith: string;
  initialTripTypes: string[];
};

const UpdateTripModal = ({ tripId, initialName, initialBudget, initialTravelingWith, initialTripTypes }: Props) => {
  const [open, setOpen] = useState(false);
  const [tripName, setTripName] = useState(initialName);
  const [tripBudget, setTripBudget] = useState(initialBudget);
  const [travelingWith, setTravelingWith] = useState(initialTravelingWith);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialTripTypes);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTripName(initialName);
    setTripBudget(initialBudget);
    setTravelingWith(initialTravelingWith);
    setSelectedTypes(initialTripTypes);
  }, [initialName, initialBudget, initialTravelingWith, initialTripTypes]);

  const handleCheckboxChange = (value: string) => {
    setSelectedTypes((prev) => {
      if (prev.includes(value)) return prev.filter((v) => v !== value);
      if (prev.length < 3) return [...prev, value];
      return prev;
    });
  };

  const isDisabled = (value: string) => selectedTypes.length >= 3 && !selectedTypes.includes(value);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validation = formSchema.safeParse({
        tripName,
        tripBudget,
        travelingWith,
        tripTypes: selectedTypes,
      });

      if (!validation.success) {
        const errors = validation.error.flatten().fieldErrors;
        setErrorMessages({
          tripName: errors.tripName?.[0] || "",
          tripBudget: errors.tripBudget?.[0] || "",
          travelingWith: errors.travelingWith?.[0] || "",
          tripTypes: errors.tripTypes?.[0] || "",
        });
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("tripId", tripId);
      formData.append("tripName", tripName);
      formData.append("tripBudget", tripBudget);
      formData.append("travelingWith", travelingWith);
      selectedTypes.forEach((type) => formData.append("tripTypes", type));

      await updateTrip(formData);

      setErrorMessages({});
      setOpen(false);
    } catch (err) {
      console.error(err);
      setErrorMessages({ GeneralError: "Something went wrong while updating the trip" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="absolute top-4 right-4 text-sm text-gray-400 hover:text-white">
        ✏️
      </DialogTrigger>

      <DialogContent className="sm:max-h-[90%] w-full max-w-lg p-2 rounded-xl">
        <form onSubmit={onSubmit}>
          <Card className="w-full text-black">
            <CardHeader>
              <DialogTitle>Edit Trip</DialogTitle>
              <DialogDescription>Update your trip details</DialogDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col space-y-4">
                <div>
                  <Label>Trip Name</Label>
                  <Input value={tripName} onChange={(e) => setTripName(e.target.value)} maxLength={28} />
                  {errorMessages.tripName && <p className="text-red-500 text-sm">{errorMessages.tripName}</p>}
                </div>

                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label>Trip Budget</Label>
                    <Budgetdropdown
                      deafaultOption="Select"
                      allOptions={["Economy traveler", "Balanced traveler", "Luxury traveler"]}
                      value={tripBudget}
                      onChange={setTripBudget}
                    />
                    {errorMessages.tripBudget && <p className="text-red-500 text-sm">{errorMessages.tripBudget}</p>}
                  </div>

                  <div className="flex-1">
                    <Label>Traveling With</Label>
                    <Budgetdropdown
                      deafaultOption="Select"
                      allOptions={["Solo", "Friends", "Couple", "Family", "Group"]}
                      value={travelingWith}
                      onChange={setTravelingWith}
                    />
                    {errorMessages.travelingWith && <p className="text-red-500 text-sm">{errorMessages.travelingWith}</p>}
                  </div>
                </div>

                <div>
                  <Label>Trip Types (max 3)</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Adventures", "Cultural enthusiasts", "Natural lovers", "Nightlife", "Festival", "Sports Enthusiast", "Events"].map((type) => (
                      <div key={type} className="flex items-center gap-1">
                        <Checkbox
                          id={type}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={() => handleCheckboxChange(type)}
                          disabled={isDisabled(type)}
                        />
                        <label htmlFor={type} className={`text-sm ${isDisabled(type) ? "text-gray-500" : ""}`}>
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errorMessages.tripTypes && <p className="text-red-500 text-sm">{errorMessages.tripTypes}</p>}
                </div>

                {errorMessages.GeneralError && <p className="text-red-500 text-sm">{errorMessages.GeneralError}</p>}
              </div>
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Trip"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTripModal;
