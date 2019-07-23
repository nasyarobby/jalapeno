const Model = require("./model");
const knex = require("../knex");

Model.knex(knex);

class Ingredients extends Model {
    static get tableName() {
        return 'ingredients';
    }

}

module.exports = Ingredients;