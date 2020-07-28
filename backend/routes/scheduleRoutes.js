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
        .post(controller.post);
    
    router.route("/byUser/:date")
        .get(controller.getByDay);

    router.route("/byEmployee/:employeeId&:date")
        .get(controller.getByEmployeeDay);

    router.route("/:_id")
        .get(controller.getById)
        .put(controller.put)
        .delete(controllerDelete.deleteOne);

    router.route("/employeeDay/:date")
        .get(controller.getByDayForEmployee);

    router.route("/employeeMonth/:date")
        .get(controller.getByMonthForEmployee);
    
    router.route("/employeeStatus/:id&:status")
        .put(controller.putStatus);

    return router;
}

module.exports = routes;