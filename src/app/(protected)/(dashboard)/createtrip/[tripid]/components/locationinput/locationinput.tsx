import React, { useEffect, useRef, useState } from "react";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import { Input } from "@/components/ui/input";

interface PlaceResult {
  name: string;
  address: string;
  placeId: string;
  location: {
    lat: number;
    lng: number;
  };
}

interface PlaceSearchWrapperProps {
  apiKey: string;
  onPlaceSelected?: (place: PlaceResult) => void;
}

export default function PlaceSearchWrapper({
  apiKey,
  onPlaceSelected = () => {},
}: PlaceSearchWrapperProps) {
  return (
    <APIProvider apiKey={apiKey} libraries={["places"]}>
      <div className="max-w-md mx-auto">
        <PlaceSearch onPlaceSelected={onPlaceSelected} />
      </div>
    </APIProvider>
  );
}

interface PlaceSearchProps {
  onPlaceSelected: (place: PlaceResult) => void;
}

function PlaceSearch({ onPlaceSelected }: PlaceSearchProps) {
  const placesLib = useMapsLibrary("places");

  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedPlace, setSelectedPlace] = useState<boolean>(false);

  const acServiceRef = useRef<google.maps.places.AutocompleteService | null>(
    null
  );
  const sessionTokenRef =
    useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(
    null
  );

  // Initialize services
  useEffect(() => {
    if (!placesLib) return;
    acServiceRef.current = new placesLib.AutocompleteService();
    sessionTokenRef.current = new placesLib.AutocompleteSessionToken();
    placesServiceRef.current = new placesLib.PlacesService(
      document.createElement("div")
    );
  }, [placesLib]);

  // Fetch predictions only if query changes AND no place is selected
  useEffect(() => {
    if (!acServiceRef.current || !query || selectedPlace) return;

    const handler = setTimeout(() => {
      acServiceRef.current?.getPlacePredictions(
        { input: query, sessionToken: sessionTokenRef.current ?? undefined },
        (preds, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            preds
          ) {
            setPredictions(preds.slice(0, 6));
            setOpen(true);
            setActiveIndex(-1);
          } else {
            setPredictions([]);
            setOpen(false);
          }
        }
      );
    }, 200);

    return () => clearTimeout(handler);
  }, [query, selectedPlace]);

  function handleSelect(prediction: google.maps.places.AutocompletePrediction) {
    setQuery(prediction.description);
    setPredictions([]); // clear suggestions
    setOpen(false);
    setSelectedPlace(true); // mark that a place is selected

    if (!placesServiceRef.current) return;

    placesServiceRef.current.getDetails(
      {
        placeId: prediction.place_id,
        fields: ["geometry", "name", "formatted_address", "place_id"],
      },
      (place, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          place &&
          place.geometry
        ) {
          const lat = place.geometry.location?.lat() ?? 0;
          const lng = place.geometry.location?.lng() ?? 0;
          onPlaceSelected({
            name: place.name ?? "",
            address: place.formatted_address ?? "",
            placeId: place.place_id ?? "",
            location: { lat, lng },
          });
          sessionTokenRef.current =
            new google.maps.places.AutocompleteSessionToken();
        }
      }
    );
  }

  // If user types after selecting a place, reset selection
  function handleInputChange(value: string) {
    setQuery(value);
    if (selectedPlace) setSelectedPlace(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, predictions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && predictions[activeIndex]) {
        handleSelect(predictions[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="relative">
      <Input
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Search address, business, or place"
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-activedescendant={
          activeIndex >= 0 ? `prediction-${activeIndex}` : undefined
        }
      />

      {open && predictions.length > 0 && (
        <ul className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-lg shadow-lg max-h-52 820:max-h-56 overflow-auto">
          {predictions.map((p, i) => (
            <li
              key={p.place_id}
              id={`prediction-${i}`}
              role="option"
              aria-selected={i === activeIndex}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(-1)}
              onMouseDown={(e) => e.preventDefault()} // keep input focus
              onClick={() => handleSelect(p)}
              className={`px-3 py-2 cursor-pointer truncate ${
                i === activeIndex ? "bg-indigo-50" : "hover:bg-gray-100"
              }`}
            >
              <div className="font-medium text-sm">
                {p.structured_formatting.main_text}
              </div>
              <div className="text-xs text-gray-500">
                {p.structured_formatting.secondary_text}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
