import React,{useEffect, useState} from "react";
import './App.css'
import img1 from './assets/maps.png'
import SideNavigation from "./Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobile,faPhoneVolume,faSearch} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export const Navigate = () => {
    async function stateInitial(){
      const response = await axios.get("http://localhost:3001/getState/buzzer")
      const state = response.data
      console.log(state)
      if(state===0){
        setState(false)
      }
      else if(state===1){
        setState(true)
      }
      else{
        console.log("Error occured")
      }
    }
    const [state,setState] = useState()
    useEffect(()=>{
      stateInitial()
      console.log(state,"State")
    },[])
    async function buzzer(){
      const res = await axios.put("http://localhost:3001/changeState",{
        outputName : "buzzer",
        state : !state
      }).then(setState(!state))
      console.log(res)
    }   
  return (
    <div className="d-flex">
      <div>
        <SideNavigation></SideNavigation>
      </div>
      <div style={
        { backgroundImage: `url(${img1})`,
          minHeight:"100vh",
        width:"100%"}
        }>
        <div className="p-5">     
          <div className="btn btn-secondary px-2">
            <FontAwesomeIcon icon={faSearch}/>
          </div>
          
        <div>
            <div className="mt-3 btn btn-secondary px-2" onClick={buzzer} >
                <FontAwesomeIcon icon={faMobile}/>
            </div>
        </div>
        <div>
            <div className="mt-3 btn btn-secondary px-2">
            <FontAwesomeIcon icon={faPhoneVolume}/>
            </div>
        </div>
      </div>
      </div>
    </div>
    
  );
};

  // async function test2(){
  //   const check = await fetch(`https://sgp1.blynk.cloud/external/api/get?token=EXD095toTuWpjiJFL3B7AphxLyNt_xj8&v6`)
  //   .then((response)=>console.log(response))
  //   console.log(check)
  // }
  // async function test3(){
  //   const check = await fetch(`https://sgp1.blynk.cloud/external/api/isHardwareConnected?token=EXD095toTuWpjiJFL3B7AphxLyNt_xj8`)
  //   .then((response)=>console.log(response))
  //   console.log(check,"adsa")
  // }