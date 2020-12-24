const express = require('express');
const router = express.Router();
const auth = require("../routes/middleware/auth.middleware")
const controller = require("../routes/controller/index.controller")

router.get(
  "/",
  controller.home
)

router.post(
  "/register",
  controller.newUser
)

router.post(
  "/login",
  controller.login
)

router.put(
  "/",
  auth.decodeToken,
  controller.userUpdate
)

router.delete(
  "/:id",
  auth.decodeToken,
  controller.delUser
)

module.exports = router;
