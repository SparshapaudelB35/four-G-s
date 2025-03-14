import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../css/adminlogin.css'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function Adminlogin() {
    const [show,setShow] = useState(false)
    console.log(show)
  
  
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
  
    const onSubmit = async (data) => {
      try {
        console.log("Sending login request with data:", data);
  
        const response = await Axios.post("http://localhost:4000/api/auth/login", {
          email: data.email,
          password: data.password,
        });
  
        console.log("Response received:", response.data);
  
        if (response.status === 200) {
          const token = response.data.data?.access_token; 
          if (!token) {
            setMessage("Error: Token not found in response.");
            console.error("Token not found in response:", response.data);
            return;
          }
          console.log("Token received from server:", token); 
          localStorage.setItem("token", token); 
          console.log("Token saved in localStorage:", localStorage.getItem("token")); 
          setMessage("Login successful!");
          alert("Login successful!");
          navigate("/admintourcrud");
        }
      } catch (error) {
        if (error.response) {
          setMessage(`Error: ${error.response?.data?.message || 'Please try again later.'}`);
        } else if (error.request) {
          setMessage("No response from server. Please try again later.");
        } else {
          setMessage("An unexpected error occurred. Please try again.");
        }
        console.error("Error:", error.response?.data || error.message);
      }
    };
  
    return (
      <div className="Container">
        <img src="/Image/tour3.jpg" alt="Tour Background" />
        <div className="Header">
          <div className="imagecontainer">
            <img src="./Image/logo3.png" alt="logo" />
          </div>
          <div className="home">
            <Link to="/"><img src="/Image/home.jpg" alt="home" /></Link>
          </div>
        </div>
        <div className="Form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>ADMIN LOGIN</h1>
            <div>
              <input
                id="email"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
            </div>
            <div>
              <input
                id="password"
                type={show ? 'text' : 'password'}
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              <botton onClick={() => setShow(!show)}>{show ? <FaEyeSlash/> : <FaEye/>}</botton>
              {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
            </div>

            <button type="submit" className="btn">
              LOG IN
            </button>
            {message && <p style={{ color: message.includes("Error") ? "red" : "green" }}>{message}</p>}
          </form>
        </div>
      </div>
    );
}

export default Adminlogin