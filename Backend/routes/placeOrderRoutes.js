const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { v4: uuidv4 } = require("uuid");

// Place an order
router.post("/place-order", async (req, res) => {
    try {
        const { userId, userName, profileId, profileName, amount ,status } = req.body;

        const order = new Order({
            orderId: uuidv4(),
            userId,
            userName,
            profileId,
            profileName,
            amount,
            status
        });

        await order.save();

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/order/:orderId", async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId });
        if (!order) return res.status(404).json({ message: "Order not found" });

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get("/orders/user/:userId", async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get("/orders/profile/:profileId", async (req, res) => {
    try {
        const orders = await Order.find({ profileId: req.params.profileId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;