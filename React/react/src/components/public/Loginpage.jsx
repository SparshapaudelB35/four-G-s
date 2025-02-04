import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../css/loginpage.css';

function Loginpage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Here you can add your authentication logic, e.g., API call
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
        <h1>Welcome back!!</h1>
        <p>
          New offers are available
          <br />
          Login to grab the offer real quick
        </p>
      </div>
      <div className="Form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>LOG IN</h1>
          {/* Email Input */}
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
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="btn">
            LOG IN
          </button>
        </form>
        <div className="signup">
          <p>
            Don't have an account?
            <Link to="/signup"> Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;