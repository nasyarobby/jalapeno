const JSend = new(require("../../../libs/jsend"))();
const Cookbook = require("../../../models/cookbook_model");

function updateCookbook(req, res) {
    let today = new Date();
    var yyyy = today.getFullYear();
    var mon = String(today.getMonth() + 1).padStart(2, '0');
    var dd = String(today.getDate()).padStart(2, '0');
    var hh = String(today.getHours()).padStart(2, '0');
    var mm = String(today.getMinutes()).padStart(2, '0');
    var ss = String(today.getSeconds()).padStart(2, '0');
    today = yyyy + "-" + mon + "-" + dd + " " + hh + ":" + mm + ":" + ss;

    if ('name' in req.body && 'category' in req.body) {
        Cookbook.query()
            .patchAndFetchById(('id', req.params.cid), {
                 cookbook_name: req.body.name,
                 category: req.body.category,
                 updated_at: today
            })
            .then(cb => {
                let id = cb.id;
                let name = cb.cookbook_name;
                let category = cb.category;
                let createdAt = cb.created_at;
                let updatedAt = cb.updated_at;
                let owner = {
                    name: req.user.name,
                    id: req.user.id
                }
                res.setHeader('Content-Type', 'application/json');
                res.send(JSend.setSuccess({id, name, category, createdAt, updatedAt, owner}).send());
            })
    }

    else if('name' in req.body) {
        Cookbook.query()
            .patchAndFetchById(('id', req.params.cid), {
                 cookbook_name: req.body.name,
                 updated_at: today
            })
            .then(cb => {
                let id = cb.id;
                let name = cb.cookbook_name;
                let category = cb.category;
                let createdAt = cb.created_at;
                let updatedAt = cb.updated_at;
                let owner = {
                    name: req.user.name,
                    id: req.user.id
                }
                res.setHeader('Content-Type', 'application/json');
                res.send(JSend.setSuccess({id, name, category, createdAt, updatedAt, owner}).send());
            })
    }

    else if('category' in req.body) {
        Cookbook.query()
            .patchAndFetchById(('id', req.params.cid), {
                 category: req.body.category,
                 updated_at: today
            })
            .then(cb => {
                let id = cb.id;
                let name = cb.cookbook_name;
                let category = cb.category;
                let createdAt = cb.created_at;
                let updatedAt = cb.updated_at;
                let owner = {
                    name: req.user.name,
                    id: req.user.id
                }
                res.setHeader('Content-Type', 'application/json');
                res.send(JSend.setSuccess({id, name, category, createdAt, updatedAt, owner}).send());
            })
    }
}

module.exports = updateCookbook;