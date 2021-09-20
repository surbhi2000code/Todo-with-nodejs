const Models = require("../models");
const {UserOtp} = Models;
const BaseRepository = require("./BaseRepository");

class UserOtpRepository extends BaseRepository {
    constructor(req) {
        super();
        this.req = req;
        this.model = UserOtp;
    }
}

module.exports = UserOtpRepository;