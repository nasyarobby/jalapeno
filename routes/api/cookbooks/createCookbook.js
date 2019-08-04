const JSend = new(require("../../../libs/jsend"))();
const Cookbook = require("../../../models/cookbook_model");

function putCookbook(req, res) {
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