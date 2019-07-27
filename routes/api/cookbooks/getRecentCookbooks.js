const JSend = new(require("../../../libs/jsend"))();
/* using ObjectionJS for data model
https://vincit.github.io/objection.js/
https://medium.com/@nicola.dallasen/express-knex-objection-painless-api-with-db-74512c484f0c
*/

const Cookbook = require("./../../../models/cookbook_model");

function getRecentCookbooks(req, res) {
    let errors = [];
    var foo1
    if (isNaN(req.params.num) || req.params.num < 0) {
        errors.push({
            message: "number of recent cookbooks is invalid"
        })
    }
    else if (!req.params.num) {
        foo1 = 4;
    }
    else {
        foo1 = req.params.num;
    }
    Cookbook.query()
        .eager("owner") // https://vincit.github.io/objection.js/api/query-builder/eager-methods.html#eager
        .orderBy([{ column: 'updated_at', order: 'desc' }, { column: 'id', order: 'desc' }])
        .limit(foo1)
        .then(cookbooks => {
            for (foo2 of cookbooks) {
                delete foo2.owner.password;
                //numOfRecipes: 
            }
            console.log(cookbooks);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSend.setSuccess({cookbooks}).send());
        })
}

module.exports = getRecentCookbooks