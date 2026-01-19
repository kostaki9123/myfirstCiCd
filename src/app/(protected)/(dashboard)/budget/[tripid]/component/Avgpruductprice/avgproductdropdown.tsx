'use client'

import React, { useState, useEffect, useRef } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import ReactCountryFlag from "react-country-flag"
// import ReactCountryFlag from "react-country-flag";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu';

type Country = {
  code: string;
}

type Props = {
  setSelectedCountry: (code: string) => void;
  arrayOfCountries: Country[];
  selectedCountryCode?: string | null;
}

const Avgproductdropdown = ({ setSelectedCountry, arrayOfCountries, selectedCountryCode }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          className='absolute  flex items-center top-[-28px] right-[-6px] h-7 w-9 cursor-pointer select-none text-sm outline-none z-50'
        >
             <ReactCountryFlag countryCode={selectedCountryCode ?? "US"} svg /> 
          <RiArrowDropDownLine fontSize="20px"/>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className='w-20 h-auto max-h-44 rounded-md bg-white z-50 overflow-hidden border shadow-md
                     data-[state=open]:animate-in data-[state=closed]:animate-out
                     data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
                     data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
                     data-[side=bottom]:slide-in-from-top-2
                     data-[side=left]:slide-in-from-right-2
                     data-[side=right]:slide-in-from-left-2
                     data-[side=top]:slide-in-from-bottom-2'
        >
          {arrayOfCountries.map((country, index) => (
            <DropdownMenuItem
              key={index}
              className='h-7 flex text-base cursor-pointer justify-center items-center select-none outline-none transition-colors
                         focus:bg-accent focus:text-accent-foreground
                         data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
              onClick={() => {
                setSelectedCountry(country.code)
                setOpen(false)
              }}
            >
               <ReactCountryFlag countryCode={country.code} svg />
              
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Avgproductdropdown;
