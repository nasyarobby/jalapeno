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

router.get("/users/:id", getUserById)
router.get('/users', getAllUsers)
router.put('/users/register', registerNewUser)
router.post("/users/verify-email", verifyEmail)
router.post("/users/login", authenticateUser)
router.post("/users/verify-email/resend-code", resendEmailVerificationCode)

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

function getAllUsers(req, res) {
    User.query()
        .then(users => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSend.setSuccess(users).send());
        })
}

function registerNewUser(req, res) {
    let date = new Date();
    date.setDate(date.getDate() + 1);

    let errors = {
        username: [],
        password: [],
        email: [],
        name: []
    }

    let email = req.body.email ? req.body.email.trim() : req.body.email;
    let promises = [];

    if (!email) {
        errors.email.push({
            message: "email is required."
        })
    } else if (!/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email.toLowerCase())) {
        errors.email.push({
            message: "email is invalid."
        })
    } else {
        promises.push(User.query().where('email', email).then(user => {
            if (user.length > 0) {
                errors.email.push({
                    message: "email is already registered."
                })
            }
        }))
    }

    let username = req.body.username ? req.body.username.trim() : req.body.username;

    if (!username) {
        errors.username.push({
            message: "username is required."
        })
    } else if (!/^[a-zA-Z0-9_]*$/i.test(username)) {
        errors.username.push({
            message: "username is invalid."
        })
    } else {
        promises.push(User.query().where('username', username).then(user => {
            if (user.length > 0) {
                errors.username.push({
                    message: "username is already registered."
                })
            }
        }))
    }

    let name = req.body.name ? req.body.name.trim() : req.body.name;
    if (!name) {
        errors.name.push({
            message: "name is required."
        })
    }
    let password = req.body.password;

    if (!password) {
        errors.password.push({
            message: "password is required."
        })
    } else if (password[0] == " " || password[password.length - 1] == "") {
        errors.password.push({
            message: "Password cannot start/end with space."
        })
    } else {
        password = hash(password);
    }

    Promise.all(promises)
        .then(() => {
            return User.query()
                .runBefore(() => {
                    if (errors.email.length > 0 || errors.username.length > 0 || errors.password.length > 0 || errors.name.length > 0) {
                        throw new ValidationError({
                            message: 'Validation Error',
                            type: 'ValidationError',
                            data: errors
                        })
                    }
                })
                .insertAndFetch({
                    email: email,
                    username: username,
                    password: password,
                    name: name,
                    verification_code: hashCode(date.toString()) + hashCode(username + date.toString()) + hashCode(email + date.toString()) + hashCode(name + date.toString()),
                    verification_code_expired_at: date
                })
        })
        .then(users => {
            //send verification code
            sendVerificationCode(username, email, name, users.verification_code);
            delete users.password;
            delete users.verification_code;
            res.setHeader('Content-Type', 'application/json');
            res.send(JSend.setSuccess(users).send());
        })
        .catch(error => {
            if (error.name == "ValidationError") {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSend.setFail(error.data).send());
            } else if (error.errno == 1062) {
                console.log(error);
                res.send("username/email exists");
            } else {
                console.log(error);
                res.send("Error occured.");
            }

        })
}

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
}

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

function hashCode(str) {
    var hash = 0;
    if (str.length == 0) {
        return hash;
    }
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
}


function sendVerificationCode(username, to, name, code, resend = false) {
    if (process.env.NODE_ENV == "test" || !process.env.SMTP_HOST)
        return;

    const nodemailer = require("nodemailer");

    let config = {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE_MODE == "true" ? true : false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    }

    let verificationCodeLink = process.env.HOST + "/verify-email/" + to + "/" + code;

    let html = `<p>Hi, ${name}.</p>
    <p>Thank you for signing up.</p>
    <p>Your username is ${username}</p>
    <p>Please click the following link to verify your email address.</p>
    <p><a href="${verificationCodeLink}">${verificationCodeLink}</a></p>`

    let html2 = `<p>Hi, ${name}.</p>
    <p>Your username is ${username}</p>
    <p>Please click the following link to verify your email address.</p>
    <p><a href="${verificationCodeLink}">${verificationCodeLink}</a></p>`

    let email = {
        from: "no-reply@jalapeno.app",
        to: to,
        subject: resend ? "Verify your email address" : "Thank you for signing up at Jalapeno!",
        "html": resend ? html2 : html,
        "text": resend ? html2 : html
    }

    let transporter = nodemailer.createTransport(config);

    transporter.sendMail(email, function (err, info) {
        if (err)
            console.log(err);
        console.log(info);
    });
}

module.exports = {
    router: router
};