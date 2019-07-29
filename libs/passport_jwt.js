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
            if (jwtPayload.uid && jwtPayload.username && jwtPayload.name)
                return cb(null, {
                    id: jwtPayload.uid,
                    username: jwtPayload.username,
                    name: jwtPayload.name
                });
            else
                return cb(null, false);
        }
    )
);

module.exports = passport;