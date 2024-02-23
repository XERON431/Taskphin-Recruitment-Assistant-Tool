import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { Context } from "../context";
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { state, dispatch } = useContext(Context);
  const router = useRouter();
  const { user } = state;

  useEffect(() => {
    if (user !== null) {
      router.push("/user");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });

      dispatch({
        type: "LOGIN",
        payload: data,
      });

      const LOCAL_STORAGE_KEY = 'user';
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));

      // Redirect
      router.push("/user");

    } catch (err) {
      console.error('Error in login:', err);
    
      const errorResponse = err.response;
      const errorMessage = errorResponse?.data || 'An error occurred during login.';
    
      toast.error(errorMessage, {
        style: {
          maxWidth: '400px',
        },
      });
    } finally {
      setLoading(false);
    }
    
  }

  return (
    <>
      <h1 style={{ textAlign: "center", background: "#000000", color: "#fff", padding: "20px" }}>Login Page</h1>

      <div className="container col-md-4 offset-md-4 pb-4">
        <form onSubmit={handleSubmit}>
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

          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        <p className="text-center p-3">
          Not yet registered?{' '}
          <Link href="/register">Register</Link>
        </p>
        <p className="text-center p-3">
          Forgot password{' '}
          <Link href="/forgot-password">Forgot Password</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
