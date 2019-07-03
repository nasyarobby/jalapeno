const express = require('express')
const router = express.Router()
const users = require("./api/users")

router.use("/users", users.router)

module.exports = {
    router: router
};