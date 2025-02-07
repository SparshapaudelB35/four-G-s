import 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../css/forgotpassword.css';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import  { useState } from 'react';



function Forgotpassword() {

  const [showpassword , setshowpassword] = useState(false);
    const [showretypepassword , setshowretypepassword] = useState(false);


  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert(`Password Reset Request: ${JSON.stringify(data)}`);
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
        </form>
      </div>
    </div>
  );
}

export default Forgotpassword;
