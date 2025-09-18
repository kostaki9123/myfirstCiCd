"use client"

import { Dialog,DialogTrigger,DialogContent,DialogHeader,DialogTitle,DialogDescription, } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React, { useState } from 'react'
//import Deletbtn from './deletbtn'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'


type props = {
  cyrcleId : string 
}

const Dropdowncontent = (props:props) => {
   const [dialogtype , setDialogtype ] = useState<string>("")

  return (
    <Dialog>
        <DropdownMenuContent className="w-56  rounded-md">
              <DropdownMenuLabel className=' w-[240px] py-[6px] pr-4 text-center'>Actions List</DropdownMenuLabel>
             
              <DropdownMenuGroup>
                 <DialogTrigger>       
                    <DropdownMenuItem className=' w-[240px] py-[6px] px-3 ' onSelect={()=>setDialogtype("move cyrcle")}>
                       Move cyrcle  
                    </DropdownMenuItem>
                 </DialogTrigger>
                 <DropdownMenuItem className=' w-[240px] py-[6px] px-3 '>
                    Delete point
                   {/**   <Deletbtn cyrcleId={props.cyrcleId} /> */ }
                 </DropdownMenuItem>
    
              </DropdownMenuGroup>
       </DropdownMenuContent>



  <DialogContent className='  xl:my-[2%] xl:mx-[8%] p-4   w-fit  z-50  text-black '>
        <form >
   
          <Card className="w-full text-black ">
            <CardHeader>
              <DialogTitle>
                Move cyrcle
              </DialogTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-1.5 min-w-[350px]">
                    <Input type="number"  defaultValue={0} min={0} max={5} ></Input>
                </div>
                
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit">Move</Button>
            </CardFooter>
          </Card>
    
        
        </form>
         
    </DialogContent>
  </Dialog>
  )
}

export default Dropdowncontent