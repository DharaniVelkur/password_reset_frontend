import Header from "./components/Header";
import Login from "./components/Login";
import {Routes,Route, useNavigate} from 'react-router-dom'
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "./components/ContextProvider/Context";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import PasswordReset from "./components/PasswordReset";
import ForgotPassword from "./components/ForgotPassword";


function App() {
  const {loginData,setLoginData}=useContext(LoginContext)
  let navigate=useNavigate();
  let [data,setData]=useState(false)

  const Dashboardvalid=async ()=>{
      let token=localStorage.getItem('usersdatatoken');
      const res=await fetch('https://password-reset-vgrp.onrender.com/validuser',{
          method:"GET",
          headers:{
              "Access-Control-Allow-Origin": true,
              "Content-Type":"application/json",
              "Authorization":token
          }
      });
     const data= await res.json();
     console.log(data)
  if(data.status===401 ||data.status===400 ||!data){
      console.log("user not valid")
  }else{
      setLoginData(data);
      navigate('/dashboard');
    }
  }
  useEffect(()=>{
    setTimeout(()=>{
      Dashboardvalid();
      setData(true)
    },1500)
  },[])

  return (

    <>
      
      {
        data ? (
          <>
          <Header/>
          <Routes>
          <Route exact path="/" element={<Login/>}></Route>
          <Route exact path="/register" element={<Register/>}></Route>
          <Route exact path="/dashboard" element={<Dashboard/>}></Route>
          <Route exact path="/password-reset" element={<PasswordReset/>}></Route>
          <Route exact path="/forgotpassword/:id/:token" element={<ForgotPassword/>}></Route>
          <Route exact path="*" element={<Error/>}></Route>
         
        </Routes> 
        </>
        ) :(<Box sx={{ display: 'flex', justifyContent:"center", alignItems:"center", height:"100vh" }}>
        Loading...   <CircularProgress />
        </Box>)
        
      }


    </>
  );
}

export default App;
