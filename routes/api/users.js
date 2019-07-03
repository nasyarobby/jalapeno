const express = require('express')
const router = express.Router()
const User = require('../../models/user_model.js')

var getUserById = require("./users/getUserById");
var getAllUsers = require("./users/getAllUsers");
var registerNewUser = require("./users/registerNewUser");
var verifyEmail = require("./users/verifyEmail")
var authenticateUser = require("./users/authenticateUser")
var resendEmailVerificationCode = require("./users/resendEmailVerificationCode")

router.get("/:id", getUserById)
router.get('/', getAllUsers)
router.put('/register', registerNewUser)
router.post("/verify-email", verifyEmail)
router.post("/login", authenticateUser)
router.post("/verify-email/resend-code", resendEmailVerificationCode)

module.exports = {
    router: router
};