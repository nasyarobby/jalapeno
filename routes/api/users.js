const JSend = new(require("../../libs/jsend"))();
const express = require('express')
const router = express.Router()
const User = require('../../models/user_model.js')
const bcrypt = require("bcryptjs");
const {
    ValidationError
} = require('objection');


function hash(text) {
    return bcrypt.hashSync(text, bcrypt.genSaltSync(10));
}

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

module.exports = {
    router: router
};