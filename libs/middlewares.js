// passport
const passport = require("./passport_jwt");

function checkAuthJwt(req, res, next) {
    passport.authenticate('jwt', {
        session: false
    }, function (err, user, info) {
        if (err || !user) {
            res.setHeader('Content-Type', 'application/json');
            res.status(401);
            let apiRes = {
                status: "fail",
                data: {
                    token: "authorization error"
                }
            };

            return res.send(apiRes);
        }

        req.user = user;
        return next();
    })(req, res, next);
}

module.exports = {
    checkAuthJwt: checkAuthJwt
}