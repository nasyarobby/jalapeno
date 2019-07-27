const JSend = new(require("../../../libs/jsend"))();
/* using ObjectionJS for data model
https://vincit.github.io/objection.js/
https://medium.com/@nicola.dallasen/express-knex-objection-painless-api-with-db-74512c484f0c
*/

const Cookbook = require("./../../../models/cookbook_model");

function getCookbooks(req, res) {
    Cookbook.query()
        .eager("[owner, recipes]") // https://vincit.github.io/objection.js/api/query-builder/eager-methods.html#eager
        .orderBy([{ column: 'updated_at', order: 'desc' }, { column: 'id', order: 'desc' }])
        .then(cookbooks => {
            for (row of cookbooks) {
                delete row.owner.password;
                row.name = row.cookbook_name;
                row.createdAt = row.created_at;
                row.updatedAt = row.updated_at;
                row.numOfRecipes = row.recipes.length;
            }
            res.setHeader('Content-Type', 'application/json');
            res.send(JSend.setSuccess({cookbooks}).send());
        })
}

module.exports = getCookbooks