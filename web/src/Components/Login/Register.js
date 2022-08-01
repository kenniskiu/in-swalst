import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [name,setName] = useState('') 
    const [nickname,setNickname] = useState('')
    const [citizenship,setCitizenship] = useState('')
    const [birthdate,setBirthdate] = useState('')
    const [role,setRole] = useState('')
    const [userName,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [disabled,setDisabled] = useState(true)
    const [valid,setValid] = useState('form-control')
    const [validFeedBack,setValidFeedBack] = useState('valid-feedback')
    function checkDisable(){
        if((name!=[]&&password!=[]&&citizenship!=[]&&birthdate!=[]&&role!=[]&&userName!=[]&&email!=[]&&phoneNumber!=[])==true){
            setDisabled(false)
        }
        else{
            setDisabled(true)
        }
    }
    async function checkUsername(name){
        setUsername(name)
        if(name.length>0){
            const response = await axios.get(`http://localhost:3001/availableUsername/${name}`)
            if(response.data.valid==true){
                setValid("form-control is-valid")
                setValidFeedBack("valid-feedback")
            }
            else{
                setValid("form-control is-invalid")
                setValidFeedBack("invalid-feedback")
            }
        }
        else if(name.length===0){
            setValid("form-control")
        }
        
    }
    function register(){
        axios.post("http://localhost:3001/register",{
            userName : userName,
            password : password,
            email : email,
            phoneNumber : phoneNumber,
            name : name, 
            nickname : nickname,
            citizenship : citizenship,
            birthdate : birthdate,
            role : role, 
        }).then((response)=>{
            if(response.error==true){
                toast.success("Something went wrong")
            }
            else{
                toast.success("You have been registered")
            }
        })
    }
    useEffect(()=>{
        checkDisable()
    })
    return (
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Register</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body container px-5">
                        <div className='row'>
                            <div className='col-8'>
                                <div className="mb-3">
                                    <label htmlFor="validationServer01" className="form-label">Full name</label>
                                    <input type="text" className="form-control"  
                                    onChange={(e)=>{setName(e.target.value)}}/>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className="mb-3">
                                    <label htmlFor="floatingInput">Nickname</label>
                                    <input type="text" className="form-control"  
                                    onChange={(e)=>{setNickname(e.target.value)}}/>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <div className="mb-3">
                                    <label htmlFor="floatingInput">Citizenship</label>
                                    <input type="email" className="form-control" 
                                    onChange={(e)=>{setCitizenship(e.target.value)}}/>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="mb-3">
                                    <label htmlFor="floatingInput">Birthdate</label>
                                    <input type="date" className="form-control"  
                                    onChange={(e)=>{setBirthdate(e.target.value)}}/>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className="mb-3">
                                    <label htmlFor="floatingInput">UserName</label>
                                    <input type="text" className={valid} 
                                    onChange={(e)=>checkUsername(e.target.value)}/>
                                    <div className={validFeedBack}>
                                        {validFeedBack==='valid-feedback'?"Username available":"Username taken"}
                                    </div>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label htmlFor="floatingInput">Password</label>
                                    <input type="password" className="form-control" 
                                     onChange={(e)=>{setPassword(e.target.value)}}/>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-7'>
                                <div className="mb-3">
                                    <label htmlFor="floatingInput">Email</label>
                                    <input type="email" className="form-control"  placeholder="name@example.com"
                                     onChange={(e)=>{setEmail(e.target.value)}}/>
                                </div>
                            </div>
                            <div className='col-5'>
                                <div className="mb-3">
                                    <label htmlFor="floatingInput">Phone Number</label>
                                    <input type="" className="form-control" 
                                     onChange={(e)=>{setPhoneNumber(e.target.value)}}/>
                                </div>
                            </div>
                        </div>
                        <div className='text-center mb-3'>
                            Role
                        </div>
                        <div className='flex-row d-flex small justify-content-evenly'>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault4"
                            onClick={()=>{setRole('patient')}}/>
                            <label className="form-check-label me-3" htmlFor="flexRadioDefault4">
                                Patient
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault3"
                            onClick={()=>{setRole('doctor')}}/>
                            <label className="form-check-label" htmlFor="flexRadioDefault3">
                                Doctor
                            </label>
                        </div>
                       </div> 
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" 
                        disabled={disabled} data-dismiss="modal" onClick={register}>Save changes</button>   
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
  )
}
