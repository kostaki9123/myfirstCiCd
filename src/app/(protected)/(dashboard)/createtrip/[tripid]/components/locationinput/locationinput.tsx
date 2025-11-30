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
  onMovingbox?: boolean;

  /** NEW optional defaults */
  defaultQuery?: string;
  defaultPlace?: PlaceResult;
}

export default function PlaceSearchWrapper({
  apiKey,
  onPlaceSelected = () => {},
  onMovingbox,
  defaultQuery,
  defaultPlace,
}: PlaceSearchWrapperProps) {
  return (
    <APIProvider apiKey={apiKey} libraries={["places"]}>
      <div className="max-w-md">
        <PlaceSearch
          onMovingbox={onMovingbox ?? false}
          onPlaceSelected={onPlaceSelected}
          defaultQuery={defaultQuery}
          defaultPlace={defaultPlace}
        />
      </div>
    </APIProvider>
  );
}

interface PlaceSearchProps {
  onPlaceSelected: (place: PlaceResult) => void;
  onMovingbox: boolean;
  defaultQuery?: string;
  defaultPlace?: PlaceResult;
}

function PlaceSearch({
  onPlaceSelected,
  onMovingbox,
  defaultQuery,
  defaultPlace,
}: PlaceSearchProps) {
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

  // -------------------------------
  // 🔹 Apply default values on mount
  // -------------------------------
  useEffect(() => {
    if (defaultPlace) {
      setQuery(defaultPlace.address || defaultPlace.name || "");
      setSelectedPlace(true);
      onPlaceSelected(defaultPlace);
    } else if (defaultQuery) {
      setQuery(defaultQuery);
    }
  }, [defaultPlace, defaultQuery]);

  // -------------------------------
  // 🔹 Detect mobile keyboard
  // -------------------------------
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

  // -------------------------------
  // 🔹 Init Google services
  // -------------------------------
  useEffect(() => {
    if (!placesLib) return;
    acServiceRef.current = new placesLib.AutocompleteService();
    sessionTokenRef.current = new placesLib.AutocompleteSessionToken();
    placesServiceRef.current = new placesLib.PlacesService(
      document.createElement("div")
    );
  }, [placesLib]);

  // -------------------------------
  // 🔹 Fetch autocomplete predictions
  // -------------------------------
  useEffect(() => {
    if (!acServiceRef.current || !query) return;
    if (selectedPlace) return;

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

  // -------------------------------
  // 🔹 Click outside to close dropdown
  // -------------------------------
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

  // -------------------------------
  // 🔹 Select a prediction
  // -------------------------------
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

  // -------------------------------
  // 🔹 Input change handler
  // -------------------------------
  function handleInputChange(value: string) {
    const wasDeleting = value.length < query.length;
    setQuery(value);

    if (selectedPlace && (wasDeleting || value !== query)) {
      setSelectedPlace(false);
      onPlaceSelected({
        name: "",
        address: "",
        placeId: "",
        location: { lat: 0, lng: 0 },
      });
    }

    if (value.trim().length === 0) {
      setOpen(false);
      setPredictions([]);
      setSelectedPlace(false);
      onPlaceSelected({
        name: "",
        address: "",
        placeId: "",
        location: { lat: 0, lng: 0 },
      });
    } else {
      setOpen(true);
    }
  }

  // -------------------------------
  // 🔹 Keyboard navigation
  // -------------------------------
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

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    if (!e.isTrusted) return;
    if (window.innerWidth < 768) {
      setMobileMode(true);
      setOpen(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }

  // -------------------------------
  // 🔹 Mobile "X" close
  // -------------------------------
  function handleMobileClose() {
    setMobileMode(false);
    setPredictions([]);
    setQuery("");
    onPlaceSelected({
      name: "",
      address: "",
      placeId: "",
      location: { lat: 0, lng: 0 },
    });
    setOpen(false);
    setSelectedPlace(false);
  }

  // -------------------------------
  // 🔹 Render
  // -------------------------------
  return (
    <>
      {/* Desktop */}
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
            <ul className="absolute z-[57] left-0 right-0 mt-2 bg-white rounded-lg shadow-lg max-h-52 overflow-auto">
              {predictions.map((p, i) => (
                <li
                  key={p.place_id}
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

      {/* Mobile modal */}
      {mobileMode && (
        <div
          className={`fixed inset-0 z-[53] bg-white ${
            onMovingbox ? "top-[-30px]" : "top-[-100px]"
          } flex flex-col`}
          onClick={handleMobileClose}
        >
          <div
            className="flex flex-col flex-1 min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center border-b p-2">
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

            <div
              className={`flex-1 overflow-y-auto transition-all duration-200 ${
                keyboardOpen ? "max-h-[260px]" : ""
              }`}
            >
              {predictions.length > 0 ? (
                <ul className="flex flex-col">
                  {predictions.map((p) => (
                    <li
                      key={p.place_id}
                      onClick={() => handleSelect(p)}
                      className="px-4 py-3 border-b cursor-pointer hover:bg-gray-50"
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
