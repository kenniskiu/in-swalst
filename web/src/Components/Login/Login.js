import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDroplet, faEye, faHeart, faHeartbeat, faHeartCircleBolt, faPhone, faTemperature0, faWater } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import './Login.css'
import Axios from 'axios' 
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie'
import image from '../assets/grandpa.png'
import Register from './Register'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [eyeSymbol, setEyeSymbol] = useState(faEye)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [active,setActive] = useState(1)
  const [wrongPassword,setWrongPassword] = useState(false)
  const [currentWrongPassword,setCurrentWrongPassword] = useState('')
  const styling = (state) =>{
    const style = active==state?"btn p-1 px-2 text-decoration-underline fw-bolder bg-white rounded":"btn p-1 text-white"
    return style
  }
  let navigate = useNavigate();
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
    if(eyeSymbol == faEye){
      setEyeSymbol(faEyeSlash)
    }
    else if(eyeSymbol == faEyeSlash){
      setEyeSymbol(faEye)
    }
  };
  function handleSubmit(){
    Axios.post('http://localhost:3001/login',{
      username : username,
      password : password
    }).then((response)=>{
      if(response.data.validated == true){
        navigate("/main");
        Cookies.set("userID",response.data.id)
        const date = parseFloat(Date.now())
        Cookies.set("timeLogged",date)
        Cookies.set("validated",true)
      }
      else{
        setCurrentWrongPassword(password)
        setWrongPassword(true)
      }
    })
  }
  
  useEffect(()=>{
		const user = Cookies.get("userID")
		const time = Cookies.get("timeLogged")
		const validated = Cookies.get("validated")
		const duration = Date.now() - time
		if(user&&(duration<10000000)&&validated){
        navigate("/main");
		}else{
			Cookies.remove('userID')
			Cookies.remove('timeLogged')
			Cookies.remove('validated')
		}
	},[])
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-5 p-5">
          <div className=' fw-bolder text-dark h5 mb-4 mt-5 pt-3'>In-SWALST</div>
          <div className='pt-3 fw-bolder text-dark h4 mb-4'>IoT-Based Smart Walking Stick</div>
          <small className='text-muted'>Welcome! Enter your credentials to log in.</small>
          <div className="mt-4">
            <input type="text" onChange={(e)=>setUsername(e.target.value)} 
              className="form-control ms-1 mb-1" 
              placeholder="Username"/>
            <div className="input-group ms-1">
              <input type={passwordShown ? "text" : "password"} onChange={(e)=>setPassword(e.target.value)} className="form-control"
                placeholder="Password" id="password"/>
              <button className="btn btn-outline-secondary" type="button" onClick={togglePassword}>
                <FontAwesomeIcon icon={eyeSymbol} />
              </button>
            </div>
            {wrongPassword==true && currentWrongPassword==password?
              <label htmlFor='password' className='tinyFont m-0 p-0 ms-2 text-danger'>
                Incorrect Password or Username
              </label>
              :
              ""
            }
            <div className='small ms-4 text-muted mt-2'>
              Sign in as
            </div>
            <div className='flex-row d-flex small'>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                  <label className="form-check-label me-3" htmlFor="flexRadioDefault1">
                    Patient
                  </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Medical Personnel
                </label>
              </div>
              <a href='' className='ms-auto small text-dark'>
                <div>Forgot password</div>
              </a>
            </div>
            <div className='flex-row d-flex'>
              <button className="ms-1 mt-3 btn btn-outline-secondary shadow-lg bg-primary text-white" onClick={handleSubmit}>
                Login
              </button>
              <button  type="button" className="btn btn-primary mx-4 mt-3 btn btn-outline-primary shadow-lg bg-white text-primary" data-toggle="modal" data-target="#exampleModalCenter">
                Sign Up   
              </button>
              <Register/>
              <ToastContainer />
            </div>
          </div>
        </div>
        <div className="col-sm-7 bg-primary text-white min-vh-100 rounded-xl container-fluid p-5 text-center">
          <div className='pt-5 d-flex flex-row justify-content-evenly'>
              <div className={styling(1)} onClick={()=>setActive(1)}>
                  Home
              </div>
              <div className={styling(2)} onClick={()=>setActive(2)}>
                  About
              </div>
              <div className={styling(3)} onClick={()=>setActive(3)}>
                  Contact
              </div>
            </div>
          {active==1 && 
            <div>
             <img className="img-fluid mt-5 image" src={image}></img>
            </div>
          }
          {active==2 && 
            <div className='mt-5'>
              <span className='fw-bold'>In-Swalst</span> is a health stick that measures someones:
              <div className='contiainer-sm'>
                <div className='mt-3'>
                  - 
                  <FontAwesomeIcon icon={faHeartbeat} size="xl" color='pink' className='px-3'/>
                  Heartbeat
                </div>
                <div className='mt-3'>
                  - 
                  <FontAwesomeIcon icon={faTemperature0} size="xl" color='orange' className='px-4'/>
                  Temperature
                </div>
                <div className='mt-3  '>
                  - 
                  <FontAwesomeIcon icon={faHeartCircleBolt} size="xl" color='#ff5260' className='px-4'/>
                  Perfusion Index 
                </div>
                <div className='mt-3  '>
                  - 
                  <FontAwesomeIcon icon={faDroplet} size="xl" color='red' className='px-4'/>
                  Oxygen Saturation
                </div>
              </div>
            </div>
          }
          {active==3 && 
             <div className='mt-5 d-flex flex-row justify-content-center'>
              <FontAwesomeIcon icon={faPhone} size="xl" color='black' className='px-4'/>
              Whatsapp
              <div className='px-4 '>
              <div className='fw-bold'>
                083889103981
              </div>
              </div>      
            </div>
          }
          </div>
      </div>
    </div>
  )
}
