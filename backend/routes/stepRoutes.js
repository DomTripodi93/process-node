const express = require('express');

const stepController = require("../controllers/stepController");
const deleteController = require("../controllers/deleteController");
const checkAuth = require("../middleware/checkAuth");
const bestPracticeRoute = require("./bestPracticeRoutes");

function routes(Step, BestPractice, CommonDifficulty) {
    const controller = stepController(Step);
    const controllerDelete = deleteController([Step, BestPractice, CommonDifficulty]);
    const router = express.Router();
    router.use("", checkAuth);

    router.route("")
        .post(controller.post);

    router.route("/byObjective/:deptName&:objectiveName")
        .get(controller.getByObjective);

    router.route("/:deptName&:objectiveName&:stepNumber")
        .get(controller.getByNumber)
        .put(controller.put)
        .delete((req, res) => {controllerDelete.deleteCascade(req, res)});

    router.route("/forEmployee/:deptName&:objectiveName")
        .get(controller.getForEmployee);

    return router;
}

module.exports = routes;