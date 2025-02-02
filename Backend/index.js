const express = require("express");
import bodyParser from "body-parser";
const {connection, db} = require("./database/db.js")
import {userRouter} from "./routes/index.js"
import { authRouter } from "./routes/index.js";
import dotenv from "dotenv";
import {authenticateToken} from "./middleware/token-middleware.js"

dotenv.config();


const Users = require("./model/User/userSchema.js");
const Tour = require("./model/Tour/tourSchema.js");
const HotelBooking = require("./model/Hotel/hotelSchema.js");

const app = express();

// Middleware to parse incoming JSON requests
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(express.json());
app.use(authenticateToken);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(4000, function(){
  console.log("Project running in port");
  db();
});
