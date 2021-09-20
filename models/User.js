'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');
const {to} = require('../helpers/global_functions');
const ValidationError = require('../errors/ValidationError');
const BaseModel = require("./BaseModel");

class User extends BaseModel {
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
            first_name: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'first_name'
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'last_name'
            },

            role: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'role'
            },

            email: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {isEmail: {msg: "Email Id is invalid."}},
                field: 'email'
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'password'
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                field: 'is_active'
            },
            is_admin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                field: 'is_admin'
            },
            last_login_at: {
                type: DataTypes.DATE(3),
            },
        }, {
            sequelize: sequelize,
            modelName: 'User',
            tableName: 'users',
            timestamps: true,
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'modified_at'
        });
    };

    static hooks(models) {
        models.User.addHook('beforeSave', async (user) => {
            let err;
            if (user.changed('password')) {
                let salt, hash;
                [err, salt] = await to(bcrypt.genSalt(10));
                if (err) throw new ValidationError({}, err.message, true);

                [err, hash] = await to(bcrypt.hash(user.password, salt));
                if (err) throw new ValidationError({}, err.message, true);

                user.password = hash;
            }
        });
    }

    async comparePassword(pw) {
        let err, pass;
        if (!this.password) throw new ValidationError({}, 'password not set');

        [err, pass] = await to(bcrypt_p.compare(pw, this.password));
        if (err) throw new ValidationError({}, err);

        if (!pass) throw new ValidationError({"password": ["Invalid Password"]}, 'invalid password');

        return this;
    }

    async getJWT() {
        let expiration_time = parseInt(App.env.JWT_EXPIRATION);
        let payload = {
            id: this.id,
            user: true,
            email: this.email,
            first_name: this.first_name,
            last_name: this.last_name
        };
        return "Bearer " + jwt.sign(payload, App.env.JWT_USER_SECRET, {expiresIn: expiration_time});
    }

    static associate(models) {
        this.addScope('defaultScope', {
            order: [['id', 'DESC']],
        }, {override: true});
    }
}

User.fillables = [
    'first_name',
    'last_name',
    'role',
    'email',
    'password'
];
User.hidden = ['id', 'password', 'last_login_at'];

module.exports = User;