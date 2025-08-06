const express = require("express");
const { signup, login, forgotPassword, resetPassword } = require("../controllers/user");
const router = express.Router();

router.post("/signup",signup)

router.post("/login",login)

router.post("/forgot-password",forgotPassword)

router.post("/reset-password",resetPassword)


module.exports = router