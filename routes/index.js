var express = require('express');
var router = express.Router();

const auth = require("../routes/middleware/auth.middleware")
const controller = require("../routes/controller/index.controller")

/* GET home page. */
router.post(
  "/register",
  controller.newUser
)

router.get(
  "login",
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
