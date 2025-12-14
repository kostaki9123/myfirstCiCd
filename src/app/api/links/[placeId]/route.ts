import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(
  req: Request,
  { params }: { params: any }
) {
  const placeId = params.placeId;

  const link = await prisma.placeAffiliateLink.findUnique({
    where: { place_id: placeId },
  });

  if (!link) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(link);
}
