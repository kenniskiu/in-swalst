import React,{useEffect, useState} from "react";
import {
  CDBContainer,
  CDBCard,
  CDBCardBody,
  CDBDataTable
} from "cdbreact";
import SideNavigation from "./Navigation";
import Cookies from "js-cookie";

const axios = require('axios')

export const Tables = (props) => {
  const id = Cookies.get("userID")
  const [result,setResult] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:3001/history/${id}`)
    .then((response)=>{
      setResult(response.data)
    })
  }, [])
  const data = () => {
    return {
      columns: [
        {
          label: 'id',
          field: 'id',
          width: 150,
          attributes: {
            'aria-controls': 'DataTable',
            'aria-label': 'Name',
          },
        },
        {
          label: 'range',
          field: 'range',
          width: 270,
        }
      ],
      rows: result
    };
  };
  return (
    <div className="d-flex">
      <div>
        <SideNavigation/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
        <div style={{height:"100%"}}>
          <div style={{padding:"20px 5%",height:"calc(100% - 64px)",overflowY:"scroll"}} className="text-center">
              <CDBContainer>
                <CDBCard>
                  <CDBCardBody>
                    <CDBDataTable
                      striped
                      bordered
                      hover
                      scrollX
                      scrollY
                      maxHeight="300px"
                      data = {data()}
                      materialSearch
                      fullPagination
                    />
                  </CDBCardBody>
                </CDBCard>
            </CDBContainer>
            </div>
          </div>
        </div>
      </div>  
  );
};

// import React from 'react'
// import {
//     CDBContainer,
//     CDBCard,
//     CDBCardBody,
//     CDBDataTable
//   } from "cdbreact";
// export const Result = (props) =>{
//     return (
        // <CDBContainer>
        //   <CDBCard>
        //     <CDBCardBody>
        //       <CDBDataTable
        //         striped
        //         bordered
        //         hover
        //         scrollX
        //         scrollY
        //         maxHeight="300xp"
        //         data={props.result}
        //         materialSearch
        //         fullPagination
        //       />
        //     </CDBCardBody>
        //   </CDBCard>
        // </CDBContainer>
//       );
// }
