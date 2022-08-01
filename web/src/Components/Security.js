import React from "react";
import 'chart.js/auto';
import "./Profile.css";
import './App.css'
import SideNavigation from './Navigation'
import Button from "react-bootstrap/esm/Button";
import image from './assets/windows.jpg'
import image1 from './assets/phone.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export const Security = () => {
  return ( 
    <div className="dashboard d-flex">
        <div>
      	    <SideNavigation></SideNavigation>
        </div>
        <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
        <div style={{height:"100%"}}>
	        <div style={{height:"calc(100% - 64px)", overflowY:"scroll"}}>
	        	<div className="d-flex card-section">
		        	<div className="cards-container">
                        <div className="card-bg w-100 d-flex flex-column border d-flex flex-column" style={{gridColumn:"span 2"}}>
	                        <div className="p-3 d-flex flex-column h-100">
	                            <div className="d-flex align-items-center justify-content-between">
	                                <h2 className="m-0 py-4 ms-5 font-weight-bold text-dark text-decoration-underline">
										Security
									</h2>
	                            </div>
                                <div className="px-5 pt-4 w-75">
                                    <h5>Change Password</h5>
                                    <hr className="w-25"/>
                                    <div className="ms-2">
                                        Current Password
                                    </div>
                                    <input class="form-control mt-2 mb-3" type="text" placeholder="Current Password" aria-label="default input example"/>
                                    <div className="ms-2">
                                        New Password
                                    </div>
                                    <input class="form-control mt-2 mb-3" type="text" placeholder="New Password" aria-label="default input example"/>
                                    <div className="ms-2">
                                        Confirm New Password
                                    </div>
                                    <input class="form-control my-3" type="text" placeholder="Confirm New Password" aria-label="default input example"/>
                                    <div className="text-end">
                                        <Button variant="secondary"> Change Password </Button>
                                    </div>
                                </div>
                                <div className="px-5 pt-4 w-75">
                                    <h5>Connected Device</h5>
                                    <hr className="w-25"/>
                                    <div className="d-flex flex-row">
                                    <img classname="img-fluid rounded imageOption" src={image} alt="">
                                    </img>
                                    <div className="d-flex flex-column p-2">
                                        <div className="small">
                                            Windows 10
                                        </div>
                                        <div className="small">
                                            Indonesia
                                        </div>
                                        <div className="small">
                                            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> This device
                                        </div>
                                    </div>
                                    </div>
                                    <div className="d-flex flex-row">
                                        <img classname="img-fluid rounded imageOption" src={image1} alt="">
                                        </img>
                                        <div className="d-flex flex-column p-2">
                                            <div className="small mt-3">
                                                Redmi
                                            </div>
                                            <div className="small">
                                                Indonesia - 22:48 PM
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                    <div className="text-end">
                                        <button className="btn btn-outline-secondary  btn-secondary">
                                            <div className="h6 text-decorator-underline text-white">
                                                Manage Device
                                            </div>
                                        </button>
                                    </div>
                                </div>
	                        </div>
	                    </div>
	            	</div>
	            </div>
	        </div>
        </div>
      </div>
    </div>
  );
}
