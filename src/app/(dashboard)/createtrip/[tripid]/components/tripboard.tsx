import React from 'react'
import Point from './point'
import Addnewcyrcle from './addnewcyrcle'
import Movingbox from './movingbox'

type props = {
    tripId : string
    cyrclesArr : any
  }

const Tripboard = (props : props) => {
  return (
    <div style={{minHeight: "256px" ,display: "grid",gridTemplateRows : "49px 69px" ,gridTemplateColumns: `70px repeat(${props.cyrclesArr?.length + 1}, 132px)`, backgroundColor: "grey", width: "100%", height:"43%", border : "2px solid red", overflowX : "auto" , overflowY : "hidden"}}    >
       {
             props.cyrclesArr?.length === 0 
             ? <Addnewcyrcle index={0} tripId={props.tripId} cyrcleArrId={undefined} /> 
             :
             props.cyrclesArr?.map(( point: any , key:number ) => (
             point.role === "POINT" 
             ? <Point key={key} index={key} datalenght={props.cyrclesArr.length} data={point} tripId={props.tripId} />
             : <Movingbox key={key} index={key} datalenght={props.cyrclesArr.length} data={point} tripId={props.tripId} />
             )) 
            
      }
    </div>
  )
}

export default Tripboard