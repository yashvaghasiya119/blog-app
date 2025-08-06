const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  body: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: String, // Cloudinary image URL
    required: true
  },
  hashtags: {
    type: [String], // Array of strings like ["#tech", "#nodejs"]
    default: []
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
