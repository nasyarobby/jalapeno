const Model = require("./model");
const knex = require("../knex");

Model.knex(knex);

class User extends Model {
    static get tableName() {
        return 'users';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ["username", "email", "name", "password"],
            errorMessage: {
                properties: {
                    "username": "username is required.",
                    "email": "email is required.",
                    "name": "name is required.",
                    "password": "password is required"
                },
            },
            properties: {
                username: {
                    type: 'string',
                    minLength: 5,
                    maxLength: 32,
                    pattern: '^[a-zA-Z0-9_]*$',
                    errorMessage: {
                        pattern: "username is invalid.",
                        minLength: "username is too short.",
                        maxLength: 'username is too long.'
                    }
                },
                email: {
                    format: 'email',
                    errorMessage: {
                        format: 'email is invalid.'
                    }
                },
                name: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 255,
                },
                password: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 255
                },
                verification_code: {
                    type: 'string'
                },
                verified_at: {
                    type: 'date-time'
                },
                usertype: {
                    type: 'integer',
                    minimum: 0,
                    maximum: 2 // 0: free, 1: paid, 2: admin
                }
            }
        }
    }
}

module.exports = User;