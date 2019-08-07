const JSend = new(require("../../../libs/jsend"))();
/* using ObjectionJS for data model
https://vincit.github.io/objection.js/
https://medium.com/@nicola.dallasen/express-knex-objection-painless-api-with-db-74512c484f0c
*/

const Cookbook = require("./../../../models/cookbook_model");

function getDefaultRecentCookbooks(req, res) {
    let num = 4;
    Cookbook.query()
        .eager("[owner, recipes]")
        .orderBy([{ column: 'updated_at', order: 'desc' }, { column: 'id', order: 'desc' }])
        .limit(num)
        .then(cookbooks => {
            for (row of cookbooks) {
                delete row.owner.password;
                row.name = row.cookbook_name;
                row.createdAt = row.created_at;
                row.updatedAt = row.updated_at;
                row.numOfRecipes = row.recipes.length;
                delete row.cookbook_name;
                delete row.created_at;
                delete row.updated_at;
            }
            res.setHeader('Content-Type', 'application/json');
            res.send(JSend.setSuccess({cookbooks}).send());
        })
}

module.exports = getDefaultRecentCookbooks