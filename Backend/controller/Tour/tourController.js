import { Tour } from '../../model/index.js';

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.findAll();
    if (!tours.length) {
      return res.status(404).json({ message: "No tours found" });
    }
    res.status(200).json({ data: tours, message: "Successfully fetched tours" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: process.env.NODE_ENV === "production" ? "Internal Server Error" : error.message });
  }
};

const saveAllTour = async (req, res) => {
  try {
    const { tourId } = req.body;

    if (tourId) {
      return res.status(400).json({ message: "Tour ID should not be provided. It is auto-generated." });
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

    if (!name || !contactNumber || !destination || !numberOfPassengers || !startDate || !endDate || !totalPrice) {
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

    if (numberOfPassengers <= 0 || !Number.isInteger(numberOfPassengers)) {
      return res.status(400).json({ message: "Number of passengers must be a positive integer" });
    }

    if (totalPrice < 0 || !Number.isFinite(totalPrice)) {
      return res.status(400).json({ message: "Total price must be a positive number" });
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
    const { tourId } = req.params;
    const body = req.body;

    const [updatedRows] = await Tour.update(body, { where: { tourId: tourId } });

    if (!updatedRows) {
      return res.status(404).json({ message: "Tour not found" });
    }

    const updatedTour = await Tour.findByPk(tourId);
    res.status(200).json({ data: updatedTour, message: "Tour updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error"});
  }
};

const deleteTourById = async (req, res) => {
  try {
    const {tourId} = req.params;

    const tour = await Tour.findByPk(tourId);
    if (!tourId) {
      return res.status(404).json({ message: "Tour not found" });
    }

    await tour.destroy();
    res.status(200).json({ data: null, message: "Tour deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error:"Internal Server Error"});
  }
};

const getTourById = async (req, res) => {
  try {
    const { tourId } = req.params;

    const tour = await Tour.findByPk(tourId);
    if (!tourId) {
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
