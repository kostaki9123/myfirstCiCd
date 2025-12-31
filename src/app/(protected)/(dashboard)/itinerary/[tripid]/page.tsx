// app/itinerary/[tripid]/page.tsx
import ItineraryClient from './components/itineraryClient';
import { getPoints } from '../../createtrip/[tripid]/action';

interface PageProps {
  params: { tripid: string };
}

const Page = async ({ params }: PageProps) => {
  const { tripid } = params;

  console.log("Server-side ID from itinerary:", tripid);

  const points = await getPoints(tripid);

  const pointsOnly = points.filter(p => p.role === 'POINT');

  return <ItineraryClient points={pointsOnly} />;
};

export default Page;
