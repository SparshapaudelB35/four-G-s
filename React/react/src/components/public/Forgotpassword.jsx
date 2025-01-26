import React from 'react';
import { Link } from 'react-router-dom';
import '../css/forgotpassword.css';

function Forgotpassword() {
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
        </ul>
        <div className="user">
          <img src="./Image/icons8-user-48.png" alt="icon" />
        </div>
      </div>
      <div className="Form">
        <form>
          <h1>Set A New Password</h1>
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
            placeholder="Re-enter Password"
            className="input"
          />
          <button type="submit" className="btn">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forgotpassword;
