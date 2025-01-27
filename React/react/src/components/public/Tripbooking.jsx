import React from "react";
import "../css/tripbooking.css"
import "../js/tripbooking.js"

function Tripbooking() {
  return (
    <>
    <div className="Main">
      <header>
        <div className="imagecontainer">
          <img src="./Image/logo3.png" alt="logo" />
        </div>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#footer" id="footer-link">Contact</a>
          </li>
          <li>
            <a href="#aboutus" id="aboutus-link">About Us</a>
          </li>
        </ul>
        <div className="user">
          <img src="./Image/icons8-user-48.png" alt="user" />
        </div>
      </header>

      <div className="Container">
        <div className="tripinformation">
          <h1>Book your trip now</h1>
          <br />
          <h2>Grab the latest offer available!!!</h2>
        </div>
        <div className="main">
          <img src="./Image/tour2.jpg" alt="Img" />
        </div>
      </div>

      <div className="tripheading">
        <h1>--- Tour Exclusive Offer ---</h1>
      </div>
      <div className="tripbooking">
        <div className="item1" id="1">
          <img src="./Image/Ilam.png" alt="Ilam" />
          <h1>Ilam</h1>
          <h2>Rs 3000/Person/Day & Night</h2>
          <a href="#TourBooking" ><button className="bn3">Book Now</button></a>
        </div>
        <div className="item2" id="2">
          <img src="./Image/mustang.png" alt="Mustang" />
          <h1>Mustang</h1>
          <h2>Rs 5000/Person/Day & Night</h2>
          <a href="#TourBooking" ><button className="bn3">Book Now</button></a>
        </div>
        <div className="item3" id="3">
          <img src="./Image/Pokhara.png" alt="Pokhara" />
          <h1>Pokhara</h1>
          <h2>Rs 4100/Person/Day & Night</h2>
          <a href="#TourBooking" ><button className="bn3">Book Now</button></a>
        </div>
      </div>

      <div className="hotelheading">
        <h1>--- Hotel Exclusive Offer ---</h1>
      </div>
      <div className="hotelbooking">
        <div className="hotel1" id="1">
          <img src="./Image/Hotel Hillside Kanyam.jpg" alt="Ilam" />
          <h1>Hotel Hillside Kanyam</h1>
          <h2>Rs 2000/Person/Day & Night</h2>
          <a href="#HotelBooking" ><button className="bn3">Book Now</button></a>
        </div>
        <div className="hotel2" id="2">
          <img src="./Image/Lo Mustang Himalayan.jpg" alt="Mustang" />
          <h1>Lo Mustang Himalayan</h1>
          <h2>Rs 2400/Person/Day & Night</h2>
          <a href="#HotelBooking" ><button className="bn3">Book Now</button></a>
        </div>
        <div className="hotel3" id="3">
          <img src="./Image/The Silver Oaks Inn.jpg" alt="Pokhara" />
          <h1>The Silver Oaks Inn</h1>
          <h2>Rs 7000/Person/Exclusive One</h2>
          <a href="#HotelBooking" ><button className="bn3">Book Now</button></a>

        </div>
      </div>

      <div className="TourBooking" id="TourBooking">
        <div className="tourbooking1" id="1">
          <img src="./Image/bus.jpg" alt="bus" />
        </div>
        <div className="tourbooking2" id="2">
          <h1>Book Your Tour</h1>
          <input type="text" placeholder="Enter Your Name" className="input" />
          <input type="text" placeholder="Provide Your Number" className="input" />
          <input type="number" placeholder="Number of Passenger" className="input" />
          <input type="text" className="input" placeholder="Choose the place" autoComplete="off" />
          <label htmlFor="from-date">From:</label>
          <input type="date" id="from-date" className="inputdate" />
          <label htmlFor="to-date">To:</label>
          <input type="date" id="to-date" className="inputdate" />
          <button href="#" className="bn4">Book It</button>
        </div>
      </div>

      <div className="HotelBooking" id="HotelBooking">
        <div className="hotelbooking1" id="1">
          <h1>Book Your Hotel</h1>
          <input type="text" placeholder="Enter Your Name" className="input" />
          <input type="text" placeholder="Provide Your Number" className="input" />
          <input type="number" placeholder="Number of People" className="input" />
          <input type="text" className="input" placeholder="Choose hotel" autoComplete="off" />
          <label htmlFor="from-date">From:</label>
          <input type="date" id="from-date" className="inputdate" />
          <label htmlFor="to-date">To:</label>
          <input type="date" id="to-date" className="inputdate" />
          <br />
          <label className="check">
            <input type="checkbox" />
            Trip to here already booked?
          </label>
          <br />
          <button href="#" className="bn4">Book It</button>
        </div>
        <div className="hotelbooking2" id="2">
          <img src="./Image/hotel.jpg" alt="hotel" />
        </div>
      </div>

      <div className="aboutus" id="aboutus">
        <div className="about1" id="1">
          <img src="./Image/aboutus.png" alt="aboutus" />
        </div>
        <div className="about2" id="2">
          <h1>Welcome to Ghumne Haina</h1>
          <p>Your ultimate travel companion for exploring the breathtaking beauty of Nepal</p>
          <p>We believe that travel is about unforgettable experiences</p>
        </div>
      </div>

      <div className="teamheading">
        <h1>Our Team</h1>
      </div>
      <div className="team">
        <div className="person1" id="1">
          <img src="./Image/person1.jpg" alt="person1" />
          <h1>Scrum Master</h1>
          <h2>Sparsha Poudel</h2>
        </div>
        <div className="person2" id="2">
          <img src="./Image/person2.jpg" alt="person2" />
          <h1>Developer</h1>
          <h2>Santosh Shrestha</h2>
        </div>
        <div className="person3" id="3">
          <img src="./Image/person3.jpg" alt="person3" />
          <h1>Designer-Developer</h1>
          <h2>Gaurav Budhathoki</h2>
        </div>
        <div className="person4" id="4">
          <img src="./Image/person4.jpg" alt="person4" />
          <h1>Developer-Tester</h1>
          <h2>Ayush K.C.</h2>
        </div>
      </div>
    </div>

      <footer>
        <div className="footer" id="footer">
          <div className="mainfooter">
            <div className="row">
              <img src="./Image/logo3.png" alt="logo2" />
              <div className="footer1">
                <h1>Our Specialities</h1>
                <p>We master in providing the best features to our customers</p>
                <p>Our site provides special discounts every month</p>
                <p>We provide the best security to our customers</p>
              </div>
              <div className="footer2">
                <h1>Contact</h1>
                <p>Number: 01 3678902 || 9832754630</p>
                <p>Email: ghumnehaina2025@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>Ghumne Haina?? @ 2025 - All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
}

export default Tripbooking;
