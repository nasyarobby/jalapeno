const User = require('../../../models/user_model')
const JSend = new(require("../../../libs/jsend"))();

function verifyEmail(req, res) {
    let email = req.body.email;
    let code = req.body.code;

    User
        .query()
        .whereRaw("verification_code = ? AND email = ? AND verification_code_expired_at > NOW() ", [code, email])
        .then(users => {
            if (users.length > 0) {
                return User
                    .query()
                    .where({
                        id: users[0].id
                    })
                    .patchAndFetchById(users[0].id, {
                        verification_code: null,
                        verification_code_expired_at: null,
                        verified_at: new Date()
                    })
            } else {
                return false;
            }
        })
        .then(user => {
            res.setHeader('Content-Type', 'application/json');
            if (user) {
                delete user.password;
                res.send(JSend.setSuccess(user).send());
            } else
                res.send(JSend.setFail({
                    verification: [{
                        message: "Invalid/expired verification code."
                    }]
                }).send());
        })
}

module.exports = verifyEmail