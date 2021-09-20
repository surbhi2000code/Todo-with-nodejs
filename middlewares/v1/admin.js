const ForbiddenError = require('../../errors/ForbiddenError');
const UnauthorizedError = require('../../errors/UnauthorizedError');

module.exports = {

    checkPassword: async (req, res, next) => {
        if ((req.query.app_password && req.query.app_password === App.env.APP_ADMIN_PASSWORD) || (req.body.app_password && req.body.app_password === App.env.APP_ADMIN_PASSWORD)) {
            return next();
        } else {
            throw new ForbiddenError();
        }
    },
    checkAdmin: async (req, res, next) => {
        if (req.auth.user && req.auth.user.is_admin) {
            return next();
        } else {
            throw new UnauthorizedError();
        }
    },
};