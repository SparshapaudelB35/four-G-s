import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../css/signuppage.css';

function Signuppage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert(`Form Submitted: ${JSON.stringify(data)}`);
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
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="input"
            />
            {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
          </div>

     
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              id="confirmPassword"
              type="password"
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
            {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" className="btn">
            Sign Up
          </button>
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
