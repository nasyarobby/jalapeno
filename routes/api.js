const express = require('express')
const router = express.Router()
const users = require("./api/users")
const cookbooks = require("./api/cookbooks")
const recipes = require("./api/recipes")
const categories = require("./api/categories")

router.use("/users", users.router)
router.use("/cookbooks", cookbooks.router)
router.use("/recipes", recipes.router)
router.use("/categories", categories.router)

module.exports = {
    router: router
};