const HotelBooking = require("../../model/Hotel/hotelSchema.js");

const getAllHotelBookings = async (req, res) => {
  console.log("Get All Hotel Bookings");
  try {
    const bookings = await HotelBooking.findAll();
    res.status(200).send({ data: bookings, message: "Successfully fetched hotel bookings" });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error while fetching hotel bookings");
  }
};

const createHotelBooking = async (req, res) => {
  try {
    const body = req.body;

    if (!body?.name || !body?.contactNumber || !body?.hotelName) {
      return res.status(400).send({ message: "Invalid payload" });
    }

    const booking = await HotelBooking.create(body);
    res.status(201).send({ data: booking, message: "Successfully created hotel booking" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to create hotel booking" });
  }
};

const updateHotelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const oldBooking = await HotelBooking.findOne({ where: { bookingId: id } });

    if (!oldBooking) {
      return res.status(404).send({ message: "Booking not found" });
    }

    oldBooking.name = body.name;
    oldBooking.hotelName = body.hotelName || oldBooking.hotelName;
    oldBooking.contactNumber = body.contactNumber;
    oldBooking.isTripAlreadyBooked = body.isTripAlreadyBooked || oldBooking.isTripAlreadyBooked;
    await oldBooking.save();

    res.status(200).send({ data: oldBooking, message: "Booking updated successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to update hotel booking" });
  }
};

const deleteHotelBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const oldBooking = await HotelBooking.findOne({ where: { bookingId: id } });

    if (!oldBooking) {
      return res.status(404).send({ message: "Booking not found" });
    }

    await oldBooking.destroy();
    res.status(200).send({ message: "Hotel Booking deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: "Failed to delete hotel booking" });
  }
};

const getHotelBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await HotelBooking.findOne({ where: { bookingId: id } });

    if (!booking) {
      return res.status(404).send({ message: "Booking not found" });
    }

    res.status(200).send({ message: "Booking fetched successfully", data: booking });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch hotel booking" });
  }
};
const saveAllHotelBooking = async (req, res) => {
    console.log(req.body);
    const { bookingId, name, hotelName,numberOfPeople, contactNumber, fromDate, endDate , totalPrice } = req.body;
  
    try {
      const booking = await HotelBooking.findOne({ where: { bookingId: bookingId } });
  
      if (booking == null) {
        await HotelBooking.create(req.body);
        return res.status(201).json({ message: "Hotel booking added successfully" });
      }
      return res.status(500).json({ message: "Hotel booking already exists" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to save hotel booking" });
    }
  };

module.exports = {
  getAllHotelBookings,
  createHotelBooking,
  updateHotelBooking,
  deleteHotelBookingById,
  getHotelBookingById,
  saveAllHotelBooking,
};
