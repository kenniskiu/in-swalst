import React from 'react'
import { useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';

export default function Logout() {
    let navigate = useNavigate()
    function logout(){
        navigate.push("/");
    }
  return (
    <div>
        <Button variant="dark" onClick={logout}>
            Logout
        </Button>
    </div>
  )
}
