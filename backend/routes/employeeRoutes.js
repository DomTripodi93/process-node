const express = require("express");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const changeLogController = require("../controllers/changeLogController");
const checkAuth = require("../middleware/checkAuth");

function routes(User, ChangeLog) {
    const controllerUser = userController(User);
    const controllerAuth = authController(User);
    const controllerChangeLog = changeLogController(ChangeLog, User, "Employee");
    const router = express.Router();
    router.use("", checkAuth)

    router.route("")
        .get(controllerUser.getEmployeesForUser)
        .post(controllerAuth.postRegister);
    
    router.route("/:id")
        .put(controllerChangeLog.post)
        .put(controllerUser.put)

    return router;
}

module.exports = routes;