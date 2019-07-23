const Model = require("./model");
const knex = require("../knex");

Model.knex(knex);

class DaysPlanning extends Model {
    static get tableName() {
        return 'days';
    }

}

module.exports = DaysPlanning;