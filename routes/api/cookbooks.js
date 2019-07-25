const express = require('express')
const router = express.Router()
const Cookbook = require('../../models/cookbook_model.js')

var getCookbooks = require("./cookbooks/getCookbooks")

router.get("/", getCookbooks)
//router.get("/recent/:num", undefined)
//router.get("/:id", undefined)

module.exports = {
    router: router
};