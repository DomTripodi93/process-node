const express = require("express");
const authController = require("../controllers/authController");

function routes(User) {
  const router = express.Router();
  const controller = authController(User);

  router.route("/register")
    .post(controller.postRegister);

  router.route("/login")
    .post(controller.postLogin);

  return router;
}

module.exports = routes;