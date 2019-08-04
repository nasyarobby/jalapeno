const express = require('express')
const router = express.Router()
const Recipe = require('../../models/recipe_model.js')
const middlewares = require("./../../libs/middlewares");

var getRecipeByRecipeId = require("./recipes/getRecipeByRecipeId")
var putRecipe = require("./recipes/createRecipe")

router.get("/:rid", getRecipeByRecipeId)
router.put("/", middlewares.checkAuthJwt, putRecipe)

module.exports = {
    router: router
};