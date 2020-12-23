const { findById } = require("../../database/models/todo.model")
const Todo = require("../../database/models/todo.model")

class todo {
    static async getUserTodos(req, res, next) {
        const user = req.user
        try {
            const data = await Todo.findById({user: user._id})
            if (!data) throw Error("You do not have any todo list")
            return await res.json({
                "name": data.todoName,
                "id": data._id,
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async createTodo(req, res, next) {
        const user = req.user
        try {
            const { todoName } = req.body
            if (!todoName) throw Error("please file the todo list name")
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
            const { todoID } = req.params
            const foundTodo = Todo.findById(todoID)
            return await res.json(foundTodo)
            
        } catch (error) {
            next(error)
        }
    }

    static async addTaskToTodo(req, res, next) {
        try {
            const { taskName } = req.body;
            if (!taskName) throw Error("Task name can't be empty");
            const { todoID } = req.params;
            const foundID = await findById(todoID)
            const newTask = await foundID.tasks.push({ taskName })
            await newTask.save()
            return await res.status(201).json({
              newTask
            })
        } catch (error) {
            next(error)
        }
    }

    static async removeTodo(req, res, next) {
        try {
            const { todoID } = req.params
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
            const { todoID, taskID } = req.params
            const foundTodo = await Todo.findById(todoID)
            const filteredTasks = await foundTodo.tasks.filter((allTaskInTasks) => {
                allTaskInTasks !== taskID
            })
            await filteredTasks.save()
            return await res.json(filteredTasks)
        } catch (error) {
            next(error)
        }
    }

    static async markTaskAsCompleted(req, res, next) {
        try {
            const { taskID } = req.params
            const foundTodo = await Todo.findByIdAndUpdate(taskID, { "isCompleted": true }, { upsert: true})
            return await foundTodo
        } catch (error) {
            next(error)
        }
    }

    static markTaskAsUnCompleted(req, res, next) {
        try {
            console.log("mark as uncompleted")
        } catch (error) {
            next(error)
        }
    }
}

module.exports = todo