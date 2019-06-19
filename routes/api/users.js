const JSend = new(require("../../libs/jsend"))();
const express = require('express')
const router = express.Router()
const User = require('../../models/user_model.js')
const hash = require("./../../libs/hash").hash;
const {
    ValidationError
} = require('objection');

var passport = require("./../../libs/passport_local");
const jwt = require('jsonwebtoken');

router.get("/users/:id", (req, res) => {
    User
        .query()
        .where('id', req.params.id)
        .then(users => {
            let user = users[0];
            delete user.password;
            res.setHeader('Content-Type', 'application/json');
            res.send(JSend.setSuccess(user).send());
        })
})

router.get('/users', (req, res) => {
    User.query()
        .then(users => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSend.setSuccess(users).send());
        })
})

router.put('/users/register', (req, res) => {
    User
        .query()
        .runBefore(() => {
            if (req.body.password[0] == " " || req.body.password[req.body.password.length - 1] == 0) {
                throw new ValidationError({
                    type: "ModelValidation",
                    data: {
                        password: [{
                            message: "Password cannot start/end with space."
                        }]
                    }
                })
            }
        })
        .insert({
            email: req.body.email ? req.body.email.trim() : req.body.email,
            username: req.body.username ? req.body.username.trim() : req.body.username,
            password: hash(req.body.password),
            name: req.body.name ? req.body.name.trim() : req.body.name
        })
        .then(users => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSend.setSuccess(users).send());
        })
        .catch(error => {
            if (error.name == "ValidationError") {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSend.setFail(error.data).send());
            } else if (error.errno == 1062)
                res.send("username/email exists");
            else {
                console.log(error);
                res.send("Error occured.");
            }

        })
})

router.post("/users/verify", (req, res) => {
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
})

router.post("/users/login", (req, res) => {
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
                    email: user.email,
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
})

module.exports = {
    router: router
};