import React from "react";
import '../css/Mainpage.css'
import { Link } from 'react-router-dom';

function Mainpage(){
    return(
        <div className="Container">
          <img src='/Image/tour3.jpg'></img>
        <div className="Header">
          <div className="imagecontainer">
            <img src="/Image/logo3.png" alt="logo" />
          </div>
          <div className="user">
            <img src="/Image/icons8-user-48.png" alt="user icon" />
          </div>
        </div>
  
        <div className="Information">
          <h1>Welcome to the land of Himalayas!!</h1>
          <p>
            Explore now with the best touring company of Nepal to make your visit
            great and memorable.
          </p>
          <button type="button">LOG IN</button>
          <button type="button">REGISTER</button>
        </div>
      </div>
    )
}

export default Mainpage;