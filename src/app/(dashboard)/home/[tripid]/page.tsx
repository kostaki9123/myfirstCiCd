"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Calendar, MapPin, BedDouble, Plane } from "lucide-react";

const Home = () => {
  return (
    <div className="absolute  inset-0 flex items-center justify-center bg-[#010038] border-2 border-yellow-500 overflow-auto">
      <div className="relative flex items-center border-lime-600 border-4  h-full w-full">
      <div className="flex 535:flex-row flex-col 535:mt-0 top-0 535:top-auto w-full  535:w-auto  absolute gap-6 min-w-max p-6 border-2 border-red-600 ">

        {/* Trip Overview */}
        <Card className="min-w-[300px]">
          <CardHeader>
            <CardTitle>Summer Adventure 🌍</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>June 10 - June 20, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Paris → Rome → Barcelona</span>
            </div>
          </CardContent>
        </Card>

        {/* Itinerary */}
        <div className="space-y-4 min-w-[300px] text-white">
          <h2 className="text-lg font-semibold">Itinerary</h2>
          <ScrollArea className="w-full  535:max-w-[300px]">
            <div className="flex flex-col 535:flex-row  gap-4 w-max">
              <Card className="min-w-[250px]">
                <CardHeader>
                  <CardTitle>Day 1 - Paris</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm text-muted-foreground">
                  <div>Arrival at 9:00 AM ✈️</div>
                  <div>Visit: Eiffel Tower, Louvre</div>
                  <div>Stay: Hotel Parisian Dreams</div>
                </CardContent>
              </Card>
              <Card className="min-w-[250px]">
                <CardHeader>
                  <CardTitle>Day 2 - Rome</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm text-muted-foreground">
                  <div>Flight at 8:00 AM 🛫</div>
                  <div>Visit: Colosseum, Trevi Fountain</div>
                  <div>Stay: Roma Inn</div>
                </CardContent>
              </Card>
              <Card className="min-w-[250px]">
                <CardHeader>
                  <CardTitle>Day 3 - Barcelona</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm text-muted-foreground">
                  <div>Flight at 10:00 AM 🛫</div>
                  <div>Visit: Sagrada Familia, Park Güell</div>
                  <div>Stay: Barcelona Bliss Hotel</div>
                </CardContent>
              </Card>
            </div>
            <ScrollBar orientation="horizontal" className="hidden sm:block" />
          </ScrollArea>
        </div>

        {/* Transport */}
        <Card className="min-w-[300px]">
          <CardHeader>
            <CardTitle>Transport</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4" />
              <span>Flight: Paris to Rome</span>
            </div>
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4" />
              <span>Flight: Rome to Barcelona</span>
            </div>
          </CardContent>
        </Card>

        {/* Accommodation */}
        <Card className="min-w-[300px]">
          <CardHeader>
            <CardTitle>Accommodation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <BedDouble className="h-4 w-4" />
              <span>Paris: Hotel Parisian Dreams</span>
            </div>
            <div className="flex items-center gap-2">
              <BedDouble className="h-4 w-4" />
              <span>Rome: Roma Inn</span>
            </div>
            <div className="flex items-center gap-2">
              <BedDouble className="h-4 w-4" />
              <span>Barcelona: Barcelona Bliss Hotel</span>
            </div>
          </CardContent>
        </Card>
        <Card className="min-w-[300px]">
          <CardHeader>
            <CardTitle>Accommodation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <BedDouble className="h-4 w-4" />
              <span>Paris: Hotel Parisian Dreams</span>
            </div>
            <div className="flex items-center gap-2">
              <BedDouble className="h-4 w-4" />
              <span>Rome: Roma Inn</span>
            </div>
            <div className="flex items-center gap-2">
              <BedDouble className="h-4 w-4" />
              <span>Barcelona: Barcelona Bliss Hotel</span>
            </div>
          </CardContent>
        </Card>
        <Card className="min-w-[300px]">
          <CardHeader>
            <CardTitle>Accommodation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <BedDouble className="h-4 w-4" />
              <span>Paris: Hotel Parisian Dreams</span>
            </div>
            <div className="flex items-center gap-2">
              <BedDouble className="h-4 w-4" />
              <span>Rome: Roma Inn</span>
            </div>
            <div className="flex items-center gap-2">
              <BedDouble className="h-4 w-4" />
              <span>Barcelona: Barcelona Bliss Hotel</span>
            </div>
          </CardContent>
        </Card>
        <Card className="min-w-[300px]">
          <CardHeader>
            <CardTitle>Accommodation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <BedDouble className="h-4 w-4" />
              <span>Paris: Hotel Parisian Dreams</span>
            </div>
            <div className="flex items-center gap-2">
              <BedDouble className="h-4 w-4" />
              <span>Rome: Roma Inn</span>
            </div>
            <div className="flex items-center gap-2">
              <BedDouble className="h-4 w-4" />
              <span>Barcelona: Barcelona Bliss Hotel</span>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
};

export default Home;
