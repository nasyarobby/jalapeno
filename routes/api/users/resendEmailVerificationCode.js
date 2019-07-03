const User = require('../../../models/user_model')
const JSend = new(require("../../../libs/jsend"))();
const hashCode = require("./hashCode")

function resendEmailVerificationCode(req, res) {
    let email = req.body.email;
    let date = new Date();
    date.setDate(date.getDate() + 1);

    User.query()
        .where({
            email: email,
            verified_at: null
        })
        .then(user => {
            if (user.length > 0) {
                User.query().patchAndFetchById(user[0].id, {
                        verification_code: hashCode(date.toString()) + hashCode(user.username + date.toString()) + hashCode(user.email + date.toString()) + hashCode(user.name + date.toString()),
                        verification_code_expired_at: date
                    })
                    .then(user => {
                        sendVerificationCode(user.username, user.email, user.name, user.verification_code, true);
                    })

                res.setHeader('Content-Type', 'application/json');
                res.send(JSend.setSuccess().send());
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSend.setFail().send());
            }
        })
}

module.exports = resendEmailVerificationCode