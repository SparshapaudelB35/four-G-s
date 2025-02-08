import { Hotel } from "../../model/index.js";

// Fetch all hotel bookings
const getAllHotelBookings = async (req, res) => {
  try {
    const bookings = await Hotel.findAll();
    res.status(200).json({ data: bookings, message: "Successfully fetched hotel bookings" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while fetching hotel bookings" });
  }
};

// Create a new hotel booking
const createHotelBooking = async (req, res) => {
  try {
    const { name, contactNumber, hotelName, numberOfPeople, startDate, endDate, totalPrice } = req.body;

    // Validate required fields
    if (!name || !contactNumber || !hotelName || !numberOfPeople || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create the hotel booking
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
    res.status(500).json({ error: "Failed to create hotel booking" });
  }
};

// Update an existing hotel booking
const updateHotelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    // Find the booking by ID
    const booking = await Hotel.findOne({ where: { bookingId: id } });
    if (!booking) {
      return res.status(404).json({ message: "Hotel booking not found" });
    }

    // Update the booking fields
    Object.assign(booking, body);
    await booking.save();

    res.status(200).json({ data: booking, message: "Hotel booking updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update hotel booking" });
  }
};

// Delete a hotel booking by ID
const deleteHotelBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the booking by ID
    const booking = await Hotel.findOne({ where: { bookingId: id } });
    if (!booking) {
      return res.status(404).json({ message: "Hotel booking not found" });
    }

    // Delete the booking
    await booking.destroy();

    res.status(200).json({ message: "Hotel booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete hotel booking" });
  }
};

// Fetch a single hotel booking by ID
const getHotelBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the booking by ID
    const booking = await Hotel.findOne({ where: { bookingId: id } });
    if (!booking) {
      return res.status(404).json({ message: "Hotel booking not found" });
    }

    res.status(200).json({ data: booking, message: "Hotel booking fetched successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch hotel booking" });
  }
};

// Save or create a hotel booking (if it doesn't already exist)
const saveAllHotelBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;

    // Check if the booking already exists
    const existingBooking = await Hotel.findOne({ where: { bookingId } });
    if (existingBooking) {
      return res.status(409).json({ message: "Hotel booking already exists" });
    }

    // Create the booking
    await Hotel.create(req.body);

    res.status(201).json({ message: "Hotel booking added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save hotel booking" });
  }
};

// Export the controller methods
export const hotelController = {
  getAllHotelBookings,
  createHotelBooking,
  updateHotelBooking,
  deleteHotelBookingById,
  getHotelBookingById,
  saveAllHotelBooking,
};