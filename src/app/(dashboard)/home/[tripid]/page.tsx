import HorizontalItinerary from "./components/itinerary";

export const itinerary = [
  {
    title: 'Flight to Paris',
    date: 'Dec 1, 2024',
    description: 'Departing from JFK Airport at 10:00 AM. Arrival at CDG Airport at 8:00 PM.',
    type: 'Flight',
  },
  {
    title: 'Hotel Check-In',
    date: 'Dec 1, 2024',
    description: 'Check-in at Hotel Le Meurice, Paris. Reservation #123456.',
    type: 'Hotel',
  },
  {
    title: 'Eiffel Tower Visit',
    date: 'Dec 2, 2024',
    description: 'Guided tour of the Eiffel Tower. Starts at 10:00 AM.',
    type: 'Activity',
  },
  {
    title: 'Dinner Reservation',
    date: 'Dec 2, 2024',
    description: 'Dinner at Le Jules Verne Restaurant. Reservation at 8:00 PM.',
    type: 'Dining',
  },
  {
    title: 'Return Flight',
    date: 'Dec 5, 2024',
    description: 'Departing from CDG Airport at 3:00 PM. Arrival at JFK Airport at 7:00 PM.',
    type: 'Flight',
  },
];


const Home = () => {
  
  return (
  <div className=" overflow-x-auto  bg-gray-50 flex items-center justify-start absolute bottom-0 top-0 right-0 left-0">

       <HorizontalItinerary itinerary={itinerary} />
    
  </div>

  );
};

export default Home;
