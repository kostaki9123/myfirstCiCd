import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const links = await prisma.placeAffiliateLink.findMany();
  return NextResponse.json(links);
}

export async function POST(req: Request) {
  const { place_id, affiliate_url, source } = await req.json();

  const link = await prisma.placeAffiliateLink.create({
    data: {
      place_id,
      affiliate_url,
      source,
    },
  });

  return NextResponse.json(link);
}
