
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const workSchema = new mongoose.Schema({
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile', 
        required: true,
      },
      workId: { type: String, default: () => uuidv4(), unique: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    basic: {
        specs: { type: String, required: true },
        time: { type: Number, required: true },
        amount: { type: Number, required: true }
    },
    standard: {
        specs: { type: String, required: true },
        time: { type: Number, required: true },
        amount: { type: Number, required: true }
    },
    premium: {
        specs: { type: String, required: true },
        time: { type: Number, required: true },
        amount: { type: Number, required: true }
    },
    skills: { type: [String], required: true },
    sample: { type: String, required: true },
    contact: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Work', workSchema);
