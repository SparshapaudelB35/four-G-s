import React, { useState } from "react";
import '../css/booknowhotel.css';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    passengers: "",
    place: "",
    fromDate: "",
    toDate: "",
    price: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook to navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = () => {
    if (
      formData.name &&
      formData.number &&
      formData.passengers &&
      formData.place &&
      formData.fromDate &&
      formData.toDate &&
      formData.price
    ) {
      setMessage("Your Tour Has Been Booked.");
      
      setTimeout(() => navigate('/hotel-crud'), 2000); 
    } else {
      setMessage("Please fill out all fields");
    }
  };

  const handleGoToBookingPage = () => {
    navigate('/trip-booking'); 
  };

  return (
    <div className="booking-container">
      <h1>Book Now</h1>

      <div className="qr-code-section">
        <div className="qr-placeholder">QR Code will appear here</div>
      </div>

      <div className="Form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Number:</label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>No. of People:</label>
          <input
            type="number"
            name="passengers"
            value={formData.passengers}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Hotel Name:</label>
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>From this day:</label>
          <input
            type="date"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>To this day:</label>
          <input
            type="date"
            name="toDate"
            value={formData.toDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Total Price:</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
      </div>

      <button onClick={handleBooking}>Book Now</button><br />
      <button onClick={handleGoToBookingPage}>Go to Booking page</button>

      {message && <div className="alert-box">{message}</div>}
    </div>
  );
};

export default Booking;
