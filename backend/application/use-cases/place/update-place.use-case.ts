import { PlaceRepository } from '../../../infrastructure/repository/place.repository';
import { MockPlaceRepository } from '../../../infrastructure/repository/place.repository.mock';
import { IPlaceRepository } from '../../repositories/place.repository.interface';

export type UpdatePlaceUseCaseInput = {
  id: string;
  pointId: string;
  stayFrom?: Date | null;
  stayUntil?: Date | null;
  visitDate?: Date | null;
  visitTime?: Date | null;
  cost?: number | null;
  notes?: string | null;
};

export type IUpdatePlaceUseCase = ReturnType<typeof updatePlaceUseCase>;

export const updatePlaceUseCase = async (input: UpdatePlaceUseCaseInput) => {
  // ✅ Choose repository based on environment
  const placeRepository: IPlaceRepository =
    process.env.NODE_ENV === "test"
      ? new MockPlaceRepository()
      : new PlaceRepository();

  try {
    const updatedPlace = await placeRepository.updatePlace(
      input.pointId, // 1️⃣ parent point ID
      input.id,      // 2️⃣ place ID
      {
        stayFrom: input.stayFrom ?? null,
        stayUntil: input.stayUntil ?? null,
        visitDate: input.visitDate ?? null,
        visitTime: input.visitTime ?? null,
        cost: input.cost ?? null,
        notes: input.notes ?? null,
      } // 3️⃣ input object
    );

     console.log('run use case', input)

    if (!updatedPlace) {
      throw new Error("Place could not be updated");
    }

    return updatedPlace;
  } catch (err) {
    throw new Error(
      `Oops, something went wrong: ${(err as Error).message}`
    );
  }
};
