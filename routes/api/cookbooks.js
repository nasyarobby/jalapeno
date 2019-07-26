const express = require('express')
const router = express.Router()

var getCookbooks = require("./cookbooks/getCookbooks")

router.get("/", getCookbooks)
//router.get("/recent/:num", undefined)
//router.get("/:id", undefined)

module.exports = {
    router: router
};