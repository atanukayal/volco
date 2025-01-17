
export const fetchUser = async (req, res) => {
    try {
        const user = req.user;
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
    
        return res.status(200).json({
            message: "User found",
            user: {
                id: user._id,
                displayName: user.displayName,
                avatar: user.avatar,
                bio: user.bio,
                email: user.email,
                uid: user.uid,
                profileSetup: user.profileSetup,
            },
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}