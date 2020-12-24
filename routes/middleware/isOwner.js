const Todo = require("../../database/models/todo.model")

class isOwner {
    static async isOwner(req, res, next) {
        const { todoID } = req.params
        const user = req.user._id.toString()
        try {
            const todo = await Todo.findById(todoID);
            if (!todo) throw Error("Todolist not found")
            const todoCreator = todo.user.toString()
            if (todoCreator === user) {
                req.todo = todo;
                next();
            } else {
                throw Error("You do not own this todo list")
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = isOwner