const express = require('express');

const stepController = require("../controllers/stepController");
const checkAuth = require("../middleware/checkAuth");

function routes(Step) {
    const controller = stepController(Step);
    const router = express.Router();
    router.use("", checkAuth);

    router.route("")
        .post(controller.post);

    router.route("/byObjective/:department&:objective")
        .get(controller.getByObjective);

    router.route("/:department&:objective&:step")
        .get(controller.getByNumber);

    router.route("/:department&:objective&:step")
        .put(controller.put)

    router.delete("/:department&:objective&:step", (req, res) => {
        Step.deleteOne({ 
            deptName: req.params.department, 
            objectiveName: req.params.objective, 
            stepNumber: req.params.step,
            userId: req.userId 
        }).then(
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