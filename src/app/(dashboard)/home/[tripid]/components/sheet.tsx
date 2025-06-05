'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FaNotesMedical } from "react-icons/fa6";
import { Textarea } from '@/components/ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { BsThreeDots } from "react-icons/bs";

const Sheetnotes = () => {
  const [editing, setEditing] = useState(false)
  const [note, setNote] = useState('nwlkdnwkl ejfbufb jn3rj3bn3ior ron32okr o443no i4ji3s')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Focus the textarea when entering edit mode
  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [editing])

  // Close if clicked outside and note is empty
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        if (note.trim() === '') {
          setEditing(false)
        } else {
          textareaRef.current?.blur()
        }
      }
    }

    if (editing) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [editing, note])

  return (
    <Sheet>
      <SheetTrigger className="absolute top-2 right-2 cursor-pointer p-2 text-xl">
        <FaNotesMedical />
      </SheetTrigger>

      <SheetContent autoFocus={false} className="p-0 bg-white">
        <SheetHeader className="bg-gray-200 p-3">
          <SheetTitle>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Notes
            </h3>
          </SheetTitle>

          <SheetDescription>
            <div className="flex items-center justify-between relative pb-2">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Copenhagen
              </h4>
              <DropdownMenu >
             <DropdownMenuTrigger className='absolute right-0 top-0 bottom-0  px-1 cursor-pointer  '>
          
                   <BsThreeDots className='   text-2xl h-full ' />
            
             </DropdownMenuTrigger>
             <DropdownMenuContent align='end'  side='bottom' className=' cursor-pointer  text-black mb-2 ' >
              
                 <DropdownMenuItem onClick={() => setEditing(true)} className=' cursor-pointer' >Edit</DropdownMenuItem>
                 <DropdownMenuItem className=' cursor-pointer' >Delete</DropdownMenuItem>
              
             </DropdownMenuContent>
     </DropdownMenu>
            </div>

            <div ref={wrapperRef} className ="max-h-fit">
              {editing || note.trim() !== '' ? (
                <Textarea
                  ref={textareaRef}
                  className="min-h-20 resize-none text-lg p-2 "
                  placeholder="Note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              ) : null}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default Sheetnotes
