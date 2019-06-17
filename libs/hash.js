const bcrypt = require("bcryptjs")

function hash(text) {
    return bcrypt.hashSync(text, bcrypt.genSaltSync(10));
}

function compareHash(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    hash: hash,
    compareHash: compareHash
};