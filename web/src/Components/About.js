import React from "react";
import 'chart.js/auto';
import "./Profile.css";
import './App.css'
import SideNavigation from './Navigation'

export const About = () => {
  return ( 
    <div className="dashboard d-flex">
        <div>
      	    <SideNavigation></SideNavigation>
        </div>
        <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
            <div className="p-5">
                <div className="h4">
                    In-SWALST
                </div>
                <div className="text-muted">
                    v.0.1
                </div>
            </div>
        </div>
    </div>
  );
}
