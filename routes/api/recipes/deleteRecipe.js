const JSend = new(require("../../../libs/jsend"))();
const Recipe = require("../../../models/recipe_model");

function deleteRecipe(req, res) {
    Recipe.query()
        .where("id", req.params.rid)
        .del()
    res.setHeader('Content-Type', 'application/json');
    res.send(JSend.setSuccess().send());
}

module.exports = deleteRecipe;