const express = require("express")
const router = express.Router()
const auth = require("./middleware/auth.middleware")
const controllers = require("./controller/todo.controller")
const isOwner = require("./middleware/isOwner")

router.get(
    "/",
    auth.decodeToken,
    controllers.getUserTodos
)

router.post(
    "/", auth.decodeToken,
    controllers.createTodo
)

router.get(
    "/:todoId",
    auth.decodeToken,
    isOwner,
    controllers.getTodo
)

router.post(
    "/:todoId",
    auth.decodeToken,
    isOwner,
    controllers.addTaskToTodo
)

router.delete(
    "/:todoId",
    auth.decodeToken,
    isOwner,
    controllers.removeTodo
)

router.delete(
    "/:todoId/:taskId",
    auth.decodeToken,
    isOwner,
    controllers.removeTodoTask
)

router.patch(
  "/:todoId/:taskId/completed",
  auth.decodeToken,
  isOwner,
  controllers.markTaskAsCompleted
)

router.patch(
  "/:todoId/:taskId/uncompleted",
  auth.decodeToken,
  isOwner,
  controllers.markTaskAsUnCompleted
)

module.exports = router
