const express = require('express');


const deleteController = require("../controllers/deleteController");
const changeLogController = require("../controllers/changeLogController");
const checkAuth = require("../middleware/checkAuth");

function routes(Message, ChangeLog) {
    const controllerDelete = deleteController([Message]);
    const controllerChangeLog = changeLogController(ChangeLog, Message, "message");
    const router = express.Router();
    router.use("", checkAuth);

    router.route("")
        .post()
        .get();

    router.route("/:_id")
        .put(controllerChangeLog.post)
        .put()
        .delete(controllerChangeLog.post)
        .delete(controllerDelete.deleteCascade);

    router.route("/next/:page")
        .get();

    return router;
}

module.exports = routes;