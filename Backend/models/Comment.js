const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
    workId: { type: mongoose.Schema.Types.ObjectId, ref: 'Work', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  module.exports = mongoose.model('Comment', CommentSchema);