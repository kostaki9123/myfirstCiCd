// app/itinerary/[tripid]/page.tsx
import ItineraryClient from './components/itineraryClient';
import { getPoints } from '../../createtrip/[tripid]/action';
import { getPlaces } from './action';
import { getBudgetByTripId } from '../../budget/[tripid]/action';
import { getTrip } from '@/app/(protected)/action';

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ tripid: string }>;
  searchParams: Promise<{ point?: string }>;
}) => {
  const { tripid } = await params;
  const { point } = await searchParams;

  // 1️⃣ Fetch points
  const points = await getPoints(tripid);
  const pointsOnly = points.filter((p) => p.role === 'POINT');

  // 2️⃣ Fetch places per point (parallel)
  const placesPerPoint = await Promise.all(
    pointsOnly.map((point) => getPlaces(point.id))
  );
   const budget = await getBudgetByTripId(tripid)

   const trip = await getTrip(tripid)

  // 3️⃣ Flatten
  const allPlaces = placesPerPoint.flat();

  return (
    <ItineraryClient
      trip={trip}
      points={pointsOnly}
      places={allPlaces}
      budgetId={budget.id!}
      selectedpointId={point}
    />
  );
};

export default Page;
