import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../css/signuppage.css';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function Signuppage() {

  const [showpassword , setshowpassword] = useState(false);
  const [showconfirmpassword , setshowconfirmpassword] = useState(false);

  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // POST request to save user data in the backend
      const response = await Axios.post("http://localhost:4000/api/auth/create", {
        name: data.fullname,
        email: data.email,
        password: data.password,
      });

      if (response.status === 201) {
        setMessage("User successfully registered!");
        alert("Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      
      if (error.response) {
        setMessage(`Error registering user: ${error.response.data?.message || 'Please try again later.'}`);
      } else if (error.request) {
        setMessage("No response from server. Please try again later.");
      } else {
        // Something went wrong in setting up the request
        setMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="Container">
      <img src='/Image/tour3.jpg' alt="Tour Background" />
      <div className="Header">
        <div className="imagecontainer">
          <img src="./Image/logo3.png" alt="logo" />
        </div>
        <div className="home">
          <Link to="/"><img src="/Image/home.jpg" alt="home" /></Link>
        </div>
      </div>
      <div className="Information">
        <h1>Welcome!!</h1>
        <p>
          Best travel website in the town
          <br />
          Register to be a member
        </p>
      </div>
      <div className="Form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign Up</h1>
          <div>
            <label htmlFor="fullname">Full Name:</label>
            <input
              id="fullname"
              type="text"
              placeholder="Full Name"
              {...register("fullname", { required: "Full Name is required" })}
              className="input"
            />
            {errors.fullname && <p style={{ color: "red" }}>{errors.fullname.message}</p>}
          </div>
          <div>
            <label htmlFor="email">Email:</label>
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
              className="input"
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type={showpassword ? 'text' : 'password'}
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="input"
            />
            <botton onClick={() => setshowpassword(!showpassword)}>{showpassword ? <FaEyeSlash/> : <FaEye/>}</botton>
            {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              id="confirmPassword"
              type={showconfirmpassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => {
                  const password = getValues("password");
                  return value === password || "Passwords do not match";
                },
              })}
              className="input"
            />
            <botton onClick={() => setshowconfirmpassword(!showconfirmpassword)}>{showconfirmpassword ? <FaEyeSlash/> : <FaEye/>}</botton>
            {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>}
          </div>
          <button type="submit" className="btn">
            Sign Up
          </button>
          {message && <p style={{ color: message.includes("Error") ? "red" : "green" }}>{message}</p>}
        </form>
        <div className="signup">
          <p>
            Already have an account?
            <Link to="/login"> LOG IN</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signuppage;