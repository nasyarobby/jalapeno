const express = require('express')
const router = express.Router()
const users = require("./api/users")
const cookbooks = require("./api/cookbooks")

router.use("/users", users.router)
router.use("/cookbooks", cookbooks.router)

module.exports = {
    router: router
};