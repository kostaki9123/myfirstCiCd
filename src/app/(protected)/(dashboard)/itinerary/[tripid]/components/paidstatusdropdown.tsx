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
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'


type Props = {
  value: string
  onChange: (value: string) => void
}

const options: {
  label: string
  value: string
  icon: React.ReactNode
  color: string
}[] = [
  {
    label: 'Unpaid',
    value: 'UNPAID',
    icon: <AlertCircle className="h-4 w-4" />,
    color: 'text-red-500',
  },
  {
    label: 'Partially Paid',
    value: 'PARTIALLY_PAID',
    icon: <Clock className="h-4 w-4" />,
    color: 'text-yellow-500',
  },
  {
    label: 'Paid',
    value: 'PAID',
    icon: <CheckCircle2 className="h-4 w-4" />,
    color: 'text-green-600',
  },
]

/* ---------------- COMPONENT ---------------- */

export default function PayStatusDropdown({ value, onChange }: Props) {
  const selected = options.find((o) => o.value === value)

  return (
    <DropdownMenu>
      {/* TRIGGER */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full max-w-[202px] justify-between rounded-xl"
        >
          <div className="flex items-center gap-2">
            {selected && (
              <span className={cn(selected.color)}>
                {selected.icon}
              </span>
            )}
            <span className={cn(selected?.color)}>
              {selected?.label ?? 'Select status'}
            </span>
          </div>

          <ChevronsUpDownIcon className="h-4 w-4 opacity-60" />
        </Button>
      </DropdownMenuTrigger>

      {/* DROPDOWN */}
      <DropdownMenuContent className="w-44">
        {options.map((option ,key) => (
          <DropdownMenuItem
            key={key}
            onClick={() => onChange(option.value)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className={cn(option.color)}>
                {option.icon}
              </span>
              <span className={cn(option.color)}>
                {option.label}
              </span>
            </div>

            <CheckIcon
              className={cn(
                'h-4 w-4',
                value === option.value ? 'opacity-100' : 'opacity-0'
              )}
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}