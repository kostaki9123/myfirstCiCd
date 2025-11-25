import { PointsRepository } from '../../../infrastructure/repository/points.repository';
import { MockPointsRepository } from '../../../infrastructure/repository/points.repository.mock';
import { IPointsRepository } from '../../repositories/points.repository.interface';

type MovePointProps = {
  tripId: string;
  pointId: string;
  newIndex: number;
};

export type ImovePointUseCase = ReturnType<typeof movePointUseCase>;

export const movePointUseCase = async (props: MovePointProps) => {
  const { tripId, pointId, newIndex } = props;

  // choose mock or real repository
  const pointRepository: IPointsRepository =
    process.env.NODE_ENV === 'test'
      ? new MockPointsRepository()
      : new PointsRepository();

  try {
    // 1️⃣ Get all points in the trip
    let points = await pointRepository.getPointsForUser(tripId);

     points = points.sort((a, b) => a.index - b.index);

    // Find the point to move
    const point = points.find((p) => p.id === pointId);
    if (!point) throw new Error(`Point with ID ${pointId} not found`);

    const oldIndex = point.index;

    // No change? return
    if (oldIndex === newIndex) return points;

    // Remove from old position
    points.splice(oldIndex, 1);

    // Ensure newIndex is safe
    const safeNewIndex = Math.max(0, Math.min(newIndex, points.length));

    // Insert in new place
    points.splice(safeNewIndex, 0, point);

    // Reassign 0-based indexes
    points = points.map((p, idx) => ({
      ...p,
      index: idx,  // 0-based
    }));


    // 6️⃣ Save to database / mock
    await pointRepository.updateMany(points);

    return points;
  } catch (err) {
    throw new Error(`Error moving point: ${(err as Error).message}`);
  }
};
