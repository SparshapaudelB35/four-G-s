import React from 'react';
import { Link } from 'react-router-dom';
import '../css/signuppage.css';

function Signuppage() {
  return (
    <div className="Container">
        <img src='/Image/tour3.jpg'></img>
      <div className="Header">
        <div className="imagecontainer">
          <img src="./Image/logo3.png" alt="logo" />
        </div>
        <ul>
          <li>
            <Link to="/mainpage">Home</Link>
          </li>
          <li>
            <Link to="#">About Us</Link>
          </li>
        </ul>
        <div className="user">
          <img src="./Image/icons8-user-48.png" alt="user" />
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
        <form>
          <h1>Sign Up</h1>
          <input
            type="text"
            placeholder="Full Name"
            name="fullname"
            className="input"
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            className="input"
          />
          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>
        <div className="signup">
          <p>
            Already have an account?
            <Link to="/loginpage">LOG IN</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signuppage;
