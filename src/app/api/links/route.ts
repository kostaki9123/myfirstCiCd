import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server"; 


export async function GET(req: Request) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  console.log('my api get links run')
  const links = await prisma.placeAffiliateLink.findMany();
  console.log('all links', links)
  return NextResponse.json(links);
}

export async function PUT(
  req: Request,
  { params }: { params: { placeId: string } }
) {
  const { affiliate_url, source } = await req.json();
  const { placeId } = params;

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
  { params }: { params: { placeId: string } }
) {
  const { placeId } = params;

  await prisma.placeAffiliateLink.delete({
    where: { place_id: placeId },
  });

  return NextResponse.json({ success: true });
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

