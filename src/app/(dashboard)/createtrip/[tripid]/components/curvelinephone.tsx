import React from 'react'

type Props = {
    line : string
    color : boolean
    isthefirst : boolean
}

const CurvelinePhone = (props : Props) => {
   if( props.isthefirst){
     return
   }
 
  return (
    <>
    
    {props.line === "left" ?
    <div className={`h-[100px] w-[200px] top-[40px] z-0 left-[-184px] rotate-[142deg] absolute`}>
    <svg viewBox="0 0 200 100">
      {/* First curve with matching control points */}
      <path d="M 20 70 q 90 -130 200 10" fill="none" stroke="white" strokeWidth="4" strokeDasharray="7 5" />
    </svg>
  </div>
      :
      <div className={`h-[100px] w-[224px] top-[40px] z-0 left-[-84px] rotate-[232deg] absolute`}>
      <svg viewBox="0 0 200 100">
        {/* First curve with matching control points */}
        <path d="M 20 70 q 90 -130 200 10" fill="none" stroke="white" strokeWidth="4" strokeDasharray="7 5" />
      </svg>
    </div>
       }  
  </>  
  )
}

export default CurvelinePhone