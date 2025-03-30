const User = require("../models/User");
const Profile = require("../models/Profile");

const placeOrder = async (req, res) => {
    try {
        const { userId, orderId, amount, profileId ,profileHandler } = req.body;

        if (!userId || !orderId || !amount || !profileId || !profileHandler) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Find User and Profile
        const user = await User.findById(userId);
        const profile = await Profile.findById(profileId);

        if (!user || !profile) {
            return res.status(404).json({ success: false, message: "User or Profile not found" });
        }

        // Ensure arrays exist
        if (!user.ordersPlaced) user.ordersPlaced = [];
        if (!profile.orders) profile.orders = [];

        // Create new order object
        const newOrder = { 
            orderId, 
            amount, 
            status: "Completed",
            userName: user.name,           // Add user's name to profile orders
            profileHandler: profile.name   // Add profile name to user orders
        };

        // Push order into respective arrays
        user.ordersPlaced.push(newOrder);
        profile.orders.push(newOrder);

        // Save both documents
        await user.save();
        await profile.save();

        res.json({ success: true, message: "Order placed successfully!", userOrders: user.ordersPlaced, profileOrders: profile.orders });

    } catch (error) {
        console.error("Error in placeOrder:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { placeOrder };
