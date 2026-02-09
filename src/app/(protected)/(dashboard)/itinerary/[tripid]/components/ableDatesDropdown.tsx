'use client'

import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  startDate: string | Date | null
  endDate: string | Date | null
  value: string | Date | null
  onChange: (date: Date) => void
}

export default function DateRangeDropdown({
  startDate,
  endDate,
  value,
  onChange,
}: Props) {
  // Normalize value → Date | null
  const selectedDate = React.useMemo(() => {
    if (!value) return null
    const d = new Date(value)
    return isNaN(d.getTime()) ? null : d
  }, [value])

  // Generate dates safely
  const dates = React.useMemo(() => {
    if (!startDate || !endDate) return []

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return []

    start.setHours(0, 0, 0, 0)
    end.setHours(0, 0, 0, 0)

    const result: Date[] = []
    const current = new Date(start)

    while (current <= end) {
      result.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }

    return result
  }, [startDate, endDate])

  console.log('Datesss',dates)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full max-w-[202px] justify-between rounded-xl"
        >
          {selectedDate
            ? selectedDate.toLocaleDateString('en-GB')
            : 'Select date'}
          <ChevronsUpDownIcon className="h-4 w-4 opacity-60" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 max-h-64 overflow-y-auto z-[69] border-2 border-red-700">
        {dates.map((date) => {
          const isSelected =
            selectedDate?.toDateString() === date.toDateString()

          return (
            <DropdownMenuItem
              key={date.toISOString()}
              onClick={() => onChange(date)}
              className={cn(
                'flex items-center justify-between',
                isSelected && 'bg-indigo-50 text-indigo-600'
              )}
            >
              <span>
                {date.toLocaleDateString('en-GB', {
                  weekday: 'short',
                  day: '2-digit',
                  month: '2-digit',
                })}
              </span>

              {isSelected && <CheckIcon className="h-4 w-4" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
