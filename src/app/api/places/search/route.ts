import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { lat, lng, types } = await req.json();

    if (lat == null || lng == null || !types) {
  return NextResponse.json(
    { error: "Missing lat, lng, or types" },
    { status: 400 }
  );
}

if (typeof lat !== "number" || typeof lng !== "number") {
  return NextResponse.json(
    { error: "Invalid coordinates" },
    { status: 422 }
  );
}

    const typesString = Array.isArray(types) ? types.join("|") : types;

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=3000&type=${typesString}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );

    if (!response.ok) {
  return NextResponse.json(
    { error: "Failed to fetch places" },
    { status: 502 }
  );
}

const data = await response.json();

if (data.status !== "OK") {
  return NextResponse.json(
    {
      error: "Google Places error",
      details: data.status
    },
    { status: 502 }
  );
}
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}