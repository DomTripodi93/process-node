const express = require('express');

const departmentController = require("../controllers/departmentController");
const deleteController = require("../controllers/deleteController");
const checkAuth = require("../middleware/checkAuth");

function routes(Department) {
    const controller = departmentController(Department);
    const controllerDelete = deleteController(Department);
    const router = express.Router();
    router.use("", checkAuth);

    router.route("")
        .post(controller.post)
        .get(controller.getByUser);

    router.route("/:deptName")
        .get(controller.getByName);

    router.route("/:deptName")
        .put(controller.put)
        .delete(controllerDelete.deleteOne)

    return router;
}

module.exports = routes;