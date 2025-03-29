const User = require("../models/User");
const Profile = require("../models/Profile");

const placeOrder = async (req, res) => {
  try {
    const { userId, orderId, amount, profileId } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Find the profile by profileId
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    // Create a new order
    const newOrder = {
      orderId,
      amount,
      status: "Completed",
    };

    // Add the order to the user's orders array
    user.orders.push(newOrder);

    // Add the order to the profile's orders array
    profile.orders.push(newOrder);

    // Save the updated user and profile
    await user.save();
    await profile.save();

    // Send response
    res.json({
      success: true,
      message: "Order placed successfully",
      userOrders: user.orders,
      profileOrders: profile.orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { placeOrder };
