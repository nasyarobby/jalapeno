const Model = require("./model");
const knex = require("../knex");

Model.knex(knex);

class Recipe extends Model {
    static get tableName() {
        return 'recipes';
    }
    static get relationMappings() {
        const Cookbook = require("./cookbook_model")

        return {
            cookbook: {
                relation: Model.HasManyRelation,
                modelClass: Cookbook,
                join: {
                    from: 'recipes.id',
                    through: {
                        from: 'cookbookrecipe.recipe_id',
                        to: 'cookbookrecipe.cookbook_id'
                    },
                    to: 'cookbook.id'
                }
            }
        }
    }
}

module.exports = Recipe;