const User = require('../../../models/user_model')
const JSend = new(require("../../../libs/jsend"))();

function getAllUsers(req, res) {
    User.query()
        .then(users => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSend.setSuccess(users).send());
        })
}

module.exports = getAllUsers;