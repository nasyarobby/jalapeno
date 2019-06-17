const bcrypt = require("bcryptjs")

function hash(text) {
    return bcrypt.hashSync(text, bcrypt.genSaltSync(10));
}

module.exports = {
    hash: hash
};