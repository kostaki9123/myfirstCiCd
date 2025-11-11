import { getPointsUseCase } from "../../../application/use-cases/points/get-point.use-case";


export const getPointsController =
    async (tripId : string) : Promise<ReturnType<typeof getPointsUseCase >> => { 
    
    return await getPointsUseCase(tripId);

    }
      