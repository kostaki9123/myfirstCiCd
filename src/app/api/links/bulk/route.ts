import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";


export async function POST(req: Request) {
  const { placeIds } = await req.json();

  if (!Array.isArray(placeIds) || placeIds.length === 0) {
    return NextResponse.json({});
  }

  const links = await prisma.placeAffiliateLink.findMany({
    where: {
      place_id: { in: placeIds },
    },
    select: {
      place_id: true,
      affiliate_url: true,
      source: true,
    },
  });

  // Convert to lookup map
  const map: Record<string, { affiliate_url: string; source?: string } | null> =
    {};

  for (const id of placeIds) {
    map[id] = null; // default
  }

  for (const link of links) {
    map[link.place_id] = {
      affiliate_url: link.affiliate_url,
      source: link.source ?? undefined,
    };
  }

  return NextResponse.json(map);
}
