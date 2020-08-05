const autoMapper = require("../middleware/autoMapper");
const dateRegulator = require("../middleware/dateRegulator");

function stepController(Step) {

    function post(req, res) {
        const step = new Step(req.body);
        step.userId = req.rootId;
        step.save((err) => {
            if (err) {
                return res.send(err);
            }
            res.status(201);
            return res.json(step);
        });
    };

    function getByObjective(req, res) {
        const query = {
            userId: req.rootId,
            deptName: req.params.deptName,
            objectiveName: req.params.objectiveName
        }
        Step.find(query)
            .sort({stepNumber: 1})
            .exec((err, steps) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(steps);
            });
    };

    function getByNumber(req, res) {
        const query = {
            userId: req.rootId,
            deptName: req.params.deptName,
            objectiveName: req.params.objectiveName,
            stepNumber: req.params.stepNumber
        }
        Step.find(query, (err, step) => {
            if (err) {
                return res.send(err);
            }
            return res.json(step[0]);
        });
    }

    function put(req, res) {
        let query = { 
            userId: req.rootId,
            deptName: req.params.deptName,
            objectiveName: req.params.objectiveName,
            stepNumber: req.params.stepNumber
        };
        Step.find(query, (err, steps) => {
            if (err) {
                return res.send(err);
            }
            let newStep = autoMapper(steps[0], req.body);
            newStep.lastUpdated = dateRegulator(new Date);
            Step.updateOne(query, newStep)
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
            objectiveName: req.params.objectiveName
        }
        Step.find(query, (err, steps) => {
            if (err) {
                return res.send(err);
            }
            return res.json(steps);
        });
    };


    return { post, getByObjective, getByNumber, put, getForEmployee };
}

module.exports = stepController;