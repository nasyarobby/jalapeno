const express = require('express')
const router = express.Router()
const Recipe = require('../../models/recipe_model.js')

var getRecipeByRecipeId = require("./recipes/getRecipeByRecipeId")

router.get("/:rid", getRecipeByRecipeId)

module.exports = {
    router: router
};