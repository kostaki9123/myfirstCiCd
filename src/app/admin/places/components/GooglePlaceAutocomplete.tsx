"use client";

import { useEffect, useRef, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

type Props = {
  onSelect: (
    place: google.maps.places.PlaceResult
  ) => void;
};

export default function GooglePlaceAutocomplete({
  onSelect,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);

  const [activeIndex, setActiveIndex] = useState(-1);

  const places = useMapsLibrary("places");

  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(
      null
    );

  const placesService =
    useRef<google.maps.places.PlacesService | null>(
      null
    );

  useEffect(() => {
    if (!places) return;

    autocompleteService.current =
      new google.maps.places.AutocompleteService();

    placesService.current =
      new google.maps.places.PlacesService(
        document.createElement("div")
      );
  }, [places]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    if (!value) {
      setPredictions([]);
      return;
    }

    autocompleteService.current?.getPlacePredictions(
      {
        input: value,
      },
      (results) => {
        setPredictions(results || []);
        setActiveIndex(-1);
      }
    );
  };

  const selectPrediction = (
    prediction: google.maps.places.AutocompletePrediction
  ) => {
    if (!placesService.current) return;

    if (inputRef.current) {
      inputRef.current.value = prediction.description;
    }

    setPredictions([]);
    setActiveIndex(-1);

    placesService.current.getDetails(
      {
        placeId: prediction.place_id,
        fields: [
          "place_id",
          "name",
          "geometry",
          "photos",
          "rating",
          "opening_hours",
          "formatted_address",
          "url",
          "website",
        ],
      },
      (place) => {
        if (!place) return;

        onSelect(place);
      }
    );
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!predictions.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();

      setActiveIndex((prev) =>
        Math.min(prev + 1, predictions.length - 1)
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      setActiveIndex((prev) =>
        Math.max(prev - 1, 0)
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();

      if (activeIndex >= 0) {
        selectPrediction(predictions[activeIndex]);
      }
    }
  };

  return (
    <div className="relative mb-6">
      <label className="block mb-2 text-sm text-gray-400">
        Search Google Place
      </label>

      <input
        ref={inputRef}
        placeholder="Start typing a place..."
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full p-3 rounded bg-gray-800 text-white outline-none"
      />

      {predictions.length > 0 && (
        <ul className="absolute z-50 left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-72 overflow-auto">
          {predictions.map((prediction, index) => (
            <li
              key={prediction.place_id}
              onClick={() =>
                selectPrediction(prediction)
              }
              className={`px-4 py-3 cursor-pointer ${
                activeIndex === index
                  ? "bg-gray-700"
                  : "hover:bg-gray-800"
              }`}
            >
              <div className="font-medium">
                {
                  prediction.structured_formatting
                    .main_text
                }
              </div>

              <div className="text-xs text-gray-400">
                {
                  prediction.structured_formatting
                    .secondary_text
                }
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}