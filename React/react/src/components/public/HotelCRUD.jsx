import React, { useState } from 'react';
import { useNavigate , Link} from 'react-router-dom';
import '../css/hotelCRUD.css';


function HotelCRUD() {

    const navigate = useNavigate(); 
  
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    people: '',
    hotel: '',
    fromDate: '',
    toDate: '',
    price: '',
  });

  const [records, setRecords] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (Object.values(formData).some(value => !value)) {
      alert('All fields must be filled!');
      return;
    }

    if (editingIndex !== null) {
      updateRow(editingIndex, formData);
    } else {
      setRecords([...records, formData]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      number: '',
      people: '',
      hotel: '',
      fromDate: '',
      toDate: '',
      price: '',
    });
    setEditingIndex(null);
  };

  const updateRow = (index, data) => {
    const updatedRecords = [...records];
    updatedRecords[index] = data;
    setRecords(updatedRecords);
  };

  const handleEdit = (index) => {
    setFormData(records[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setRecords(records.filter((_, i) => i !== index));
    }
  };

  return (
    <div className='container'>
      <div className='button'>
        <button className='btn' onClick={() => navigate('/trip-booking')}>Book More</button>
        <button className='btn' onClick={() => navigate('/tour-crud')}>Tour Booking</button>
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
            name="number"
            value={formData.number}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Number of People</label>
          <input
            type="number"
            name="people"
            value={formData.people}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Hotel Name</label>
          <input
            type="text"
            name="hotel"
            value={formData.hotel}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>From this day:</label>
          <input
            type="date"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>To this day:</label>
          <input
            type="date"
            name="toDate"
            value={formData.toDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Total Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
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
            <th>Hotel Name</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.name}</td>
              <td>{record.number}</td>
              <td>{record.people}</td>
              <td>{record.hotel}</td>
              <td>{record.fromDate}</td>
              <td>{record.toDate}</td>
              <td>{record.price}</td>
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

export default HotelCRUD;
