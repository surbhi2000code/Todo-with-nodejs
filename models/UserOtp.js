'use strict';
const BaseModel = require("./BaseModel");
const {send_mail_from_template} = require("../helpers/email");
const {USER_VERIFICATION_MAIL_SUBJECT} = require("../values");

class UserOtp extends BaseModel {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                autoIncrement: true,
                unsigned: true,
                zeroFill: true,
                primaryKey: true,
                field: 'id'
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'email'
            },
            otp_type: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'otp_type'
            },
            otp: {
                type: DataTypes.BIGINT,
                allowNull: true,
                unsigned: true,
                field: 'otp'
            },
            resend_count: {
                type: DataTypes.INTEGER,
                allowNull: true,
                unsigned: true
            },
            count: {
                type: DataTypes.INTEGER,
                allowNull: true,
                unsigned: true
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                unsigned: true,
                field: 'is_active'
            },
        }, {
            sequelize: sequelize,
            modelName: 'UserOtp',
            tableName: 'userOtp',
            timestamps: true,
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'modified_at'
        });
    };

    static hooks(models) {
        models.UserOtp.addHook('beforeSave', createOtp);
    }

    static associate(models) {
        this.addScope('defaultScope', {
            order: [['id', 'DESC']],
        }, {override: true});
    }
}

let createOtp = (userOtp) => {
    if (userOtp.is_active !== false && (!userOtp.resend_count || !userOtp.changed('resend_count'))) {
        userOtp.otp = Math.floor(100000 + Math.random() * 900000);
    }
    if (userOtp.is_active !== false)
        send_mail_from_template("userRegistration.ejs", {otp: userOtp.otp},
            '"MentoringBack" '+ App.env.EMAIL_FROM, userOtp.email, USER_VERIFICATION_MAIL_SUBJECT);
};

module.exports = UserOtp;