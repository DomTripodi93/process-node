const autoMapper = require("../middleware/autoMapper");

function commonDifficultyController(CommonDifficulty) {

    function post(req, res) {
        const commonDifficulty = new CommonDifficulty(req.body);
        commonDifficulty.userId = req.userId;
        commonDifficulty.save((err) => {
            if (err) {
                return res.send(err);
            }
            res.status(201);
            return res.json(commonDifficulty);
        });
    };

    function getByStep(req, res) {
        const query = {
            userId: req.userId,
            deptName: req.params.department,
            objectiveName: req.params.objective,
            stepNumber: req.params.step
        }
        CommonDifficulty.find(query, (err, commonDifficultys) => {
            if (err) {
                return res.send(err);
            }
            return res.json(commonDifficultys);
        });
    };

    function getById(req, res) {
        const query = {
            userId: req.userId,
            _id: req.params.id
        }
        CommonDifficulty.find(query, (err, commonDifficulty) => {
            if (err) {
                return res.send(err);
            }
            return res.json(commonDifficulty[0]);
        });
    }

    function put(req, res) {
        let query = { 
            userId: req.userId,
            _id: req.params.id
        };
        CommonDifficulty.find(query, (err, commonDifficultys) => {
            if (err) {
                return res.send(err);
            }
            let newCommonDifficulty = autoMapper(commonDifficultys[0], req.body);
            CommonDifficulty.updateOne(query, newCommonDifficulty)
                .then(result => {
                    if (result.nModified > 0) {
                        return res.status(200).json({ message: "Update Successful" });
                    } else {
                        return res.status(500).json({ message: "No Changes" });
                    }
                });
        });
    }


    return { post, getByStep, getById, put };
}

module.exports = commonDifficultyController;