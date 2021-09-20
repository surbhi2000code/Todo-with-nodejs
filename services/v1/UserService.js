const {UserValidator} = require('../../validators');
const {UserRepository, UserOtpRepository} = require('../../repositories');
const {User} = require('../../models')
const {
    USER_MAX_OTP,
    USER_MAX_OTP_RESEND,
    USER_OTP_EXPIRY_TIME,
    USER_OTP_VERIFY,
    USER_OTP_FORGOT_PASSWORD,
    USER_OTP_EXPIRED,
    USER_OTP_RESENT,
    USER_MAX_OTP_LIMIT_REACHED,
    USER_OTP_SENT,
    USER_INVALID_OTP,
    USER_NOT_EXIST,
    USER_PASSWORD_RESET
} = require("../../values");
const {Op} = require("sequelize");

class UserService {

    /**
     * Initializing common properties
     */
    constructor(req) {
        this.req = req;
        this.UserValidator = new UserValidator();
        this.UserRepository = new UserRepository(req);
        this.UserOtpRepository = new UserOtpRepository(req);
    }

    async validateOtp(validInputs) {
        let latestOtp = await this.UserOtpRepository.getBy({
            email: validInputs.email,
            otp: validInputs.otp,
            is_active: true
        });
        if (latestOtp && App.moment(`${latestOtp.dataValues.modified_at}`) > App.moment().subtract(USER_OTP_EXPIRY_TIME, 'minutes')) {
            let otpObj = await this.UserOtpRepository.get(latestOtp.dataValues.id, false);
            otpObj.update({is_active: false});
            return {success: true};
        } else if (latestOtp) {
            return {success: false, message: USER_OTP_EXPIRED};
        } else {
            return {success: false, message: USER_INVALID_OTP};
        }
    }

    async createAdmin() {
        let validInputs = await this.UserValidator.validate(this.req.body, "create_admin");
        return {message: await this.UserRepository.create(validInputs)};
    }

    async create() {
        let validInputs = await this.UserValidator.validate(this.req.body, "create");
        return {message: await this.UserRepository.create(validInputs)};
    }

    async updateUser() {
        let validInputs = await this.UserValidator.validate(this.req.body, "update_profile");
        await this.UserRepository.update(validInputs, {where: {id: this.req.auth.user.id, is_active: true}});
        return this.UserRepository.get(this.req.auth.user.id, false);
    }

    async generateOtp(validInputs, otpType = USER_OTP_VERIFY) {
        validInputs.otp_type = otpType;
        let successResponse = {success: true, message: USER_OTP_SENT};
        let latestOtp = await this.UserOtpRepository.getBy({
            email: validInputs.email,
            is_active: true
        });
        if (latestOtp) {
            let otpData = latestOtp.dataValues;
            if (otpData.count >= (USER_MAX_OTP - 1) && App.moment(`${otpData.modified_at}`) > App.moment().startOf('day')) {
                return {success: false, message: USER_MAX_OTP_LIMIT_REACHED};
            } else if (App.moment(`${otpData.modified_at}`) > App.moment().startOf('day')) {
                let otpObj = await this.UserOtpRepository.get(otpData.id, false);
                otpObj.update({
                    count: otpData.count ? otpData.count + 1 : 1,
                    resend_count: 0
                });
                return successResponse;
            } else {
                let otpObj = await this.UserOtpRepository.get(otpData.id, false);
                otpObj.update({is_active: false});
                await this.UserOtpRepository.create(validInputs);
                return successResponse;
            }
        } else {
            await this.UserOtpRepository.create(validInputs);
            return successResponse;
        }
    }

    async resendGenerated(validInputs) {
        let latestOtp = await this.UserOtpRepository.getBy({
            email: validInputs.email,
            is_active: true
        });
        if (latestOtp) {
            let otpData = latestOtp.dataValues;
            if (otpData.resend_count >= (USER_MAX_OTP_RESEND) && App.moment(`${otpData.modified_at}`) > App.moment().startOf('day')) {
                return {success: false, message: USER_MAX_OTP_LIMIT_REACHED};
            } else if (App.moment(`${otpData.modified_at}`) > App.moment().subtract(USER_OTP_EXPIRY_TIME, 'minutes')) {
                let otpObj = await this.UserOtpRepository.get(otpData.id, false);
                otpObj.update({resend_count: otpData.resend_count ? otpData.resend_count + 1 : 1});
                return {success: true, message: USER_OTP_RESENT};
            } else {
                return {success: false, message: USER_OTP_EXPIRED};
            }
        } else {
            return {success: false, message: USER_OTP_EXPIRED};
        }
    }

    async login() {
        let validInputs = await this.UserValidator.validate(this.req.body, "login");
        let userObj = await this.UserRepository.getBy({
            email: validInputs.email,
            is_active: true
        }, false, false);
        if (userObj) {
            let user = await userObj.comparePassword(validInputs.password);
            let token = await userObj.getJWT();
            this.UserRepository.update({
                last_login_at: new Date(),
            }, {
                where: {
                    id: userObj.dataValues.id,
                }
            });
            return {success: true, token: token, user: user}
        }
        return {success: false, message: USER_NOT_EXIST}
    }

    async forgot() {
        let validInputs = await this.UserValidator.validate(this.req.body, "forgot");
        let userObj = await this.UserRepository.getBy({email: validInputs.email}, false, false);
        if (userObj) {
            return this.generateOtp(validInputs, USER_OTP_FORGOT_PASSWORD);
        }
        return {success: false, message: USER_NOT_EXIST}
    }

    async forgotResend() {
        let validInputs = await this.UserValidator.validate(this.req.body, "forgot");
        let userObj = await this.UserRepository.getBy({email: validInputs.email}, false, false);
        if (userObj) {
            return this.resendGenerated(validInputs);
        }
        return {success: false, message: USER_NOT_EXIST}
    }

    async forgotReset() {
        let validInputs = await this.UserValidator.validate(this.req.body, "forgot_password");
        let checkOtp = await this.validateOtp(validInputs);
        if (checkOtp.success) {
            let user = await this.UserRepository.getBy({
                is_active: true,
                email: validInputs.email
            });
            await user.update({password: validInputs.password});
            checkOtp.message = USER_PASSWORD_RESET;
        }
        return checkOtp;
    }

    async resetPassword() {
        let userId = this.req.auth.user.dataValues.id;
        let validInputs = await this.UserValidator.validate(this.req.body, "reset_password");
        let userObj = await this.UserRepository.getBy({id: userId, is_active: true}, false, false);
        if (userObj && await userObj.comparePassword(validInputs.password)) {
            await userObj.update({password: validInputs.new_password}, {
                where: {
                    is_active: true,
                    id: userId
                }
            });
            return {success: true, message: USER_PASSWORD_RESET};
        }
        return {success: false, message: USER_NOT_EXIST};
    }



}

module.exports = UserService;