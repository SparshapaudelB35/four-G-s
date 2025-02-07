import "react";
import { Link,useNavigate } from 'react-router-dom';
import '../css/Mainpage.css';


function Mainpage() {
    const navigate = useNavigate(); 

    return (
        <div className="Container">
            <img src='/Image/tour3.jpg' alt="Tour Background" />
            <div className="Header">
                <div className="imagecontainer">
                   <img src="/Image/logo3.png" alt="logo" />
                </div>
                <div className="user">
                    <Link to='/adminlogin'><img src="/Image/icons8-user-48.png" alt="user icon" /></Link>
                </div>
            </div>

            <div className="Information">
                <h1>Welcome to the land of Himalayas!!</h1>
                <p>
                    Explore now with the best touring company of Nepal to make your visit
                    great and memorable.
                </p>
                <button type="button" onClick={() => navigate('/login')}>LOG IN</button>
                <button type="button" onClick={() => navigate('/signup')}>REGISTER</button>
            </div>
        </div>
    );
}

export default Mainpage;