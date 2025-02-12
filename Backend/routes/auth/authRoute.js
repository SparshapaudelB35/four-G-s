import express from "express";
import { authController } from "../../controller/index.js";

const router = express.Router();


router.post("/login", authController.login); 
router.post("/create", authController.create); 
router.get("/init", authController.init); 
router.post("/resetpassword",authController.resetpassword);

export { router as authRouter };