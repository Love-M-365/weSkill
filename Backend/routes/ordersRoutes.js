const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Profile = require("../models/Profile");

// Fetch user orders along with worker names
router.get("/orders/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find user and fetch ordersPlaced array
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!user.ordersPlaced || user.ordersPlaced.length === 0) {
            return res.json({ success: true, orders: [] }); // Return empty array if no orders
        }

        // Fetch worker names using profileId
        const ordersWithNames = await Promise.all(
            user.ordersPlaced.map(async (order) => {
                const profile = await Profile.findById(order.profileId);
                return {
                    id: order.orderId,
                    title: `Order ${order.orderId}`, // Modify if actual title exists
                    status: order.status,
                    amount: order.amount,
                    workerName: profile ? profile.username : "Unknown",
                    receiptUrl: `/receipts/${order.orderId}.pdf`, // Adjust as needed
                    phases: ["Order Placed", "In Progress", "Checking Phase", "Completed"],
                    currentPhase: order.status === "Completed" ? 3 : 1,
                };
            })
        );

        res.json({ success: true, orders: ordersWithNames });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;
