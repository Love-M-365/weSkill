const mongoose = require('mongoose');

const WorkSchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile', // Reference to the Profile model
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String, // URL of the uploaded file
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Work = mongoose.model('Work', WorkSchema);
module.exports = Work;
