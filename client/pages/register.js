import React, { useState,useEffect,useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Context } from "../context";
import { useRouter } from 'next/router';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router =useRouter();
  const { state, dispatch } = useContext(Context);
  const {user}=state;
  useEffect(()=>{
      if(user!==null)
      router.push("/");
  },[user]);




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
      });
      console.log("register response", data);
     toast('Resgitration succesfull');
     router.push('/login')
    } catch (err) {
      console.log("error here")
      toast.error(err.response.data, {
        style: {
          maxWidth: '400px', // Adjust the maximum width as needed
        },
      });
      // You can handle the error here, e.g., show an error message to the user
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", background: "#000000", color: "#fff", padding: "20px" }}>Register Page</h1>

      <div className="container col-md-4 offset-md-4 pb-4">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-4"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            placeholder="Enter your Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-4 p-4"
            value={password}
            placeholder="Set a password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn btn-block btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
