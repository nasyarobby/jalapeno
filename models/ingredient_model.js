const Model = require("./model");
const knex = require("../knex");

Model.knex(knex);

class Ingredients extends Model {
    static get tableName() {
        return 'ingredients';
    }
    static get relationMappings() {
        const Recipe = require("./recipe_model")

        return {
            recipes: {
                relation: Model.ManyToManyRelation,
                modelClass: Recipe,
                join: {
                    from: 'ingredients.id',
                    through: {
                        from: 'recipeingredient.ingredient_id',
                        to: 'recipeingredient.recipe_id'
                    },
                    to: 'recipes.id'
                }
            }
        }
    }

}

module.exports = Ingredients;