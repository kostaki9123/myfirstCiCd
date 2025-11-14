import React from 'react'
import Addnewcyrcle from './addnewcyrcle'
import Point from './point'
import Movingbox  from './movingbox'

type TripSegment = {
  id: string;
  tripId: string;
  role: 'POINT' | 'MOVING_BOX';
  index: number;

  place?: {
    name: string;
    address: string;
    placeId: string;
    location: {
      lat: number;
      lng: number;
    };
  };

  startDate?: Date;
  endDate?: Date;

  fromName?: string;
  fromAddress?: string;
  fromPlaceId?: string;
  fromLat?: number;
  fromLng?: number;

  toName?: string;
  toAddress?: string;
  toPlaceId?: string;
  toLat?: number;
  toLng?: number;

  transportType?: 'car' | 'bus' | 'train' | 'flight' | string;
  departureDate?: Date;
  departureTime?: Date;
};

type props = {
    tripId : string
    cyrclesArr : TripSegment[]
  }

const Tripboard = (props : props) => {
  return (
    <div   style={{   minWidth: "344px" ,display: "grid",gridTemplateRows : "20px 69px" ,gridTemplateColumns: `70px repeat(${props.cyrclesArr?.length + 1}, 132px)`, backgroundColor: "grey", width: "100%", height: "100%", overflowX : "auto" , overflowY : "hidden"}}    >
       {
             props.cyrclesArr?.length === 0 
             ? <Addnewcyrcle  index={0} tripId={props.tripId}  withcurveline /> 
             :
             props.cyrclesArr?.map(( point: any , key:number ) => (
             point.role === "POINT" 
             ? <Point withcurveline key={point.id} index={key} datalenght={props.cyrclesArr.length} data={point} tripId={props.tripId} />
             : <Movingbox withcurveline key={point.id} index={key} datalenght={props.cyrclesArr.length} data={point} tripId={props.tripId} />
             )) 
            
        }
    </div>
  )
}

export default Tripboard