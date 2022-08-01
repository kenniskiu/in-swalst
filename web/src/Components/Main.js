import React, { useState,useEffect } from "react";
import { faSun,faBattery,faLocation, faWifi, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import 'chart.js/auto';
import "./Profile.css";
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SideNavigation from './Navigation'
import { Line } from "react-chartjs-2";
import img1 from './assets/maps.png'
import io from "socket.io-client";
import axios from 'axios'
import Cookies from 'js-cookie'

const socket = io.connect("http://localhost:6001");

export const Main = () => {
  const [wifi,setWifi] = useState("")
  const [latitude,setLatitude] = useState('')
  const [longitude,setLongitude] = useState('')
  const [city,setCity] = useState('')
  const [country,setCountry] = useState('')
  const [clockState,setClockState] = useState()
  const [time,setTime] = useState('')
  const [userData,setUserData] = useState('')
  useEffect(() => {
		socket.on("send_wifi", (data) => {
			setWifi(data)
		});
    timeOfDay()
    navigator.geolocation.getCurrentPosition((position)=>{
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    })
    setInterval(()=>{
      const date = new Date()
      setClockState(date.toLocaleTimeString())
    },100)
    getUserData()
	},[]);

  async function getUserData(){
    const id = Cookies.get("userID")
    const response = await axios.get(`http://localhost:3001/getUserID/${id}`)
    setUserData(response.data.data)
    console.log(response)
  }
  const API_endpoint = 'https://api.openweathermap.org/data/2.5/weather?'
  const API_KEY = 'c5a48b3e59d242aedae7b2fb0b9ad0e4'
  axios.get(`${API_endpoint}lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${API_KEY}`)
  .then((response)=>{
    setCity(response.data.name)
    setCountry(response.data.sys.country)
  })
  let today = new Date()
  let day = `${today.getDate()<10?"0":""}${today.getDate()}`
  let month = `${today.getMonth()<10?"0":""}${today.getMonth()+1}`
  let year = `${today.getFullYear()<10?"0":""}${today.getFullYear()}`
  var currentHour = today.getHours();
  function timeOfDay(){
    if (currentHour < 12)
        setTime('Good Morning')
    else if(currentHour == 12)
        setTime('Good Noon')
    else if (currentHour >= 12 && currentHour <= 17)
        setTime('Good Afternoon')
    else if (currentHour >= 17 && currentHour <= 24)
        setTime('Good Evening')
  }
    const data = {
        chart2:{
          labels: [
            "0.00",
            "2.00",
            "4.00",
            "6.00",
            "8.00",
          ],
          datasets: [
            {
              label: "Today",
              backgroundColor: "rgba(0, 153, 0, 0.6)",
              borderColor: "rgb(0, 153, 0)",
              data: [100,98,95,93,86,70],
              fill: 'origin',
            }
          ]
        }
      }
      const options = {
        elements: {
            line: {
                tension: 0.3
            }
        },
        pointRadius: '0',
        responsive: true,
        maintainAspectRatio: false,
        legend: {display:false}
      }
      
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
	            		<div className="card-bg w-100 border d-flex flex-column">
	                		<div className="p-4 d-flex flex-column h-100">
                                <div className="d-flex flex-row justify-content-between">
                                    <h4 className="my-4 text-right text-dark h2 font-weight-bold">
                                      {time}
                                    </h4>
                                    <FontAwesomeIcon icon={faSun} size="xl" color="orange"/>
                                </div>
                                <h5>
                                    {userData.nickname}
                                </h5>
                                <div className="h6">
                                    {((isNaN(clockState||city||country)))==true?
                                    <div>
                                      {clockState} {city}, {country=='ID'?"Indonesia":"Undetected"}
                                    </div>:
                                    <div className="spinner-border" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                    </div>}
                                <div className="small text-muted text-end mt-5">
                                    {day}/{month}/{year}
                                </div>
                              </div>
	                		</div>
	              		</div>
                          <div className="card-bg w-100 border d-flex flex-column" style={{gridRow:"span 2"}}>
	                		<div className="p-4 d-flex flex-column h-100">
                                <div className="d-flex flex-row justify-content-between">
                                    <h4 className="my-4 text-right text-dark h2 font-weight-bold">Battery Usage</h4>
                                    <FontAwesomeIcon icon={faBattery} size="xl" color="green"/>
                                </div>
                                <div className="p-0">
	                                <Line height={250} data={data.chart2} options={options} />
	                            </div>
                              <div className="d-flex flex-row justify-content-between mt-5">
                                    <h4 className="mt-4 text-right text-dark h2 font-weight-bold">Bluetooth/Wifi Status</h4>
                                    <FontAwesomeIcon className="mt-4" icon={faWifi} size="xl" color="black"/>
                                </div>
                                <div className="h4 mt-4">
                                    Wifi Connection:
                                </div>
                                <div className="h6">
                                    {wifi.length!=0?
                                      <div>Connected to 
                                        <span className="fw-bolder text-decoration-underline px-1">
                                           {wifi}
                                        </span>
                                      </div>
                                      :"Currently not connected."}
                                </div>
                                <div className="h4 mt-5">
                                    Bluetooth Connection:
                                </div>
                                <div className="h6">
                                    Connected to ASUS
                                </div>
                                <div className="mt-5 pt-4 text-end fw-bolder">
                                    <div>
                                        <a href='manage' className="text-dark text-decoration-underline">
                                            <div className="me-3">
                                                Manage Connections
                                            <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                                            </div>
                                        </a>
                                    </div>
                                </div>
	                		</div>  
	              		</div>
                          <div className="card-bg w-100 border d-flex flex-column" style={{gridRow:"span 1"}}>
	                		      <div className="p-4 d-flex flex-column h-100">
                                <div className="d-flex flex-row justify-content-between">
                                    <h4 className="my-4 text-right text-dark h2 font-weight-bold">Location</h4>
                                    <FontAwesomeIcon icon={faLocation} size="xl" color="red"/>
                                </div>
                                <img className="rounded img-fluid" src={img1}></img>
                                <div className="pt-4">
                                    The stick is currently in
                                </div>
                                <div className="pt-2 fw-bolder">
                                    Jln.Pluit Karang Molek XVI/No.19, Jakarta
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
