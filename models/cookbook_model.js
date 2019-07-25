const Model = require("./model");
const knex = require("../knex");

Model.knex(knex);

class Cookbook extends Model {
    static get tableName() {
        return 'cookbooks';
    }

    static get relationMappings() {
        const Recipe = require("./recipe_model")
        const User = require("./user_model")

        return {
            recipes: {
                relation: Model.ManyToManyRelation,
                modelClass: Recipe,
                join: {
                    from: 'cookbooks.id',
                    through: {
                        from: 'cookbookrecipe.cookbook_id',
                        to: 'cookbookrecipe.recipe_id'
                    },
                    to: 'recipes.id'
                }
            },
            owner: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'cookbooks.id',
                    to: 'users.id'
                }
            }
        }
    }
}

module.exports = Cookbook;