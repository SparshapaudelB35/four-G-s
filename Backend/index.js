const express = require("express");
const { connection: userDbConnection, connection } = require("./database/User/db.js");
const { connection: tourDbConnection } = require("./database/Tour/db.js");
const {connection : hotelDbConnection } = require("./database/Hotel/db.js");

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
    await userDbConnection();
    console.log("Connected to User Database");

    await tourDbConnection();
    console.log("Connected to Tour Database");

    await hotelDbConnection();
    console.log("Connected to Hotel Database");
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
})();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connection()
