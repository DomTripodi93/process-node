const express = require('express');

const bestPracticeController = require("../controllers/bestPracticeController");
const deleteController = require("../controllers/deleteController");
const changeLogController = require("../controllers/changeLogController");
const checkAuth = require("../middleware/checkAuth");

function routes(BestPractice, ChangeLog) {
    const controller = bestPracticeController(BestPractice);
    const controllerDelete = deleteController([BestPractice]);
    const controllerChangeLog = changeLogController(ChangeLog, BestPractice, "bestPractice");
    const router = express.Router();
    router.use("", checkAuth);

    router.route("")
        .post(controller.post);

    router.route("/byStep/:deptName&:objectiveName&:stepNumber")
        .get(controller.getByStep);

    router.route("/:_id")
        .get(controller.getById)
        .put(controllerChangeLog.post)
        .put(controller.put)
        .delete(controllerChangeLog.post)
        .delete(controllerDelete.deleteOne);

    router.route("/forEmployee/:deptName&:objectiveName&:stepNumber")
        .get(controller.getForEmployee);

    return router;
}

module.exports = routes;