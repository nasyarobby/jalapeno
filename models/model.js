const {
    Model
} = require('objection');

const AjvValidator = require('objection').AjvValidator;

class MyModel extends Model {
    static createValidator() {
        return new AjvValidator({
            onCreateAjv: (ajv) => {
                require("ajv-errors")(ajv);
            },
            options: {
                allErrors: true,
                validateSchema: false,
                ownProperties: true,
                v5: true,
                jsonPointers: true
            }
        });
    }
}

module.exports = MyModel;