import React from 'react'
import Addnewcyrcle from './addnewcyrcle'
import Point from './point'
import Movingbox from './movingbox'


type props = {
    tripId : string
    cyrclesArr : any
  }

const Tripboardphone = (props : props) => {

    
  return (
    <div style={{gridTemplateRows : `70px repeat(${props.cyrclesArr?.length}, 132px)`,gridTemplateColumns:'200px 200px' ,minWidth: '344px' , display: 'grid', gap: '7px' , width: '100%',paddingTop: '7px', paddingBottom: '7px', background : 'grey' , height:'fit-content' , minHeight: '100%' }}  >
          <Addnewcyrcle withcurveline={false} lengtharr={props.cyrclesArr.length} index={0} tripId={props.tripId}  /> 
         {
             props.cyrclesArr?.map(( point: any , key:number ) => (
             point.role === "POINT" 
             ? <Point withcurveline={false} key={key} index={key} datalenght={props.cyrclesArr.length} data={point} tripId={props.tripId} />
             : <Movingbox withcurveline={false} key={key} index={key} datalenght={props.cyrclesArr.length} data={point} tripId={props.tripId} />
             )) 
            
        }
    </div>
  )
}

export default Tripboardphone