const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    userId: { type: String, required: true }, 
    userName: { type: String, required: true }, 
    profileId: { type: String, required: true }, 
    profileName: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["In Progress", "Completed", "Cancelled"], default: "In Progress" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
