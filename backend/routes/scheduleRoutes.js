const express = require('express');

const scheduleController = require("../controllers/scheduleController");
const deleteController = require("../controllers/deleteController");
const checkAuth = require("../middleware/checkAuth");

function routes(Schedule) {
    const controller = scheduleController(Schedule);
    const controllerDelete = deleteController(Schedule);
    const router = express.Router();
    router.use("", checkAuth);

    router.route("")
        .post(controller.post)
    
    router.route("/byUser/:month&:year&:day")
        .get(controller.getByUser);

    router.route("/byEmployee/:employeeId&:month&:year&:day")
        .get(controller.getByEmployee);

    router.route("/:_id")
        .get(controller.getById)
        .put(controller.put)
        .delete(controllerDelete.deleteOne)

    return router;
}

module.exports = routes;