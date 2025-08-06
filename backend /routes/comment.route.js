const express = require("express");
const { createComment, getCommentsByPost, updateComment } = require("../controllers/comment");
const { authenticateUser } = require("../middelwere/auth.middelwere");

const router = express.Router();

// create blogs api
router.post("/:blogid", authenticateUser ,createComment)

// for see comment for perticure blogs
router.get("/:blogid", authenticateUser ,getCommentsByPost)

router.post("/update/:id", authenticateUser ,updateComment)

module.exports = router