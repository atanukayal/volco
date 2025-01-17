import User from "../models/user.model.js";
import dotenv from "dotenv";
import cloudinary from "../config/cloudinary.config.js";

dotenv.config();

export const updateProfile = async (req, res) => {
  try {
    const { displayName, bio } = req.body;

    // Check for required fields
    if (!displayName || !bio) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const { uid } = req.user;

    // Find user
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Handle avatar upload if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "user_avatars",
      });
      user.avatar = result.secure_url; // Update avatar URL
    }

    // Update other fields
    user.displayName = displayName;
    user.bio = bio;

    // Save user
    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
