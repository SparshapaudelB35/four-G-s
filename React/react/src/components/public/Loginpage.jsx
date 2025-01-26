import React from 'react';
import '../css/loginpage.css';
import { Link } from 'react-router-dom';

function Loginpage() {
  return (
    <div className="Container">
        <img src='/Image/tour3.jpg'></img>
      <div className="Header">
        <div className="imagecontainer">
          <img src="./Image/logo3.png" alt="logo" />
        </div>
        <ul>
          <li>
            <a href="./mainpage.html">Home</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
        </ul>
        <div className="user">
          <img src="./Image/icons8-user-48.png" alt="icon" />
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
        <form action="">
          <h1>LOG IN</h1>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="input"
          />
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="btn">
            LOG IN
          </button>
        </form>
        <div className="signup">
          <p>
            Don't have an account?
            <a href="./signuppage.html">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
