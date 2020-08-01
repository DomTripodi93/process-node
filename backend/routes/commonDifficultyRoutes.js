const express = require('express');

const commonDifficultyController = require("../controllers/commonDifficultyController");
const deleteController = require("../controllers/deleteController");
const changeLogController = require("../controllers/changeLogController");
const checkAuth = require("../middleware/checkAuth");

function routes(CommonDifficulty, ChangeLog) {
    const controller = commonDifficultyController(CommonDifficulty);
    const controllerDelete = deleteController([CommonDifficulty]);
    const controllerChangeLog = changeLogController(ChangeLog, CommonDifficulty, "commonDifficulty");
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