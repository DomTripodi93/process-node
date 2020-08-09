const express = require('express');

const scheduleController = require("../controllers/scheduleController");
const deleteController = require("../controllers/deleteController");
const changeLogController = require("../controllers/changeLogController");
const checkAuth = require("../middleware/checkAuth");

function routes(Schedule, ChangeLog) {
    const controller = scheduleController(Schedule);
    const controllerDelete = deleteController([Schedule]);
    const controllerChangeLog = changeLogController(ChangeLog, Schedule, "schedule");
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
        .put(controllerChangeLog.post)
        .put(controller.put)
        .delete(controllerChangeLog.post)
        .delete(controllerDelete.deleteOne);

    router.route("/employeeDay/:date")
        .get(controller.getByDayForEmployee);

    router.route("/employeeMonth/:date")
        .get(controller.getByMonthForEmployee);
    
    router.route("/employeeStatus/:_id&:status")
        .put(controllerChangeLog.post)
        .put(controller.putStatus);

    return router;
}

module.exports = routes;