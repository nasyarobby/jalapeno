const Cookbook = require('../../../models/cookbook_model')
const JSend = new(require("../../../libs/jsend"))();
/* using ObjectionJS for data model
https://vincit.github.io/objection.js/
https://medium.com/@nicola.dallasen/express-knex-objection-painless-api-with-db-74512c484f0c
*/

function getCookbooks(req, res) {
    Cookbook.query()
        .eager("owner") // https://vincit.github.io/objection.js/api/query-builder/eager-methods.html#eager
        .then(cookbooks => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSend.setSuccess(cookbooks).send());
        })
}

module.exports = getCookbooks;