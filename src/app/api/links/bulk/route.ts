import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { placeIds } = body;

    // Validation
    if (!Array.isArray(placeIds) || placeIds.length === 0) {
      return NextResponse.json(
        { error: "placeIds must be a non-empty array" },
        { status: 400 }
      );
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

    const map: Record<
      string,
      { affiliate_url: string; source?: string } | null
    > = {};

    for (const id of placeIds) {
      map[id] = null;
    }

    for (const link of links) {
      map[link.place_id] = {
        affiliate_url: link.affiliate_url,
        source: link.source ?? undefined,
      };
    }

    return NextResponse.json(map, { status: 200 });
  } catch (error) {
    console.error("Affiliate links error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
