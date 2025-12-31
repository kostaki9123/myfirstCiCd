// app/itinerary/[tripid]/page.tsx
import ItineraryClient from './components/itineraryClient';
import { getPoints } from '../../createtrip/[tripid]/action';

const Page = async ({
  params,
}: {
  params: { tripid: string };
}) => {
  const { tripid } = params;

  console.log('Server-side ID from itinerary:', tripid);

  const points = await getPoints(tripid);
  const pointsOnly = points.filter(p => p.role === 'POINT');

  return <ItineraryClient points={pointsOnly} />;
};

export default Page;
