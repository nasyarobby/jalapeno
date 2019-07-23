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
                    to: 'cookbook.id'
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
            }
        }
    }
}

module.exports = Recipe;