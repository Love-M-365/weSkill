const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  typeOfWork: {
    type: String, // Example: "Full-time", "Part-time", "Freelance", etc.
    required: true,
 
  },
  primarySkill: {
    type: String, 
    required: true,
    trim: true,
  },
  additionalSkills: {
    type: [String],
    required: false,
    default: [],
  },
  highestQualification: {
    type: String, 
    required: true,
  },
  fieldOfStudy: {
    type: String, 
    required: true,
    trim: true,
  },
  preferredWorkLocation: {
    type: String, 
    required: true,
    trim: true,
  },
  profilePhoto: {
    type: String, 
    required: false,
  },
  links: {
    type: [String], 
    required: false,
    default: [],
  },
  bio: {
    type: String, 
    required: true,
    trim: true,
    maxlength: 300, 
  },
  badges: {
    type: [String], 
    required: false,
    default: [],
  },
  uploadedWorks: {
    type: Number, 
    required: false,
    default: 0,
  },
  rating: {
    type: Number, 
    required: false,
    default: 0,
  },
  upiID: {
    type: String, 
    required: true,
  },
  orders: [
    {
        orderId: { type: String, required: true },
        amount: { type: Number, required: true },
        status: { type: String, default: "In Progress" },
        userName: { type: String } 
    }
],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ProfileSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;
