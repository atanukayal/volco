import express from "express";
import authenticate from "../middleware/authenticate.js";
import upload from "../middlewares/multer.js";
import { updateProfile } from "../controllers/profile.controller.js";

const router = express.Router();

// Profile setup route
router.post("/setup", authenticate, upload.single("avatar"), updateProfile);

export default router;
