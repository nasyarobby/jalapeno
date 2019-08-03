const express = require('express')
const router = express.Router()
const Cookbook = require('../../models/cookbook_model.js')

var getCookbooks = require("./cookbooks/getCookbooks")
var getRecentCookbooks = require("./cookbooks/getRecentCookbooks")
var getCookbooksByUserId = require("./cookbooks/getCookbooksByUserId")
var getRecipesByCookbookId = require("./cookbooks/getRecipesByCookbookId")
var getDefaultRecentCookbooks = require("./cookbooks/getDefaultRecentCookbooks")

var putCookbooks = require("./cookbooks/createCookbooks")


router.get("/", getCookbooks)
router.get("/recent/", getDefaultRecentCookbooks)
router.get("/recent/:num", getRecentCookbooks)
router.get("/user/:uid", getCookbooksByUserId)
router.get("/id/:cid", getRecipesByCookbookId)

router.put("/", putCookbooks)

module.exports = {
    router: router
};