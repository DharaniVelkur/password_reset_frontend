import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasswordReset = () => {
    let [email,setEmail]=useState("");
    let [message,setMessage]=useState(false)
    const sendLink= async(e)=>{
        e.preventDefault( );
        const res=await fetch('http://localhost:8081/sendpasswordlink',{
          method:'POST',
          headers:{
            "Access-Control-Allow-Origin": true,
            "Content-Type":"application/json"
          },
          body:JSON.stringify({email:email})
        })
          let data=await res.json();
          console.log(data);
          if(data.status===200){
            setEmail("");
            setMessage(true);
          }else{
            toast("invalid user")
          }
 
    }

   

  return (
    <>
      <div className='container d-flex flex-column justify-content-center align-items-center '>
               
                <form className='mt-5 border-info border p-5' style={{ boxShadow: "0 0 8px grey" }} >
                <h2 className='text-center pb-2'>Enter Your Email Address</h2>
                {message?(<p className='text-success' style={{"fontWeight":"bold"}}>Resent Link sent successfully in Your email</p>):""}
                    <div className="mb-3">
                        <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} aria-describedby="emailHelp" placeholder='Enter email' />
                    </div>
                   
                    <button type="submit" className="btn btn-primary" onClick={sendLink}>Send </button>

                </form>
                <ToastContainer/>
            </div>
    </>
  )
}

export default PasswordReset;