
import User from "../models/user.model.js";
import dotenv from "dotenv";
import { admin } from "../config/firebase.js";
import mongoose from "mongoose";

dotenv.config();

const updateProfile = async (req, res) => {
    try {
        const {displayName, avatar, bio} = req.body;

        if (!displayName || !avatar || !bio) {
            return res.status(400).json({message: "All fields are required"});
        }

        const {uid} = req.user; 

        const user = await User.findOne({uid});
        if (!user) {
            return res.status(404).json({message: "User not found"});
            }
        user.displayName = displayName;
        user.avatar = avatar;
        user.bio = bio;
        await user.save();
        res.status(200).json({message: "Profile updated successfully"});

    }
    catch (error) {
        console.error("Error in updateProfile:", error);
        res.status(500).json({message: "Internal server error"});
    }
}