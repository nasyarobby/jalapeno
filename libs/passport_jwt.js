const passport = require("passport");
const PassportJwt = require("passport-jwt");
const JwtStrategy = PassportJwt.Strategy;
const ExtractJWT = PassportJwt.ExtractJwt;

let key = process.env.KEY;
if (key === undefined)
    throw new Error("Key for JWT is undefined");

passport.use(
    new JwtStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: key
        },
        function (jwtPayload, cb) {
            /*
            return UsersRepository.get(jwtPayload.uid)
                .then(query => {
                    if (query.results.length > 0) {
                        let user = query.results[0];
                        delete(user.password);
                        return cb(null, user);
                    }
                    else {
                        return cb(null, false);
                    }
                })
                .catch(err => {
                    return cb(err);
                });
            */
            if (jwtPayload.uid && jwtPayload.email && jwtPayload.name)
                return cb(null, {
                    id: jwtPayload.uid,
                    email: jwtPayload.email,
                    name: jwtPayload.name
                });
            else
                return cb(null, false);
        }
    )
);

module.exports = passport;