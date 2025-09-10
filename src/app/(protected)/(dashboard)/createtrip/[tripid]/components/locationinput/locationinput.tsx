"use client";

import React, { useState , useEffect ,useRef } from 'react';
import { Input } from '@/components/ui/input';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

type Props = {
  defaultValue: any;
  inputName : string
  setMapos : any
  setplaceId  : any
  findplacemodal? : boolean
  placeholder? : string
};

const LocationInput = (props: Props) => {
  const [address, setAddress] = useState(props.defaultValue || '');
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
 //   requestOptions: {
  // componentRestrictions: {
   //  country: "cy",
 //  },
   // },
    debounce: 300,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  const handleSelect = async (address: string , placeId : string) => {
    props.setplaceId(placeId)
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      props.setMapos({
        lat : lat ,
        lng : lng
      })
    } catch (error) {
      console.error("😱 Error: ", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setAddress(e.target.value);
  };

 // const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
 //   if (event.key === 'Enter') {
 //     event.preventDefault();
 //   }
 // };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target as Node)
      ) {
        clearSuggestions();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [clearSuggestions]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Enter':
        if (highlightedIndex >= 0 && highlightedIndex < data.length) {
          event.preventDefault();
          handleSelect(data[highlightedIndex].description ,data[highlightedIndex].place_id);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        setHighlightedIndex((prevIndex) =>
          Math.min(prevIndex + 1, data.length - 1)
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setHighlightedIndex((prevIndex) =>
          Math.max(prevIndex - 1, 0)
        );
        break;
      default:
        break;
    }
  };


  return (
    <div className='relative '>
      <Input
        ref={inputRef}
        value={value}
        onChange={handleInputChange}
        disabled={!ready}
        placeholder={props.placeholder ? `${props.placeholder}` : `Enter a location`}
        onKeyDown={handleKeyPress}
        name={props.inputName}
        autoComplete="off"
        className={`${props.findplacemodal && "border-b-2 border-t-0 border-r-0 border-l-0 focus:border-t-0 focus-visible:ring-0  border-black rounded-none w-[90%] px-2" }`}
      />
      {status === 'OK' && (
        <div ref={autocompleteRef} className="autocomplete-dropdown">
          {data.map((suggestion,index) => {
            const {
              place_id,
              structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
              <div
                key={place_id}
                onClick={() => handleSelect(suggestion.description , place_id)}
                className={`px-3 py-2 cursor-pointer ${
                  index === highlightedIndex
                    ? 'bg-blue-500 text-white font-semibold rounded-md'
                    : 'hover:bg-gray-100'
                }`}
              >
                <strong>{main_text}</strong> <small>{secondary_text}</small>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
