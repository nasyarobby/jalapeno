const JSend = new(require("../../../libs/jsend"))();
const Recipe = require('../../../models/recipe_model');
const Ingredient = require('../../../models/ingredient_model');
const Cookbook = require("../../../models/cookbook_model");
const Category = require("../../../models/category_model");

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
    Ingredient.query()
        .then(ingredients => {
            var recipeIngredientInDB = false;
            for (rfoo = 0 ; rfoo < ringredients.length ; rfoo ++) {
                recipeIngredientInDB = false;
                for(ifoo = 0 ; ifoo < ingredients.length ; ifoo++) {
                    if (ingredients[ifoo].ingredient_name == ringredients[rfoo].ingredient_name) {
                        recipeIngredientInDB = true;
                    }
                }
                if (recipeIngredientInDB == false) {
                    Ingredient.query()
                        .insert({
                            ingredient_name: ringredients[rfoo].ingredient_name
                        })
                }
            }
        })
    Recipe.query()
        .insertGraphAndFetch({
            recipe_name: rname,
            description: rdesc,
            directions: rdirections,
            preparationTime: rpreptime.toString() + " " + rpreptimeunit,
            cookTime: rcooktime.toString() + " " + rcooktimeunit,
            portions: rportions,
            notes: rnotes,
            ingredients: ringredients,
            //cookbooks: rcookbookIds
        }, {noDelete: true})
        .then(rec => {
            console.log(rec)
            Ingredient.query()
                .then(ingre => {
                    console.log(ingre)
                })
        })
}

    // Cookbook.query()
    //     .where('id', rcookbookId)
    //     .then(cookbook => {
    //         for (row of rcategoryIds) {
    //             Category.query()
    //                 .where('id', row)
    //                 .then(cat => {
    //                     rcategories.push({
    //                         id: cat[0].id,
    //                         category: cat[0].category
    //                     })
    //                     //console.log(rcategories)
    //                 })
    //         }
            // Recipe.query()
            //     .upsertGraphAndFetch({
            //         recipe_name: rname,
            //         description: rdesc,
            //         directions: rdirections,
            //         preparationTime: rpreptime.toString() + " " + rpreptimeunit,
            //         cookTime: rcooktime.toString() + " " + rcooktimeunit,
            //         portions: rportions,
            //         notes: rnotes,

            //         cookbooks: cookbook,
            //         categories: rcategories,
            //         ingredients: ringredients
            //     }, {relate: true})
            //     .then(rec => {
            //         console.log(req.body)
            //         console.log(rec)
            //         let id = rec.id;
            //         let name = rec.recipe_name;
            //         let description = rec.description;
            //         let directions = rec.directions;
            //         let preparationTime = rec.preparationTime;
            //         let cookTime = rec.cookTime;
            //         let portions = rec.portions;
            //         let notes = rec.notes;
            //         let categories = rec.categories;

            //         res.setHeader('Content-Type', 'application/json');
            //         res.send(JSend.setSuccess({id, name, description, directions, preparationTime, cookTime, portions, notes}).send());
            //     })

    // let cname = req.body.name;
    // let category = req.body.category;
    // let user_id = req.user.id
    // Cookbook.query()
    //     .insertAndFetch({
    //         user_id: user_id,
    //         cookbook_name: cname,
    //         category: category
    //     })
    //     .then(cb => {
    //         let id = cb.id;
    //         let name = cb.cookbook_name;
    //         let category = cb.category;
    //         let createdAt = cb.created_at;
    //         let owner = {
    //             name: req.user.name,
    //             id: user_id
    //         }
    //         res.setHeader('Content-Type', 'application/json');
    //         res.send(JSend.setSuccess({id, name, category, createdAt, owner}).send());
    //     })

module.exports = putRecipe;