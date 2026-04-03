import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { lat, lng, types } = await req.json();

    if (!lat || !lng || !types) {
      return NextResponse.json({ error: "Missing lat, lng, or types" }, { status: 400 });
    }

    const typesString = Array.isArray(types) ? types.join("|") : types;

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=3000&type=${typesString}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}