import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    let [name, setName] = useState("")
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [cpassword, setCpassword] = useState("")
    let [passwordType, setPasswordType] = useState("password")
    const togglePassword = (e) => {
        e.preventDefault();
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    const addUserData=async (e)=>{
        e.preventDefault();

        if(name===""&&email===""&&password===""&&cpassword===""){
            alert('Empty fields are not allowed!!!')
        }
        else if(name===""){
            alert("Please enter your Name");
        }else if(email===""){
            alert("Please enter your email");
        }else if(!email.includes("@")){
            alert("Enter valid email")
        }
        else if(password===""){
            alert("Please enter your Password")
        }else if(cpassword==="") {
            alert("Please enter confirm password")
        }else if(password!==cpassword){
            alert("password doesn't match")
        }else{
            const data=await fetch("https://password-reset-vgrp.onrender.com/register",{
                method:'POST',
                headers:{
                    "Access-Control-Allow-Origin": true,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name:name,
                    email:email,
                    password:password,
                    cpassword:cpassword
                })
            });
            const response=await data.json();
            console.log(response)
            if(response.status===200){
                toast("user registration done");
                setName("");
                setEmail("");
                setPassword("");
                setCpassword("")
            }else{
                toast("user already exists!!")
                setName("");
                setPassword("");
                setCpassword("");
                setEmail("")
            }
        }
  
    }
    return (
        <>
            <div className='container d-flex flex-column justify-content-center align-items-center '>
                <h1 className='text-center mt-2 text-danger'>Sign Up</h1>
                <form className='mt-4 border-info border p-5' style={{boxShadow:"0 0 10px grey"}}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={e => setName(e.target.value)} placeholder='Enter Name' />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} aria-describedby="emailHelp" placeholder='Enter email' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group ">
                            <input type={passwordType} className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder='Enter password' id="password" />
                            <div className="input-group-btn">
                                <button className="btn btn-outline-secondary" onClick={togglePassword}>
                                    {passwordType === "password" ? <i className="fa-solid fa-eye-slash text-black"></i> : <i className="fa-solid fa-eye text-black  "></i>}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" value={cpassword} onChange={e => setCpassword(e.target.value)} placeholder='Confirm password' id="cpassword" />
                    </div>
                    <div className='text-center'> 
                        <button type="submit" className="btn btn-primary" onClick={addUserData}>Sign Up</button>
                        <p>Already have an account?<NavLink to={'/'}> Log In</NavLink></p>
                    </div>
                </form>
                <ToastContainer/>
            </div>
        </>
    )
}
export default Register
