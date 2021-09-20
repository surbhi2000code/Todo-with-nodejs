const passport = require('passport');
const models = require('../models');

module.exports = function (app) {

    app.use((req, res, next) => {
        passport.authenticate(['userStrategy'], {session: false}, function (err, user) {
            if (err) {
                return next(err);
            }
            req['auth'] = {
                isLoggedIn: !!(user),
            };
            req.auth.user = user;
            return next();
        })(req, res, next);

        });
};