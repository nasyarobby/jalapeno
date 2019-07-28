const express = require('express')
const router = express.Router()
const users = require("./api/users")
const cookbooks = require("./api/cookbooks")
const recipes = require("./api/recipes")

router.use("/users", users.router)
router.use("/cookbooks", cookbooks.router)
router.use("/recipes", recipes.router)

module.exports = {
    router: router
};