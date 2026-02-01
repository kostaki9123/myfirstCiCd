'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { CURRENCIES } from '@/lib/currency'



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
          <span>{value || 'None' }</span>
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
