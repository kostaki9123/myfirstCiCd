import React, { useEffect, useRef, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { RiArrowDropDownLine } from 'react-icons/ri'

type Props = {
  value?: string
  onChange?: (value: string) => void
  setExpenseCategory: (value: string) => void
  placeholder?: string
}

const EXPENSE_CATEGORIES = [
  "Flights",
  "Lodging",
  "Car rental",
  "Transit",
  "Food",
  "Drinks",
  "Sightseeing",
  "Activities",
  "Shopping",
  "Gas",
  "Groceries",
  "Other",
]

const ExpenseCategorydropdown = ({
  value,
  onChange,
  setExpenseCategory,
  placeholder
}: Props) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown if clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelect = (category: string) => {
    setExpenseCategory(category)
    onChange?.(category)
    setOpen(false)
  }

  return (
    <div ref={dropdownRef} className="relative">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          className=" pl-1 rounded-md border border-input flex items-center w-full top-[-28px] right-[-6px] h-9
                     cursor-pointer select-none text-sm outline-none mt-[6px] z-50 "
        >
          <div>
            {value || placeholder}
          </div>
          <RiArrowDropDownLine fontSize="20px "  />          
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-32 max-h-44 rounded-md bg-white z-50  border shadow-md
                     data-[state=open]:animate-in data-[state=closed]:animate-out
                     data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
                     data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
                     data-[side=bottom]:slide-in-from-top-2 overflow-auto"
        >
          {EXPENSE_CATEGORIES.map((category) => (
            <DropdownMenuItem
              key={category}
              className="h-7 flex text-sm cursor-pointer justify-center items-center
                         select-none outline-none transition-colors
                          focus:text-accent-foreground hover:bg-slate-400   "
              onClick={() => handleSelect(category)}
            >
              {category}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ExpenseCategorydropdown
