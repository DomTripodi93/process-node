const express = require('express');

const objectiveController = require("../controllers/objectiveController");
const deleteController = require("../controllers/deleteController");
const checkAuth = require("../middleware/checkAuth");

function routes(Objective, Step) {
    const controller = objectiveController(Objective);
    const controllerDelete = deleteController([Objective, Step]);
    const router = express.Router();
    router.use("", checkAuth);

    router.route("")
        .post(controller.post);

    router.route("/byDepartment/:deptName")
        .get(controller.getByDepartment);

    router.route("/:deptName&:objectiveName")
        .get(controller.getByName)
        .put(controller.put)
        .delete(controllerDelete.deleteCascade);

    router.route("/forEmployee/:deptName&:objectiveName")
        .get(controller.getForEmployee);

    return router;
}

module.exports = routes;