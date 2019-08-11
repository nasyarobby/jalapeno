const express = require('express')
const router = express.Router()
const Category = require('../../models/category_model.js')
//const middlewares = require("./../../libs/middlewares");

var getCategories = require("./categories/getCategories")
var getCookbooksByCategory = require("./categories/getCookbooksByCategory")
var getRecipesByCategory = require("./categories/getRecipesByCategory")

router.get("/", getCategories)
router.get("/cookbooks/:name", getCookbooksByCategory)
router.get("/recipes/:id", getRecipesByCategory)

module.exports = {
    router: router
};