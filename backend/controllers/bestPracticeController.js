const autoMapper = require("../middleware/autoMapper");
const dateRegulator = require("../middleware/dateRegulator");

function bestPracticeController(BestPractice) {

    function post(req, res) {
        const bestPractice = new BestPractice(req.body);
        bestPractice.userId = req.rootId;
        bestPractice.save((err) => {
            if (err) {
                return res.send(err);
            }
            res.status(201);
            return res.json(bestPractice);
        });
    };

    function getByStep(req, res) {
        const query = {
            userId: req.rootId,
            deptName: req.params.deptName,
            objectiveName: req.params.objectiveName,
            stepNumber: req.params.stepNumber
        }
        BestPractice.find(query, (err, bestPractices) => {
            if (err) {
                return res.send(err);
            }
            return res.json(bestPractices);
        });
    };

    function getById(req, res) {
        const query = {
            userId: req.rootId,
            _id: req.params._id
        }
        BestPractice.find(query, (err, bestPractice) => {
            if (err) {
                return res.send(err);
            }
            return res.json(bestPractice[0]);
        });
    }

    function put(req, res) {
        let query = { 
            userId: req.rootId,
            _id: req.params._id
        };
        BestPractice.find(query, (err, bestPractices) => {
            if (err) {
                return res.send(err);
            }
            let newBestPractice = autoMapper(bestPractices[0], req.body);
            newBestPractice.lastUpdated = dateRegulator(new Date);
            BestPractice.updateOne(query, newBestPractice)
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
        BestPractice.find(query, (err, bestPractices) => {
            if (err) {
                return res.send(err);
            }
            return res.json(bestPractices);
        });
    };


    return { post, getByStep, getById, put, getForEmployee };
}

module.exports = bestPracticeController;