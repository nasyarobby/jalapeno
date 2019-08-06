const JSend = new(require("../../../libs/jsend"))();
const Cookbook = require("../../../models/cookbook_model");

function deleteCookbook(req, res) {
    Cookbook.query()
        .where("id", req.params.cid)
        .del()
    res.setHeader('Content-Type', 'application/json');
    res.send(JSend.setSuccess().send());
}

module.exports = deleteCookbook;