const Model = require("./model");
const knex = require("../knex");

Model.knex(knex);

class Category extends Model {
    static get tableName() {
        return 'category';
    }
    static get relationMappings() {
        const Recipe = require("./recipe_model")

        return {
            recipes: {
                relation: Model.ManyToManyRelation,
                modelClass: Recipe,
                join: {
                    from: 'category.id',
                    through: {
                        from: 'recipecategory.category_id',
                        to: 'recipecategory.recipe_id'
                    },
                    to: 'recipes.id'
                }
            }
        }
    }
}

module.exports = Category;