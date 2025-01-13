// Importing necessary modules
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import { admin } from "../config/firebase.js";
import mongoose from "mongoose";

dotenv.config();

export const signUp = async (req, res) => {
  try {
    const passcode = req.headers.passcode;

    if (passcode != process.env.AUTH_CODE) {
      return res
        .status(401)
        .json({ message: "Invalid passcode, Unauthorized" });
    }

    const firebaseToken = req.headers.authorization?.split(" ")[1];

    if (!firebaseToken) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);

    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const { username, email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const userNameExists = await User.findOne({ username });
    if (userNameExists) {
      return res.status(400).json({ message: "Username already in use" });
    }

    const newUser = new User({
      username,
      email,
      id: new mongoose.Types.ObjectId(),
    });

    // Save the new user and handle duplicate errors
    try {
      await newUser.save();
    } catch (err) {
      if (err.code === 11000) {
        return res
          .status(400)
          .json({ message: "Duplicate field error", error: err });
      }
      throw err; // For unexpected errors
    }

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error during sign-up:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { passcode } = req.params;

    if (passcode != process.env.AUTH_CODE) {
      return res
        .status(401)
        .json({ message: "Invalid passcode, Unauthorized" });
    }

    //toke
    const firebaseToken = req.headers.authorization?.split(" ")[1];

    if (!firebaseToken) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);

    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const { email } = req.body;

    const { uid } = decodedToken;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Login successful",
      firebaseToken,
      user: {
        firebaseId: uid,
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Logout Controller
export const logout = async (req, res) => {
  try {
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const checkUsername = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    return res.status(200).json({ message: "Username is available" });
  } catch (error) {
    console.error("Error checking username availability:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
