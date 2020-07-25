const express = require('express');

const objectiveController = require("../controllers/objectiveController");
const checkAuth = require("../middleware/checkAuth");

function routes(Objective) {
    const controller = objectiveController(Objective);
    const router = express.Router();
    router.use("", checkAuth);

    router.route("")
        .post(controller.post);

    router.route("/byDepartment/:department")
        .get(controller.getByDepartment);

    router.route("/:department&:objective")
        .get(controller.getByName);

    router.route("/:department&:objective")
        .put(controller.put)

    router.delete("/:department&:objective", (req, res) => {
        Objective.deleteOne({ deptName: req.params.department, objectiveName: req.params.objective, userId: req.userId }).then(
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