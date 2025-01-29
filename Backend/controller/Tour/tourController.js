const Tour = require("../../model/Tour/tourSchema.js");

const getAllTours = async (req, res) => {
  console.log("Get All Tours");
  try {
    const tours = await Tour.findAll();
    res.status(200).send({ data: tours, message: "Successfully fetched tours" });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error while fetching tours");
  }
};

const createTour = async (req, res) => {
  try {
    const body = req.body;

    if (!body?.name || !body?.contactNumber || !body?.place) {
      return res.status(400).send({ message: "Invalid payload" });
    }

    const tour = await Tour.create(body);
    res.status(201).send({ data: tour, message: "Successfully created tour" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to create tour" });
  }
};

const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const oldTour = await Tour.findOne({ where: { tourId: id } });

    if (!oldTour) {
      return res.status(404).send({ message: "Tour not found" });
    }

    oldTour.name = body.name;
    oldTour.place = body.place || oldTour.place;
    oldTour.contactNumber = body.contactNumber;
    await oldTour.save();

    res.status(200).send({ data: oldTour, message: "Tour updated successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to update tour" });
  }
};

const deleteTourById = async (req, res) => {
  try {
    const { id } = req.params;
    const oldTour = await Tour.findOne({ where: { tourId: id } });

    if (!oldTour) {
      return res.status(404).send({ message: "Tour not found" });
    }

    await oldTour.destroy();
    res.status(200).send({ message: "Tour deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: "Failed to delete tour" });
  }
};

const getTourById = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findOne({ where: { tourId: id } });

    if (!tour) {
      return res.status(404).send({ message: "Tour not found" });
    }

    res.status(200).send({ message: "Tour fetched successfully", data: tour });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch tour" });
  }
};

const saveAllTour = async (req, res) => {
    console.log(req.body);
    const { tourId, name, place,numberOfPassengers, contactNumber,startDate,endDate,totalPrice } = req.body;
  
    try {
      const tour = await Tour.findOne({ where: { tourId: tourId } });
  
      if (tour == null) {
        await Tour.create(req.body);
        return res.status(201).json({ message: "Tour added successfully" });
      }
      return res.status(500).json({ message: "Tour is already present" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to save tour" });
    }
  };

module.exports = {
  getAllTours,
  createTour,
  updateTour,
  deleteTourById,
  getTourById,
  saveAllTour,
};
