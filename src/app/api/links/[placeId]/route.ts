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

export async function PUT(
  req: Request,
  { params }: { params: any }
) {
  const placeId = params.placeId;
  const { affiliate_url, source } = await req.json();

  const link = await prisma.placeAffiliateLink.update({
    where: { place_id: placeId },
    data: {
      affiliate_url,
      source,
    },
  });

  return NextResponse.json(link);
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
