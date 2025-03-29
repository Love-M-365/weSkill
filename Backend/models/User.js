const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v); // Matches a 10-digit phone number
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female', 'Other'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Matches a valid email address
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
      
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['job_seeker', 'provider'],
      default: 'provider', // Provider is the default role
      required: false, // This field is skippable
    },
    ordersPlaced: [
        {
          orderId: String,
          amount: Number,
          status: String,
          createdAt: { type: Date, default: Date.now },
        },
      ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);


const User = mongoose.model('User', userSchema);

module.exports = User;
