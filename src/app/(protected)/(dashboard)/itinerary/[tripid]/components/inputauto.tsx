import { useEffect, useRef, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createPlace } from "../action";

type SelectedPlace = {
  id: string;
  tripId: string;
};

type Props = {
  inputName: string;
  defaultValue?: string;
  setLocation: (place: google.maps.places.PlaceResult | null) => void;
  selectedPlace: SelectedPlace;
  triggerName: string;

  // ✅ NEW PROPS
  lat: number;
  lng: number;
  radius?: number; // meters (default 5000)
};

const LocationInput = ({
  inputName,
  defaultValue = "",
  setLocation,
  selectedPlace,
  triggerName,
  lat,
  lng,
  radius = 5000,
}: Props) => {
  const [loadingForCustomAdd, setLoadingForCustomAdd] = useState(false);
  const [errorMessagesForCustomAdd, setErrorMessagesForCustomAdd] =
    useState<{ [key: string]: string }>({});

  const inputRef = useRef<HTMLInputElement>(null);

  const [inputLocation, setInputLocation] =
    useState<google.maps.places.PlaceResult | null>(null);

  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);

  const [activeIndex, setActiveIndex] = useState(-1);

  const places = useMapsLibrary("places");
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService =
    useRef<google.maps.places.PlacesService | null>(null);

  /* ----------------------------------------------
     Initialize Google Services
  ---------------------------------------------- */
  useEffect(() => {
    if (!places) return;

    autocompleteService.current =
      new window.google.maps.places.AutocompleteService();

    placesService.current = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
  }, [places]);

  /* ----------------------------------------------
     Fetch Predictions (Location Biased)
  ---------------------------------------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value) {
      setPredictions([]);
      setActiveIndex(-1);
      return;
    }

    const location = new google.maps.LatLng(lat, lng);

    autocompleteService.current?.getPlacePredictions(
      {
        input: value,
        location,
        radius,
      },
      (results) => {
        setPredictions(results || []);
        setActiveIndex(-1);
      }
    );
  };

  /* ----------------------------------------------
     Select Prediction
  ---------------------------------------------- */
  const selectPrediction = (
    prediction: google.maps.places.AutocompletePrediction
  ) => {
    if (!placesService.current) return;

    inputRef.current!.value = prediction.description;
    setPredictions([]);
    setActiveIndex(-1);

    placesService.current.getDetails(
      { placeId: prediction.place_id },
      (place) => {
        setInputLocation(place || null);
        setLocation(place || null);
      }
    );
  };

  /* ----------------------------------------------
     Keyboard Navigation
  ---------------------------------------------- */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (predictions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, predictions.length - 1));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) {
        selectPrediction(predictions[activeIndex]);
      }
    }
  };

  /* ----------------------------------------------
     Add Place (API Submit)
  ---------------------------------------------- */
  const addPlace = async () => {
    if (!inputLocation?.place_id || !inputLocation?.name) return;

    try {
      setLoadingForCustomAdd(true);

      const formData = new FormData();
      formData.append("id", inputLocation.place_id);
      formData.append("pointId", selectedPlace.id);
      formData.append(
        "placeType",
        triggerName.toLowerCase().includes("stay")
          ? "ACCOMMODATION"
          : "PLACE_TO_VISIT"
      );
      formData.append("name", inputLocation.name);
      formData.append("tripId", selectedPlace.tripId);

      await createPlace(formData);

      setErrorMessagesForCustomAdd({});
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMessagesForCustomAdd({
        general: "Something went wrong",
      });
    } finally {
      setLoadingForCustomAdd(false);
    }
  };

  return (
    <div className="relative w-full 950:max-w-md pr-6 950:pr-0">
      <label className="block mb-1 font-medium text-gray-700">
        {inputName}
      </label>

      <div className="flex gap-2">
        <Input
          ref={inputRef}
          placeholder="Search places nearby..."
          defaultValue={defaultValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-1 border rounded-lg px-3 py-2"
        />

        <Button
          onClick={addPlace}
          disabled={loadingForCustomAdd}
          className="px-4 py-2 rounded-lg"
        >
          {loadingForCustomAdd ? "Adding..." : "Add"}
        </Button>
      </div>

      {predictions.length > 0 && (
        <ul className="absolute z-[57] left-0 right-0 mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-auto">
          {predictions.map((p, index) => (
            <li
              key={p.place_id}
              onClick={() => selectPrediction(p)}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                index === activeIndex ? "bg-gray-100" : ""
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

      {errorMessagesForCustomAdd.general && (
        <p className="text-sm text-red-500 mt-2">
          {errorMessagesForCustomAdd.general}
        </p>
      )}
    </div>
  );
};

export default LocationInput;
