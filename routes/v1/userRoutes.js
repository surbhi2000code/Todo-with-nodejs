const {UserController} = require('../../controllers');
const userPrefix = 'user';

module.exports = {

    [`POST ${userPrefix}/create_admin`]: {
        action: UserController.createAdmin,
        name: 'api.user.createAdmin',
        middlewares: [
            "admin.checkPassword"
        ]
    },

    [`POST ${userPrefix}`]: {
        action: UserController.create,
        name: 'api.user.create',
        middlewares: []
    },

    [`POST ${userPrefix}/login`]: {
        action: UserController.login,
        name: 'api.user.login',
        middlewares: []
    },

    [`GET ${userPrefix}`]: {
        action: UserController.profile,
        name: 'api.user.profile',
        middlewares: [
            "auth.jwtUser",
            'user.checkLogin'
        ]
    },

    [`PUT ${userPrefix}`]: {
        action: UserController.updateProfile,
        name: 'api.user.update_profile',
        middlewares: [
            'auth.jwtUser',
            'user.checkLogin'
        ]
    },

    [`POST ${userPrefix}/forgot`]: {
        action: UserController.forgot,
        name: 'api.user.forgot',
        middlewares: []
    },

    [`POST ${userPrefix}/forgot_resend`]: {
        action: UserController.forgotResend,
        name: 'api.user.forgot_resend',
        middlewares: []
    },

    [`POST ${userPrefix}/forgot_reset`]: {
        action: UserController.forgotReset,
        name: 'api.user.forgot_reset',
        middlewares: []
    },

    [`POST ${userPrefix}/reset_password`]: {
        action: UserController.resetPassword,
        name: 'api.user.reset_password',
        middlewares: [
            "auth.jwtUser",
            'user.checkLogin'

        ]
    },

};