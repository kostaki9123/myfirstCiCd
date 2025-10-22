'use client'

import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

// Transport options (you can expand this)
const transportModes = [
  { value: 'walking', label: 'Walking', icon: '🚶' },
  { value: 'bicycle', label: 'Bicycle', icon: '🚲' },
  { value: 'motorbike', label: 'Motorbike', icon: '🏍️' },
  { value: 'car', label: 'Car', icon: '🚗' },
  { value: 'bus', label: 'Bus', icon: '🚌' },
  { value: 'train', label: 'Train', icon: '🚆' },
  { value: 'subway', label: 'Subway', icon: '🚇' },
  { value: 'plane', label: 'Plane', icon: '✈️' },
  { value: 'boat', label: 'Boat', icon: '⛴️' },
]

export default function TransportDropdown({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const selected = transportModes.find((t) => t.value === value)

  return (
    <DropdownMenu>
      {/* Trigger button */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-44 justify-between border-gray-300 text-gray-700 shadow-sm rounded-xl"
        >
          {selected ? (
            <span className="flex items-center gap-2">
              <span>{selected.icon}</span>
              {selected.label}
            </span>
          ) : (
            'Select transport'
          )}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 opacity-60" />
        </Button>
      </DropdownMenuTrigger>

      {/* Dropdown list */}
      <DropdownMenuContent
        className="w-44 z-[55] max-h-60 overflow-y-auto rounded-xl shadow-lg border border-gray-100 bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        align="start"
      >
        <DropdownMenuLabel className="text-gray-500 text-xs uppercase tracking-wide px-2 py-1">
          Transport Modes
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {transportModes.map((mode) => (
          <DropdownMenuItem
            key={mode.value}
            onClick={() => onChange(mode.value)}
            className={cn(
              'flex items-center justify-between text-sm text-gray-700 rounded-md px-2 py-1 cursor-pointer transition-all duration-150',
              'hover:bg-indigo-50 hover:text-indigo-600'
            )}
          >
            <span className="flex items-center gap-2">
              <span>{mode.icon}</span>
              {mode.label}
            </span>
            {value === mode.value && (
              <CheckIcon className="h-4 w-4 text-indigo-500" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
