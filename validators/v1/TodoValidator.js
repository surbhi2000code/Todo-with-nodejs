const Validator = require('../Validator');

class TodoValidator extends Validator {
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
            case 'create':
                rules = {
                    todo_thing: 'required|string|max:255',
                    do_date: 'required|datetime|unique: ToDoThing,do_date',
                    do_time: 'required|datetime|unique: ToDoThing,do_time',

                };
                break;

            case 'update':
                rules = {
                    todo_thing: 'required|string|max:255',
                    do_date: 'required|datetime|unique: ToDoThing,do_date',
                    do_time: 'required|datetime|unique: ToDoThing,do_time',

                };
                break;

        }
        return rules;
    }

    allowedKeys(type, data = {}) {
        let keys = [];

        switch (type) {
            case 'update':
                keys = keys.concat([
                    'todo_thing',
                    'do_date',
                    'do_time',

                ]);
                break;

            case 'create':
                keys = keys.concat([
                    'todo_thing',
                    'do_date',
                    'do_time',
                ]);
                break;

        }
        return keys;
    }
}

module.exports = TodoValidator;