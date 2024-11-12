import { SignUp } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className=' flex justify-center items-center border-2 border-pink-600 h-[100vh]' >
        <SignUp/>
    </div>
  )
}

export default page