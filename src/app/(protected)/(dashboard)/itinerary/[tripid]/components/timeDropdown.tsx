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
  value: string | Date | null
  onChange: (date: Date) => void
}

const START_TIME = '09:00'
const END_TIME = '20:45'
const STEP_MINUTES = 15

export default function TimeSlotsDropdown({
  value,
  onChange,
}: Props) {
  const selectedTime = React.useMemo(() => {
    if (!value) return null

    const d = new Date(value)
    return isNaN(d.getTime()) ? null : d
  }, [value])

  const selectedLabel = selectedTime
    ? selectedTime.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC',
      })
    : null

  const times = React.useMemo(() => {
    const result: string[] = []

    const [startH, startM] = START_TIME.split(':').map(Number)
    const [endH, endM] = END_TIME.split(':').map(Number)

    const startTotal = startH * 60 + startM
    const endTotal = endH * 60 + endM

    for (
      let minutes = startTotal;
      minutes <= endTotal;
      minutes += STEP_MINUTES
    ) {
      const h = Math.floor(minutes / 60)
      const m = minutes % 60

      result.push(
        `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
      )
    }

    return result
  }, [])

  const handleSelect = (time: string) => {
    const [h, m] = time.split(':').map(Number)

    const date = new Date(Date.UTC(1970, 0, 1, h, m))

    onChange(date)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="w-full max-w-[202px] justify-between text-white bg-white/10 hover:bg-white/5 hover:text-white rounded-xl"
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
              selectedLabel === time && 'bg-indigo-50 text-indigo-600'
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