import React from 'react'
import { Line } from "react-chartjs-2";
import 'chart.js/auto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Cards = (props) =>{
    const options = {
        elements: {
            line: {
                tension: 0.3,
                fill: 'origin'
            }
        },
        pointRadius: '0',
        responsive: true,
        maintainAspectRatio: false,
        legend: {display:false}
      }
  return (
    <div className="card-bg w-100 d-flex flex-column border d-flex flex-column" style={{gridRow:"span 2"}}>
	    <div className="p-3 d-flex flex-column h-100">
			<div className="d-flex align-items-center justify-content-between">
                <div className="m-0 h3 font-weight-bold text-dark">
                    {props.name}
                </div>
                <div className="px-2 bg-grey rounded-circle">
                    <i className="fa fa-heartbeat" aria-hidden="true"></i>
                </div>
			</div>
            <div className="mt-4 d-flex align-items-center justify-content-between">
                <div className='d-flex flex-row'>
                    <FontAwesomeIcon icon={props.icon} size="xl" className='px-2'/> 
                    <div className="m-0 h3 font-weight-bold text-dark">
                        {isNaN(props.average)===true?0:props.average}
                    </div>
                </div>
                <div className="text-right d-flex flex-column justify-content-between">
                    <div className="d-flex align-items-center justify-content-between text-primary"></div>
                        <div className="d-flex align-items-center justify-content-between text-warning">
                        </div>
                </div>
            </div>
            <div className="p-0">
                <Line height={250} data={props.data} options={options} />
            </div>
            <a href='/tables' className="c-p text-dark font-weight-bold text-right mt-3 mb-0">
                More Details
                <i className="fas fa-arrow-right ml-1"></i>
            </a> 
		</div>
	</div>
  )
}
