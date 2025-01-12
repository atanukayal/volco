// Importing necessary modules
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const signUp = async (req, res) => {
  try {
    const { passcode } = req.params;

    if (passcode != process.env.AUTH_CODE) {
      return res
        .status(401)
        .json({ message: "Invalid passcode, Unauthorized" });
    }

    const { username, email } = req.body;

    const existringUser = await User.findOne({ email });
    if (existringUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const userNameExists = await User.findOne({ username });
    if (userNameExists) {
      return res.status(400).json({ message: "Username already in use" });
    }

    const newUser = new User({ username, email });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
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

    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
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
