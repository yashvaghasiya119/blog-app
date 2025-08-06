const Blog = require('../models/blog.model');
const { cloudinary } = require('../utils/cloudinary');
const { time } = require('../utils/time');

const addBlog = async (req, res) => {
  console.log(req.user);

  try {
    const { title, body, hashtags } = req.body;
    const file = req.files?.photo;

    // Basic validations
    if (!title || title.trim().length < 3) {
      return res.status(400).json({ error: "Title is required and must be at least 3 characters." });
    }

    if (!body || body.trim().length === 0) {
      return res.status(400).json({ error: "Body content is required." });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized. User ID not found in token." });
    }

    if (!file) {
      return res.status(400).json({ error: "No image uploaded." });
    }

    const maxSize = 1 * 1024 * 1024; // 1MB
    if (file.size > maxSize) {
      return res.status(400).json({ error: "Image is too large. Max allowed size is 1MB." });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "blogs",
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    });

    // Parse hashtags string to array
    let parsedHashtags = [];
    if (hashtags) {
      if (Array.isArray(hashtags)) {
        parsedHashtags = hashtags;
      } else if (typeof hashtags === 'string') {
        parsedHashtags = hashtags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0);
      }
    }

    // Create the blog using authenticated user's ID
    const newBlog = await Blog.create({
      title,
      body,
      createdBy: req.user.id,
      image: result.secure_url,
      hashtags: parsedHashtags,
      createdAt: time()
    });

    return res.status(201).json({
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    console.error("Error adding blog:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('createdBy', "username firstName lastName email") // assuming User model has name/email
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blogs'
    });
  }
};

const getMyBlogs = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("🚀 ~ getMyBlogs ~ userId:", userId)

    const blogs = await Blog.find({ createdBy: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    console.error("Error fetching user blogs:", error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch your blogs'
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user.id;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check ownership
    if (blog.createdBy.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to update this blog' });
    }

    // Handle image upload if new image is provided
    let newImageUrl = blog.image;
    if (req.files?.photo) {
      const uploaded = await cloudinary.uploader.upload(req.files.photo.tempFilePath);
      newImageUrl = uploaded.secure_url;
    }

    // Update fields
    blog.title = req.body.title || blog.title;
    blog.body = req.body.body || blog.body;
    blog.hashtags = req.body.hashtags
      ? req.body.hashtags.split(',').map(tag => tag.trim())
      : blog.hashtags;
    blog.image = newImageUrl;

    await blog.save();

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      data: blog
    });
  } catch (error) {
    console.error('Update blog error:', error.message);
    res.status(500).json({ message: 'Failed to update blog' });
  }
};



module.exports = {
  updateBlog
};


module.exports = {
  addBlog,
  getAllBlogs,
  getMyBlogs,
  updateBlog
};

