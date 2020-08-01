const express = require('express');
const changeLogController = require("../controllers/changeLogController");
const checkAuth = require("../middleware/checkAuth");

function routes(ChangeLog) {
    const controller = changeLogController(ChangeLog);
    const router = express.Router();
    router.use("", checkAuth);

    router.route("")
        .get(controller.getChanges);

    return router;
}

module.exports = routes;