const User = require('../../../models/user_model')
const sendVerificationCode = require("./sendVerificationCode")
const hashCode = require("./hashCode")
const JSend = new(require("../../../libs/jsend"))();
const hash = require("./../../../libs/hash").hash;
const {
    ValidationError
} = require('objection');

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

module.exports = registerNewUser;