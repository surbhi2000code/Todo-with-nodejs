const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const {User} = require('../models');

let jwtUserOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: App.env.JWT_USER_SECRET,
};



const userStrategy = new JWTStrategy(jwtUserOptions, function (jwtPayload, next) {
    // usually this would be a database call:
    User.findByPk(jwtPayload.id)
        .then((user) => {
            if (user) {
                return next(null, user);
            } else {
                return next(null, false);
            }
        }).catch((err) => {
        return next(err);
    });
});



passport.use('userStrategy', userStrategy);
