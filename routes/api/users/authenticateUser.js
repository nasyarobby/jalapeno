const JSend = new(require("../../../libs/jsend"))();
var passport = require("./../../../libs/passport_local");
const jwt = require('jsonwebtoken');

function authenticateUser(req, res) {
    let errors = [];
    if (!req.body || !req.body.login || !req.body.password) {

        let errors = [];
        if (!req.body.login) {
            errors.push({
                login: [{
                    message: "Login is required."
                }]
            })
        }

        if (!req.body.password) {
            errors.push({
                password: [{
                    message: "Password is required."
                }]
            })
        }

        let parsedErrors = {};
        errors.forEach((val) => {
            Object.keys(val).forEach((key) => {
                parsedErrors[key] = val[key];
            })
        });
        res.setHeader('Content-Type', 'application/json');
        res.send(JSend.setFail(parsedErrors).send());
        return;
    }

    if (req.body.login.trim() === "") {
        errors.push({
            login: [{
                message: "Login cannot be empty."
            }]
        });
    }

    if (req.body.password.trim() == "") {
        errors.push({
            password: [{
                message: "Password cannot be empty."
            }]
        });
    }

    if (errors.length > 0) {
        let parsedErrors = {};
        errors.forEach((val) => {
            Object.keys(val).forEach((key) => {
                parsedErrors[key] = val[key];
            })
        });

        res.setHeader('Content-Type', 'application/json');
        res.send(JSend.setFail(parsedErrors).send());

    } else {
        passport.authenticate('local', {
            session: false
        }, (err, user) => {
            if (err || !user) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSend.setFail({
                    authentication: [{
                        message: "Authentication failed."
                    }]
                }).send());
            } else if (user.verified_at == null) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSend.setFail({
                    authentication: [{
                        message: "Authentication failed. User has not been verified."
                    }]
                }).send());
            } else {
                const payload = {
                    uid: user.id,
                    username: user.username,
                    name: user.name
                };
                const token = jwt.sign(payload, process.env.KEY);

                res.setHeader('Content-Type', 'application/json');
                res.send(JSend.setSuccess({
                    token: token
                }).send());

            }
        })(req, res);
    }
}

module.exports = authenticateUser