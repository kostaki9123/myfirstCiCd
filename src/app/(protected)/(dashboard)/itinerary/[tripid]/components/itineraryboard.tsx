'use client';

import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import Placesdropdown from './placesdropdown';
import Addaplace from './addplace';
import PlaceToStayCard from './PlaceToStayCard';
import PlaceToVisitCard from './PlaceToVisitCard';
import { Place } from '../../../../../../../backend/entities/models/place';

export interface ItineraryPoint {
  id: string;
  tripId: string;
  role: 'POINT' | 'MOVING_BOX';
  index: number;

  placeName?: string | null;
  placeAddress?: string;
  placeId?: string;
  placeLat?: number | null;
  placeLng?: number | null;
  startDate?: Date | null;
  endDate?: Date | null;

  fromName?: string | null;
  toName?: string | null;
  transportType?: string | null;
}

type Props = {
  cyrclesArr: ItineraryPoint[];
  selectedPlacceId?: string;
  focusplace?: any;
  setFocusplace?: Dispatch<SetStateAction<any>>;
  places: Place[];
  budgetId: string
};

const Itineraryboard = (props: Props) => {
  /** Only POINT items */
  const pointsOnly = useMemo(
    () => props.cyrclesArr.filter((item) => item.role === 'POINT'),
    [props.cyrclesArr]
  );

  /** Selected point state */
  const [selectedPoint, setSelectedPoint] = useState<ItineraryPoint>(
    pointsOnly[0]
  );

  /** Sync selectedPoint when prop changes */
  useEffect(() => {
    if (!props.selectedPlacceId) return;

    const nextPoint = pointsOnly.find(
      (p) => p.id === props.selectedPlacceId
    );

    if (nextPoint) {
      setSelectedPoint(nextPoint);
    }
  }, [props.selectedPlacceId, pointsOnly]);

  /** Accommodation places (recomputed on change) */
  const accommodationPlaces = useMemo(() => {
    return props.places.filter(
      (place) =>
        place.pointId === selectedPoint.id &&
        place.placeType === 'ACCOMMODATION'
    );
  }, [props.places, selectedPoint.id]);

  /** Places to visit (recomputed on change) */
  const placesToVisit = useMemo(() => {
    return props.places.filter(
      (place) =>
        place.pointId === selectedPoint.id &&
        place.placeType === 'PLACE_TO_VISIT'
    );
  }, [props.places, selectedPoint.id]);

  return (
    <div className="h-fit w-full p-3">
      <div className="w-full rounded-md p-2 bg-[#ACA7CB] min-w-[290px] relative">

        {/* HEADER */}
        <div className="flex justify-center mb-2 relative">
          <div className=' absolute top-1 left-2 max-w-20 450:max-w-max  '>
            {selectedPoint.startDate && selectedPoint.endDate
              ? `${new Date(selectedPoint.startDate).toLocaleDateString(undefined, {
                  month: '2-digit',
                  day: '2-digit',
                })} - ${new Date(selectedPoint.endDate).toLocaleDateString(undefined, {
                  month: '2-digit',
                  day: '2-digit',
                })}`
              : selectedPoint.startDate
              ? new Date(selectedPoint.startDate).toLocaleDateString(undefined, {
                  month: '2-digit',
                  day: '2-digit',
                })
              : 'No date'}
          </div>

          <Placesdropdown
            cyrclesArr={pointsOnly}
            selectedPlace={selectedPoint}
            setSelectedPoint={setSelectedPoint}
          />
        </div>

        {/* ACCOMMODATION */}
        <div className="flex flex-col items-center p-2 mt-5 450:mt-0 pt-7 relative gap-2 ">
          <small className="absolute left-2 top-2 font-semibold">
            Accommodation
          </small>

          {accommodationPlaces.map((place) => (
            <PlaceToStayCard
              key={place.internalId ?? place.id}
              budgetid={props.budgetId}
              internalId={place.internalId!}
              id={place.id}
              pointId={place.pointId}
              placeType={place.placeType}
              name={place.name}
              stayFrom={place.stayFrom ? place.stayFrom :selectedPoint.startDate}
              stayUntil={place.stayUntil ? place.stayUntil :selectedPoint.endDate}
              notes={place.notes}
            />
          ))}

          <Addaplace
            addedPlaces={props.places.filter(
              (p) => p.pointId === selectedPoint.id
            )}
            selectedPlace={selectedPoint}
            triggerName="Add a place to stay"
            descriptionName="Recommended accommodations based on location, safety, and price"
            cyrclesArr={props.cyrclesArr}
            latitude={selectedPoint.placeLat!}
            longitude={selectedPoint.placeLng!}
          />
        </div>

        {/* PLACES TO VISIT */}
        <div className="flex flex-col items-center p-2 pt-7 relative gap-2">
          <small className="absolute left-2 top-2 font-semibold">
            Places to Visit
          </small>

          {placesToVisit.map((place) => (
            <PlaceToVisitCard
              key={place.internalId ?? place.id}
              budgetid={props.budgetId}
              internalId={place.internalId!}
              id={place.id}
              pointId={place.pointId}
              placeType={place.placeType}
              name={place.name}
              visitDate={place.visitDate}
              stayFrom={selectedPoint.startDate}
              stayUntil={selectedPoint.endDate}
              notes={place.notes}
            />
          ))}

          <Addaplace
            addedPlaces={props.places.filter(
              (p) => p.pointId === selectedPoint.id
            )}
            selectedPlace={selectedPoint}
            triggerName="Add a place to visit"
            descriptionName="Top attractions and must-see places nearby"
            cyrclesArr={props.cyrclesArr}
            latitude={selectedPoint.placeLat!}
            longitude={selectedPoint.placeLng!}
          />
        </div>
      </div>
    </div>
  );
};

export default Itineraryboard;
