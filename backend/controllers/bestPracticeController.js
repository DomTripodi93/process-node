const autoMapper = require("../middleware/autoMapper");

function bestPracticeController(BestPractice) {

    function post(req, res) {
        const bestPractice = new BestPractice(req.body);
        bestPractice.userId = req.userId;
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
            userId: req.userId,
            deptName: req.params.department,
            objectiveName: req.params.objective,
            stepNumber: req.params.step
        }
        BestPractice.find(query, (err, bestPractices) => {
            if (err) {
                return res.send(err);
            }
            return res.json(bestPractices);
        });
    };

    function getByNumber(req, res) {
        const query = {
            userId: req.userId,
            _id: req.params.id
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
            userId: req.userId,
            _id: req.params.id
        };
        BestPractice.find(query, (err, bestPractices) => {
            if (err) {
                return res.send(err);
            }
            let newBestPractice = autoMapper(bestPractices[0], req.body);
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


    return { post, getByStep, getByNumber, put };
}

module.exports = bestPracticeController;