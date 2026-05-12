
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";


export async function GET() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const links = await prisma.placeAffiliateLink.findMany();
  return NextResponse.json(links);
}



export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      place_id,
      name,
      PhotoUrl,
      affiliate_url,
      source,
      latitude,
      longitude,
      compound_code,
      LocationComments,
      Priceperday,
      placebudget,
      placeType,
      TypeOflodgindOrPlace,
      AccomodationOrPlace,
      Placewith,
      Rating,
      AvarageTime,
      OpenHours,
      description,
      Reccomended,
      MustSee,
      HiddenSpot,
    } = body;

    console.log('Placetype:' ,placeType)

    // REQUIRED FIELD VALIDATION
    if (!place_id) {
      return NextResponse.json(
        { error: "place_id is required" },
        { status: 400 }
      );
    }

    const createdPlace = await prisma.placeAffiliateLink.create({
      data: {
        place_id,
        name,
        PhotoUrl,
        affiliate_url,
        source,
        latitude,
        longitude,
        compound_code,
        LocationComments,
        Priceperday,
        placebudget,
        placetype : placeType ,
        TypeOflodgindOrPlace,
        AccomodationOrPlace,
        Placewith,
        Rating,
        AvarageTime,
        OpenHours,
        description,
        Reccomended,
        MustSee,
        HiddenSpot,
      },
    });

    return NextResponse.json(createdPlace, {
      status: 201,
    });
  } catch (error) {
    console.error("POST /placeAffiliateLink error:", error);

    return NextResponse.json(
      {
        error: "Failed to create place",
      },
      {
        status: 500,
      }
    );
  }
}