const BaseTransformer = require('../BaseTransformer');
const {User} = require('../../models');

class UserTransformer extends BaseTransformer {

    constructor(req, data, transformOptions = null) {
        super(req, data, transformOptions);
        this.model = User;
    }

    async transform(user) {
        user = await user;

        let returnVal = App.helpers.cloneObj({
            first_name: user.first_name,
            id: user.id,
            email: user.email,
            last_name: user.last_name,
            role: user.role,
            password: user.password,
            is_active: user.is_active,
            is_admin: user.is_admin,
            last_login_at_formatted: App.helpers.formatDate(user.last_login_at),
            last_login_at: user.last_login_at
        });

        return returnVal;
    }

}

module.exports = UserTransformer;