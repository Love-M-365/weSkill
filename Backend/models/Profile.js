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
    type: String, // Main skill (e.g., "Frontend Developer", "Data Scientist")
    required: true,
    trim: true,
  },
  additionalSkills: {
    type: [String], // Array of additional skills
    required: false,
    default: [],
  },
  highestQualification: {
    type: String, // Example: "Bachelor's", "Master's", "PhD", etc.
    required: true,
  },
  fieldOfStudy: {
    type: String, // Example: "Computer Science", "Engineering", "Arts", etc.
    required: true,
    trim: true,
  },
  preferredWorkLocation: {
    type: String, // Example: "Remote", "Delhi", "Bangalore", etc.
    required: true,
    trim: true,
  },
  profilePhoto: {
    type: String, // URL or path to profile photo (jpg, png)
    required: false,
  },
  links: {
    type: [String], // Array of portfolio or social media links
    required: false,
    default: [],
  },
  bio: {
    type: String, // Short biography or description
    required: true,
    trim: true,
    maxlength: 300, // Limit the length of the bio
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updatedAt` on save
ProfileSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;
