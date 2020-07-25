const express = require("express");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const checkAuth = require("../middleware/checkAuth");

function routes(User) {
    const controllerUser = userController(User);
    const controllerAuth = authController(User);
    const router = express.Router();
    router.use("", checkAuth)

    router.route("")
        .get(controllerUser.getEmployeesForUser)
        .post(controllerAuth.postRegister);

    return router;
}