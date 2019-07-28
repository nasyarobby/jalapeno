const JSend = new(require("../../../libs/jsend"))();
/* using ObjectionJS for data model
https://vincit.github.io/objection.js/
https://medium.com/@nicola.dallasen/express-knex-objection-painless-api-with-db-74512c484f0c
*/

const Cookbook = require("../../../models/cookbook_model");
const User = require('../../../models/user_model.js');

function getRecipesByCookbookId(req, res) {
    let id;
    let name;
    let category;
    let createdAt;
    let updatedAt;
    let recipes;
    let owner;
    Cookbook.query()
        .eager("[owner, recipes.[categories, ingredients]]")
        .where("id", req.params.cid)
        .orderBy([{ column: 'updated_at', order: 'desc' }, { column: 'id', order: 'desc' }])
        .then(cbs => {
            id = cbs[0].id;
            name = cbs[0].cookbook_name;
            category = cbs[0].category;
            createdAt = cbs[0].created_at;
            updatedAt = cbs[0].updated_at;
            recipes = cbs[0].recipes;
            return User.query()
                .where("id", cbs[0].user_id)
        })
    .then(users => {
        owner = users[0]
        delete owner.password;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSend.setSuccess({id, name, category, createdAt, updatedAt, recipes, owner}).send());
    })
}

module.exports = getRecipesByCookbookId;