const {UserTransformer} = require('../../transformers');
const BaseController = require('./BaseController');
const {UserService} = require('../../services');

module.exports = {

    createAdmin: async (req, res) => {
        let user = await new UserService(req).createAdmin();
        if (user.success) {
            let transformedData = await BaseController.getTransformedData(req, user.message, UserTransformer);
            return res.success(transformedData);
        } else {
            res.error(user);
        }
    },

    create: async (req, res) => {
        let user = await new UserService(req).create();
        if (user.success) {
            let transformedData = await BaseController.getTransformedData(req, user.message, UserTransformer);
            return res.success(transformedData);
        } else {
            res.error(user);
        }
    },

    updateProfile: async (req, res) => {
        let User = await new UserService(req).updateUser();
        let transformedData = await BaseController.getTransformedData(req, User, UserTransformer);
        return res.success(transformedData);
    },

    login: async (req, res) => {
        let result = await new UserService(req).login();
        result.user = await BaseController.getTransformedData(req, result.user, UserTransformer);
        return result.success ? res.success(result) : res.error(result);
    },

    profile: async (req, res) => {
        let result = await BaseController.getTransformedData(req, req.auth.user, UserTransformer);
        return res.success(result);
    },

    forgot: async (req, res) => {
        let result = await new UserService(req).forgot();
        return result.success ? res.success(result) : res.error(result);
    },

    forgotResend: async (req, res) => {
        let result = await new UserService(req).forgotResend();
        return result.success ? res.success(result) : res.error(result);
    },

    forgotReset: async (req, res) => {
        let result = await new UserService(req).forgotReset();
        return result.success ? res.success(result) : res.error(result);
    },

    resetPassword: async (req, res) => {
        let result = await new UserService(req).resetPassword();
        return result.success ? res.success(result) : res.error(result);
    },

};