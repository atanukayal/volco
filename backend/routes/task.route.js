import express from "express";
import Task from "../models/Task.mjs";

const router = express.Router();

// Create a new task
router.post("/", async (req, res) => {
  const { name, venue, duration, teamSize, description } = req.body;
  const userId = req.user.id; // Assuming auth middleware adds user object
  try {
    const task = new Task({ name, venue, duration, teamSize, description, createdBy: userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

export default router;
