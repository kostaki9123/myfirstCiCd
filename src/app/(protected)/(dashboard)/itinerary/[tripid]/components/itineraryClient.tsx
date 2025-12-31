'use client';

import { useState } from 'react';
import Itineraryboard from './itineraryboard';
import Mapprovider from '@/app/component/map/map-provider';

const ItineraryClient = ({ points }: { points: any[] }) => {

  const location =
  points[0]?.placeLat != null && points[0]?.placeLng != null
    ? { lat: points[0].placeLat, lng: points[0].placeLng }
    : null;
    
  const [focusplace, setFocusplace] = useState(
   location ?? null
  );

  

  return (
    <div className="h-full absolute inset-0 flex min-w-[344px]">
      <div className="h-full w-full 950:w-[53%] overflow-auto">
        {points.length === 0 ? (
          <>There is no destination yet</>
        ) : (
          <Itineraryboard
            cyrclesArr={points}
            focusplace={focusplace}
            setFocusplace={setFocusplace}
          />
        )}
      </div>

      <div className="h-full w-[47%] hidden 950:block">
        <Mapprovider
          cyrclesArr={points}
          focusplace={focusplace}
        />
      </div>
    </div>
  );
};

export default ItineraryClient;
