import './App.css';
import { useEffect, useState } from 'react';
import React from "react";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import { Login } from "./Components/Login/Login";
import { Tables } from './Components/Tables';
import { Main } from './Components/Main';
import { Profile } from './Components/Profile';
import { Security } from './Components/Security';
import { About } from './Components/About';
import { Navigate } from './Components/Navigate';
import { Realtime } from './Components/Realtime/Realtime';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path="/tables" element={<Tables/>}/>
        <Route path="/navigate" element={<Navigate/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/security" element={<Security/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/realTime" element={<Realtime/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
