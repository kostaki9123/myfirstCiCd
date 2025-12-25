'use client'

import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronsUpDownIcon, CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  startTime: string // "03:00"
  endTime: string   // "18:00"
  stepMinutes?: number // default 15
  value: string | Date | null
  onChange: (date: Date) => void
}

export default function TimeSlotsDropdown({
  startTime,
  endTime,
  stepMinutes = 15,
  value,
  onChange,
}: Props) {
  /* -------- Normalize selected time -------- */
  const selectedTime = React.useMemo(() => {
    if (!value) return null
    const d = new Date(value)
    return isNaN(d.getTime()) ? null : d
  }, [value])

  const selectedLabel = selectedTime
    ? selectedTime.toTimeString().slice(0, 5)
    : null

  /* -------- Generate time slots -------- */
  const times = React.useMemo(() => {
    const result: string[] = []

    const [startH, startM] = startTime.split(':').map(Number)
    const [endH, endM] = endTime.split(':').map(Number)

    const startTotal = startH * 60 + startM
    const endTotal = endH * 60 + endM

    for (
      let minutes = startTotal;
      minutes <= endTotal;
      minutes += stepMinutes
    ) {
      const h = Math.floor(minutes / 60)
      const m = minutes % 60

      result.push(
        `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
      )
    }

    return result
  }, [startTime, endTime, stepMinutes])

  /* -------- Handle selection -------- */
  const handleSelect = (time: string) => {
    const [h, m] = time.split(':').map(Number)
    const date = new Date()

    date.setHours(h, m, 0, 0)
    onChange(date)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full max-w-[202px] justify-between rounded-xl"
        >
          {selectedLabel || 'Select time'}
          <ChevronsUpDownIcon className="h-4 w-4 opacity-60" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 max-h-64 overflow-y-auto">
        {times.map((time) => (
          <DropdownMenuItem
            key={time}
            onClick={() => handleSelect(time)}
            className={cn(
              'flex items-center justify-between',
              selectedLabel === time &&
                'bg-indigo-50 text-indigo-600'
            )}
          >
            <span>{time}</span>
            {selectedLabel === time && (
              <CheckIcon className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
