import { Tour } from '../../model/index.js';

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.findAll();
    res.status(200).json({ data: tours, message: "Successfully fetched tours" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: process.env.NODE_ENV === "production" ? "Internal Server Error" : error.message });
  }
};
const saveAllTour = async (req, res) => {
  try {
    const { tourId } = req.body;

    if (!tourId) {
      return res.status(400).json({ message: "Tour ID is required" });
    }

    const existingTour = await Tour.findOne({ where: { tourId } });
    if (existingTour) {
      return res.status(409).json({ message: "Tour already exists" });
    }

    await Tour.create(req.body);
    res.status(201).json({ message: "Tour added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: process.env.NODE_ENV === "production" ? "Internal Server Error" : error.message });
  }
};
const createTour = async (req, res) => {
  try {
    const { name, contactNumber, destination, numberOfPassengers, startDate, endDate, totalPrice } = req.body;

    // Validate required fields
    if (!name || !contactNumber || !destination || !numberOfPassengers || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate contactNumber
    if (!/^\d+$/.test(contactNumber)) {
      return res.status(400).json({ message: "Invalid contact number" });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    // Validate numberOfPassengers
    if (numberOfPassengers <= 0 || !Number.isInteger(numberOfPassengers)) {
      return res.status(400).json({ message: "Number of passengers must be a positive integer" });
    }

    // Validate totalPrice
    if (totalPrice < 0 || typeof totalPrice !== "number") {
      return res.status(400).json({ message: "Invalid total price" });
    }

    const tour = await Tour.create({ name, contactNumber, destination, numberOfPassengers, startDate, endDate, totalPrice });
    res.status(201).json({ data: tour, message: "Successfully created tour" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: process.env.NODE_ENV === "production" ? "Internal Server Error" : error.message });
  }
};

const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const tour = await Tour.findByPk(id);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    // Update only allowed fields
    const allowedFields = ["name", "contactNumber", "destination", "numberOfPassengers", "startDate", "endDate", "totalPrice"];
    allowedFields.forEach((field) => {
      if (body[field] !== undefined) {
        tour[field] = body[field];
      }
    });

    await tour.save();
    res.status(200).json({ data: tour, message: "Tour updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: process.env.NODE_ENV === "production" ? "Internal Server Error" : error.message });
  }
};

const deleteTourById = async (req, res) => {
  try {
    const { id } = req.params;

    const tour = await Tour.findByPk(id);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    await tour.destroy();
    res.status(200).json({ data: null, message: "Tour deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: process.env.NODE_ENV === "production" ? "Internal Server Error" : error.message });
  }
};

const getTourById = async (req, res) => {
  try {
    const { id } = req.params;

    const tour = await Tour.findByPk(id);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.status(200).json({ data: tour, message: "Tour fetched successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: process.env.NODE_ENV === "production" ? "Internal Server Error" : error.message });
  }
};



export const tourController = {
  getAllTours,
  createTour,
  updateTour,
  deleteTourById,
  getTourById,
  saveAllTour,
};