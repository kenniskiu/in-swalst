import React, { useEffect,useState } from "react";
import "../Profile.css";
import '../App.css'
import {faTemperature0 } from '@fortawesome/free-solid-svg-icons'
import SideNavigation from '../Navigation'
import io from "socket.io-client";
import { Cards } from "./Cards";
import { Result } from "./Result";

const socket = io.connect("http://localhost:6001");

export const Realtime = () => {
	const [distance,setDistance] = useState([])
	const [time,setTime] = useState([])
	const json = []
	const average = (distance.reduce((a,b)=>a+b,0)/distance.length).toFixed(2)
	useEffect(() => {
		socket.on("send_data", (data) => {
			setDistance([...distance,data.distance])
			setTime([...time,data.Time])
			json.push(data)
		});
	});

  const data = {
    bpm:{
		labels: time,
		datasets: [
		  {
			label: "13 March 2022",
			backgroundColor: "rgba(255, 153, 51, 0.8)",
			borderColor: "rgb(102, 51, 0)",
			data: distance,
		  },
		]
	  },
    chart2:{
      labels: [
        "0.00",
        "2.00",
        "4.00",
        "6.00",
        "8.00",
        "10.00",
        "12.00",
        "14.00",
        "16.00",
        "18.00",
        "20.00",
        "22.00",

      ],
      datasets: [
        {
          label: "13 March 2022",
          backgroundColor: "rgba(0, 153, 51, 0.8)",
          borderColor: "rgb(0, 140, 30)",
          data: [65, 59, 75, 90, 56, 55, 40,80,56,69,68,50,10],
        },
      ]
    },chart3:{
		labels: [
		  "0.00",
		  "2.00",
		  "4.00",
		  "6.00",
		  "8.00",
		  "10.00",
		  "12.00",
		  "14.00",
		  "16.00",
		  "18.00",
		  "20.00",
		  "22.00",
  
		],
		datasets: [
		  {
			label: "13 March 2022",
			backgroundColor: "rgba(10, 15, 51, 0.8)",
			borderColor: "rgb(10, 51, 0)",
			data: [60,70,82,90,60,78,70,81,92,45,75,80],
		  },
		]
	  },
	  chart4:{
		labels: [
		  "0.00",
		  "2.00",
		  "4.00",
		  "6.00",
		  "8.00",
		  "10.00",
		  "12.00",
		  "14.00",
		  "16.00",
		  "18.00",
		  "20.00",
		  "22.00",
  
		],
		datasets: [
		  {
			label: "13 March 2022",
			backgroundColor: "rgba(100, 100, 51, 0.8)",
			borderColor: "rgb(102, 51, 0)",
			data: [65, 59, 31, 81, 56, 55, 40,56,51,61,92,90],
		  },
		]
	  }
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
							<Cards name="Heart Rate" data={data.bpm} average={average} icon={faTemperature0}/>			
							{/* <div className="card-bg w-100 border d-flex flex-column">
								<div className="p-4 d-flex flex-column h-100">
									<div className="d-flex align-items-center justify-content-between">
										<h4 className="m-0 font-weight-bold text-dark">Oxygen Saturation</h4>
										<FontAwesomeIcon icon={faLungs} size="xl"/>
									</div>
									<h4 className="my-4 text-right text-dark h2 font-weight-bold">98 %SPO2</h4>
									<div className="p-0">
										<Line height={250} data={data.chart2} options={options} />
									</div>
									<Link 
									to='/tables/#section1'
									activeClass="active"
									spy={true}
									smooth={true}
									offset={-70}
									duration={500} >
										<p className="c-p text-dark font-weight-bold text-right mt-3 mb-0">
											More Details
											<i className="fas fa-arrow-right ml-1"></i>
										</p>
									</Link>
								</div>
							</div> */}
							{/* <div className="card-bg w-100 d-flex flex-column border d-flex flex-column" style={{gridRow:"span 2"}}>
								<div className="p-3 d-flex flex-column h-100">
								<div className="d-flex align-items-center justify-content-between">
									<h4 className="m-0 h3 font-weight-bold text-dark">Body Temperature</h4>
									<div className="px-2 bg-grey rounded-circle">
										<FontAwesomeIcon icon={faTemperature0} size="xl"/>
									</div>
								</div>
								<div className="mt-4 d-flex align-items-center justify-content-between">
									<div>
									<h4 className="m-0 h1 font-weight-bold text-dark">35 °C</h4>
									</div>
								</div>
								<div className="p-0">
									<Line height={250} data={data.chart3} options ={options}  />
								</div>
								<a href='/tables' className="c-p text-dark font-weight-bold text-right mt-3 mb-0">
									More Details
									<i className="fas fa-arrow-right ml-1"></i>
								</a>
								</div>
							</div> */}
							{/* <div className="card-bg w-100 border d-flex flex-column"  style={{gridRow:"span 1"}}>
										<div className="p-4 d-flex flex-column h-100">
											<div className="d-flex align-items-center justify-content-between">
												<h3 className="m-0 font-weight-bold text-dark mb-3">Perfusion Index</h3>
												<FontAwesomeIcon icon={faDroplet} size="xl"/>
											</div>
											<div>
											<h4 className="m-0 h1 font-weight-bold text-dark">96% PI</h4>
											</div>
											<div className="p-0">
												<Line height={250} data={data.chart4} options={options} />
											</div>
											<p className="c-p text-dark font-weight-bold text-right pt-3 mb-0">
												More Details
												<i className="fas fa-arrow-right ml-1"></i>
											</p>
										</div>
									</div>	 */}
							<Result time={time} distance={distance}/>
						</div>
					</div>
				</div>
        	</div>
      	</div>
    </div>
  );
}
