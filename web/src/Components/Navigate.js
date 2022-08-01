import React,{useRef, useState} from "react";
import './App.css'
import img1 from './assets/maps.png'
import SideNavigation from "./Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobile,faPhoneVolume,faSearch} from "@fortawesome/free-solid-svg-icons";

export const Navigate = () => {
    const [active,setActive] = useState('off')
    function buzzer(){
      if(active==='off'){
        fetch(`http://192.168.100.85/on`)
        .then((response)=>console.log(response),setActive('on'))
      }
      if(active==='on'){
        fetch(`http://192.168.100.85/${active}`)
        .then((response)=>console.log(response),setActive('off'))
      }
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