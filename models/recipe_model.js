const Model = require("./model");
const knex = require("../knex");

Model.knex(knex);

class Recipe extends Model {
    static get tableName() {
        return 'recipes';
    }
}

module.exports = Recipe;