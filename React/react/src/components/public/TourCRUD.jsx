import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Axios from 'axios';
import '../css/tourCRUD.css';

function TourCRUD() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    numberOfPassengers: '',
    destination: '',
    startDate: '',
    endDate: '',
    totalPrice: '',
  });
  const [records, setRecords] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const getAuthHeader = () => {
    const token = localStorage.getItem('authToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Fetch all tours on component mount
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await Axios.get("http://localhost:4000/api/tours");
        setRecords(response.data.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
        alert("Failed to fetch tours. Please try again later.");
      }
    };
    fetchTours();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (Object.values(formData).some(value => !value)) {
      alert('All fields must be filled!');
      return;
    }

    // Validate contactNumber
    if (!/^\d+$/.test(formData.contactNumber)) {
      alert('Invalid contact number');
      return;
    }

    // Validate numberOfPassengers
    if (formData.numberOfPassengers <= 0 || !Number.isInteger(Number(formData.numberOfPassengers))) {
      alert('Number of passengers must be a positive integer');
      return;
    }

    // Validate dates
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      alert('Invalid date range');
      return;
    }

    // Validate totalPrice
    if (formData.totalPrice <= 0 || isNaN(parseFloat(formData.totalPrice))) {
      alert('Total price must be a positive number');
      return;
    }

 
    
    try {
      if (editingIndex !== null) {
        // Update existing tour (needs authentication)
        const tourId = records[editingIndex].tourId;
        const response = await Axios.put(
          `http://localhost:4000/api/tours/${tourId}`,
          formData,
          { headers: getAuthHeader() }
        );
        if (response.data.success) {
          const newRecords = [...records];
          newRecords[editingIndex] = response.data.data;
          setRecords(newRecords);
          resetForm();
        }
      } else {
        // Create new tour (needs authentication)
        const response = await Axios.post(
          "http://localhost:4000/api/tours",
          formData,
          { headers: getAuthHeader() }
        );
        if (response.data.success) {
          setRecords([...records, response.data.data]);
          resetForm();
        }
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.status === 401) {
        alert(error.response?.data?.message || "An error occurred");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      contactNumber: '',
      numberOfPassengers: '',
      destination: '',
      startDate: '',
      endDate: '',
      totalPrice: '',
    });
    setEditingIndex(null);
  };


  



  const handleEdit = (index) => {
    const record = records[index];
  setFormData({
    ...record,
    // Format the dates to YYYY-MM-DD 
    startDate: record.startDate.split('T')[0],
    endDate: record.endDate.split('T')[0],
    name: record.name,
    contactNumber: record.contactNumber,
    numberOfPassengers: record.numberOfPassengers,
    destination: record.destination,
    totalPrice: record.totalPrice
  });
  setEditingIndex(index);
  };



const handleDelete = async (index) => {

  if (window.confirm('Are you sure you want to delete this record?')) {
    try {
      const tourId = records[index].tourId;
      const response = await Axios.delete(
        `http://localhost:4000/api/tours/${tourId}`,
        { headers: getAuthHeader() }
      );
      
      if (response.data.success) {
        setRecords(records.filter((_, i) => i !== index));
      } else {
        alert("Failed to delete tour");
      }
    } catch (error) {
      console.error("Error deleting tour:", error);
      if (error.response?.status === 401) {
        alert(error.response?.data?.message || "Failed to delete tour");
      }
    }
  }

};

  return (
    <div className='container'>
      <div className='button'>
        <button className='btn' onClick={() => navigate('/trip-booking')}>Book More</button>
        <button className='btn' onClick={() => navigate('/hotel-crud')}>Hotel Booking</button>
      </div>
      <div className="logout">
        <Link to="/login"><img src="/Image/logout.png" alt="logout" /></Link>
      </div>
      <form autoComplete="off" onSubmit={handleFormSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Number of People</label>
          <input
            type="number"
            name="numberOfPassengers"
            value={formData.numberOfPassengers}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Place Name</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>From this day:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>To this day:</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Total Price</label>
          <input
            type="number"
            name="totalPrice"
            value={formData.totalPrice}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="button">
          <input type="submit" value={editingIndex !== null ? 'Update' : 'Book Now'} />
          <input type="reset" value="Reset" onClick={resetForm} />
        </div>
      </form>
      <table className="list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Number of People</th>
            <th>Place Name</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={record.tourId}>
              <td>{record.name}</td>
              <td>{record.contactNumber}</td>
              <td>{record.numberOfPassengers}</td>
              <td>{record.destination}</td>
              <td>{record.startDate.split('T')[0]}</td>
              <td>{record.endDate.split('T')[0]}</td>
              <td>{record.totalPrice}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TourCRUD;