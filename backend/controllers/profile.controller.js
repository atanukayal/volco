import User from "../models/user.model.js";

export const updateProfile = async (req, res) => {
  try {
    const { displayName, bio } = req.body;

    // Validate input fields
    if (!displayName || !bio) {
      return res.status(400).json({ message: "Display name and bio are required" });
    }

    // Check if authenticated user exists
    const { uid } = req.user;
    if (!uid) {
      return res.status(401).json({ message: "Unauthorized: User ID missing from request" });
    }

    // Find user in the database
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Handle avatar upload
    if (req.file) {
      try {
        // Multer provides the Cloudinary URL in req.file.path
        user.avatar = req.file.path;
      } catch (error) {
        console.error("Avatar upload error:", error);
        return res.status(500).json({ message: "Failed to upload avatar" });
      }
    } else if (!user.avatar) {
      // If no file is uploaded and the user doesn't already have an avatar
      return res.status(400).json({ message: "Avatar is required for profile setup" });
    }

    // Update user fields
    user.displayName = displayName;
    user.bio = bio;
    user.profileSetup = true; // Mark profile as complete

    // Save changes to the database
    try {
      await user.save();
    } catch (error) {
      console.error("Database save error:", error);
      return res.status(500).json({ message: "Failed to save user profile" });
    }

    // Send success response
    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        bio: user.bio,
        avatar: user.avatar,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.error("Unexpected error in updateProfile:", error);

    // Catch-all error handler
    res.status(500).json({ message: "Internal server error" });
  }
};
