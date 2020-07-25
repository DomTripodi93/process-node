const express = require('express');

const bestPracticeController = require("../controllers/bestPracticeController");
const checkAuth = require("../middleware/checkAuth");

function routes(BestPractice) {
    const controller = bestPracticeController(BestPractice);
    const router = express.Router();
    router.use("", checkAuth);

    router.route("")
        .post(controller.post);

    router.route("/byStep/:department&:objective&:step")
        .get(controller.getByStep);

    router.route("/:id")
        .get(controller.getById);

    router.route("/:id")
        .put(controller.put)

    router.delete("/:id", (req, res) => {
        BestPractice.deleteOne({ 
            _id: req.params.id,
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