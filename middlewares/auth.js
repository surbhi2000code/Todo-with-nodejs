const passport = require('passport');

module.exports = {

    jwtUser: passport.authenticate('userStrategy', {session: false}),
};