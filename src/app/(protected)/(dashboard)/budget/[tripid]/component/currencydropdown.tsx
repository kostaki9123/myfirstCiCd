

import React, { useEffect, useRef, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { RiArrowDropDownLine } from 'react-icons/ri'



const CURRENCIES = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "INR", name: "Indian Rupee" },
  { code: "KRW", name: "South Korean Won" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "HKD", name: "Hong Kong Dollar" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "MXN", name: "Mexican Peso" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "ZAR", name: "South African Rand" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "NOK", name: "Norwegian Krone" },
  { code: "DKK", name: "Danish Krone" },
  { code: "PLN", name: "Polish Zloty" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "THB", name: "Thai Baht" },
  { code: "IDR", name: "Indonesian Rupiah" },
  { code: "MYR", name: "Malaysian Ringgit" },
  { code: "PHP", name: "Philippine Peso" },
  { code: "VND", name: "Vietnamese Dong" },
  { code: "AED", name: "UAE Dirham" },
  { code: "SAR", name: "Saudi Riyal" },
  { code: "ILS", name: "Israeli Shekel" },
  { code: "EGP", name: "Egyptian Pound" },
]

type Props = {
  value?: string
  setCurrency: (value: string) => void
  fromGeneralCurrency? : boolean
  placeholder?: string
}

const CurrencyDropdown = ({
  value,
  setCurrency,
  fromGeneralCurrency,
  placeholder = "Select currency",
}: Props) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () =>
      document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (currencyCode: string) => {
    setCurrency(currencyCode)
    setOpen(false)
  }

  return (
    <div ref={dropdownRef} className="relative">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className={`pl-1 rounded-md  ${fromGeneralCurrency ? '' : 'border-input border' }  flex items-center justify-between w-full h-9 text-sm`}>
          <span>{value || 'EUR' }</span>
          <RiArrowDropDownLine fontSize="20px" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 max-h-60 z-[69] overflow-auto rounded-md bg-white border shadow-md">
          {CURRENCIES.map(({ code, name }) => (
            <DropdownMenuItem
              key={code}
              className=" flex justify-start items-center h-8 text-sm cursor-pointer px-2 hover:bg-slate-200"
              onClick={() => handleSelect(code)}
            >
              {code} — {name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default CurrencyDropdown
