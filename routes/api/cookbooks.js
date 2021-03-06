const express = require('express')
const router = express.Router()
const Cookbook = require('../../models/cookbook_model.js')
const middlewares = require("./../../libs/middlewares");

var getCookbooks = require("./cookbooks/getCookbooks")
var getRecentCookbooks = require("./cookbooks/getRecentCookbooks")
var getCookbooksByUserId = require("./cookbooks/getCookbooksByUserId")
var getRecipesByCookbookId = require("./cookbooks/getRecipesByCookbookId")
var getDefaultRecentCookbooks = require("./cookbooks/getDefaultRecentCookbooks")
var putCookbook = require("./cookbooks/createCookbook")
var updateCookbook = require("./cookbooks/updateCookbook")
var deleteCookbook = require("./cookbooks/deleteCookbook")

router.get("/", getCookbooks)
router.get("/recent/", getDefaultRecentCookbooks)
router.get("/recent/:num", getRecentCookbooks)
router.get("/user/:uid", getCookbooksByUserId)
router.get("/id/:cid", getRecipesByCookbookId)
router.put("/", middlewares.checkAuthJwt, putCookbook)
router.put("/id/:cid", middlewares.checkAuthJwt, updateCookbook)
router.delete("/id/:cid", middlewares.checkAuthJwt, deleteCookbook)

module.exports = {
    router: router
};