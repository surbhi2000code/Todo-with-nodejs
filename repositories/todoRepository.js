const Models = require("../models");
const {ToDoThing} = Models;
const BaseRepository = require("./BaseRepository");

class todoRepository extends BaseRepository {
    constructor(req) {
        super();
        this.req = req;
        this.model = ToDoThing;
    }
}

module.exports = todoRepository;