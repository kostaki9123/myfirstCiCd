
import { useEffect, useRef, useState } from "react";
import { useMapsLibrary } from '@vis.gl/react-google-maps';

type Props = {
  inputName : string
  setLocation: (place: google.maps.places.PlaceResult | null) => void;
  deafultValue : any
}

const LocationInput = (props: Props) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address','address_components', "place_id"] ,
      language:  'en' 
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      props.setLocation(placeAutocomplete.getPlace());
    });


  }, [props.setLocation, placeAutocomplete]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent the default behavior of Enter key press
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };
  

  return (
    <div>
      <label>{props.inputName}</label>
      <input ref={inputRef} id="omonoia" placeholder="Enter a location"   defaultValue={props.deafultValue || undefined} onKeyDown={handleKeyPress} />
    </div>
  );
}

export default LocationInput;
