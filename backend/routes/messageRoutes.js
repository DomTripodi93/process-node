const express = require('express');

const messageController = require("../controllers/messageController");
const deleteController = require("../controllers/deleteController");
const changeLogController = require("../controllers/changeLogController");
const checkAuth = require("../middleware/checkAuth");

function routes(Message, User, ChangeLog) {
    const controllerMessage = messageController(Message, User)
    const controllerDelete = deleteController([Message]);
    const controllerChangeLog = changeLogController(ChangeLog, Message, "message");
    const router = express.Router();
    router.use("", checkAuth);

    router.route("")
        .post(controllerMessage.post)
        .get(controllerMessage.get);

    router.route("/:_id")
        .put(controllerChangeLog.post)
        .put(controllerMessage.put)
        .delete(controllerChangeLog.post)
        .delete(controllerDelete.deleteOne);

    router.route("/next/:page")
        .get(controllerMessage.getByPage);

    return router;
}

module.exports = routes;