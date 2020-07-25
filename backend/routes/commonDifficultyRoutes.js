const express = require('express');

const commonDifficultyController = require("../controllers/commonDifficultyController");
const checkAuth = require("../middleware/checkAuth");

function routes(CommonDifficulty) {
    const controller = commonDifficultyController(CommonDifficulty);
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
        CommonDifficulty.deleteOne({ 
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