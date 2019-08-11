const JSend = new(require("../../../libs/jsend"))();
const Recipe = require("../../../models/recipe_model");

function getRecipeByCategory(req, res) {
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
    let recipes = [];
    Recipe.query()
        .eager("[ingredients, categories]")
        .modifyEager('categories.category', categoriesBuilder => categoriesBuilder.select('category as name'))
        .orderBy([{ column: 'updated_at', order: 'desc' }, { column: 'id', order: 'desc' }])
        .then(rs => {
            loop1:
                for (foo in rs) {
            loop2:
                    for (foo1 in rs[foo].categories) {
                        if (rs[foo].categories[foo1].id == req.params.id) {
                            id = rs[foo].id;
                            name = rs[foo].recipe_name;
                            description = rs[foo].description;
                            directions = rs[foo].directions;
                            preparationTime = rs[foo].preparationTime;
                            cookTime = rs[foo].cookTime;
                            portions = rs[foo].portions;
                            notes = rs[foo].notes;
                            for (row of rs[foo].ingredients) {
                                row.name = row.ingredient_name;
                                delete row.ingredient_name;
                            }
                            ingredients = rs[foo].ingredients;
                            createdAt = rs[foo].created_at;
                            for (row of rs[foo].categories) {
                                row.name = row.category;
                                delete row.category;
                            }
                            categories = rs[foo].categories;
                            updatedAt = rs[foo].updated_at;
                            createdAt = rs[foo].created_at;
                            recipe = {
                                id: id,
                                name: name,
                                description: description,
                                directions: directions,
                                preparationTime: preparationTime,
                                cookTime: cookTime,
                                portions: portions,
                                categories: categories,
                                ingredients: ingredients,
                                notes: notes,
                                createdAt: createdAt,
                                updatedAt: updatedAt
                            }
                            recipes.push(recipe)
                            break loop2;
                        }
                    }
                }
            res.setHeader('Content-Type', 'application/json');
            res.send(JSend.setSuccess({recipes}).send());
        })
}

module.exports = getRecipeByCategory;