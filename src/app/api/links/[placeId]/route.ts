import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";


export async function GET(
  req: Request,
  { params }: { params: { placeId: string } }
) {
  const { placeId } = params;

  const link = await prisma.placeAffiliateLink.findUnique({
    where: { place_id: placeId },
  });

  if (!link) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(link);
}
