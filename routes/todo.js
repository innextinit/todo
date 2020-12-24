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
    "/:todoID",
    auth.decodeToken,
    isOwner.isOwner,
    controllers.getTodo
)

router.post(
    "/:todoID",
    auth.decodeToken,
    isOwner.isOwner,
    controllers.addTaskToTodo
)

router.delete(
    "/:todoID",
    auth.decodeToken,
    isOwner.isOwner,
    controllers.removeTodo
)

router.delete(
    "/:todoID/:taskID",
    auth.decodeToken,
    isOwner.isOwner,
    controllers.removeTodoTask
)

router.patch(
  "/:todoId/:taskId/completed",
  auth.decodeToken,
  isOwner.isOwner,
  controllers.markTaskAsCompleted
)

router.patch(
  "/:todoId/:taskId/uncompleted",
  auth.decodeToken,
  isOwner.isOwner,
  controllers.markTaskAsUnCompleted
)

module.exports = router
