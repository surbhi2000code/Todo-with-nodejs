const {TodoTransformer} = require('../../transformers');
const BaseController = require('./BaseController');
const {TodoService} = require('../../services');

module.exports = {

    create: async (req, res) => {
        let todo = await new TodoService(req).create();
        if (todo) {
            let transformedData = await BaseController.getTransformedData(req, todo, TodoTransformer);
            return res.success(transformedData);
        } else {
            res.error(todo);
        }
    },
    update: async (req, res) => {
        let todo = await new TodoService(req).update();
        let transformedData = await BaseController.getTransformedData(req, todo, TodoTransformer);
        return res.success(transformedData);
    },
    all_todo: async (req, res) => {
        let todo = await new TodoService(req).all_todo();
        let transformedData = await BaseController.getTransformedDataWithPagination(req, todo, TodoTransformer);
        return res.success(transformedData);
    },

    single_todo: async (req, res) => {
        let todo = await new TodoService(req).single_todo();
        let transformedData = await BaseController.getTransformedData(req, todo, TodoTransformer);
        return res.success(transformedData);
    },

    delete: async (req, res) => {
        let todo = await new TodoService(req).delete();
        return todo.success ? res.success(todo) : res.error(todo);
    },
};
