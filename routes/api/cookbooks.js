const express = require('express')
const router = express.Router()

var getCookbooks = require("./cookbooks/getCookbooks")
var getRecentCookbooks = require("./cookbooks/getRecentCookbooks")

router.get("/", getCookbooks)
router.get("/recent/:num", getRecentCookbooks)
//router.get("/:id", undefined)

module.exports = {
    router: router
};