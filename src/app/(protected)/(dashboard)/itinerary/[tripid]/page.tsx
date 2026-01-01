// app/itinerary/[tripid]/page.tsx
import ItineraryClient from './components/itineraryClient';
import { getPoints } from '../../createtrip/[tripid]/action';
import { getPlaces } from './action';

const Page = async ({
  params,
}: {
  params: Promise<{ tripid: string }>;
}) => {
  const { tripid } = await params;

  console.log('Server-side ID from itinerary:', tripid);

  // 1️⃣ Fetch points
  const points = await getPoints(tripid);
  const pointsOnly = points.filter((p) => p.role === 'POINT');

  // 2️⃣ Fetch places per point (parallel)
  const placesPerPoint = await Promise.all(
    pointsOnly.map((point) => getPlaces(point.id))
  );

  // 3️⃣ Flatten
  const allPlaces = placesPerPoint.flat();

  return (
    <ItineraryClient
      points={pointsOnly}
      places={allPlaces}
    />
  );
};

export default Page;
