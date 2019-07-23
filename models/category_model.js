const Model = require("./model");
const knex = require("../knex");

Model.knex(knex);

class Category extends Model {
    static get tableName() {
        return 'category';
    }

}

module.exports = Category;