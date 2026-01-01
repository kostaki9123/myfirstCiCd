// app/itinerary/[tripid]/page.tsx
import ItineraryClient from './components/itineraryClient';
import { getPoints } from '../../createtrip/[tripid]/action';
import { getPlaces } from './action';

type PageProps = {
  params: {
    tripid: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const { tripid } = params;

  console.log('Server-side ID from itinerary:', tripid);

  // 1️⃣ Fetch points
  const points = await getPoints(tripid);
  const pointsOnly = points.filter((p) => p.role === 'POINT');

  // 2️⃣ Fetch places for each point (parallel)
  const placesPerPoint = await Promise.all(
    pointsOnly.map((point) => getPlaces(point.id))
  );

  // 3️⃣ Flatten Place[][]
  const allPlaces = placesPerPoint.flat();

  // 4️⃣ Pass to client
  return (
    <ItineraryClient
      points={pointsOnly}
      places={allPlaces}
    />
  );
};

export default Page;
