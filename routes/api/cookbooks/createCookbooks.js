const JSend = new(require("../../../libs/jsend"))();
const Cookbook = require("../../../models/cookbook_model");
const User = require('../../../models/user_model')

const jwt   = require('jsonwebtoken');

function putCookbooks(req, res) {
    console.log(req.body)
    console.log(req.user)
    let name = req.body.name;
    let category = req.body.category;
    let user_id = req.user.id
    Cookbook.query()
        .insertAndFetch({
            user_id: user_id,
            cookbook_name: name,
            category: category
        })
    //let info = jwt.decode(req.agent.Authorization)
    //console.log(info)
}

//         .insertAndFetch({
//             email: email,
//             username: username,
//             password: password,
//             name: name,
//             verification_code: hashCode(date.toString()) + hashCode(username + date.toString()) + hashCode(email + date.toString()) + hashCode(name + date.toString()),
//             verification_code_expired_at: date
//         })

// async function createNewUser(errors, data, req, res) {
//     let {
//         email,
//         username,
//         password,
//         name
//     } = data;

//     let date = new Date();
//     date.setDate(date.getDate() + 1);

//     return User.query()
//         .runBefore(() => {
//             if (errors.email.length > 0 || errors.username.length > 0 || errors.password.length > 0 || errors.name.length > 0) {
//                 throw new ValidationError({
//                     message: 'Validation Error',
//                     type: 'ValidationError',
//                     data: errors
//                 })
//             }
//         })
//         .insertAndFetch({
//             email: email,
//             username: username,
//             password: password,
//             name: name,
//             verification_code: hashCode(date.toString()) + hashCode(username + date.toString()) + hashCode(email + date.toString()) + hashCode(name + date.toString()),
//             verification_code_expired_at: date
//         })
//         .catch(error => {
//             if (error.name == "ValidationError") {
//                 res.setHeader('Content-Type', 'application/json');
//                 res.send(JSend.setFail(error.data).send());
//             } else if (error.errno == 1062) {
//                 console.log(error);
//                 res.send("username/email exists");
//             } else {
//                 console.log(error);
//                 res.send("Error occured.");
//             }
//         })
// }

module.exports = putCookbooks;