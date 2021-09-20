const UnauthorizedError = require('../../errors/UnauthorizedError');

module.exports = {

    checkLogin: async (req, res, next) => {
        if (req.auth.user) {
            return next();
        } else {
            throw new UnauthorizedError();
        }
    },

};