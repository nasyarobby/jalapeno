const JSend = new(require("../../../libs/jsend"))();
/* using ObjectionJS for data model
https://vincit.github.io/objection.js/
https://medium.com/@nicola.dallasen/express-knex-objection-painless-api-with-db-74512c484f0c
*/

const Cookbook = require("../../../models/cookbook_model");
const User = require('../../../models/user_model.js')

function getRecipesByCookbookId(req, res) {
    let recipes;
    let id;
    let name;
    let owner;
    Cookbook.query()
        .eager("[owner, recipes]")
        .where("id", req.params.cid)
        .orderBy([{ column: 'updated_at', order: 'desc' }, { column: 'id', order: 'desc' }])
        .then(cbs => {
            name
            for (row of cbs) {
                delete row.owner.password;
                row.name = row.cookbook_name;
                row.createdAt = row.created_at;
                row.updatedAt = row.updated_at;
                row.numOfRecipes = row.recipes.length;
                delete row.cookbook_name;
                delete row.created_at;
                delete row.updated_at;
            }
            cookbooks = cbs
            return User.query()
                .where("id", req.params.uid)
        })
    .then(users => {
        owner = users[0]
        delete owner.password;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSend.setSuccess({cookbooks, owner}).send());
    })
}

module.exports = getRecipesByCookbookId