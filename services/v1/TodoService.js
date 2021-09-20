const {TodoValidator} = require('../../validators');
const {todoRepository} = require('../../repositories');
const {
    USER_TODO_DELETED,
    USER_TODO_NOT_FOUND,
} = require("../../values");


class TodoService {
    /**
     * Initializing common properties
     */
    constructor(req) {
        this.req = req;
        this.TodoValidator = new TodoValidator();
        this.todoRepository = new todoRepository(req);
    }

    async create() {
        let validInputs = await this.TodoValidator.validate(this.req.body, "create");
        let todo = await this.todoRepository.create(validInputs);
        return todo
    }

    async update() {
        let validInputs = await this.TodoValidator.validate(this.req.body, "update");
        let todo = await this.todoRepository.get(this.req.params.todoId);
        await todo.update(validInputs);
        return todo;
    }

    async all_todo() {
        let todo = this.todoRepository.paginate({
                where: {
                    is_active: true
                }
            }, null,
        );
        return todo;
    }

    async single_todo() {
        let settingsAttributes = ['id', 'value'], stateAttributes = ["id", "name"];
        return this.todoRepository.get(this.req.params.todoId, {});
    }

    async delete() {
        let todo = await this.todoRepository.update({is_active: false}, {
            where: {
                id: this.req.params.todoId,
                is_active: true
            }
        });
        if (todo[0]) return {success: true, message: USER_TODO_DELETED};
        else return {success: false, message: USER_TODO_NOT_FOUND};
    }

}

module.exports = TodoService;