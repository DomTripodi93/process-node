const autoMapper = require("../middleware/autoMapper");
const dateRegulator = require("../middleware/dateRegulator");

function commonDifficultyController(CommonDifficulty) {

    function post(req, res) {
        const commonDifficulty = new CommonDifficulty(req.body);
        commonDifficulty.userId = req.rootId;
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
            userId: req.rootId,
            deptName: req.params.deptName,
            objectiveName: req.params.objectiveName,
            stepNumber: req.params.stepNumber
        }
        CommonDifficulty.find(query, (err, commonDifficulties) => {
            if (err) {
                return res.send(err);
            }
            return res.json(commonDifficulties);
        });
    };

    function getById(req, res) {
        const query = {
            userId: req.rootId,
            _id: req.params._id
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
            userId: req.rootId,
            _id: req.params._id
        };
        CommonDifficulty.find(query, (err, commonDifficulties) => {
            if (err) {
                return res.send(err);
            }
            let newCommonDifficulty = autoMapper(commonDifficulties[0], req.body);
            newCommonDifficulty.lastUpdated = dateRegulator(new Date);
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

    //Below functions for employee use

    function getForEmployee(req, res) {
        const query = {
            userId: req.rootId,
            deptName: req.params.deptName,
            objectiveName: req.params.objectiveName,
            stepNumber: req.params.stepNumber
        }
        CommonDifficulty.find(query, (err, commonDifficulties) => {
            if (err) {
                return res.send(err);
            }
            return res.json(commonDifficulties);
        });
    };


    return { post, getByStep, getById, put, getForEmployee };
}

module.exports = commonDifficultyController;