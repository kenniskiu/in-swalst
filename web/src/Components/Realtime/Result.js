import React from 'react'
import {
    CDBTable,
    CDBTableHeader,
    CDBTableBody
  } from "cdbreact";

export const Result = (props) =>{
    const distance = props.distance
    const time = props.time
  return(
    <div className="card-bg w-100 d-flex flex-column wide border d-flex flex-column "style={{gridColumn:"span 2"}}>
            <div className="d-flex flex-column p-0 h-100">
                <div className="mx-4 mt-3 d-flex justify-content-between align-items-center">
                    <div className="font-weight-bold text-dark h3">Review</div>
                    <div className="p-1 bg-grey rounded-circle"><i className="fas fa-sticky-note"></i></div>
                </div>
                <CDBTable hover responsive>
                    <CDBTableHeader>
                        <tr className="text-center">
                            <th className="text-center">Time</th>
                            <th className="text-center">Heart Rate (BPM)</th>
                            <th className="text-center">Oxygen Saturation (%SPO2)</th>
                            <th className="text-center">Body Temperature (°Celcius)</th>
                            <th className="text-center">Perfusion Index (%PI)</th>
                        </tr>
                    </CDBTableHeader>
                    <CDBTableBody>
                        {distance.slice(0).reverse().filter((distance,index)=>index<5).map((test,index)=>(
                            <tr className="text-center" key={index}>
                                <th className="text-center">{time[time.length-1-index]}</th>
                                <th className="text-center">{distance[distance.length-1-index]}</th>
                                <th className="text-center"></th>
                                <th className="text-center">Body Temperature (°Celcius)</th>
                                <th className="text-center">Perfusion Index (%PI)</th>
                            </tr>
                        ))}
                    </CDBTableBody>
                </CDBTable>
                <p className="c-p text-dark font-weight-bold text-right mt-auto ms-3">
                    See More
                    <i className="fas fa-arrow-right ml-1"></i>
                </p>
            </div>
        </div>
  )
}
