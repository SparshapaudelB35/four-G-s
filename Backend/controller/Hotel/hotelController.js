import { Hotel } from "../../model/index.js";


const getAllHotelBookings = async (req, res) => {
  try {
    const bookings = await Hotel.findAll();
    if (!bookings.length) {
      return res.status(404).json({ message: "No hotel bookings found" });
    }
    res.status(200).json({ data: bookings, message: "Successfully fetched hotel bookings" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: process.env.NODE_ENV === "production" ? "Internal Server Error" : error.message });
  }
};


const saveAllHotelBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;
    if (bookingId) {
      return res.status(400).json({ message: "Booking ID should not be provided. It is auto-generated." });
    }
    await Hotel.create(req.body);
    res.status(201).json({ message: "Hotel booking added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: process.env.NODE_ENV === "production" ? "Internal Server Error" : error.message });
  }
};


const createHotelBooking = async (req, res) => {
  try {
    const { name, contactNumber, hotelName, numberOfPeople, startDate, endDate, totalPrice } = req.body;

    
    if (!name || !contactNumber || !hotelName || !numberOfPeople || !startDate || !endDate || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (!/^\d+$/.test(contactNumber)) {
      return res.status(400).json({ message: "Invalid contact number" });
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      return res.status(400).json({ message: "Invalid date range" });
    }
    if (numberOfPeople <= 0 || !Number.isInteger(numberOfPeople)) {
      return res.status(400).json({ message: "Number of people must be a positive integer" });
    }
    if (totalPrice < 0 || !Number.isFinite(totalPrice)) {
      return res.status(400).json({ message: "Total price must be a positive number" });
    }

  
    const booking = await Hotel.create({
      name,
      contactNumber,
      hotelName,
      numberOfPeople,
      startDate,
      endDate,
      totalPrice,
    });
    res.status(201).json({ data: booking, message: "Hotel booking created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: process.env.NODE_ENV === "production" ? "Internal Server Error" : error.message });
  }
};


const updateHotelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const body = req.body;

    const [updatedRows] = await Hotel.update(body, { where: { bookingId: bookingId } });
    if (!updatedRows) {
      return res.status(404).json({ message: "Hotel booking not found" });
    }

    const updatedBooking = await Hotel.findByPk(bookingId);
    res.status(200).json({ data: updatedBooking, message: "Hotel booking updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: process.env.NODE_ENV === "production" ? "Internal Server Error" : error.message });
  }
};


const deleteHotelBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Hotel.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Hotel booking not found" });
    }

    await booking.destroy();
    res.status(200).json({ message: "Hotel booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: process.env.NODE_ENV === "production" ? "Internal Server Error" : error.message });
  }
};


const getHotelBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Hotel.findByPk(bookingId);
    if (!bookingId) {
      return res.status(404).json({ message: "Hotel booking not found" });
    }

    res.status(200).json({ data: booking, message: "Hotel booking fetched successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: process.env.NODE_ENV === "production" ? "Internal Server Error" : error.message });
  }
};

export const hotelController = {
  getAllHotelBookings,
  createHotelBooking,
  updateHotelBooking,
  deleteHotelBookingById,
  getHotelBookingById,
  saveAllHotelBooking,
};