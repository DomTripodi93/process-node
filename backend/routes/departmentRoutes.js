const express = require('express');

const departmentController = require("../controllers/departmentController");
const checkAuth = require("../middleware/checkAuth");

function routes(Department) {
    const controller = departmentController(Department);
    const router = express.Router();
    router.use("", checkAuth);

    router.route("")
        .post(controller.post)
        .get(controller.getByUser);

    router.route("/:name")
        .get(controller.getByName);

    router.route("/:name")
        .put(controller.put)

    router.delete("/:name", (req, res) => {
        Department.deleteOne({ deptName: req.params.name, userId: req.userId }).then(
            result => {
                if (result.n > 0) {
                    res.status(200).json({ message: "Deletion successful!" });
                } else {
                    res.status(500).json({ message: "Cannot Delete" });
                }
            }
        );
    })

    return router;
}

module.exports = routes;