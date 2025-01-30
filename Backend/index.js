const express = require("express");
const {connection} = require("./database/db.js")

const Users = require("./model/User/userSchema.js");
const Tour = require("./model/Tour/tourSchema.js");
const HotelBooking = require("./model/Hotel/hotelSchema.js");

const app = express();
const PORT = 5000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Establish database connections
(async () => {
  try {
    await connection();
    console.log("Connected to User Database");
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
})();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connection()
