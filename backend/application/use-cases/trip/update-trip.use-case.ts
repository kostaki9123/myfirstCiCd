import { TripsRepository } from '../../../infrastructure/repository/trips.repository';
import { MockTripsRepository } from '../../../infrastructure/repository/trips.repository.mock';
import { ITripsRepository } from '../../repositories/trips.repository.interface';

type Props = {
  tripId: string;
  tripName: string;
  tripBudget: "Economy traveler" | "Balanced traveler" | "Luxury traveler";
  travelingWith: "Solo" | "Friends" | "Couple" | "Family" | "Group";
  tripTypes: string[];
  userId: string;
};

export type IUpdateTripUseCase = ReturnType<typeof updateTripUseCase>;

export const updateTripUseCase = async (input: Props) => {
  // Choose repository based on environment
  const tripsRepository: ITripsRepository =
    process.env.NODE_ENV === 'test'
      ? new MockTripsRepository()
      : new TripsRepository();

  try {
    // Call the repository update method
    const updatedTrip = await tripsRepository.updateTrip(
  input.tripId,
  {
    tripName: input.tripName,
    tripBudget: input.tripBudget,
    travelingWith: input.travelingWith,
    tripTypes: input.tripTypes,
    userId: input.userId,
  }
);


    if (!updatedTrip) {
      throw new Error('Trip could not be updated');
    }

    return updatedTrip;
  } catch (err) {
    throw new Error(`Ops something went wrong:'${(err as Error).message}'`);
  }
};
