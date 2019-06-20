const Model = require("./model");
const knex = require("../knex");

Model.knex(knex);

class User extends Model {
    static get tableName() {
        return 'users';
    }
}

module.exports = User;