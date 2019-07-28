const Model = require("./model");
const knex = require("../knex");

Model.knex(knex);

class Recipe extends Model {
    static get tableName() {
        return 'recipes';
    }
    static get relationMappings() {
        const Cookbook = require("./cookbook_model")
        const Category = require("./category_model")
        const Ingredient = require("./ingredient_model")

        return {
            cookbooks: {
                relation: Model.ManyToManyRelation,
                modelClass: Cookbook,
                join: {
                    from: 'recipes.id',
                    through: {
                        from: 'cookbookrecipe.recipe_id',
                        to: 'cookbookrecipe.cookbook_id'
                    },
                    to: 'cookbooks.id'
                }
            },
            categories: {
                relation: Model.ManyToManyRelation,
                modelClass: Category,
                join: {
                    from: 'recipes.id',
                    through: {
                        from: 'recipecategory.recipe_id',
                        to: 'recipecategory.category_id'
                    },
                    to: 'category.id'
                }
            },
            ingredients: {
                relation: Model.ManyToManyRelation,
                modelClass: Ingredient,
                join: {
                    from: 'recipes.id',
                    through: {
                        from: 'recipeingredient.recipe_id',
                        to: 'recipeingredient.ingredient_id'
                    },
                    to: 'ingredients.id'
                }
            },
        }
    }
}

module.exports = Recipe;