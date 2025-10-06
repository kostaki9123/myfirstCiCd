import React, { useEffect, useRef, useState } from "react";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

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
  const [selectedPlace, setSelectedPlace] = useState(false);

  const [mobileMode, setMobileMode] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const acServiceRef = useRef<google.maps.places.AutocompleteService | null>(
    null
  );
  const sessionTokenRef =
    useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(
    null
  );

  // ✅ Detect keyboard visibility on mobile
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const onResize = () => {
      const heightDiff =
        window.innerHeight - (viewport?.height ?? window.innerHeight);
      setKeyboardOpen(heightDiff > 150);
    };

    viewport.addEventListener("resize", onResize);
    return () => viewport.removeEventListener("resize", onResize);
  }, []);

  // ✅ Initialize Google Places services
  useEffect(() => {
    if (!placesLib) return;
    acServiceRef.current = new placesLib.AutocompleteService();
    sessionTokenRef.current = new placesLib.AutocompleteSessionToken();
    placesServiceRef.current = new placesLib.PlacesService(
      document.createElement("div")
    );
  }, [placesLib]);

  // ✅ Fetch predictions
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

  // ✅ Close dropdown when clicking outside (desktop/tablet)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        inputRef.current?.blur();
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Handle selection
  function handleSelect(prediction: google.maps.places.AutocompletePrediction) {
    setQuery(prediction.description);
    setPredictions([]);
    setOpen(false);
    setSelectedPlace(true);

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
          setMobileMode(false);
        }
      }
    );
  }

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

  function handleFocus() {
    if (window.innerWidth < 768) {
      setMobileMode(true);
      setOpen(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }

  // ✅ Handle "X" button (mobile close)
  function handleMobileClose() {
    setMobileMode(false);
    setPredictions([]);
    setQuery("");
    setOpen(false);
    setSelectedPlace(false);
  }

  return (
    <>
      {/* ✅ Desktop/Tablet View */}
      {!mobileMode && (
        <div className="relative" ref={wrapperRef}>
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={onKeyDown}
            onFocus={handleFocus}
            placeholder="Search address, business, or place"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          {open && predictions.length > 0 && (
            <ul className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-lg shadow-lg max-h-52 overflow-auto">
              {predictions.map((p, i) => (
                <li
                  key={p.place_id}
                  id={`prediction-${i}`}
                  role="option"
                  onClick={() => handleSelect(p)}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
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
      )}

      {/* ✅ Mobile full-screen modal */}
      {mobileMode && (
        <div
          className="fixed inset-0 z-50 bg-white top-[-110px] flex flex-col"
          onClick={handleMobileClose}
        >
          <div
            className="flex flex-col flex-1 min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with close button */}
            <div className="flex items-center border-b p-2 shrink-0">
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search address, business, or place"
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <button
                onClick={handleMobileClose}
                className="ml-2 p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ✅ Adjust min-height when keyboard is open */}
            <div
              className={`flex-1 overflow-y-auto transition-all duration-200 ${
                keyboardOpen ? "min-h-[300px]" : ""
              }`}
            >
              {predictions.length > 0 ? (
                <ul className="h-[362px] flex flex-col">
                  {predictions.map((p) => (
                    <li
                      key={p.place_id}
                      onClick={() => handleSelect(p)}
                      className="px-4 py-3 border-b flex-grow cursor-pointer hover:bg-gray-50"
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
              ) : (
                <p className="text-gray-400 text-center mt-6">
                  No results found
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
