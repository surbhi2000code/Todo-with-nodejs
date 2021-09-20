const Validator = require('../Validator');

class UserValidator extends Validator {
    /**
     * Validation rules.
     *
     * @param  string type
     * @param  array data
     * @return Object
     */
    getRules(type, data = {}) {

        let rules = {};

        switch (type) {
            case 'otp':
                rules = {
                    email: 'required|unique:User,email|email'
                };
                break;


            case 'forgot':
                rules = {
                    email: 'required|email'
                };
                break;

            case 'forgot_password':
                rules = {
                    email: 'required|email',
                    otp: 'required|integer|digits:6',
                    password: 'required|min:8',
                };
                break;

            case 'reset_password':
                rules = {
                    password: 'required|min:8',
                    new_password: 'required|min:8',
                };
                break;

            case 'login':
                rules = {
                    email: 'required|email',
                    password: 'required|min:6'
                };
                break;

            case 'create':
                rules = {
                    first_name: 'required|string|max:255',
                    last_name: 'required|string|max:255',
                    role: 'required|string|max:255',
                    email: `required|unique:User,email|email`,
                    password: 'required|min:6|max:255',
                };
                break;

            case 'create_admin':
                rules = {
                    first_name: 'required|string|max:255',
                    last_name: 'required|string|max:255',
                    role: 'required|string|max:255',
                    email: `required|unique:User,email|email`,
                    is_admin: 'required'

                };
                break;

            case 'update_profile':
                rules = {
                    first_name: 'required|string|max:255',
                    last_name: 'required|string|max:255',
                    role: 'required|string|max:255',

                };
                break;
        }
        return rules;
    }

    allowedKeys(type, data = {}) {
        let keys = [];

        switch (type) {
            case 'update_profile':
                keys = keys.concat([
                    'first_name',
                    'last_name',
                    'role',
                ]);
                break;
            case 'create_admin':
                keys = keys.concat([
                    'first_name',
                    'last_name',
                    'role',
                    'email',
                    'is_admin',

                ]);
                break;
            case 'create':
                keys = keys.concat([
                    'first_name',
                    'last_name',
                    'role',
                    'password',
                    'email',
                ]);
                break;

        }
        return keys;
    }
}

module.exports = UserValidator;