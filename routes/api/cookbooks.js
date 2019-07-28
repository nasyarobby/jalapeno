const express = require('express')
const router = express.Router()
const Cookbook = require('../../models/cookbook_model.js')

var getCookbooks = require("./cookbooks/getCookbooks")
var getRecentCookbooks = require("./cookbooks/getRecentCookbooks")
var getCookbooksByUserId = require("./cookbooks/getCookbooksByUserId")
var getRecipesByCookbookId = require("./cookbooks/getRecipesByCookbookId")


router.get("/", getCookbooks)
router.get("/recent/:num", getRecentCookbooks)
router.get("/user/:uid", getCookbooksByUserId)
router.get("/id/:cid", getRecipesByCookbookId)

module.exports = {
    router: router
};