const Cookbook = require('../../../models/cookbook_model')
const JSend = new(require("../../../libs/jsend"))();

function getRecentCookbooks(req, res) {
    Cookbook
        .query()
        //.where('num', req.params.num)
        .then(cookbooks => {
            cookbooks.sort(function (a,b) {
                return (a[0].updated_at - b[0].updated_at)
            })
            console.log(cookbooks)
        })
}