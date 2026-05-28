import React from 'react'

type Props = {
    line : "up" | "down"
}

const Curveline = (props : Props) => {
  return (
    <>
    {props.line === "up" ?
    <div className=' h-[30px] w-[100px]  ' >
      <svg viewBox="10 0 100 60"> 
         <path d="M 33 70 q 30 -65 75 -50" fill="none" stroke="white" strokeWidth="4" strokeDasharray="7 5"/> 
      </svg>
    </div> 
      :
    <div className=' h-[100px] w-[100px] rotate-[240deg]' >
       <svg viewBox="10 0 100 70"> 
         <path d="M 33 70 q 30 -65 75 -50" fill="none" stroke="white" strokeWidth="4" strokeDasharray="7 5"/> 
      </svg>
    </div>
       }  
  </>  
  )
}

export default Curveline