import { useState,useContext,useEffect } from "react";
import axios from "axios";
import {toast} from 'react-toastify'
 
import { Context } from "../context";
import { useRouter } from "next/router";

const ForgotPassword = () => {
 
    const[email,setEmail]=useState('')
    const[success,setSuccess]=useState(false);
    const[newpassword,setNewPassword]=useState('')
    const[code,setCode]=useState('')


    
    const {state: {user}}=useContext(Context)


    const router =useRouter()

    useEffect(()=>{
        if(user!==null)
        router.push("/")
    },[user])

    const handleSubmit =async(e)=>
    {
        e.preventDefault()
        try{
                   const {data}=await axios.post("/api/forgot-password",{email});
    setSuccess(true);
             toast("check email for secret code")
        }
        catch(err)
        {
            toast(err.response.data)
        }
    };


const handleResetPassword =async(e)=>{
    e.preventDefault()
console.log(email,code);
    try{
        const{data}=await axios.post('/api/reset-password',
        {
            email,code,newpassword,
        });
        router.push('/login');
    }
    catch(err)
    {
        toast(err.response.data);
    }
}


    return (

      <>
            <h1 style={{ textAlign: "center", background: "#000000", color: "#fff", padding: "20px" }}>
        ForgotPassword
      </h1>

      <div className="container col-md-4 offset-md-4 pb-4">
        <form onSubmit={success?handleResetPassword:handleSubmit}>
          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            placeholder="Enter your Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />

        {success && (<> 
        
        <input
            type="text"
            className="form-control mb-4 p-4"
            value={code}
            placeholder="Enter your code"
            onChange={(e) => setCode(e.target.value)}
          />
            <input
            type="password"
            className="form-control mb-4 p-4"
            value={newpassword}
            placeholder="Enter your new password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          </>
        )
        }
          <button
            type="submit"
            className="btn btn-block btn-primary"
            
          >
            submit
          </button>
     </form>
      </div>
      </>

    )

}

export default ForgotPassword 
