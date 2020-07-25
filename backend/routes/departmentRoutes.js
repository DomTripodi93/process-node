const express = require('express');

const departmentController = require("../controllers/departmentController");
const checkAuth = require("../middleware/checkAuth");

function routes(Department) {
    const controller = departmentController(Department);
    const router = express.Router();
    router.use("", checkAuth);

    router.route("")
        .post(controller.post);

    router.route("/byUser")
        .get(controller.getByUser);

    router.route("/:name")
        .get(controller.getByName);

    router.route("/:name")
        .put(controller.put)
    
    return router;
}

module.exports = routes;