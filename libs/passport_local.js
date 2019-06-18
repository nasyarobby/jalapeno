const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {
    compareHash
} = require("./hash")

passport.use(
    new LocalStrategy({
            usernameField: 'login',
            passwordField: 'password'
        },
        function (login, password, cb) {
            var User = require("./../models/user_model");
            return User
                .query()
                .where('username', login)
                .then(users => {
                    if (users.length > 0 && compareHash(password, users[0].password)) {
                        let user = users[0]
                        delete(user.password);

                        // if the user is not verified, return it to the routes and let it reject the authentication

                        return cb(null, user);
                    } else {
                        return cb(null, false);
                    }
                })
                .catch(error => {
                    cb(error);
                })
        }
    )
);

module.exports = passport;