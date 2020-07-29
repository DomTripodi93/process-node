const express = require('express');

const stepController = require("../controllers/stepController");
const deleteController = require("../controllers/deleteController");
const checkAuth = require("../middleware/checkAuth");

function routes(Step) {
    const controller = stepController(Step);
    const controllerDelete = deleteController(Step);
    const router = express.Router();
    router.use("", checkAuth);

    router.route("")
        .post(controller.post);

    router.route("/byObjective/:deptName&:objectiveName")
        .get(controller.getByObjective);

    router.route("/:deptName&:objectiveName&:stepNumber")
        .get(controller.getByNumber)
        .put(controller.put)
        .delete(controllerDelete.deleteOne);

    router.route("/forEmployee/:deptName&:objectiveName")
        .get(controller.getForEmployee);

    return router;
}

module.exports = routes;