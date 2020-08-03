const express = require("express");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const checkAuth = require("../middleware/checkAuth");
const deleteController = require("../controllers/deleteController");

function routes(User, Schedule) {
    const controllerUser = userController(User);
    const controllerAuth = authController(User);
    const controllerDelete = deleteController([User, Schedule]);
    const router = express.Router();
    router.use("", checkAuth)

    router.route("")
        .get(controllerUser.getEmployeesForUser)
        .post(controllerAuth.postRegister);
    
    router.route("/:_id")
        .put(controllerUser.put)
        .delete(controllerDelete.deleteEmployee)

    return router;
}

module.exports = routes;