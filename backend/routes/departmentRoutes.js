const express = require('express');

const departmentController = require("../controllers/departmentController");
const deleteController = require("../controllers/deleteController");
const checkAuth = require("../middleware/checkAuth");

function routes(Department, Objective, ChangeLog) {
    const controller = departmentController(Department);
    const controllerDelete = deleteController([Department, Objective]);
    const router = express.Router();
    router.use("", checkAuth);

    router.route("")
        .post(controller.post)
        .get(controller.getByUser);

    router.route("/:deptName")
        .get(controller.getByName)
        .put(controller.put)
        .delete(controllerDelete.deleteCascade)

    return router;
}

module.exports = routes;