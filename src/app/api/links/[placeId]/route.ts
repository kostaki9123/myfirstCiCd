import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";


type Params = {
  placeId: string;
};

export async function GET(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  const { placeId } = await params;

  const link = await prisma.placeAffiliateLink.findUnique({
    where: { place_id: placeId },
  });

  if (!link) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(link);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ placeId: string }> }
) {
  const { placeId } = await params;

  const body = await req.json();

  const {
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

  console.log( 'eto:' , placeType )

  const updatedPlace = await prisma.placeAffiliateLink.update({
    where: {
      place_id: placeId,
    },
    data: {
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
      placetype :placeType,
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

  return NextResponse.json(updatedPlace);
}
export async function DELETE(
  req: Request,
  { params }: { params: any }
) {
  const placeId = params.placeId;

  await prisma.placeAffiliateLink.delete({
    where: { place_id: placeId },
  });

  return NextResponse.json({ success: true });
}
