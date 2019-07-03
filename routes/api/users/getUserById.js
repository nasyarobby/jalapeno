const User = require('../../../models/user_model')
const JSend = new(require("../../../libs/jsend"))();

function getUserById(req, res) {
    User
        .query()
        .where('id', req.params.id)
        .then(users => {
            let user = users[0];
            delete user.password;
            res.setHeader('Content-Type', 'application/json');
            res.send(JSend.setSuccess(user).send());
        })
}

module.exports = getUserById;