const express = require('express')
const router = express.Router()
const Recipe = require('../../models/recipe_model.js')
const middlewares = require("./../../libs/middlewares");

var getRecipeByRecipeId = require("./recipes/getRecipeByRecipeId")
var putRecipe = require("./recipes/createRecipe")
var updateRecipe = require("./recipes/updateRecipe")
var deleteRecipe = require("./recipes/deleteRecipe")

router.get("/:rid", getRecipeByRecipeId)
router.put("/", middlewares.checkAuthJwt, putRecipe)
router.put("/:rid", middlewares.checkAuthJwt, updateRecipe)
router.delete("/:rid", middlewares.checkAuthJwt, deleteRecipe)

module.exports = {
    router: router
};