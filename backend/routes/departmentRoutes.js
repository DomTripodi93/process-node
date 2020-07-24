const express = require('express');

const departmentController = require("../controllers/departmentController");
const checkAuth = require("../middleware/checkAuth");

function routes(Department) {
    const router = express.Router();
    const controller = departmentController(Department);

    router.route("")
        .post(checkAuth, controller.post);

    router.route("/byUser")
        .get(checkAuth, controller.getByUser);

    router.route("/:name")
        .get(checkAuth, controller.getByName);
    
    return router;
}

module.exports = routes;