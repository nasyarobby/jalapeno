const JSend = new(require("../../../libs/jsend"))();
const Cookbook = require("../../../models/cookbook_model");
const User = require('../../../models/user_model')

function putCookbook(req, res) {
    console.log(req.body)
    console.log(req.user)
    let cname = req.body.name;
    let category = req.body.category;
    let user_id = req.user.id
    Cookbook.query()
        .insertAndFetch({
            user_id: user_id,
            cookbook_name: cname,
            category: category
        })
        .then(cb => {
            console.log(cb)
            let id = cb.id;
            let name = cb.cookbook_name;
            let category = cb.category;
            let createdAt = cb.created_at;
            let owner = {
                name: req.user.name,
                id: user_id
            }
            res.setHeader('Content-Type', 'application/json');
            res.send(JSend.setSuccess({id, name, category, createdAt, owner}).send());
        })
}

module.exports = putCookbook;