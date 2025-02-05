import express from "express";
import { authController } from "../../controller/index.js";

const router = express.Router();

// Define routes
router.post("/login", authController.login); // Login route
router.post("/create", authController.create); // Signup route
router.get("/init", authController.init); // Fetch current user

export { router as authRouter };