const express = require('express');

const departmentController = require("../controllers/departmentController");
const checkAuth = require("../middleware/checkAuth");

function routes(Department) {
    const router = express.Router();
    router.use("", checkAuth)

    const controller = departmentController(Department);

    router.route("")
        .post(controller.post);

    router.route("/byUser")
        .get(controller.get);
    
    return router;
}

module.exports = routes;