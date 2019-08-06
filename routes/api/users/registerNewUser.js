const User = require('../../../models/user_model')
const sendVerificationCode = require("./sendVerificationCode")
const hashCode = require("./hashCode")
const JSend = new(require("../../../libs/jsend"))();
const hash = require("./../../../libs/hash").hash;
const {
    ValidationError
} = require('objection');

async function registerNewUser(req, res) {
    let errors = {
        username: [],
        password: [],
        email: [],
        name: []
    }

    let email = req.body.email ? req.body.email.trim() : req.body.email;
    let username = req.body.username ? req.body.username.trim().toLowerCase() : req.body.username;
    let name = req.body.name ? req.body.name.trim() : req.body.name;
    let password = req.body.password;

    errors.email = await validateEmail(email);
    errors.username = await validateUsername(username)
    errors.name = await validateName(name);
    errors.password = await validatePassword(password);

    let newUser = await createNewUser(errors, {
        email: email,
        username: username,
        name: name,
        password: hash(password)
    }, req, res);
    if (newUser) {
        sendVerificationCode(username, email, name, newUser.verification_code);
        delete newUser.password;
        delete newUser.verification_code;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSend.setSuccess(newUser).send());
    }
}

/**ASYNC VALIDATION FUNCTIONS */

async function validateEmail(email) {
    let errors = []

    if (!email) {
        errors.push({
            message: "email is required."
        })
    } else if (!/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email.toLowerCase())) {
        errors.push({
            message: "email is invalid."
        })
    } else {
        let user = await getUserByEmail(email);

        if (user.length > 0) {
            errors.push({
                message: "email is already registered."
            })
        }
    }

    return errors;
}

async function validateUsername(username) {
    let errors = [];

    if (!username) {
        errors.push({
            message: "username is required."
        })
    } else if (!/^[a-zA-Z0-9_]*$/i.test(username)) {
        errors.push({
            message: "username is invalid."
        })
    } else if (username.length < 5) {
        errors.push({
            message: "username is too short (min. 5 characters)."
        })
    } else if (username.length > 25) {
        errors.push({
            message: "username is too long (max. 25 characters)."
        })
    } else {
        let user = await getUserByUsername(username)
        if (user.length > 0) {
            errors.push({
                message: "username is already registered."
            })
        }
    }
    return errors;
}

async function validateName(name) {
    let errors = []
    if (!name) {
        errors.push({
            message: "name is required."
        })
    }

    return errors;
}

async function validatePassword(password) {
    let errors = []
    if (!password) {
        errors.push({
            message: "password is required."
        })
    } else if (password[0] == " " || password[password.length - 1] == "") {
        errors.push({
            message: "Password cannot start/end with space."
        })
    } else if (password.length < 6) {
        errors.push({
            message: "Password is too short (min 6 characters)."
        })
    } else {
        password = hash(password);
    }
    return errors;
}

/**ASYNC DB OPERATIONS */

async function getUserByEmail(email) {
    return User.query().where('email', email)
}

async function getUserByUsername(username) {
    return User.query().where('username', username)
}

async function createNewUser(errors, data, req, res) {
    let {
        email,
        username,
        password,
        name
    } = data;

    let date = new Date();
    date.setDate(date.getDate() + 1);

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