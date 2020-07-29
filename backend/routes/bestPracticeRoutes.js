const express = require('express');

const bestPracticeController = require("../controllers/bestPracticeController");
const deleteController = require("../controllers/deleteController");
const checkAuth = require("../middleware/checkAuth");

function routes(BestPractice) {
    const controller = bestPracticeController(BestPractice);
    const controllerDelete = deleteController(BestPractice);
    const router = express.Router();
    router.use("", checkAuth);

    router.route("")
        .post(controller.post);

    router.route("/byStep/:deptName&:objectiveName&:stepNumber")
        .get(controller.getByStep);

    router.route("/:_id")
        .get(controller.getById)
        .put(controller.put)
        .delete(controllerDelete.deleteOne);

    router.route("/forEmployee/:deptName&:objectiveName&:stepNumber")
        .get(controller.getForEmployee);

    return router;
}

module.exports = routes;