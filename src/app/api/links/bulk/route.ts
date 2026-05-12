import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      places,
      cityName,
      tripbudget,
      tripType,
      travelingWith,
      accomodationOrPLaces
    } = body;

    // ---------------- VALIDATION ----------------
    if (!cityName || typeof cityName !== "string") {
      return NextResponse.json({ error: "cityName required" }, { status: 400 });
    }

    if (!Array.isArray(places)) {
      return NextResponse.json({ error: "places must be array" }, { status: 400 });
    }

    if (!tripbudget) {
      return NextResponse.json({ error: "tripbudget required" }, { status: 400 });
    }

    if (!Array.isArray(tripType)) {
      return NextResponse.json({ error: "tripType must be array" }, { status: 400 });
    }

    if (!travelingWith || typeof travelingWith !== "string") {
      return NextResponse.json({ error: "travelingWith required" }, { status: 400 });
    }

    // ---------------- DEDUPE STATE ----------------
    const usedIds = new Set<string>();
    let dbResults: any[] = [];

    const mergeUnique = (items: any[]) => {
      const unique = items.filter((item) => {
        if (!item?.id) return false;
        if (usedIds.has(item.id)) return false;

        usedIds.add(item.id);
        return true;
      });

      dbResults.push(...unique);
    };

    // ---------------- BASE QUERY ----------------
    const baseWhere: any = {
      compound_code: cityName,
      AccomodationOrPlace: accomodationOrPLaces
    };

    let strictWhere: any = { ...baseWhere };

    if (tripbudget) strictWhere.placebudget = tripbudget;
    if (travelingWith) {
    strictWhere.Placewith = {
      has: travelingWith
    }};
    if (tripType?.length > 0) {
      strictWhere.placetype = {
        hasSome: tripType
      };
    }

    // ---------------- 1. STRICT ----------------
    const strict = await prisma.placeAffiliateLink.findMany({
      where: strictWhere,
      orderBy: { Reccomended: "desc" },
      take: 20
    });

    mergeUnique(strict);

    // ---------------- 2. RELAX TYPE ----------------
    if (dbResults.length < 20) {
      const relaxedTypeWhere = { ...strictWhere };
      delete relaxedTypeWhere.placetype;

      const extra = await prisma.placeAffiliateLink.findMany({
        where: relaxedTypeWhere,
        orderBy: { Reccomended: "desc" },
        take: 20 - dbResults.length
      });

      mergeUnique(extra);
    }

    // ---------------- 3. RELAX WITH ----------------
    if (dbResults.length < 20) {
      const relaxedWithWhere: any = { ...baseWhere };

      if (tripbudget) {
        relaxedWithWhere.placebudget = tripbudget;
      }

      const extra = await prisma.placeAffiliateLink.findMany({
        where: relaxedWithWhere,
        orderBy: { Reccomended: "desc" },
        take: 20 - dbResults.length
      });

      mergeUnique(extra);
    }

    // ---------------- 4. FINAL FALLBACK ----------------
    if (dbResults.length < 20) {
      const extra = await prisma.placeAffiliateLink.findMany({
        where: baseWhere,
        orderBy: { Reccomended: "desc" },
        take: 20 - dbResults.length
      });

      mergeUnique(extra);
    }

    // ---------------- FILL FROM GOOGLE PLACES ----------------
    const remainingNeeded = Math.max(20 - dbResults.length, 0);

    const filledPlaces = places.slice(0, remainingNeeded);

   // ---------------- FINAL MERGE + DEDUPE ----------------
    const merged = [...dbResults, ...filledPlaces];
    
    const seenPlaceIds = new Set<string>();
    
    const finalRecommendations = merged.filter((item) => {
      if (!item.place_id) return true;
    
      if (seenPlaceIds.has(item.place_id)) {
        return false;
      }
    
      seenPlaceIds.add(item.place_id);
      return true;
    }).slice(0, 20);

    // ---------------- DEV INSERT ----------------
    if (process.env.ADMIN_EMAIL === "kostantinospapoui@gmail.com") {
      const placeIds = places
        .map((place: any) => place.place_id)
        .filter(Boolean);

      const existingPlaces = await prisma.placeAffiliateLink.findMany({
        where: {
          place_id: { in: placeIds }
        },
        select: {
          place_id: true
        }
      });

      const existingIds = new Set(
        existingPlaces.map((p) => p.place_id)
      );

      const newPlaces = places.filter(
        (place: any) => !existingIds.has(place.place_id)
      );

      if (newPlaces.length > 0) {
        await prisma.placeAffiliateLink.createMany({
          data: newPlaces.map((place: any) => ({
            place_id: place.place_id,
            name: place.name,
            compound_code: cityName,
            AccomodationOrPlace: accomodationOrPLaces,
            Reccomended: false,
            PhotoUrl: "",
            Rating: parseFloat(place.rating),
            Priceperday: 0,
            TypeOflodgindOrPlace: "",
            affiliate_url: "",
            source: "",
            latitude: place.geometry?.location?.lat,
            longitude: place.geometry?.location?.lng
          })),
          skipDuplicates: true
        });
      }

      console.log(`${newPlaces.length} new places added to DB`);
    }

    return NextResponse.json({
      data: finalRecommendations
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}