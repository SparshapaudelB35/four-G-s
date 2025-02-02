import express from "express";
import bodyParser from "body-parser";
import { db } from "./database/db.js";
import {userRouter} from "./routes/index.js";
import { tourRouter } from "./routes/index.js";
import { hotelRouter } from "./routes/index.js";
import { authRouter } from "./routes/index.js";
import dotenv from "dotenv";
import {authenticateToken} from "./middleware/token-middleware.js"

dotenv.config();

const app = express();


const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.json());

app.use(authenticateToken);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(port, () =>{
  console.log(`Project running on port ${port}`);
  db();
});
