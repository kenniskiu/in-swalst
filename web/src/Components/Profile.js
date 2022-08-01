import React,{useState,useEffect} from "react";
import 'chart.js/auto';
import "./Profile.css";
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faFloppyDisk, faWrench,} from '@fortawesome/free-solid-svg-icons'
import SideNavigation from './Navigation'
import img1 from "./assets/person.jpg"
import Cookies from 'js-cookie'
import axios from "axios";

export const Profile = () => {
	const [userData,setUserData] = useState('')
	const [updateMode,setUpdateMode] = useState(false)
	async function getUserData(){
		const id = Cookies.get("userID")
		const response = await axios.get(`http://localhost:3001/getUserID/${id}`)
		setUserData(response.data.data)
	}
	useEffect(()=>{
		getUserData()
	},[])
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
										Profile
									</h2>
	                                <div className="btn px-2 bg-grey rounded me-4 btn-secondary"
										onClick={()=>setUpdateMode(!updateMode)}>
										<FontAwesomeIcon icon={faWrench}/>
						        	</div>
	                        	</div>
							<div className="container-fluid">
								<div className="row">
									<div className="col-4">
										<img src={img1} className="img-fluid rounded w-100"></img>
										<div className="text-center">
											<span className="text-decoration-underline">Change profile picture </span> 
											<FontAwesomeIcon icon={faCamera}/>
										</div>
									</div>
									<div className="col-8">
										<div className="fw-bold h6">
											Name
										</div>
										<hr></hr>
										{updateMode==false?
											<div className="">
												{userData.name}
											</div>:
											<input placeholder={userData.name} className="form-control"/>
										}
										<div className="fw-bold h6 mt-5">
											Nickname
										</div>
										<hr></hr>
										{updateMode==false?
											<div className="">
												{userData.nickname}
											</div>:
											<input placeholder={userData.nickname} className="form-control"/>
										}
										<div className="fw-bold h6 mt-5">
											CitizenShip
										</div>
										<hr></hr>
										{updateMode==false?
											<div className="mt">
												{userData.citizenShip}
											</div>:
											<input placeholder={userData.citizenShip} className="form-control"/>
										}
										<div className="fw-bold h6 mt-5">
											Birthdate
										</div>
										<hr></hr>
										{updateMode==false?
											<div className="mt">
												{userData.birthDate}
											</div>:
											<input placeholder={userData.birthDate} 
											className="form-control"
											type="date"/>
										}
										<div className="fw-bold h6 mt-5">
											User ID
										</div>
										<hr></hr>
										<div className="mb-5">
											{userData.id}
										</div>
										<div className="fw-bold h6 mt-5">
											Email
										</div>
										<hr></hr>
										{updateMode==false?
											<div className="mt">
												{userData.email}
											</div>:
											<input placeholder={userData.email} 
											className="form-control"
											type="email"/>
										}
										<div className="fw-bold h6 mt-5">
											Phone Number
										</div>
										<hr></hr>
										{updateMode===false?
											<div className="mt">
												{userData.phoneNumber}
											</div>:
											<input placeholder={userData.phoneNumber} 
											className="form-control"
											type="phone	"/>
										}
									</div>
								</div>
								<div className="text-end mt-5">
								{updateMode==false?
											<div className="mt-5">
												""
											</div>:
											<div>
												<div className="btn mt-3 btn-secondary rounded me-4" onClick={()=>setUpdateMode(false)}>
													Cancel
												</div>
												<div className="btn mt-3 btn-warning rounded">
													<FontAwesomeIcon icon={faFloppyDisk} className="pe-2	"/>
													Saved
												</div>
											</div>
										}
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
