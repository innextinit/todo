const Todo = require("../../database/models/todo.model")

class todo {
    static async getUserTodos(req, res, next) {
        const user = req.user
        try {
            const data = await Todo.find({"user": user._id})
            if (!data) throw Error("You do not have any todo list")
            return await res.json( data )
        } catch (error) {
            next(error)
        }
    }

    static async createTodo(req, res, next) {
        const user = req.user
        try {
            const { todoName } = req.body
            if (!todoName) throw Error("please fil the todo list name")
            const newTodo = new Todo({
                todoName,
                user: user._id
            })
            await newTodo.save()

            return await res.status(201).json({
                message: "Todo created successfully",
                newTodo
            })
        } catch (error) {
            next(error)
        }
    }

    static async getTodo(req, res, next) {
        try {
            const foundTodo = req.todo
            return await res.json(foundTodo)
            
        } catch (error) {
            next(error)
        }
    }

    static async addTaskToTodo(req, res, next) {
        try {
            const { taskName } = req.body;
            if (!taskName) throw Error("Task name can't be empty");
            const foundTodo = req.todo
            await foundTodo.tasks.push({taskName})
            await foundTodo.save()
            return await res.status(201).json(foundTodo.tasks)
        } catch (error) {
            next(error)
        }
    }

    static async removeTodo(req, res, next) {
        try {
            const todoID = req.todo._id
            const del = await Todo.findByIdAndDelete(todoID);
            return res.json({
              success: true,
              message: `${del.todoName} deleted successfully`
            })
        } catch (error) {
            next(error)
        }
    }

    static async removeTodoTask(req, res, next) {
        try {
            const { taskID } = req.params
            const foundTodo = req.todo
            await foundTodo.updateOne({ "tasks": foundTodo.tasks.filter((allTaskInTasks) => {
                return allTaskInTasks != taskID
            }) })            
            await foundTodo.save()
            return await res.json(foundTodo)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = todo