import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    let navigate=useNavigate();
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [passwordType, setPasswordType] = useState("password")
    const togglePassword = (e) => {
        e.preventDefault();
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }
    const loginUser=async(e)=>{
        e.preventDefault();
        if(email===""&& password===""){
            alert("Empty fields are not allowed!!")
        }else if(email===""){
            alert("Please enter Email")
        }else if(!email.includes("@")){
            alert("Enter valid email")
        }else if(password===""){
            alert("Enter password")
        }else{
            const data=await fetch("http://localhost:8081/login",{
                method:'POST',
                headers:{
                    "Access-Control-Allow-Origin": true,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:email,
                    password:password
                })
            });
           const response=await data.json();
        //    console.log(response);
        if(response.status===200){
            localStorage.setItem('usersdatatoken',response.result.token);
            navigate('/dashboard');
            setEmail("");
            setPassword("")
        }else{
            toast(response.error);
            setEmail("");
            setPassword("")
        }

         
        }
    }
    return (
        <>
            <div className='container d-flex flex-column justify-content-center align-items-center '>
                <h1 className='text-center mt-3 text-danger'>Login Form</h1>
                <form className='mt-5 border-info border p-5' style={{boxShadow:"0 0 10px grey"}}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} aria-describedby="emailHelp" placeholder='Enter email' />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
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
                    <button type="submit" className="btn btn-primary" onClick={loginUser}>Log in</button>
                    <p className="text-center pt-3">Don't have an account?<NavLink to={'/register'}> Sign Up</NavLink></p>
                    <p className="text-center pt-3" style={{fontWeight:"bold"}}>Forgot Password?<NavLink to={'/password-reset'}> Click Here</NavLink></p>

                </form>
                <ToastContainer />
            </div>
        </>
    )
}

export default Login
