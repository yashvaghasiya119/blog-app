const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: { createdAt: true, updatedAt: false } // Only createdAt
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
