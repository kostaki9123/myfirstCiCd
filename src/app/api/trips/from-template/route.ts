import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";


const CYPRUS_TRIP = {
  tripName: "Cyprus 7-Day Trip",
  tripBudget: "Balanced",
  travelingWith: "Solo",
  tripTypes: ["Cultural", "Natural", "Adventures"],

  days: [
    {
      index: 0,
      name: "Larnaca",
      places: [
        {
          id: "cyprus-day1-la-veranda",
          name: "La Veranda",
          type: "ACCOMMODATION",
          latitude: 34.9167,
          longitude: 33.629,
          googleMapLink:
            "https://www.google.com/maps/search/?api=1&query=La+Veranda+Larnaca+Cyprus",
        },
      ],
    },

    {
      index: 1,
      name: "Ayia Napa & Protaras",
      places: [
        /** 
        {
          id: "cyprus-day2-protaras",
          name: "Protaras",
          type: "PLACE_TO_VISIT",
          latitude: 35.0125,
          longitude: 34.0583,
          googleMapLink:
            "https://www.google.com/maps/search/?api=1&query=Protaras+Cyprus",
        }
        */
        {
          id: "cyprus-day2-anesis",
          name: "Anesis Hotel",
          type: "ACCOMMODATION",
          latitude: 34.9897,
          longitude: 34.0147,
          googleMapLink:
            "https://www.google.com/maps/search/?api=1&query=Anesis+Hotel+Ayia+Napa+Cyprus",
        },
      ],
    },

    {
      index: 2,
      name: "Nicosia",
      places: [
        {
          id: "cyprus-day3-semeli",
          name: "Semeli Hotel",
          type: "ACCOMMODATION",
          latitude: 35.1578,
          longitude: 33.3628,
          googleMapLink:
            "https://www.google.com/maps/search/?api=1&query=Semeli+Hotel+Nicosia+Cyprus",
        },
      ],
    },

    {
      index: 3,
      name: "Troodos Mountains",
      places: [
        {
          id: "cyprus-day4-troodos-hotel",
          name: "Troodos Hotel",
          type: "ACCOMMODATION",
          latitude: 34.9239,
          longitude: 32.8707,
          googleMapLink:
            "https://www.google.com/maps/search/?api=1&query=Troodos+Hotel+Cyprus",
        },
      ],
    },

    {
      index: 4,
      name: "Limassol",
      places: [
        {
          id: "cyprus-day5-harmony-bay",
          name: "Harmony Bay Hotel",
          type: "ACCOMMODATION",
          latitude: 34.6874,
          longitude: 33.0738,
          googleMapLink:
            "https://www.google.com/maps/search/?api=1&query=Harmony+Bay+Hotel+Limassol+Cyprus",
        },
      ],
    },

    {
      index: 5,
      name: "Paphos",
      places: [
        {
          id: "cyprus-day6-capital-coast",
          name: "Capital Coast Resort & Spa",
          type: "ACCOMMODATION",
          latitude: 34.7815,
          longitude: 32.406,
          googleMapLink:
            "https://www.google.com/maps/search/?api=1&query=Capital+Coast+Resort+Spa+Paphos+Cyprus",
        },
      ],
    },

    {
      index: 6,
      name: "Larnaca & departure",
      places: [
        {
          id: "cyprus-day7-larnaca",
          name: "Larnaca International Airport",
          type: "PLACE_TO_VISIT",
          latitude: 34.8751,
          longitude: 33.6249,
          googleMapLink:
            "https://www.google.com/maps/search/?api=1&query=Larnaca+International+Airport",
        },
      ],
    },
  ],
};

export async function POST(request: Request) {
  try {
    // --------------------------------------------------
    // 1. Check authentication
    // --------------------------------------------------

    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return NextResponse.json(
        { error: "You must be signed in." },
        { status: 401 }
      );
    }

    // --------------------------------------------------
    // 2. Get Clerk user
    // --------------------------------------------------

    const clerkUser = await currentUser();

    if (!clerkUser) {
      return NextResponse.json(
        { error: "Unable to find your account." },
        { status: 401 }
      );
    }

    const email =
      clerkUser.emailAddresses?.[0]?.emailAddress;

    if (!email) {
      return NextResponse.json(
        { error: "Your account does not have an email address." },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 3. Read template
    // --------------------------------------------------

    const body = await request.json();

    if (body.template !== "cyprus-7-day") {
      return NextResponse.json(
        { error: "Unknown trip template." },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 4. Find existing Tripaki user
    // --------------------------------------------------

    let user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    // --------------------------------------------------
    // 5. Create Tripaki user if necessary
    // --------------------------------------------------

    if (!user) {
      user = await prisma.user.create({
        data: {
          username:
            clerkUser.username ||
            clerkUser.firstName ||
            email.split("@")[0],
          email,
        },
      });
    }

    // --------------------------------------------------
    // 6. Create the trip
    // --------------------------------------------------

    const trip = await prisma.trip.create({
      data: {
        userId: user.id,
        tripName: CYPRUS_TRIP.tripName,
        tripBudget: CYPRUS_TRIP.tripBudget,
        travelingWith: CYPRUS_TRIP.travelingWith,
        tripTypes: CYPRUS_TRIP.tripTypes,
      },
    });

    await prisma.budget.create({
  data: {
    tripId: trip.id,
    genCurrency: "EUR",
    budgetAmount: 0,
    budgetCurrency: "EUR",
  },
});

    console.log(user.id,'omonoia',)

    // --------------------------------------------------
    // 7. Create all 7 days as Points
    // --------------------------------------------------

    for (const day of CYPRUS_TRIP.days) {
      const point = await prisma.point.create({
        data: {
          tripId: trip.id,
          role: "POINT",
          index: day.index,
          placeName: day.name,
        },
      });

      // ------------------------------------------------
      // 8. Create places for this day
      // ------------------------------------------------

      for (const place of day.places) {
        await prisma.place.create({
          data: {
            id: place.id,
            pointId: point.id,
            placeType: place.type as
              | "ACCOMMODATION"
              | "PLACE_TO_VISIT",
            name: place.name,
            latitude: place.latitude,
            longitude: place.longitude,
            googleMapLink: place.googleMapLink,
          },
        });
      }
    }

    // --------------------------------------------------
    // 9. Return the new trip ID
    // --------------------------------------------------

    return NextResponse.json({
      success: true,
      tripId: trip.id,
    });
  } catch (error) {
    console.error(
      "CYPRUS TRIP TEMPLATE ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to create Cyprus trip.",
      },
      { status: 500 }
    );
  }
}