import { getPlacesUseCase } from "../../../application/use-cases/place/get-places.use-case";

export const getPlacesController =
    async (pointId : string) : Promise<ReturnType<typeof getPlacesUseCase >> => { 
    
    return await getPlacesUseCase(pointId);

    }
      