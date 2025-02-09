import  { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import "../css/tripbooking.css";
import Axios from 'axios';


function Tripbooking() {

 
  const handleTourBooking = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); 
  
    if (!token) {
      alert("You are not logged in. Please log in first.");
      return;
    }
  
    const tourData = {
      name,
      contactNumber,
      numberOfPassengers: tourPassengers,
      destination: searchPlaceValue,
      startDate: tourFromDate,
      endDate: tourToDate,
      totalPrice: tourTotalPrice,
    };
  
    try {
      const response = await Axios.post("http://localhost:4000/api/tours", tourData , {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      alert("Tour booked successfully");
      console.log(response.data);
    } catch (error) {
      alert("Please fill all the fields");
      console.error(error);
    }
  };
   
  const handleHotelBooking = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); 
  
    if (!token) {
      alert("You are not logged in. Please log in first.");
      return;
    }
  
    const hotelData = {
      name ,
      contactNumber ,
      numberOfPeople: hotelGuests,
      hotelName: searchHotelValue,
      startDate: hotelFromDate,
      endDate: hotelToDate,
      totalPrice: hotelTotalPrice,
    };
  
    try {
      const response = await Axios.post("http://localhost:4000/api/hotel", hotelData , {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      alert("Hotel booked successfully");
      console.log(response.data);
    } catch (error) {
      alert("Please fill all the fields");
      console.error(error);
    }
  };

  const tourBookingRef = useRef(null);
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");


  const [showPlacesList, setShowPlacesList] = useState(false);
  const [showHotelsList, setShowHotelsList] = useState(false);
  const [searchPlaceValue, setSearchPlaceValue] = useState("");
  const [searchHotelValue, setSearchHotelValue] = useState("");
  const [tourPassengers, setTourPassengers] = useState(1);
  const [hotelGuests, setHotelGuests] = useState(1);
  const [tourFromDate, setTourFromDate] = useState("");
  const [tourToDate, setTourToDate] = useState("");
  const [hotelFromDate, setHotelFromDate] = useState("");
  const [hotelToDate, setHotelToDate] = useState("");
  const [tourTotalPrice, setTourTotalPrice] = useState(0);
  const [hotelTotalPrice, setHotelTotalPrice] = useState(0);

  const updateHotelTotal = () => {
    const numberOfDays = calculateDays(hotelFromDate, hotelToDate);
    setHotelTotalPrice(hotelGuests * numberOfDays * (hotelToPriceMap[searchHotelValue] || 0));
  };


  const placeToHotelMap = {
    Ilam: "Hotel Hillside Kanyam",
    Mustang: "Lo Mustang Himalayan",
    Pokhara: "The Silver Oaks Inn",
  };
  const placeToPriceMap = {
    Ilam: 3000,
    Mustang: 5000,
    Pokhara: 4100,
  };

  const hotelToPriceMap = {
    "Hotel Hillside Kanyam": 2000,
    "Lo Mustang Himalayan": 2400,
    "The Silver Oaks Inn": 7000,
  };


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".search-container")) {
        setShowPlacesList(false);
      }
      if (!event.target.closest(".search-container2")) {
        setShowHotelsList(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const calculateDays = (fromDate, toDate) => {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    return fromDate && toDate && to > from ? (to - from) / (1000 * 60 * 60 * 24) : 0;
  };

  const updateTourTotal = () => {
    const numberOfDays = calculateDays(tourFromDate, tourToDate);
    setTourTotalPrice(tourPassengers * numberOfDays * (placeToPriceMap[searchPlaceValue] || 0));
  };

  const handlePlaceClick = (place) => {
    setSearchPlaceValue(place);
    setSearchHotelValue(placeToHotelMap[place] || ""); 
    setShowPlacesList(false);
    tourBookingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleHotelClick = (hotel) => {
    setSearchHotelValue(hotel);
    setShowHotelsList(false);
  };
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
            <li>
              <Link to="/tour-crud" id="mybookings">My Bookings</Link>
            </li>
          </ul>
          <div className="logout">
            <Link to="/login"><img src="/Image/logout.png" alt="logout" /></Link>
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
            <button className="bn3"  onClick={() => handlePlaceClick("Ilam")}>Book Now</button>
          </div>
          <div className="item2" id="2">
            <img src="./Image/mustang.png" alt="Mustang" />
            <h1>Mustang</h1>
            <h2>Rs 5000/Person/Day & Night</h2>
            <button className="bn3"  onClick={() => handlePlaceClick("Mustang")}>Book Now</button>
          </div>
          <div className="item3" id="3">
            <img src="./Image/Pokhara.png" alt="Pokhara" />
            <h1>Pokhara</h1>
            <h2>Rs 4100/Person/Day & Night</h2>
            <button className="bn3" onClick={() => handlePlaceClick("Pokhara")}>Book Now</button>
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

        <div className="TourBooking"  ref={tourBookingRef} id="TourBooking">
          <div className="tourbooking1" id="1">
            <img src="./Image/bus.jpg" alt="bus" />
          </div>
          <div className="tourbooking2" id="2">
            <h1>Book Your Tour</h1>
            <input
              type="text"
              className="input"
              placeholder="Enter Your Name"
              name="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <input
                type="text"
                name="contactNumber"
                placeholder="Enter Your Number"
                className="input"
                value={contactNumber} 
                onChange={(e) => setContactNumber(e.target.value)} 
              />
            <input
              type="number"
              placeholder="Number of Passengers"
              className="input"
              min="1"
              value={tourPassengers}
              onChange={(e) => setTourPassengers(Number(e.target.value))}
              onBlur={updateTourTotal}
            />
            <div className="search-container">
            <input
              type="text"
              id="searchInput"
              placeholder="Search for a place..."
              className="input"
              value={searchPlaceValue}
              onFocus={() => setShowPlacesList(true)}
              onChange={(e) => setSearchPlaceValue(e.target.value)}
            />
            {showPlacesList && (
              <ul id="placesList">
                {["Ilam", "Mustang", "Pokhara"].map((place) => (
                  <li key={place} onClick={() => handlePlaceClick(place)}>
                    {place}
                  </li>
                ))}
              </ul>
            )}
          </div>
            <label htmlFor="from-date">From:</label>
            <input
              type="date"
              className="inputdate"
              value={tourFromDate}
              onChange={(e) => { setTourFromDate(e.target.value); updateTourTotal(); }}
            />
            <label htmlFor="to-date">To:</label>
            <input
              type="date"
              className="inputdate"
              value={tourToDate}
              onChange={(e) => { setTourToDate(e.target.value); updateTourTotal(); }}
            />
            <div className="Total">
              <p>Total: Rs {tourTotalPrice}</p>
            </div>
            <button href="#"onClick={handleTourBooking} className="bn4">Book It</button>
          </div>
        </div>

        <div className="HotelBooking" id="HotelBooking">
          <div className="hotelbooking1" id="1">
            <h1>Book Your Hotel</h1>
            <input
              type="text"
              className="input"
              placeholder="Enter Your Name"
              name="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <input
                type="text"
                name="contactNumber"
                placeholder="Enter Your Number"
                className="input"
                value={contactNumber} 
                onChange={(e) => setContactNumber(e.target.value)} 
              />
            <input
              type="number"
              placeholder="Number of People"
              className="input"
              min="1"
              value={hotelGuests}
              onChange={(e) => setHotelGuests(Number(e.target.value))}
              onBlur={updateHotelTotal}
            />
            <div className="search-container2">
            <input
              type="text"
              id="searchInput"
              placeholder="Search for a hotel..."
              className="input"
              value={searchHotelValue}
              onFocus={() => setShowHotelsList(true)}
              onChange={(e) => setSearchHotelValue(e.target.value)}
            />
            {showHotelsList && (
              <ul id="hotelsList">
                {["Hotel Hillside Kanyam", "Lo Mustang Himalayan", "The Silver Oaks Inn"].map((hotel) => (
                  <li key={hotel} onClick={() => handleHotelClick(hotel)}>
                    {hotel}
                  </li>
                ))}
              </ul>
            )}
          </div>
            <label htmlFor="from-date">From:</label>
            <input
              type="date"
              className="inputdate"
              value={hotelFromDate}
              onChange={(e) => { setHotelFromDate(e.target.value); updateHotelTotal(); }}
            />
            <label htmlFor="to-date">To:</label>
            <input
              type="date"
              className="inputdate"
              value={hotelToDate}
              onChange={(e) => { setHotelToDate(e.target.value); updateHotelTotal(); }}
            />
            <div className="Total">
              <p>Total: Rs{hotelTotalPrice}</p>
            </div>
            <label className="check">
              <input type="checkbox" />
              Trip to here already booked?
            </label>
            <br />
            <button href="#"onClick={handleHotelBooking} className="bn4">Book It</button>
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
