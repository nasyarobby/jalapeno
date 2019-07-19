const Model = require("./model");
const knex = require("../knex");

Model.knex(knex);

class Cookbook extends Model {
    static get tableName() {
        return 'cookbooks';
    }

    static get relationMappings() {
        const User = require("./user_model")

        return {
            recipes: {
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
            }
        }
    }
}

module.exports = Cookbook;