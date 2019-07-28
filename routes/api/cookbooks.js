const express = require('express')
const router = express.Router()
const Cookbook = require('../../models/cookbook_model.js')

var getCookbooks = require("./cookbooks/getCookbooks")
var getRecentCookbooks = require("./cookbooks/getRecentCookbooks")


router.get("/", getCookbooks)
router.get("/recent/:num", getRecentCookbooks)
//router.get("/:id", undefined)

module.exports = {
    router: router
};