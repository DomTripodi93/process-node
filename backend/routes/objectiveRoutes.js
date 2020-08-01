const express = require('express');

const objectiveController = require("../controllers/objectiveController");
const deleteController = require("../controllers/deleteController");
const changeLogController = require("../controllers/changeLogController");
const checkAuth = require("../middleware/checkAuth");

function routes(Objective, Step, Schedule, ChangeLog) {
    const controller = objectiveController(Objective);
    const controllerDelete = deleteController([Objective, Step, Schedule]);
    const controllerChangeLog = changeLogController(ChangeLog, Objective, "Objective");
    const router = express.Router();
    router.use("", checkAuth);

    router.route("")
        .post(controller.post);

    router.route("/byDepartment/:deptName")
        .get(controller.getByDepartment);

    router.route("/:deptName&:objectiveName")
        .get(controller.getByName)
        .put(controllerChangeLog.post)
        .put(controller.put)
        .delete(controllerChangeLog.post)
        .delete(controllerDelete.deleteCascade);

    router.route("/forEmployee/:deptName&:objectiveName")
        .get(controller.getForEmployee);

    return router;
}

module.exports = routes;