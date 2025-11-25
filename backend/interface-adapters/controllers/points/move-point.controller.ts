import { movePointUseCase } from "../../../application/use-cases/points/move-point.use-case";

type props = {
  tripId: string;
  pointId: string;
  newIndex: number;
} 

export const movePointController =
    async (props:props) : Promise<any> => { 
          
          return await movePointUseCase(props);

    }
      