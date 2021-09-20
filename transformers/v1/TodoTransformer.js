const BaseTransformer = require('../BaseTransformer');
const {ToDoThing} = require('../../models');

class TodoTransformer extends BaseTransformer {

    constructor(req, data, transformOptions = null) {
        super(req, data, transformOptions);
        this.model = ToDoThing;
    }

    async transform(todo) {
        todo = await todo;

        let returnVal = App.helpers.cloneObj({
            id: todo.id,
            todo_thing: todo.todo_thing,
            do_date: todo.do_date,
            do_time: todo.do_time,
        });

        return returnVal;
    }

}

module.exports = TodoTransformer;