const express = require("express");
const { createComment, getCommentsByPost, updateComment, deleteComment } = require("../controllers/comment");
const { authenticateUser } = require("../middelwere/auth.middelwere");

const router = express.Router();

// create blogs api
router.post("/:id", authenticateUser ,createComment)

// for see comment for perticure blogs
router.get("/:id", authenticateUser ,getCommentsByPost)

router.post("/update/:id", authenticateUser ,updateComment)

router.delete("/:id", authenticateUser ,deleteComment)

module.exports = router