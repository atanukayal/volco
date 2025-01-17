import express from "express";
import { fetchUser } from "../controllers/useFetch.controller";
import { auth } from "../middlewares/authmiddleware";
import Application from "../models/application.model.js";

const router = express.Router();

router.get("/fetch-user", auth, fetchUser);

// Apply for a task
router.post("/apply", async (req, res) => {
  const { taskId, message } = req.body;
  const userId = req.user.id; // Assuming auth middleware adds user object
  try {
    const application = new Application({ taskId, userId, message });
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ error: "Failed to apply for task" });
  }
});

// View user's applications
router.get("/applications", async (req, res) => {
  const userId = req.user.id;
  try {
    const applications = await Application.find({ userId }).populate("taskId");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

export default router;
