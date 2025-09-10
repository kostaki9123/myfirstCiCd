"use client"

import { useLoadScript  } from "@react-google-maps/api";
import LocationInput from "./locationinput";
import type { LoadScriptProps } from "@react-google-maps/api"
import { useState } from "react";


const libraries: LoadScriptProps["libraries"] = ["places"]

type props = {
  inputName : string
  setMapos  : any
  setplaceId  : any
  findplacemodal? : boolean
  placeholder? : string
}

const Places = (props : props) =>  {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API!,
      libraries
    });
  
    if (!isLoaded) return <div className="border-2 border-yellow-400 ">Loading...</div>;
    return <LocationInput defaultValue="" placeholder={props.placeholder} findplacemodal={props.findplacemodal ? true : false } inputName={props.inputName} setMapos={props.setMapos} setplaceId={props.setplaceId}  />

}

export default Places