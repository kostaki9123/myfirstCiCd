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
    placeLat: 34.92290000,
    placeLng: 33.62330000,
    places: [
      {
        id: "cyprus-day1-la-veranda",
        name: "La Veranda",
        type: "ACCOMMODATION",
        latitude: 34.91670000,
        longitude: 33.62900000,
        PhotoUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReCsYrCObKXc0DtpVjUJG7w3qKapIhbPNo0X4CTAa6kQ&s=10' ,
        googleMapLink:
          "https://www.google.com/maps/search/?api=1&query=La+Veranda+Larnaca+Cyprus",
      },
    ],
  },
  {
    index: 1,
    name: "Ayia Napa & Protaras",
    placeLat: 35.01250000,
    placeLng: 34.05830000,
    places: [
      {
        id: "cyprus-day2-anesis",
        name: "Anesis Hotel",
        type: "ACCOMMODATION",
        latitude: 34.98970000,
        longitude: 34.01470000,
        PhotoUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbZN4ziZRy4tgE28tUw7Z9AnkRG-iR7GuV3lcQJB03yg&s=10' ,
        googleMapLink:
          "https://www.google.com/maps/search/?api=1&query=Anesis+Hotel+Ayia+Napa+Cyprus",
      },
    ],
  },
  {
    index: 2,
    name: "Nicosia",
    placeLat: 35.18560000,
    placeLng: 33.38230000,
    places: [
      {
        id: "cyprus-day3-semeli",
        name: "Semeli Hotel",
        type: "ACCOMMODATION",
        latitude: 35.15780000,
        longitude: 33.36280000,
        PhotoUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiwsfgW2WK1S-ykKQLGu8vjt4L79vgpoy4DKUA3cxsIg&s=10' ,
        googleMapLink:
          "https://www.google.com/maps/search/?api=1&query=Semeli+Hotel+Nicosia+Cyprus",
      },
    ],
  },
  {
    index: 3,
    name: "Troodos Mountains",
    placeLat: 34.92390000,
    placeLng: 32.87070000,
    places: [
      {
        id: "cyprus-day4-troodos-hotel",
        name: "Troodos Hotel",
        type: "ACCOMMODATION",
        latitude: 34.92390000,
        longitude: 32.87070000,
        PhotoUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnvUwPQavd5diknKnjs0RTHVUcAW0IUD8s7TEQ40QJcQ&s=10' ,
        googleMapLink:
          "https://www.google.com/maps/search/?api=1&query=Troodos+Hotel+Cyprus",
      },
    ],
  },
  {
    index: 4,
    name: "Limassol",
    placeLat: 34.70710000,
    placeLng: 33.02260000,
    places: [
      {
        id: "cyprus-day5-harmony-bay",
        name: "Harmony Bay Hotel",
        type: "ACCOMMODATION",
        latitude: 34.68740000,
        longitude: 33.07380000,
        PhotoUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvL-9QKKAjgi_AIgbixcXtTLpGH_n66Jci2rthE1in5g&s=10' , 
        googleMapLink:
          "https://www.google.com/maps/search/?api=1&query=Harmony+Bay+Hotel+Limassol+Cyprus",
      },
    ],
  },
  {
    index: 5,
    name: "Paphos",
    placeLat: 34.77540000,
    placeLng: 32.42180000,
    places: [
      {
        id: "cyprus-day6-capital-coast",
        name: "Capital Coast Resort & Spa",
        type: "ACCOMMODATION",
        latitude: 34.78150000,
        longitude: 32.40600000,
        PhotoUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6h6Vm_yZEB_H8TTv4GU-Ec78U4Y92btf85XdBccBLoA&s=10' ,
        googleMapLink:
          "https://www.google.com/maps/search/?api=1&query=Capital+Coast+Resort+Spa+Paphos+Cyprus",
      },
    ],
  },
  {
    index: 6,
    name: "Larnaca & departure",
    placeLat: 34.87510000,
    placeLng: 33.62490000,
    places: [],
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
          placeLat: day.placeLat ,
          placeLng: day.placeLng,
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
            PhotoUrl : place.PhotoUrl
          },
        });
      }
    }

    console.log('created')
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