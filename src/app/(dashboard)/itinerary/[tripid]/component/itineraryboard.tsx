import React from 'react'
import Placesdropdown from './placesdropdown'
import Addaplace from './addplace'

type props = {
    cyrclesArr : any
    
    selectedPlacceId? : string
  }

const Itineraryboard = (props : props) => {
  return (
    <>
    <div className='  h-fit  base:w-[100%] 674:w-[50%]   p-3   ' >

        <div className=' h-fit w-full rounded-md p-2 bg-[#ACA7CB] min-w-[290px]   '>


            {/**Header  */}
            <div className=' w-full flex justify-between relative  mb-2 '>

                <div className=' left-0 h-full py-[1px] gap-2    '>
                 {props.selectedPlacceId ?
                   <>{props.cyrclesArr.map((cyrcle : any , key : number) => 
                      cyrcle.id === props.selectedPlacceId && cyrcle.role === "POINT" &&
                      <div key={key}>{cyrcle.startdate}</div>
                   )}
                   </>  
                  :
                  <>{/**props.cyrclesArr[0].startdate */}12/6-18/6</> 
                   }
                
                 </div>

                <div className=' min-h-8 '>
                  <Placesdropdown cyrclesArr={props.cyrclesArr} selectedPlacceId={props.selectedPlacceId}/> 
                  {/** dropdown for change place */}             
                </div>

                <div className='  right-0  '>
                    <div className='flex bg-[#5893D4] p-[2px] px-2 cursor-pointer rounded-sm'>Zoom</div>
                </div>
                
            </div>



            {/** Main */}

            <div className='flex justify-center flex-col items-center p-2 pt-7  relative  '>
                <small className="text-sm font-semibold leading-none  absolute left-2 top-2">Accomodation</small>
                {/** <StayDetailsCard/> */ }
                <Addaplace triggerName='Add a place to stay' descriptionName='These places to stay are highly recommended by our team for their prime location, affordability, and safety' cyrclesArr={props.cyrclesArr} latitude={props.cyrclesArr[0].lat1} longitude={props.cyrclesArr[0].lng1}/> 
              
            </div>

            <div className='flex justify-center flex-col items-center p-2 pt-7  relative  '>
                <small className="text-sm font-semibold leading-none  absolute left-2 top-2">Places</small>               
                <Addaplace triggerName='Add a place to visit' descriptionName='These places to stay are highly recommended by our team for their prime location, affordability, and safety' cyrclesArr={props.cyrclesArr} latitude={props.cyrclesArr[0].lat1} longitude={props.cyrclesArr[0].lng1}/> 

                {/** <StayDetailsCard/> */ }
                {/** <Addaccomodationmodal triggerName='Add a place to stay' descriptionName='These places to stay are highly recommended by our team for their prime location, affordability, and safety' cyrclesArr={props.cyrclesArr} latitude={props.cyrclesArr[0].lat1} longitude={props.cyrclesArr[0].lng1}/> */}
              
            </div>

        </div>
    </div>
</>
  )
}

export default Itineraryboard