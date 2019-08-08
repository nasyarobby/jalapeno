const JSend = new(require("../../../libs/jsend"))();
const Cookbook = require("../../../models/cookbook_model");

function getCookbooksByCategory(req, res) {
    let cookbooks;
    Cookbook.query()
        .eager("[owner, recipes]")
        .where("category", req.params.name)
        .orderBy([{ column: 'updated_at', order: 'desc' }, { column: 'id', order: 'desc' }])
        .then(cbs => {
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
            res.setHeader('Content-Type', 'application/json');
            res.send(JSend.setSuccess({cookbooks}).send());
        })
    
}

module.exports = getCookbooksByCategory