const { findById } = require("../../database/models/todo.model")
const Todo = require("../../database/models/todo.model")

class todo {
    static async getUserTodos(req, res, next) {
        const user = req.user
        try {
            console.log(user)
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
            const newTask = await foundTodo.tasks.push( taskName )
            // await newTask.save()
            return await res.status(201).json({
              newTask
            })
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
            const filteredTasks = await foundTodo.tasks.filter((allTaskInTasks) => {
                allTaskInTasks != taskID
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
            const foundTodoTask = await Todo.findByIdAndUpdate(taskID, { "isCompleted": true }, { upsert: true })
            return  await res.json(foundTodoTask)
        } catch (error) {
            next(error)
        }
    }

    static async markTaskAsUnCompleted(req, res, next) {
        try {
            const { taskID } = req.params
            const foundTodoTask = await Todo.findByIdAndUpdate(taskID, { "isCompleted": false }, { upsert: true })
            return  await res.json(foundTodoTask)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = todo