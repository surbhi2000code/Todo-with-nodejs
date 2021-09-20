const {TodoController} = require('../../controllers');
const todoPrefix = 'todo';

module.exports = {

    [`GET ${todoPrefix}/:todoId`]: {
        action: TodoController.single_todo,
        name: 'api.todo.single_todo',
        middlewares: [
            'user.jwtUser',
            'user.checkAdmin']
    },

    [`GET ${todoPrefix}`]: {
        action: TodoController.all_todo,
        name: 'api.todo.all_todo',
        middlewares: [
            'user.jwtUser',
            'user.checkAdmin'
        ]
    },

    [`POST ${todoPrefix}`]: {
        action: TodoController.create,
        name: 'api.todo.create',
        middlewares: [
            'user.jwtUser',
            'user.checkAdmin'
        ]
    },
    [`PUT ${todoPrefix}/:todoId`]: {
        action: TodoController.update,
        name: 'api.todo.update',
        middlewares: [
            'user.jwtUser',
            'user.checkAdmin'
        ]
    },

    [`DELETE ${todoPrefix}/:mentorId`]: {
        action: TodoController.delete,
        name: 'api.todo.delete',
        middlewares: [
            'user.jwtUser',
            'user.checkAdmin'
        ]
    },

};
