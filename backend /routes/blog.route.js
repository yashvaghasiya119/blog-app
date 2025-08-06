const express = require("express");
const { addBlog, getAllBlogs, getMyBlogs, updateBlog } = require("../controllers/blog");
const { authenticateUser } = require("../middelwere/auth.middelwere");
const router = express.Router();

router.post("/add", authenticateUser ,addBlog)

router.post("/updateblog/:id", authenticateUser ,updateBlog)

router.get("/allblogs",authenticateUser, getAllBlogs)

router.get("/myblogs", authenticateUser, getMyBlogs);

module.exports = router