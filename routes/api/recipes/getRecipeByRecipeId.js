const JSend = new(require("../../../libs/jsend"))();
/* using ObjectionJS for data model
https://vincit.github.io/objection.js/
https://medium.com/@nicola.dallasen/express-knex-objection-painless-api-with-db-74512c484f0c
*/

const Recipe = require("../../../models/recipe_model");

function getRecipeByRecipeId(req, res) {
    let id;
    let name;
    let description;
    let directions;
    let preparationTime;
    let cookTime;
    let portions;
    let notes;
    let createdAt;
    let updatedAt;
    let categories;
    let ingredients;
    let createdAt;
    let updatedAt;
    let cookbooks;
    Recipe.query()
        .eager("[ingredients, categories, cookbooks.owner]")
        //.modifyEager('categories.category', categoriesBuilder => categoriesBuilder.select('name'))
        .where("id", req.params.rid)
        .orderBy([{ column: 'updated_at', order: 'desc' }, { column: 'id', order: 'desc' }])
        .then(rs => {
            console.log(rs)
            id = rs[0].id;
            name = rs[0].recipe_name;
            description = rs[0].description;
            directions = rs[0].directions;
            preparationTime = rs[0].preparationTime;
            cookTime = rs[0].cookTime;
            portions = rs[0].portions;
            notes = rs[0].notes;
            categories = rs[0].categories;
            ingredients = rs[0].ingredients;
            createdAt = rs[0].created_at;
            updatedAt = rs[0].updated_at;
            cookbooks = rs[0].cookbooks;
            res.setHeader('Content-Type', 'application/json');
            res.send(JSend.setSuccess({id, name, description, directions, preparationTime, cookTime, portions, categories, ingredients, notes, createdAt, updatedAt, cookbooks}).send());
        })
}

module.exports = getRecipeByRecipeId;