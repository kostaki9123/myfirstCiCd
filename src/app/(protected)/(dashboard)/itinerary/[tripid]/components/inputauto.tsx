import { useEffect, useRef, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  inputName: string;
  setLocation: (place: google.maps.places.PlaceResult | null) => void;
  deafultValue: any;
};

const LocationInput = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const places = useMapsLibrary("places");
  const autocompleteService = useRef<google.maps.places.AutocompleteService>();
  const placesService = useRef<google.maps.places.PlacesService>();

  /* ----------------------------------------------
     Initialize Google Services (NO BUILT-IN UI)
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
     Fetch Prediction List
  ---------------------------------------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value) {
      setPredictions([]);
      return;
    }

    autocompleteService.current?.getPlacePredictions(
      { input: value },
      (results) => {
        setPredictions(results || []);
      }
    );
  };

  /* ----------------------------------------------
     Fetch Place Details
  ---------------------------------------------- */
  const selectPrediction = (prediction: google.maps.places.AutocompletePrediction) => {
    inputRef.current!.value = prediction.description;
    setPredictions([]);

    placesService.current?.getDetails(
      { placeId: prediction.place_id },
      (place) => {
        props.setLocation(place);
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
     Add Button Click → Set Location
  ---------------------------------------------- */
  const handleAdd = () => {
    const value = inputRef.current?.value;

    if (!value || predictions.length === 0) return;

    // pick first result
    const first = predictions[0];

    selectPrediction(first);
  };

  return (
    <div className="relative w-full 950:max-w-md pr-6  950:pr-0 ">
      <label className="block mb-1 font-medium text-gray-700">
        {props.inputName}
      </label>

      {/* INPUT + BUTTON */}
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          placeholder="Enter a custom location"
          defaultValue={props.deafultValue || ""}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-1 border rounded-lg px-3 py-2"
        />

        <Button
          onClick={handleAdd}
          className="px-4 py-2 rounded-lg"
        >
          Add
        </Button>
      </div>

      {/* CUSTOM DROPDOWN */}
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
    </div>
  );
};

export default LocationInput;
