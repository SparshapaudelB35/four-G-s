import 'react';
import { useForm } from 'react-hook-form';
import { Link , useNavigate} from 'react-router-dom';
import '../css/forgotpassword.css';
import Axios from 'axios';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import  { useState } from 'react';



function Forgotpassword() {

  const [showpassword , setshowpassword] = useState(false);
    const [showretypepassword , setshowretypepassword] = useState(false);

    const [message, setMessage] = useState('');

  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await Axios.post("http://localhost:4000/api/auth/resetpassword", {
        email: data.email,
        newPassword: data.password,
      });

      if (response.status === 200) {
        setMessage("Password successfully updated!");
        alert("Password reset successful! Please log in.");
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response?.data?.message || "Please try again."}`);
      } else {
        setMessage("An unexpected error occurred.");
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
      <div className="Form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Set A New Password</h1>

          
          <div>
            <input
             id='email'
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
            <input
              id='password'
              type={showpassword ? 'text' : 'password'}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="input"
            />
            <botton onClick={() => setshowpassword(!showpassword)}>{showpassword ? <FaEyeSlash/> : <FaEye/>}</botton>
            {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
          </div>

         
          <div>
            <input
              id='password'
              type={showretypepassword ? 'text' : 'password'}
              placeholder="Re-enter Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              className="input"
            />
            <botton onClick={() => setshowretypepassword(!showretypepassword)}>{showretypepassword ? <FaEyeSlash/> : <FaEye/>}</botton>
            {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" className="btn">
            Reset Password
          </button>
          {message && <p style={{ color: message.includes("Error") ? "red" : "green", margin: "10px" }}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Forgotpassword;
