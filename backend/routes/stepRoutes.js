const express = require('express');

const stepController = require("../controllers/stepController");
const deleteController = require("../controllers/deleteController");
const changeLogController = require("../controllers/changeLogController");
const checkAuth = require("../middleware/checkAuth");

function routes(Step, BestPractice, CommonDifficulty, ChangeLog) {
    const controller = stepController(Step);
    const controllerDelete = deleteController([Step, BestPractice, CommonDifficulty]);
    const controllerChangeLog = changeLogController(ChangeLog, Department, "Department");
    const router = express.Router();
    router.use("", checkAuth);

    router.route("")
        .post(controller.post);

    router.route("/byObjective/:deptName&:objectiveName")
        .get(controller.getByObjective);

    router.route("/:deptName&:objectiveName&:stepNumber")
        .get(controller.getByNumber)
        .put(controllerChangeLog.post)
        .put(controller.put)
        .delete(controllerChangeLog.post)
        .delete((req, res) => {controllerDelete.deleteCascade(req, res)});

    router.route("/forEmployee/:deptName&:objectiveName")
        .get(controller.getForEmployee);

    return router;
}

module.exports = routes;