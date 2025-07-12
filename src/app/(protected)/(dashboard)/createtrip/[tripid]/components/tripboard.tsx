import React from 'react'
import Addnewcyrcle from './addnewcyrcle'
import Point from './point'
import Movingbox from './movingbox'


type props = {
    tripId : string
    cyrclesArr : any
  }

const Tripboard = (props : props) => {
  return (
    <div   style={{ minHeight: "256px"  ,minWidth: "344px" ,display: "grid",gridTemplateRows : "20px 69px" ,gridTemplateColumns: `70px repeat(${props.cyrclesArr?.length + 1}, 132px)`, backgroundColor: "grey", width: "100%", height: "100%", overflowX : "auto" , overflowY : "hidden"}}    >
       {
             props.cyrclesArr?.length === 0 
             ? <Addnewcyrcle  index={0} tripId={props.tripId} cyrcleArrId={undefined} withcurveline /> 
             :
             props.cyrclesArr?.map(( point: any , key:number ) => (
             point.role === "POINT" 
             ? <Point withcurveline key={key} index={key} datalenght={props.cyrclesArr.length} data={point} tripId={props.tripId} />
             : <Movingbox withcurveline key={key} index={key} datalenght={props.cyrclesArr.length} data={point} tripId={props.tripId} />
             )) 
            
        }
    </div>
  )
}

export default Tripboard