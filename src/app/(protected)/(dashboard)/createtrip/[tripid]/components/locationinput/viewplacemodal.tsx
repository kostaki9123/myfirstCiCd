import Link from "next/link";
import React from "react";
import { IoMdAdd } from "react-icons/io";

type Place = {
  id: string;
  name: string;
  description?: string;
  image?: string;
};

type ViewPlaceModalProps = {
  accommodations: Place[];
  places: Place[];
};

const ActionRow = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} className="w-full">
    <div className="w-full flex items-center gap-3 bg-gray-100 rounded-md p-2 hover:bg-gray-200 cursor-pointer group">
      <div className="w-12 h-12 flex items-center justify-center rounded-md text-gray-700 transition-all">
        <IoMdAdd size={20} />
      </div>
      <p className="font-medium text-gray-600 group-hover:text-gray-800">{label}</p>
    </div>
  </Link>
);

const ViewPlaceModal: React.FC<ViewPlaceModalProps> = ({ accommodations, places }) => {
  return (
    <div className="  flex flex-col 820:h-auto 820:flex-row gap-6 items-start justify-start w-full overflow-x-auto p-4">
      {/* Accommodation Card */}
      <div className="flex-shrink-0 relative flex flex-col items-center justify-start gap-2 min-h-[13rem] max-h-[22rem] w-full sm:w-[250px] rounded-lg border-2 border-dashed border-gray-400 hover:border-gray-600 transition-all duration-200 p-4">
        <h4 className="text-base font-semibold tracking-tight text-center mb-2">
          Accommodation
        </h4>

        {accommodations.length === 0 ? (
          <ActionRow href="/itinerary/change-accommodation" label="Add Accommodation" />
        ) : (
          <div className="flex flex-col gap-3 w-full">
            {accommodations.map((acc) => (
              <div
                key={acc.id}
                className="flex items-center gap-3 bg-gray-100 rounded-md p-2 hover:bg-gray-200 cursor-pointer w-full"
              >
                {acc.image ? (
                  <img src={acc.image} alt={acc.name} className="w-12 h-12 rounded-md object-cover" />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center rounded-md bg-gray-300 text-gray-700">
                    🏨
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-800">{acc.name}</p>
                  {acc.description && <p className="text-sm text-gray-500">{acc.description}</p>}
                </div>
              </div>
            ))}

            {/* Change Accommodation */}
            <ActionRow href="/itinerary/change-accommodation" label="Change Accommodation" />
          </div>
        )}
      </div>

      {/* Places Card */}
      <div className="  max-h-fit flex-shrink-0 flex flex-col items-center justify-start gap-2 min-h-[13rem]  w-full sm:w-[250px] rounded-lg border-2 border-dashed border-gray-400 hover:border-gray-600 transition-all duration-200 p-4">
        
            <h4 className="text-base font-semibold tracking-tight text-center mb-2">
              Places
            </h4>
    
            {places.length === 0 ? (
              <ActionRow href="/itinerary/add-place" label="Add Place" />
            ) : (
              <div className="flex flex-col gap-3 w-full">
                {places.map((place) => (
                  <div
                    key={place.id}
                    className="flex items-center gap-3 bg-gray-100 rounded-md p-2 hover:bg-gray-200 cursor-pointer w-full"
                  >
                    {place.image ? (
                      <img src={place.image} alt={place.name} className="w-12 h-12 rounded-md object-cover" />
                    ) : (
                      <div className="w-12 h-12 flex items-center justify-center rounded-md bg-gray-300 text-gray-700">
                        📍
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-800">{place.name}</p>
                      {place.description && <p className="text-sm text-gray-500">{place.description}</p>}
                    </div>
                  </div>
                ))}
    
                {/* Add Another Place */}
                <ActionRow href="/itinerary/add-place" label="Add Place" />
              </div>
            )}
         </div>
      
    </div>
  );
};

export default ViewPlaceModal;
