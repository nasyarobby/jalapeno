const JSend = new(require("../../../libs/jsend"))();
const Recipe = require('../../../models/recipe_model');
const Ingredient = require('../../../models/ingredient_model');

function putRecipe(req, res) {
    let rname = req.body.name;
    let rdesc = req.body.description;
    let rdirections = req.body.directions;
    let rpreptime = req.body.preparationTime;
    let rpreptimeunit = req.body.preparationTimeUnit;
    let rcooktime = req.body.cookTime;
    let rcooktimeunit = req.body.cookTimeUnit;
    let rportions = req.body.portions;
    let rnotes = req.body.notes;
    let ringredients = req.body.ingredients;
    let rcookbookIds = req.body.cookbookId;
    let rcategoryIds = req.body.categories;
    for (row of ringredients) {
        row.ingredient_name = row.name;
        delete row.name
    }
    let existingIngredients;

    Ingredient.query()
        .whereIn('ingredient_name', ringredients.map(i => i.ingredient_name))
        .then(ingredients => {
            existingIngredients = ingredients;

            let newIngredients = ringredients.map(e => e.ingredient_name)
                .filter(e => {
                    return ingredients.map(e => e.ingredient_name).indexOf(e) < 0;
                })
            if (newIngredients.length > 0) {
                return Ingredient.query().insertAndFetch(newIngredients.map(e => {
                    return {
                        ingredient_name: e,
                        location: "",
                        price: 1.00
                    }
                }))
            } else {
                return []
            }
        })
        .then(result => {
            /*
            result = new ingredients
            lets merge it to our existingIngredients
            dont use merge, use push instead since it is faster
            https://dev.to/uilicious/javascript-array-push-is-945x-faster-than-array-concat-1oki
            */

            Array.prototype.push.apply(existingIngredients, result);
            // now we have the ids
            // merge it back to our ringredients
            ringredients.map(e => {
                for (let i = 0; i < existingIngredients.length; i++) {
                    const element = existingIngredients[i];
                    if (element.ingredient_name == e.ingredient_name) {
                        e.id = element.id;
                        break;
                    }
                }
                return e;
            })

            return Recipe.query()
                .insertGraphAndFetch({
                    recipe_name: rname,
                    description: rdesc,
                    directions: rdirections,
                    preparationTime: rpreptime.toString() + " " + rpreptimeunit,
                    cookTime: rcooktime.toString() + " " + rcooktimeunit,
                    portions: rportions,
                    notes: rnotes,
                    ingredients: ringredients.map(e => {
                        delete e.ingredient_name;
                        return e;
                    }),
                    cookbooks: rcookbookIds,
                    categories: [{
                        id: rcategoryIds[0]
                    }]

                }, {
                    relate: true
                })
        })
        .then(result => {
            console.log(result);

            // altering properties
            result.name = result.recipe_name;
            delete result.recipe_name;
            result.categories[0].name = result.categories[0].category;
            delete result.categories[0].category;
            result.cookbooks[0].name = result.cookbooks[0].cookbook_name;
            delete result.categories[0].cookbook_name;
            result.createdAt = result.created_at;
            delete result.created_at;
            result.updatedAt = result.updated_at;
            delete result.updated_at;

            result.ingredients = result.ingredients.map(e => {
                e.name = e.ingredient_name;
                delete e.ingredient_name;
                return e;
            })

            result.cookbooks[0].owner = req.user

            res.setHeader('Content-Type', 'application/json');
            res.send(JSend.setSuccess(result).send())
        })
}

module.exports = putRecipe;