const Model = require("./model");
const knex = require("../knex");

Model.knex(knex);

class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get relationMappings() {
        const Cookbook = require("./cookbook_model")

        return {
            cookbooks: {
                relation: Model.HasManyRelation,
                modelClass: Cookbook,
                join: {
                    from: 'users.id',
                    to: 'cookbooks.user_id'
                }
            }
        }
    }
}

module.exports = User;