const Comment = require('../models/comment.model');
const Blog = require('../models/blog.model'); // To check if the blog post exists
const { time } = require('../utils/time');

// create comment
const createComment = async (req, res) => {
    try {
        const postId = req.params.blogid;
        const userId = req.user.id;
        const { content } = req.body;
        console.log("🚀 ~ createComment ~ req.body:", req.body)

        if (!content || content.trim() === '') {
            return res.status(400).json({ message: 'Content is required' });
        }

        // Optional: Check if the blog post exists
        const blogExists = await Blog.findById(postId);
        if (!blogExists) {
            return res.status(404).json({ message: 'Blog post not found' });
        }


        // Create comment
        const newComment = await Comment.create({
            content,
            postId,
            userId,
            createdAt: time()
        });


        res.status(201).json({
            success: true,
            message: 'Comment created successfully',
            data: newComment
        });
    } catch (error) {
        console.error('Create comment error:', error.message);
        res.status(500).json({ message: 'Failed to create comment' });
    }
};

// get comment controller for single blog
const getCommentsByPost = async (req, res) => {
    try {
        const postId = req.params.blogid;

        const comments = await Comment.find({ postId })
            .populate('userId', 'username firstName lastName email')
            .sort({ createdAt: -1 }); // Newest first

        res.status(200).json({
            success: true,
            count: comments.length,
            data: comments
        });
    } catch (error) {
        console.error('Error fetching comments:', error.message);
        res.status(500).json({ message: 'Failed to fetch comments' });
    }
};

// update comment controller
const updateComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const userId = req.user.id;
        const { content } = req.body;

        if (!content || content.trim() === '') {
            return res.status(400).json({ message: 'Content is required' });
        }

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check ownership
        if (comment.userId.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized to update this comment' });
        }

        // Update content
        comment.content = content;
        await comment.save();

        res.status(200).json({
            success: true,
            message: 'Comment updated successfully',
            data: comment
        });
    } catch (error) {
        console.error('Update comment error:', error.message);
        res.status(500).json({ message: 'Failed to update comment' });
    }
};

const Comment = require('../models/Comment');

// DELETE /api/comments/:id - Delete a comment (only by creator)
const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if the user is the creator
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to delete this comment' });
    }

    await comment.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    console.error('Delete comment error:', error.message);
    res.status(500).json({ message: 'Failed to delete comment' });
  }
};

module.exports = {
    createComment,
    getCommentsByPost,
    updateComment,
    deleteComment
};
